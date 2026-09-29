function calcularPrecio() {
  const precio = parseFloat(document.getElementById("precio").value);
  const radioSi = document.getElementById("residenteSi").checked;
  const radioNo = document.getElementById("residenteNo").checked;

  const familiaNinguna = document.getElementById("familiaNinguna").checked;
  const familiaGeneral = document.getElementById("familiaGeneral").checked;
  const familiaEspecial = document.getElementById("familiaEspecial").checked;

  let descuento = 0;

  // Descuento residente
  if (radioSi == true) {
    descuento += 0.75;
  } else if (radioNo == true) {
    descuento += 0;
  } else {
    alert("Selecciona si eres residente o no.");
    return;
  }

  // Descuento familia numerosa (normativa vuelos nacionales)
  if (familiaNinguna == true) {
    descuento += 0;
  } else if (familiaGeneral == true) {
    descuento += 0.05;
  } else if (familiaEspecial == true) {
    descuento += 0.1;
  } else {
    alert("Selecciona una opción de familia numerosa.");
    return;
  }

  let precioFinal = precio * (1 - descuento);

  alert("El precio final es: " + precioFinal.toFixed(2) + " €");
}
