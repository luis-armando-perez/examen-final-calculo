
function factorial(num) {
  if (num < 0) return NaN;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
}

document.getElementById("btnCalcular_npr").addEventListener("click", () => {
  const n = document.getElementById("n").value;
  const r = document.getElementById("r").value;

  if (isNaN(n) || isNaN(r)) {
    document.getElementById("btnCalcular_npr").innerHTML = `<p class="text-red-700 text-lg font-mono">Error: n y r deben ser números</p>`;
    return;
  }

  if (r > n) {
    document.getElementById("calcular_nPr").innerHTML = `<p class="text-red-700 text-lg font-mono">Error: r no puede ser mayor que n</p>`;
    return;
  } else {
    const resultado = factorial(n) / factorial(n - r);
    document.getElementById("resultado_nPr").innerHTML = `<p class="text-blue-700 text-lg font-mono">${resultado} </p>`;
  } 
});

document.getElementById("btnCalcular_nr").addEventListener("click", () => {
    const n = document.getElementById("n_repe").value;
    const r = document.getElementById("r_repe").value;
    if (isNaN(n) || isNaN(r)) {
        document.getElementById("btnCalcular_nr").innerHTML = `<p class="text-red-700 text-lg font-mono">Error: n y r deben ser números</p>`;
        return;
    }

    if (r > n) {
        document.getElementById("btnCalcular_nr").innerHTML = `<p class="text-red-700 text-lg font-mono">Error: r no puede ser mayor que n</p>`;
        return;
    } else {
        const resultado = n ** r;
        document.getElementById("resultado_nr").innerHTML = `<p class="text-blue-700 text-lg font-mono">${resultado} </p>`;
    } 
});

document.getElementById("btnCalcular_fact").addEventListener("click", () => {
    const n = document.getElementById("n_fact").value;
    if (isNaN(n)) {
        document.getElementById("btnCalcular_fact").innerHTML = `<p class="text-red-700 text-lg font-mono">Error: n debe ser un número</p>`;
        return;
    } else {
        const resultado = factorial(n);
        document.getElementById("resultado_fact").innerHTML = `<p class="text-blue-700 text-lg font-mono">${resultado} </p>`;
    }
});

document.getElementById("btnCalcular_repe").addEventListener("click", () => {
    const elementos = document.getElementById("elementos_repe").value.split(",").map(x => x.trim()).filter(x => x !== "");
    if (elementos.length === 0) {
      document.getElementById("resultadoPermutaciones").innerHTML = `<span class="text-red-500">Error: Ingresa al menos un elemento.</span>`;
      return;
    }

    const n = elementos.length;

    const repeticiones = {};
     elementos.forEach(e => {
      repeticiones[e] = (repeticiones[e] || 0) + 1;
    });

    // Calcular el divisor (producto de los factoriales de las repeticiones)
    let divisor = 1;
    Object.values(repeticiones).forEach(r => {
      divisor *= factorial(r);
    });

    // Fórmula: n! / (r1! * r2! * ...)
    const resultado = factorial(n) / divisor;

    document.getElementById("resultado_repe").innerHTML = `<p class="text-blue-700 text-lg font-mono">${resultado} </p>`;

});



