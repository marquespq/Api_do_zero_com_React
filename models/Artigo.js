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
    autor:{
        type: String,
        required:true
    }
},
    {
        timestamps: true,
    }
);
mongoose.model('artigo', Artigo);