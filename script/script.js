
const codPostal = 28013  // codigo postal del restaurante

const currentPage = window.location.pathname.split('/').pop();

document.addEventListener("DOMContentLoaded", function (event) {


    if (currentPage == "a-domicilio-1.html") {
        document.getElementById("buscarDir").addEventListener("click", function() {
            var postalCode = document.getElementById("postalCodeInput").value;
            if (postalCode == codPostal) {
                window.location.href = "a-domicilio-2.html";
            } else {
                window.location.href = "error.html";
            }
        
        });
    }

    if (currentPage == "a-domicilio-2.html") {

        let precioUnitario = 12.99;
        let cantidad = 0;
        let precioTotal = 0;

        const increment = document.getElementById("+menu");
        const decrement = document.getElementById("-menu");
        const cantidadInput = document.getElementById("cantidad_menu");
        const precio = document.querySelector(".precio");
        const totalCompra = document.querySelector(".total-a-pagar");

        function guardarPedido() {
            totalCompra.textContent = `${precioTotal.toFixed(2)}`;
            const orderinfo ={
                cantidad,
                totalCompra,
            }
            localStorage.setItem('orderinfo', JSON.stringify(orderinfo));
        }

        function actualizarCantidadYPrecio() {
            precioTotal = precioUnitario * cantidad;
            precio.textContent = `${precioTotal.toFixed(2)}`;
            guardarPedido();
        }

        increment.addEventListener("click", () => {
            cantidad++;
            cantidadInput.textContent = cantidad;
            actualizarCantidadYPrecio();
        });

        decrement.addEventListener("click", () => {
            if (cantidad > 0) {
                cantidad--;
                cantidadInput.textContent = cantidad;
                actualizarCantidadYPrecio();
            }
        });
    }

});
