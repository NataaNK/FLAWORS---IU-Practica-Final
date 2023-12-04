
var codPostal = 28013  // codigo postal del restaurante

document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("buscarDir").addEventListener("click", function() {
        buscarDireccion();
    });

    function checkPostalCode() {
        var postalCode = document.getElementById("postalCodeInput").value;
        if (postalCode == codPostal) {
            window.location.href = "/a-domicilio2.html";
        } else {
            window.location.href = "/error.html";
        }
    };
    /*

    function buscarDireccion() {
        var direccion = document.getElementById("direccionInput").value;

        // Crear un objeto de geocodificación
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': direccion }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitud = results[0].geometry.location.lat();
                var longitud = results[0].geometry.location.lng();

                // Calcular la distancia en kilómetros
                var distancia = calcularDistancia(latitud, longitud, latReferencia, lonReferencia);

                // Redireccionar según la distancia
                if (distancia > 20) {
                    window.location.href = "/error.html";
                } else {
                    window.location.href = "/a-domicilio2.html";
                }
            } else {
                alert('Error al geocodificar la dirección: ' + status);
            }
        });
    }

    function calcularDistancia(lat1, lon1, lat2, lon2) {
        // Fórmula de Haversine para calcular la distancia entre dos puntos en la tierra
        var R = 6371; // Radio de la Tierra en kilómetros
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distancia = R * c; // Distancia en kilómetros
        return distancia;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }*/
});
