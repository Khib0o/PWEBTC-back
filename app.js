const express = require('express');

const app = express();

app.use(express.json()); //intercepte toutes les requetes dont le content-type est json

//Permet de lever toutes les sécurités par défauts au niveau du front
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/api/file', (req, res, next) => {
    const stuff = [
      {filename : "ProjetPWEB",type : ".zip"},
      {filename : "Image",type : ".png"},
    ];
    res.status(200).json(stuff);
});

app.post('/api/file', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Fichier créé !'
    });
});

module.exports = app;