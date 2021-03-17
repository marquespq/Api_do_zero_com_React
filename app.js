const express = require('express');
const mongoose = require('mongoose');

require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/minhaapi',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() =>{
    console.log("Conexão com o banco de dados foi um sucesso.")
}).catch((erro) =>{
    console.log("Erro: conexão não foi com sucesso")
});

app.get("/", (req, res)=>{
    Artigo.find({}).then((artigo) =>{
        return res.json(artigo)
    }).catch((erro) =>{
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado."
        })
    })
});

app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        })
        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    })
})

app.listen(8080, () =>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")
})