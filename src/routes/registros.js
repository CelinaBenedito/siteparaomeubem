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
    console.log("Entrei no router gerar tipos");
});
router.get("/gerarInstituicoes", function(req,res){
    registrosController.gerarInstituicoes(req,res);
    console.log("Entrei no router gerar instituições");
});

router.post("/atualizarSaldo", function(req,res){
    registrosController.atualizarSaldo(req,res);
    console.log("Entrei no router atualizar saldo");
});

router.post("/adicionarSaldo", function(req,res){
    registrosController.adicionarSaldo(req,res);
    console.log("Entrei no router adicionar saldo");
});

router.get("/mostrarSaldoTotal", function(req,res){
    registrosController.mostrarSaldoTotal(req,res);
    console.log("Entrei no router mostrar saldo total")
})

router.get("/mostrarTodasInstituicoes", function(req,res){
    registrosController.mostrarTodasInstituicoes(req,res);
    
})

router.get("/carregarRegistros", function(req,res){
    registrosController.carregarRegistros(req,res);
})

module.exports = router;
