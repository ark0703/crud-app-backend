const express = require('express')
const app = express()

app.listen(3000,()=>{
    console.log('Server running on 3000');
});


app.get('/',(req,res)=>{
    res.send("<h1>Hello from node API</h1>");
});