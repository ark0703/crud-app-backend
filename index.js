const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');


app.use(express.json());

mongoose.connect('mongodb+srv://arksharma06:Maamaa123@mongodb.wbdpi3s.mongodb.net/node-api?retryWrites=true&w=majority&appName=MongoDB')
.then(()=>{
    console.log("Connected to database");
    app.listen(3000,()=>{
        console.log('Server running on 3000');
    });
})
.catch(()=>{
    console.log("Unsuccessful Connection");
})

app.get('/',(req,res)=>{
    res.send("<h3>Hello from node API</h3>");
});

app.post('/api/products',async(req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})