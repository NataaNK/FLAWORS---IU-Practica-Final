
const codPostal = 28013  // codigo postal del restaurante
const currentPage = window.location.pathname.split('/').pop();

document.addEventListener("DOMContentLoaded", function (event) {
    load_tlib();
    
    cambiarIdiomaNuevo(idiomaSeleccionado);
    

    if (currentPage == "a-domicilio-1.html") {
        document.getElementById("buscarDir").addEventListener("click", function() {
            var postalCode = document.getElementById("postalCodeInput").value;
            if (postalCode == codPostal) {
                window.location.href = "a-domicilio-2.html";
            } else {
                window.location.href = "error-a-domicilio.html";
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
            minTime: "13:00",
            maxTime: "23:00",
        });

        // Click en confirmar
        const btn_confirmar = document.getElementById('confirmar-reserva');
        btn_confirmar.addEventListener('click', confirmarReserva);
    }
});



// Variable para almacenar las reservas
// Cambiar a obtener las reservas desde el localStorage
var reservas = obtenerReservasDesdeLocalStorage();

// Función para manejar el evento de confirmar reserva
function confirmarReserva() {
    // Obtener los valores de fecha y hora seleccionados
    var fecha = document.getElementById('calendario').value;
    var hora = document.getElementById('hora').value;

    // Verificar si ya hay 10 reservas para esa fecha y hora
    if (existeLimiteReservas(fecha, hora)) {
        window.location.href = "error-reserva.html";
    } else {
        // Agregar la reserva a la lista
        reservas.push({ fecha: fecha, hora: hora });

        // Guardar las reservas en el localStorage
        guardarReservasEnLocalStorage(reservas);

        // Mensaje de éxito
        window.location.href = "reserva-exito.html";
    }
}

// Función para verificar si ya hay 10 reservas para una fecha y hora específicas
function existeLimiteReservas(fecha, hora) {
    var contadorReservas = 0;

    // Recorrer la lista de reservas y contar las que coinciden con la fecha y hora
    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].fecha === fecha && reservas[i].hora === hora) {
            contadorReservas++;
        }
    }

    // Verificar si se supera el límite de 10 reservas
    return contadorReservas >= 2;
}

// Función para obtener las reservas desde el localStorage
function obtenerReservasDesdeLocalStorage() {
    var reservasGuardadas = localStorage.getItem('reservas');
    return reservasGuardadas ? JSON.parse(reservasGuardadas) : [];
}

// Función para guardar las reservas en el localStorage
function guardarReservasEnLocalStorage(reservas) {
    localStorage.setItem('reservas', JSON.stringify(reservas));
}


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


/*TRADUCCION*/
// Recuperar el idioma almacenado en localStorage o usar el idioma predeterminado
let idiomaSeleccionado = localStorage.getItem('idioma') || "es";
// Configuración de gtranslate
window.gtranslateSettings = {
  "default_language": idiomaSeleccionado,
  "detect_browser_language": true,
  "wrapper_selector": ".gtranslate_wrapper",
  "switcher_horizontal_position": "right",
  "switcher_text_color": "#f7f7f7",
  "switcher_arrow_color": "#f2f2f2",
  "switcher_border_color": "#161616",
  "switcher_background_color": "#303030",
  "switcher_background_shadow_color": "#474747",
  "switcher_background_hover_color": "#3a3a3a",
  "dropdown_text_color": "#eaeaea",
  "dropdown_hover_color": "#748393",
  "dropdown_background_color": "#474747"
};

// Cambiar el idioma y almacenarlo en localStorage
function cambiarIdiomaNuevo(idioma) {
  localStorage.setItem('idioma', idioma);
  // Actualizar la traducción después de cambiar el idioma
  doGTranslate('es|' + idioma);
}

function load_tlib() {
    if (!window.gt_translate_script) {
      window.gt_translate_script = document.createElement("script");
      gt_translate_script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2";
      document.body.appendChild(gt_translate_script);
    }
  }