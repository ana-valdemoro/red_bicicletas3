var mongoose = require('mongoose');
var bicicleta = require('../../Models/bicicleta');

describe('Testing Bicicletas', function(){
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true});

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error: '));
        db.once('open', function(){
            console.log('We are connected to test database!');
            done();
        });
    });

    //Borramos toda la coleccion del modelo de bicicleta. 
    afterEach(function(done){
        bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err);
            mongoose.disconnect(err);
            done();
        });
    });

    describe('bicicleta.createInstance', () =>{
        it('crea una instancia de bicicleta', () =>{
            var bici = bicicleta.createInstance(1,"verde", "urbana", [28.100174, -15.478464]);
            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(28.100174);
            expect(bici.ubicacion[1]).toEqual(-15.478464);
        });
    });
    describe ('Bicicleta.allBicis', () =>{
        it('Comienza vacio', (done) =>{
            bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            }); 
        });
     });
     describe ('Bicicleta.add', () =>{
        it('Agrega una sola bici', (done) =>{
            var aBici = new bicicleta({code:1, color: "verde", modelo:"urbano"});
            bicicleta.add(aBici, function(err, newBici){
                if(err) console.log(err);
                bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                })
            });
           
        });
     });

     describe('Bicicleta.findByCode', () =>{
         it('Debe devolver la bici con code 1', (done)=>{
             bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);

                var aBici = new bicicleta({code:1, color: "verde", modelo:"urbana"});
                bicicleta.add(aBici, function(err, newBici){
                    if(err) console.log(err);

                    var aBici2 = new bicicleta({code:2, color: "roja", modelo:"urbana"}); 
                    bicicleta.add(aBici2, function(err, newBici){
                        if(err) console.log(err);
                        bicicleta.findByCode(1, function(err, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);
                            
                            done();
                        });

                   
                    });
                });
             });
         });
     });

     describe('Bicicleta.RemoveByCode', () =>{
        it('Debe devolver ok a 1', (done)=>{
            bicicleta.allBicis(function(err, bicis){
               expect(bicis.length).toBe(0);

               var aBici = new bicicleta({code:1, color: "verde", modelo:"urbana"});
               bicicleta.add(aBici, function(err, newBici){
                   if(err) console.log(err);

                   var aBici2 = new bicicleta({code:2, color: "roja", modelo:"urbana"}); 
                   bicicleta.add(aBici2, function(err, newBici){
                       if(err) console.log(err);
                       bicicleta.removeByCode(1, function(err, res){
                           expect(res.deletedCount).toBe(1);
                           expect(res.ok).toBe(1);
                           
                           done();
                       });

                  
                   });
               });
            });
        });
    });     

});

// beforeEach(()=>{bicicleta.allBicis = []; });

// describe ('Bicicleta.allBicis', () =>{
//     it('Comienza vacio', () =>{
//         expect(bicicleta.allBicis.length).toBe(0);
//     });
// });

// describe('Bicicleta.add', () =>{
//     it('Agregamos una bici', () =>{
//         expect(bicicleta.allBicis.length).toBe(0);
//         var a = new bicicleta(1, 'rojo', 'urbana', [28.100174, -15.478464]);
//         bicicleta.add(a);
//         expect(bicicleta.allBicis.length).toBe(1);
//         expect(bicicleta.allBicis[0]).toBe(a);
//     });
// });

// describe('Bicicleta.findById',() => {
//     it('Debe devolver la bici con id 1', () =>{
//         expect(bicicleta.allBicis.length).toBe(0);
//         var aBici = new bicicleta(1, 'verde', 'urbana');
//         var aBici2 = new bicicleta(2, 'rojo', 'montaña');
//         bicicleta.add(aBici);
//         bicicleta.add(aBici2);

//         var targetBici = bicicleta.findById(1);
//         expect(targetBici.id).toBe(1);
//         expect(targetBici.color).toBe(aBici.color);
//         expect(targetBici.modelo).toBe(aBici.modelo);
//     });
// });

// describe('Bicicleta.removeById', () =>{
//     it('Debe devolver un error, cuando la busquemos', () =>{
//         expect(bicicleta.allBicis.length).toBe(0);
//         var aBici = new bicicleta(1, 'verde', 'urbana');
//         var aBici2 = new bicicleta(2, 'rojo', 'montaña');
//         bicicleta.add(aBici);
//         bicicleta.add(aBici2);

//         bicicleta.removeById(2);
//         expect(bicicleta.allBicis.length).toBe(1);
//         expect( function() {bicicleta.findById(2)} ).toThrow();
        
//     });

// });