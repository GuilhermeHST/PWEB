const { response } = require('express');
var express = require('express')
var path = require('path');
var bodyParser = require('body-parser');
const req = require('express/lib/request')
var app = express()
var mongoClient = require('mongodb').MongoClient
var db;

mongoClient.connect('mongodb+srv://ghst1:12345678910@cluster0.8tq3t0i.mongodb.net/?retryWrites=true&w=majority').then((client) => {
    db = client.db('pweb')
    db.collection('animais').find().toArray((err, result) => {
        console.log(result)
    })
}).catch((err) => {
    console.log(err)
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/cadastro.html'));
});

app.post('/', function (req, res){
    console.log(req);
    const documento = {
        nome: req.body.nome
    }
    db.collection('animais').insertOne(documento, function(err, result){
        if(err){
            response.status(400).send("Erro na Inserção.");
        }else{
            console.log("Adicionado novo animal");
            res.status(404).send();
        }
    });
});

app.listen(3000, function(){
    console.log('App executando na porta 3000.');
});