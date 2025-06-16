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

module.exports = router;
