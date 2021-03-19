const mongoose = require('mongoose');

const Artigo = new mongoose.Schema({
    titulo: {
        type: String,
        required: true //obrigatorio
    },
    conteudo: {
        type: String,
        required: true
    },
    ano:{
        type: String,
        required:true
    },
    imagem:{
        type: String,
        required:true
    },
    gif :{
        type: String,
        required:false
    }
    
},
    {
        timestamps: true,
    }
);
mongoose.model('artigo', Artigo);