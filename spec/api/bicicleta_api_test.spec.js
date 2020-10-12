var bicicleta = require('../../Models/bicicleta');
var request = require('request');
var server = require('../../bin/www');


describe('Bicicleta Api', () =>{
    
    beforeEach(()=>{ bicicleta.allBicis = []; });

    describe('GET bicicletas /', () => {
        it('Status 200', () =>{
            expect(bicicleta.allBicis.length).toBe(0);

            var a = new bicicleta(1, 'negro', 'urbana', [28.100174, -15.478464]);
            bicicleta.add(a);

            request.get('http://localhost:5000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });

        });
    });

    describe('POST bicicletas /create', () => {
        it('Status 200', (done) =>{
            expect(bicicleta.allBicis.length).toBe(0);
            var header = {'content-type': 'application/json'};
            var aBici = '{ "id": 10, "color": "rojo", "modelo":"urbana", "latitud": 28.100174,"longitud": -15.478464 }' ;
            request.post({
                headers: header,
                url: 'http://localhost:5000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(bicicleta.findById(10).color).toBe('rojo');
                done();
            });
        });
    });

    describe('DELETE bicicletas /delete', () => {
        it('Status 204', (done) =>{
            expect(bicicleta.allBicis.length).toBe(0);
            var header = {'content-type': 'application/json'};
            var a = new bicicleta(1, 'negro', 'urbana', [28.100174, -15.478464]);
            bicicleta.add(a);

            request.delete({
                headers: header,
                body: `{"id": ${a.id}}`,
                url: 'http://localhost:5000/api/bicicletas/delete'
            }, function(error, response, body){
                expect(response.statusCode).toBe(204);
                expect(bicicleta.allBicis.length).toBe(0);
                expect( function() {bicicleta.findById(1)} ).toThrow();
                done();
            });
          

        });
    });

    describe('PUT bicicletas /update/:id', () => {
        it('Status 200', (done) =>{
            expect(bicicleta.allBicis.length).toBe(0);
            var header = {'content-type': 'application/json'};
            var aBici = new bicicleta(10, 'negro', 'urbana', [28.100174, -15.478464]);
            var biciChanges = '{"color": "violeta", "modelo":"Roxy", "latitud": 7.99,"longitud": 55.55 }' ;
            bicicleta.add(aBici);
           // console.log(bicicleta.allBicis);

            request.put({
                headers: header,
                url: `http://localhost:5000/api/bicicletas/update/10`,
                body: biciChanges
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(bicicleta.findById(10).color).toBe('violeta');
                done();
            });
        });
    });

    


});    