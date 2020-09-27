const bicicleta = require("../Models/bicicleta");


//Renderizar la lista del listado de bicicletas
exports.bicicleta_list = function(req, res){
    res.render('bicicletas/index', {bicis: bicicleta.allBicis});
}

//Solicitud del create
exports.bicicleta_create_get = function (req,res){
    res.render('bicicletas/create');
}

//
exports.bicicleta_create_post = function (req, res){
    var bici = new bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.latitud, req.body.longitud];
    bicicleta.add(bici);

    res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = function (req, res){
    bicicleta.removeById(req.body.id);
    res.redirect('/bicicletas');
}

//Solicitud del update
exports.bicicleta_update_get = function (req,res){
    var bici = bicicleta.findById(req.params.id);

    res.render('bicicletas/update', {bici});
}

//
exports.bicicleta_update_post = function (req, res){
    var bici = bicicleta.findById(req.params.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.latitud, req.body.longitud];

    res.redirect('/bicicletas');
}

