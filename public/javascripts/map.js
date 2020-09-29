var mymap = L.map('main_map').setView([28.1013666, -15.4811036], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'

}).addTo(mymap);



$.ajax({
    dataType : "json",
    url: "api/bicicletas",
    success: function (result){
        console.log(result);
        result.bicicletas.forEach( bici => {
            L.marker(bici.ubicacion, {title: bici.id }).addTo(mymap);
        });
    }
})