
var codPostal = 28013  // codigo postal del restaurante

document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("buscarDir").addEventListener("click", function() {
        checkPostalCode();
    });

    function checkPostalCode() {
        var postalCode = document.getElementById("postalCodeInput").value;
        if (postalCode == codPostal) {
            window.location.href = "pages/a_domicilio/a-domicilio2.html";
        } else {
            window.location.href = "error.html";
        }
    };
});
