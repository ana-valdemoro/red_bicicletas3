//Importamos el módulo de rutas Express
var express = require('express');
var router = express.Router();
var bicicletaController = require('../../controllers/api/bicicletaControllerAPI');
const bicicleta = require('../../Models/bicicleta');

router.get('/', bicicletaController.bicicleta_list);
router.post ('/create', bicicletaController.bicicleta_create);
router.delete('/delete', bicicletaController.bicicleta_delete);
router.put('/update/:id', bicicletaController.bicicleta_update );
module.exports = router; 
