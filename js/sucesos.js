function factorial(num) {
  if (num < 0) return NaN;
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

document.getElementById("calcular_nk").addEventListener("click", () => {
  const n = parseInt(document.getElementById("n").value);
  const k = parseInt(document.getElementById("k").value);

  if (isNaN(n) || isNaN(k)) {
    document.getElementById(
      "resultado_nk"
    ).innerHTML = `<p class="text-red-700 text-lg font-mono">Error: Ingresa valores válidos para n y k</p>`;
    return;
  }

  if (k > n) {
    document.getElementById(
      "resultado_nk"
    ).innerHTML = `<p class="text-red-700 text-lg font-mono">Error: k no puede ser mayor que n</p>`;
    return;
  }

  const resultado = factorial(n) / (factorial(k) * factorial(n - k));

  document.getElementById("resultado_nk").innerHTML = `
      <p class="text-blue-700 text-lg font-mono">
        C(${n}, ${k}) = <strong>${resultado}</strong>
      </p>
    `;
});


document.getElementById("calcular_casos").addEventListener("click", () => {
  const inputResultados = document.getElementById("operaciones");
  const inputEventos = document.getElementById("casos");

  // Obtener y limpiar el espacio muestral
  const espacio = inputResultados.value
    .split(",")
    .map(x => x.trim())
    .filter(x => x !== "");

  if (espacio.length === 0) {
    alert("Error: No ingresaste ningún resultado válido.");
    document.getElementById("resultado_casos").innerHTML =
      `<p class="text-red-700 text-lg font-mono">---</p>`;
    return;
  }

  const S = new Set(espacio);

  // Obtener y limpiar los eventos de interés
  const eventos = inputEventos.value
    .split(",")
    .map(x => x.trim())
    .filter(x => x !== "");

  if (eventos.length === 0) {
    alert("Error: No ingresaste ningún evento válido.");
    document.getElementById("resultado_casos").innerHTML =
      `<p class="text-red-700 text-lg font-mono">---</p>`;
    return;
  }

  const A = new Set(eventos);

  // Validar que todos los eventos estén en el espacio muestral
  const eventosValidos = [...A].every(e => S.has(e));
  if (!eventosValidos) {
    alert("Error: Alguno de los eventos no está en el espacio muestral.");
    document.getElementById("resultado_casos").innerHTML =
      `<p class="text-red-700 text-lg font-mono">---</p>`;
    return;
  }

  // Calcular probabilidad
  const n_A = A.size;
  const n_S = S.size;
  const prob = n_A / n_S;
  const resultado = `${n_A}/${n_S} = ${prob.toFixed(4)} (${(prob * 100).toFixed(2)}%)`;

  document.getElementById("resultado_casos").innerHTML =
    `<p class="text-blue-700 text-lg font-mono">${resultado}</p>`;
});


