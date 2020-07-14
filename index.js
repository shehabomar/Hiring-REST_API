const express  = require('express');

const bodyParser=require('body-parser');

const mongoose=require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/ninjago');

mongoose.Promise=global.Promise;

app.use(express.static('public'));

const routes = require('./routes/api');

app.use(bodyParser.json()); 

app.use(routes);

app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message});
})
app.listen(4000,function(req,res){
    console.log('Listens to requests');
});