const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
});



app.get('/', (req, res) => {
    res.send("<h3>Hello from node API</h3>");
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//updating product
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//deleting a product
app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: "product has been deleted" })


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

mongoose.connect('mongodb+srv://arksharma06:Maamaa123@mongodb.wbdpi3s.mongodb.net/node-api?retryWrites=true&w=majority&appName=MongoDB')
    .then(() => {
        console.log("Connected to database");
        app.listen(3000, () => {
            console.log('Server running on 3000');
        });
    })
    .catch(() => {
        console.log("Unsuccessful Connection");
    })

