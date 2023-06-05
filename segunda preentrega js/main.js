var simulador = {
  datosIngresados: [],
  tasaInteres: 0,

  agregarDatosIngresados: function(monto, tiempo) {
    this.datosIngresados.push({ monto: monto, tiempo: tiempo });
  },

  agregarTasaInteres: function(tasa) {
    this.tasaInteres = tasa;
  },

  calcularInteres: function() {
    return this.datosIngresados.map(function(datos) {
      var interesesGenerados = datos.monto * (this.tasaInteres / 100) * (datos.tiempo / 365);
      return {
        monto: datos.monto,
        tiempo: datos.tiempo,
        intereses: interesesGenerados.toFixed(2)
      };
    }, this);
  },

  simularPlazoFijo: function() {
    var interesesGenerados = this.calcularInteres();

    var mensaje = "Resultados del simulador:\n\n";

    interesesGenerados.forEach(function(resultado) {
      mensaje += "Monto invertido: $" + resultado.monto + "\n";
      mensaje += "Tiempo en días: " + resultado.tiempo + "\n";
      mensaje += "Intereses generados: $" + resultado.intereses + "\n\n";
    });

    alert(mensaje);
  }
};

// Función para solicitar y agregar los datos
function agregarDatos() {
  var monto = parseFloat(prompt("Ingrese el monto a invertir:"));
  var tiempo = parseInt(prompt("Ingrese el tiempo en días:"));

  simulador.agregarDatosIngresados(monto, tiempo);

  var opcion = prompt("¿Desea agregar otro cálculo? (S/N)").toLowerCase();
  if (opcion === "s") {
    agregarDatos();
  } else {
    // Solicitar el valor de la tasa de interés
    simulador.agregarTasaInteres(parseFloat(prompt("Ingrese la tasa de interés (%):")));

    // Simular el plazo fijo y mostrar los resultados
    simulador.simularPlazoFijo();
  }
}

agregarDatos();
