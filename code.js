function esPalindromo(cadena) {
  cadena = cadena.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(); // erase spaces and to lowercase
  var cadenaInvertida = cadena.split("").reverse().join("");
  return cadena === cadenaInvertida;
}

function pruebaPalindromo() {
  var entrada = document.getElementById("entradaPalindromo").value;
  var resultado = document.getElementById("resultadoPalindromo");

  if (esPalindromo(entrada)) {
    resultado.innerHTML = "La cadena es un palíndromo.";
  } else {
    resultado.innerHTML = "La cadena no es un palíndromo.";
  }
}

function pruebaMayor() {
  var num1 = parseFloat(document.getElementById("entradaNumero1").value);
  var num2 = parseFloat(document.getElementById("entradaNumero2").value);
  var resultado = document.getElementById("resultadoMayor");

  if (isNaN(num1) || isNaN(num2)) {
    resultado.innerHTML = "Por favor, ingrese números válidos.";
  } else if (num1 > num2) {
    resultado.innerHTML = "El mayor número es: " + num1;
  } else if (num2 > num1) {
    resultado.innerHTML = "El mayor número es: " + num2;
  } else {
    resultado.innerHTML = "Los números son iguales.";
  }
}

function obtenerVocales(cadena) {
  var vocales = cadena.match(/[aeiouAEIOU]/g);

  if (!vocales) {
    return [];
  }

  return vocales;
}

function pruebaVocales() {
  var frase = document.getElementById("entradaVocales").value;
  var resultado = document.getElementById("resultadoVocales");
  let vocales = new Set(obtenerVocales(frase)); // parsing to set to remove duplicates

  if (vocales) {
    resultado.innerHTML =
      "Las vocales en la frase son: " + [...vocales].join(", "); // parsing to array to join
  } else {
    resultado.innerHTML = "No se encontraron vocales en la frase.";
  }
}

function pruebaContarVocales() {
  var frase = document.getElementById("entradaContarVocales").value;
  var resultado = document.getElementById("resultadoContarVocales");
  var vocales = obtenerVocales(frase);

  if (vocales) {
    var contador = {};
    for (var i = 0; i < vocales.length; i++) {
      var vocal = vocales[i].toLowerCase();
      if (contador[vocal]) {
        contador[vocal]++;
      } else {
        contador[vocal] = 1;
      }
    }
    var resultadoTexto = "Frecuencia de las vocales:\n";
    for (var vocal in contador) {
      resultadoTexto += vocal + ": " + contador[vocal] + " veces, ";
    }
    resultado.innerHTML = resultadoTexto.slice(0, -2);
  } else {
    resultado.innerHTML = "No se encontraron vocales en la frase.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var recursoInput = document.getElementById("recurso");
  var enviarButton = document.getElementById("enviar");
  var contenidosDiv = document.getElementById("contenidos");
  var estadosDiv = document.getElementById("estados");
  var cabecerasDiv = document.getElementById("cabeceras");
  var codigoDiv = document.getElementById("codigo");

  // Configuración del evento click para el botón "Mostrar contenidos"
  enviarButton.addEventListener("click", function () {
    var url = recursoInput.value;
    var xhr = new XMLHttpRequest();

    // Manejadores de eventos para la petición AJAX
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 1) {
        estadosDiv.innerHTML = "Estado: Conexión establecida...";
      } else if (xhr.readyState === 2) {
        estadosDiv.innerHTML = "Estado: Petición recibida...";
      } else if (xhr.readyState === 3) {
        estadosDiv.innerHTML = "Estado: Cargando datos...";
      } else if (xhr.readyState === 4) {
        estadosDiv.innerHTML = "Estado: Completado.";
        cabecerasDiv.innerHTML =
          "Cabeceras HTTP de la respuesta del servidor:\n" +
          xhr.getAllResponseHeaders();
        codigoDiv.innerHTML =
          "Código de estado: " + xhr.status + " " + xhr.statusText;
        contenidosDiv.innerHTML = xhr.responseText;
      }
    };

    xhr.open("GET", url, true);
    xhr.send();
  });

  // Establecer el valor por defecto del cuadro de texto
  recursoInput.value = window.location.href;
});
