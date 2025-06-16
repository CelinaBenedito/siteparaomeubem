var express = require("express");
var router = express.Router();

var registrosController = require("../controllers/registrosController");


router.get("/registrar", function (req,res){
    registrosController.registrar(req,res);
});

module.exports = router;
