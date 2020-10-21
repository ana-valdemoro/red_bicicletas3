var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true}
    }
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion:ubicacion
    });
};

bicicletaSchema.methods.toString = function() {
    return 'code: '+ this.code + " | color: "+ this.color;
};
bicicletaSchema.statics.allBicis = function(cb){
    return this.find({}, cb);
};

bicicletaSchema.statics.add = function(aBici, cb){
    this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = function(aCode, cb){
    return this.findOne({code: aCode}, cb);
};

bicicletaSchema.statics.removeByCode = function(aCode, cb){
    return this.deleteOne({code: aCode}, cb);
};
//Definidmos el modelo
module.exports = mongoose.model('Bicicleta', bicicletaSchema);

/*var bicicleta = function(id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}


//Funcionalidades que simulan a la BD.
bicicleta.allBicis = [];
bicicleta.add = function (aBici){
    bicicleta.allBicis.push(aBici);
}

bicicleta.findById = function(id){
    var aBici = bicicleta.allBicis.find(x => x.id == id);
    if(aBici){
        return aBici;
    }else{
        throw new Error(`No existe una bicicleta con el id ${id}`); 
    }
}

bicicleta.removeById = function(id){
    if(bicicleta.findById(id)){
        for (var i = 0; i < bicicleta.allBicis.length; i++){
            if(bicicleta.allBicis[i].id == id){
                bicicleta.allBicis.splice(i,1);
                break;
            }
        }
    }    
}

var a = new bicicleta(1, 'rojo', 'urbana', [28.100174, -15.478464]);
var b = new bicicleta(2, 'blanca', 'urbana', [28.094196, -15.474954]);

bicicleta.add(a);
bicicleta.add(b);
module.exports = bicicleta;*/