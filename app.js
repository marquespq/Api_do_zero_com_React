const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    //console.log("Acessou o Middleware!");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Controll-Allow-Methods", 'GET, PUT, POST, DELETE')
    app.use(cors());
    next();
});

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
            message: "Nenhum título encontrado."
        })
    })
});

app.get("/artigo/:id", (req, res)=> {
    Artigo.findOne({_id:req.params.id}).then((artigo) =>{
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum título encontrado!"
        })
    })

    return res.json({id: req.params.id})
})

app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Titulo não foi cadastrado com sucesso!"
        })
        return res.status(200).json({
            error: false,
            message: "Titulo cadastrado com sucesso!"
        })
    })
})

app.put("/artigo/:id", (req, res) =>{
    const artigo = Artigo.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Titulo não foi editado!"
        });
        return res.json({
            error: false,
            message: "Titulo editado com sucesso"
        })
    })
});

app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Titulo não foi apagado!"
        });
        return res.json({
            error: false,
            message: "Titulo apagado com sucesso!"
        })
    })
})

app.listen(8080, () =>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")
})