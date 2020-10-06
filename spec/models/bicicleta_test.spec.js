var bicicleta = require('../../Models/bicicleta');

beforeEach(()=>{bicicleta.allBicis = []; });

describe ('Bicicleta.allBicis', () =>{
    it('Comienza vacio', () =>{
        expect(bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () =>{
    it('Agregamos una bici', () =>{
        expect(bicicleta.allBicis.length).toBe(0);
        var a = new bicicleta(1, 'rojo', 'urbana', [28.100174, -15.478464]);
        bicicleta.add(a);
        expect(bicicleta.allBicis.length).toBe(1);
        expect(bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById',() => {
    it('Debe devolver la bici con id 1', () =>{
        expect(bicicleta.allBicis.length).toBe(0);
        var aBici = new bicicleta(1, 'verde', 'urbana');
        var aBici2 = new bicicleta(2, 'rojo', 'montaña');
        bicicleta.add(aBici);
        bicicleta.add(aBici2);

        var targetBici = bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    });
});

describe('Bicicleta.removeById', () =>{
    it('Debe devolver un error, cuando la busquemos', () =>{
        expect(bicicleta.allBicis.length).toBe(0);
        var aBici = new bicicleta(1, 'verde', 'urbana');
        var aBici2 = new bicicleta(2, 'rojo', 'montaña');
        bicicleta.add(aBici);
        bicicleta.add(aBici2);

        bicicleta.removeById(2);
        expect(bicicleta.allBicis.length).toBe(1);
        expect( function() {bicicleta.findById(2)} ).toThrow();
        
    });

});