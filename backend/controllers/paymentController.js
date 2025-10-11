const Payment = require('../models/Payment')
const Order = require('../models/Order')
const axios = require('axios')
const config = require('../utils/config')

let paymentData

const initiatePayment = async(req, res, next) => {
    try {
        const {orderId, method} = req.body

        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({error: 'Order Not Found'})
        }

        const amount = order.totalAmount

        const payment = new Payment({
            order: orderId,
            method,
            amount,
            status: 'pending'
        })

        await payment.save()

        if (method === 'khalti') {
            const payload = {
                return_url: 'http://localhost:3001/payment/verify',
                website_url: 'http://localhost:3001',
                amount: amount * 100,
                purchase_order_id: orderId,
                purchase_order_name: "Order Payment" 
            }

            const response = await axios.post('https://dev.khalti.com/api/v2/epayment/initiate', payload, {
                headers: {Authorization: `Key ${config.KHALTI_SECRET_KEY}`}
            })

            paymentData = {
                paymentId: payment._id,
                paymentUrl: response.data.payment_url,
                pidx: response.data.pidx,
                provider: 'Khalti'
            };
        } else if (method === 'esewa') {
            const esewaUrl = "https://uat.esewa.com.np/epay/main"
            const successUrl = "http://localhost:3001/payment/verify"
            const failureUrl = "http://localhost:3001/payment/failure"

            paymentData = {
                provider: 'esewa',
                paymentId: payment._id,
                paymentUrl: esewaUrl,
                params: {
                    amt: amount,
                    product_service_charge: 0,
                    product_delivery_charge: 0,
                    failure_url: failureUrl,
                    success_url: successUrl,
                    tax_amount: 0,
                    total_amount: order.totalAmount,
                    product_id: order._id,
                    scd: config.ESEWA_MERCHANT_CODE
                },
            };
        }

        return res.status(200).json(paymentData)
    }
    catch(error) {
        next(error)
    }
}

const verifyPayment = async(req, res, next) => {
    try {
        const {method} = req.body

        if (method === 'khalti') {
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
        } else if (method === 'esewa') {
            const {oid, amt, refId} = req.body
            const url = "https://uat.esewa.com.np/epay/transrec"

            const params = new URLSearchParams({
                amt, 
                rid: refId,
                pid: oid,
                scd: config.ESEWA_MERCHANT_CODE
            })

            const response = await axios.post(url, params)

            if (response.data.includes("<response_code>Success</response_code>")) {
                const payment = await Payment.findOne({order: oid})
                const order = await Order.findById(oid)

                if (!payment || !order) {
                    return res.status(404).json({error: "No Order or Payment Found"})
                }

                if (amt === order.totalAmount) {
                    payment.status = 'completed'
                    order.paymentStatus = 'paid'
                    await payment.save()
                    await order.save()
                    return res.status(200).json({message: 'Esewa Payment Verified'})
                }
                else {
                    return res.status(400).json({error: 'Amount and Order Total Amount doesnot match'})
                }
            }
            return res.status(400).json({error: "Esewa Payment Failed"})
        }
    }

    catch(error) {
        next(error)
    }
}

module.exports = {initiatePayment,verifyPayment}