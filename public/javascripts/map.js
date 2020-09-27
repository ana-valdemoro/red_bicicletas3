var mymap = L.map('main_map').setView([28.1013666, -15.4811036], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'

}).addTo(mymap);

L.marker([28.094196, -15.474954]).addTo(mymap);