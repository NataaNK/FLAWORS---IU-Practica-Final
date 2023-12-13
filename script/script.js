
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

    if (currentPage == "index.html"){
        // Menú de hamburguesa
        const dropdownIcon = document.querySelector('.menu_de_hamburguesa .title');
        const dropdownOptions = document.querySelectorAll('.menu_de_hamburguesa .option');

        // Vincula listeners al menú de hamburguesa
        dropdownIcon.addEventListener('click', toggleMenuDisplay);
        dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected)); 
        const btn_last_week = document.querySelector("#btn-semana-pasada");
        const btn_next_week = document.querySelector("#btn-semana-siguiente");

        btn_last_week.addEventListener("click", showPreviousWeek);
        btn_next_week.addEventListener("click", showNextWeek);

        const btn_actual_week = document.querySelectorAll(".boton_volver_semana_actual");
        btn_actual_week.forEach(btn => btn.addEventListener("click", showActualWeek));
    }
    
    if (currentPage == "reserva-1.html") {
        flatpickr("#calendario", {
            dateFormat: "Y-m-d",
            minDate: "today",
            "locale": "es",
        });

        flatpickr("#hora", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            minuteIncrement: 15,
        });
    }
});


// Desplegar menu de hamburguesa
function toggleClass(elem,className){
	if (elem.className.indexOf(className) !== -1){
		elem.className = elem.className.replace(className,'');    
	}
	else{
		elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
	}
	return elem;
}

function toggleMenuDisplay(e){
	const dropdown = e.currentTarget.parentNode;
	const menu = dropdown.querySelector('.opciones_menu');

	toggleClass(menu,'hide');
}

function handleOptionSelected(e){
	toggleClass(e.target.parentNode, 'hide');	

    // Simulamos un click en el menú de ordenador para poder
    // reutilizar el comportamiento
    if(e.target.textContent.trim() == "Pedido"){
        btn_domicilio.click();
    }
    else if(e.target.textContent.trim() == "Reservar"){
        btn_reserva.click();
    }
}

function showPreviousWeek(e) {
    var previousWeek = document.getElementById("previous-week");
    previousWeek.style.display = "block";
    var actualWeek = document.getElementById("actual-week");
    actualWeek.style.display = "none";
}

function showNextWeek(e) {
    var actualWeek = document.getElementById("actual-week");
    actualWeek.style.display = "none";
    var nextWeek = document.getElementById("next-week");
    nextWeek.style.display = "block";
}

function showActualWeek(e) {
    var previousWeek = document.getElementById("previous-week");
    previousWeek.style.display = "none";
    var nextWeek = document.getElementById("next-week");
    nextWeek.style.display = "none";
    var actualWeek = document.getElementById("actual-week");
    actualWeek.style.display = "block";
}