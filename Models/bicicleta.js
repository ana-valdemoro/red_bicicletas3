var bicicleta = function(id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

//Redefinición del método toString, para visualizar por pantalla la bicicleta.
bicicleta.prototype.toString = function (){
    return 'id: '+ this.id + " | color: "+ this.color;
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
                bicicleta.allBicis.splice(1,1);
                break;
            }
        }
    }    
}

var a = new bicicleta(1, 'rojo', 'urbana', [-34.60124124, -58.3861497]);
var b = new bicicleta(2, 'blanca', 'urbana', [-34.596932, -58.3808287]);

bicicleta.add(a);
bicicleta.add(b);
module.exports = bicicleta;