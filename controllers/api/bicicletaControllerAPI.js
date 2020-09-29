var bicicleta = require('../../Models/bicicleta') ;

exports.bicicleta_list = function (req, res){

    //Devolvemos el estado 200 junto con un objeto json
    res.status(200).json({
        bicicletas: bicicleta.allBicis
    });
}

exports.bicicleta_create = function (req, res){

    var bici = new bicicleta( req.body.id, req.body.color, req.body.modelo);
    //Ubicacion guardada según instancia
    bici.ubicacion = [req.body.latitud, req.body.longitud];

    bicicleta.add(bici);
    res.status(200).json({
        bicicleta: bici
    });

}

exports.bicicleta_delete = function (req, res){
    bicicleta.removeById(req.body.id);
    //Devolvemos el body vacio
    res.status(204).send();

}

exports.bicicleta_update = function (req, res){
    var bici = bicicleta.findById(req.body.id);
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.latitud, req.body.longitud];

    res.status(200).json({
        bicicleta:bici
    });

}