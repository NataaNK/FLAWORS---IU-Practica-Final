
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
            minTime: "13:00",
            maxTime: "23:00",
        });

        // Click en confirmar
        const btn_confirmar = document.getElementById('confirmar-reserva');
        btn_confirmar.addEventListener('click', () => {
            // Obtener hora
            const hora = document.getElementById('hora').value;
            // Obtener día
            const dia = document.getElementById('calendario').value;
            // A las 10 reservas en una misma hora -> está lleno
            console.log(cookiesOperations.getItem(hora));
            // Si no, lo añadimos a la lista de reservas
            cookiesOperations.setItem(dia, hora);
        });
    }
});



// Tratamiento de las cookies
const cookiesOperations = {
    listOfCookies: {},

    init(){
        this.listOfCookies = Object.fromEntries(document.cookie.split(";").map(co => co.split("=")));
    },

    setItem(key, value){
        this.listOfCookies[key] = value;
        let str = '${key}=${value}';
        document.cookie = str;
    },

    getItem(key) {
        return this.listOfCookies[key];
    },
    
    remove(key) {
        delete this.listOfCookies[key];
        document.cookie = '${key}=null;expires=${new Date(0)}';
    },
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
    console.log("cambiando idioma en recarga de pagina a " + idioma);
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