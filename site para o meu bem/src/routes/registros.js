var express = require("express");
var router = express.Router();

var registrosController = require("../controllers/registrosController");


router.post("/registrar", function (req,res){
    registrosController.registrar(req,res);
    console.log("Estou no router registros");
});

router.post("/adicionarTipo", function(req,res){
    registrosController.adicionarTipo(req,res);
    console.log("Estou no router Adicionar tipos");
});

router.get("/gerarTipos", function(req,res){
    registrosController.gerarTipos(req,res);
    console.log("Entrei no router gerar tipos")
})

module.exports = router;
