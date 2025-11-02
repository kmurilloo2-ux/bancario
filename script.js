// Arreglo para guardar todas las transacciones
let movimientos = [];
// Variables para los totales
let totalDepositos = 0;
let totalRetiros = 0;
let saldo = 0;

function realizarOperacion() {
  // Tomo la operación que eligió el usuario y el monto que escribió
  const operacion = document.getElementById("operacion").value;
  const montoInput = document.getElementById("monto");
  const monto = parseFloat(montoInput.value);

  // Valido que el monto sea un número válido y mayor a 0
  if (isNaN(monto) || monto <= 0) {
    alert("Por favor, ingresa un monto válido.");
    return;
  }

  // Si es retiro, verifico que haya saldo suficiente
  if (operacion === "Retiro" && monto > saldo) {
    alert("Saldo insuficiente. Operación no realizada.");
    return;
  }

  // Guardo el movimiento
  movimientos.push({ tipo: operacion, monto });

  // Actualizo los totales según la operación
  if (operacion === "Deposito") {
    totalDepositos += monto;
    saldo += monto;
  } else {
    totalRetiros += monto;
    saldo -= monto;
  }

  actualizarPantalla();
  montoInput.value = "";
}

function actualizarPantalla() {
  // Muestro los totales con 2 decimales
  document.getElementById("totalDepositos").textContent = totalDepositos.toFixed(2);
  document.getElementById("totalRetiros").textContent = totalRetiros.toFixed(2);
  document.getElementById("saldo").textContent = saldo.toFixed(2);

  const lista = document.getElementById("movimientos");
  lista.innerHTML = "";

  // Recorro cada movimiento y lo muestro
  for (let i = 0; i < movimientos.length; i++) {
    const mov = movimientos[i];
    const div = document.createElement("div");
    div.classList.add(mov.tipo.toLowerCase());
    div.textContent = `${mov.tipo}: ${mov.monto.toFixed(2)}`;
    lista.appendChild(div);
  }
}
