const Product = require('../models/Product')

const seedProduct = async () => {
    const laptopProducts = [
        {
            name: "Dell XPS 13",
            description: "13-inch laptop with Intel i7, 16GB RAM, 512GB SSD",
            price: 1200,
            stock: 25,
            specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "13.3-inch FHD",
            graphics: "Intel Iris Xe"
            },
            category: "68f91ccaa0f8dd97e5b3439e", // replace with actual Category ObjectId
            brand: "68f91d1fa0f8dd97e5b343b0", // replace with actual Brand ObjectId
            image: [
            "/uploads/3d2b515f6f35cbb6f269a8c3bc0814d9.jpg",
            
            ]
        },
        {
            name: "MacBook Air M2",
            description: "Apple MacBook Air with M2 chip, 16GB RAM, 512GB SSD",
            price: 1400,
            stock: 20,
            specs: {
            processor: "Apple M2",
            ram: "16GB",
            storage: "512GB SSD",
            display: "13.6-inch Retina",
            graphics: "Integrated 10-core GPU"
            },
            category: "68f91ccaa0f8dd97e5b3439e",
            brand: "68f91d1aa0f8dd97e5b343ad",
            image: [
            "/uploads/3d2b515f6f35cbb6f269a8c3bc0814d9.jpg",
            ]
        },
        {
            name: "HP Spectre x360",
            description: "HP Spectre x360 Convertible Laptop, Intel i7, 16GB RAM, 1TB SSD",
            price: 1500,
            stock: 15,
            specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "1TB SSD",
            display: "13.5-inch 4K OLED",
            graphics: "Intel Iris Xe"
            },
            category: "68f91ccaa0f8dd97e5b3439e",
            brand: "68f91d1fa0f8dd97e5b343b0",
            image: [
            "/uploads/3d2b515f6f35cbb6f269a8c3bc0814d9.jpg",
            ]
        },
        {
            name: "Lenovo ThinkPad X1 Carbon",
            description: "14-inch ultrabook with Intel i7, 16GB RAM, 512GB SSD",
            price: 1300,
            stock: 18,
            specs: {
            processor: "Intel Core i7",
            ram: "16GB",
            storage: "512GB SSD",
            display: "14-inch FHD",
            graphics: "Intel Iris Xe"
            },
            category: "68f91ccaa0f8dd97e5b3439e",
            brand: "68f91d1fa0f8dd97e5b343b0",
            image: [
            "/uploads/3d2b515f6f35cbb6f269a8c3bc0814d9.jpg",
            ]
        },
        {
            name: "Asus ROG Zephyrus G14",
            description: "14-inch gaming laptop with AMD Ryzen 9, 16GB RAM, 1TB SSD, RTX 3060",
            price: 1600,
            stock: 10,
            specs: {
            processor: "AMD Ryzen 9",
            ram: "16GB",
            storage: "1TB SSD",
            display: "14-inch FHD",
            graphics: "NVIDIA RTX 3060"
            },
            category: "68f91ccaa0f8dd97e5b3439e",
            brand: "68f91d28a0f8dd97e5b343b6",
            image: [
            "/uploads/3d2b515f6f35cbb6f269a8c3bc0814d9.jpg",
            ]
        }
    ];

    try {
        await Product.deleteMany({})
        console.log('Product Deleted')

        await Product.insertMany(laptopProducts)
        console.log('Product Added')
    }
    catch (error) {
        console.log(error.message)
    }

}

module.exports = seedProduct