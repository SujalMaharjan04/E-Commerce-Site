const Payment = require('../models/Payment')
const Order = require('../models/Order')
const axios = require('axios')
const config = require('../utils/config')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');

let paymentData

const initiatePayment = async(req, res, next) => {
    try {
        const {orderId, paymentMethod} = req.body

        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({error: 'Order Not Found'})
        }

        const amount = order.totalAmount

        let transaction_uuid
        if (paymentMethod === 'Esewa') {
            transaction_uuid = uuidv4()
        }
        const payment = new Payment({
            order: orderId,
            paymentMethod,
            amount,
            transaction_uuid,
            status: 'pending'
        })

        await payment.save()

        // if (paymentMethod === 'Khalti') {
        //     const payload = {
        //         return_url: 'http://localhost:3001/api/payment/verify',
        //         website_url: 'http://localhost:3001',
        //         amount: amount * 100,
        //         purchase_order_id: orderId,
        //         purchase_order_name: "Order Payment" 
        //     }

        //     const response = await axios.post('https://dev.khalti.com/api/v2/epayment/initiate', payload, {
        //         headers: {Authorization: `Key ${config.KHALTI_SECRET_KEY}`}
        //     })

        //     paymentData = {
        //         paymentId: payment._id,
        //         paymentUrl: response.data.payment_url,
        //         pidx: response.data.pidx,
        //         provider: 'Khalti'
        // //     };
        // } else 
        if (paymentMethod === 'Esewa') {
            const esewaUrl = "https://rc-epay.esewa.com.np"
            
            const verifyUrl = `http://localhost:3001/api/payment/verify/esewa`

            const message = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${config.ESEWA_MERCHANT_CODE}`
            const secretKey = config.ESEWA_SECRET_KEY
            const hmac = crypto.createHmac('sha256', secretKey)
            hmac.update(message)
            const hash = hmac.digest('base64')

            paymentData = {
                provider: 'esewa',
                paymentId: payment._id,
                paymentUrl: esewaUrl,
                params: {
                    amount: order.totalAmount,
                    product_service_charge: 0,
                    product_delivery_charge: 0,
                    failure_url: verifyUrl,
                    success_url: verifyUrl,
                    tax_amount: 0,
                    total_amount: order.totalAmount,
                    transaction_uuid: transaction_uuid,
                    product_code: config.ESEWA_MERCHANT_CODE,
                    signed_field_names: "total_amount,transaction_uuid,product_code",
                    signature: hash
                },
            };
        }
        console.log(paymentData)
        return res.status(200).json(paymentData)
    }
    catch(error) {
        next(error)
    }
}

const verifyPayment = async(req, res, next) => {
    try {
        const {paymentMethod} = req.body

        if (paymentMethod === 'Khalti') {
            const {pidx} = req.body

            const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/", {pidx}, {
                headers: {Authorization: `Key ${config.KHALTI_SECRET_KEY}`},
            });

            const {status, purchase_order_id} = response.data
            const payment = await Payment.findOne({order: purchase_order_id})
            const order = await Order.findById(purchase_order_id)

            if (!payment || !order) {
                return res.status(404).json({error: "No Order Or Payment Found"})
            }

            if (status === 'completed') {
                payment.status = 'completed'
                order.paymentStatus = 'paid'
                await payment.save()
                await order.save()
                return res.status(200).json({message: "Khalti Payment Verified"})
            }

            payment.status = 'failed'
            await payment.save()
            return res.status(400).json({error: 'Khalti Payment Failed'})
        // } else if (paymentMethod === 'Esewa') {
        //     const {oid, amt, refId, signed_field_name, signature} = req.body
        //     const url = `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${config.ESEWA_MERCHANT_CODE}&total_amount=${amt}&transaction_uuid=${oid}`
        //     const order = await Order.findById(oid)
        //     if (!order) {
        //         return res.status(404).json({error: "No Order  Found"})
        //     }

        //     const message = `total_amount=${order.totalAmount},tansaction_uuid=${order._id},product_code=${config.ESEWA_MERCHANT_CODE}`
        //     const hmac = crypto.createHmac('sha1', config.ESEWA_MERCHANT_CODE)
        //     hmac.update(message)
        //     const expectedSignature = hmac.digest('base64')

        //     if (signature !== expectedSignature) {
        //         return res.status(400).json({error: 'Payment Verification Failed'})
        //     }

        //     const params = new URLSearchParams({
        //         amt, 
        //         rid: refId,
        //         pid: oid,
        //         scd: config.ESEWA_MERCHANT_CODE
        //     })

        //     const response = await axios.post(url, params)

        //     if (response.data.includes("<response_code>Success</response_code>")) {
        //         const payment = await Payment.findOne({order: oid})
                
        //         if (!payment ) {
        //             return res.status(404).json({error: "No Payment Found"})
        //         }

        //         if (amt === order.totalAmount) {
        //             payment.status = 'completed'
        //             order.paymentStatus = 'paid'
        //             await payment.save()
        //             await order.save()
        //             return res.status(200).json({message: 'Esewa Payment Verified'})
        //         }
        //         else {
        //             return res.status(400).json({error: 'Amount and Order Total Amount doesnot match'})
        //         }
        //     }
            return res.status(400).json({error: "Esewa Payment Failed"})
        }
    }

    catch(error) {
        next(error)
    }
}

const verifyEsewa = async (req, res, next) => {
    try {
        const FRONTEND_URL = 'http://localhost:5173'
        const {data} = req.query

        if (!data) {
            return res.status(400).json({error: "No Data"})
        }

        let decodedText = Buffer.from(data, 'base64').toString('utf-8')
        decodedText = await JSON.parse(decodedText)
        let headerList = {
            Accept: "application/json",
            "Content-type": "application/json"
        }

        const message = `transaction_code=${decodedText.transaction_code},status=${decodedText.status},total_amount=${decodedText.total_amount},transaction_uuid=${decodedText.transaction_uuid},product_code=${process.env.ESEWA_MERCHANT_CODE},signed_field_names=${decodedText.signed_field_names}`

        const payment = await Payment.findOne({transaction_uuid: decodedText.transaction_uuid})
        if (!payment) {
            return res.status(404).json({error: "No Payment Found"})
        }

        const order = await Order.findById(payment.order)
        if (!order) {
            return res.status(404).json({error: "No Order Found"})
        }

        const secretKey = config.ESEWA_SECRET_KEY
        const hash = crypto.createHmac("sha256", secretKey).update(message).digest('base64')
        const url = `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${config.ESEWA_MERCHANT_CODE}&total_amount=${decodedText.total_amount}&transaction_uuid=${decodedText.transaction_uuid}`
        let reqOption = {
            url: url,
            method: "GET",
            headers: headerList
        }

        if (hash !== decodedText.signature) {
            throw {message: "Invalid Info", decodedText}
        }

        let response = await axios.request(reqOption)

        if (response.data.status === 'COMPLETE') {
            payment.status = 'completed'
            order.paymentStatus = 'paid'
            await payment.save()
            await order.save()

            return res.redirect(`${FRONTEND_URL}/success`)
        }

        payment.status = 'failed'
        order.paymentStatus = 'failed'
        await payment.save()
        await order.save()

        return res.redirect(`${FRONTEND_URL}/failed`)
        
    }
    catch (error) {
        console.log('Error: ' + error.message)
        next(error)
    }
}

module.exports = {initiatePayment,verifyPayment, verifyEsewa}