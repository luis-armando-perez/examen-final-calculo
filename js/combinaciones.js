function factorial(num) {
    if (num < 0) return NaN;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
}

document.getElementById("calcularNR").addEventListener("click", () => {
    const n = document.getElementById("nUno").value;
    const r = document.getElementById("rUno").value
  
    const resultado = n **r;
    document.getElementById("resultadoUno").innerHTML = `<p class="text-blue-700 text-lg font-mono">${resultado} </p>`;
});

document.getElementById("calcularDos").addEventListener("click", () => {
    const n = document.getElementById("nDos").value;
    const r = document.getElementById("rDos").value
  
    const resultado = factorial(n) / (factorial(r) *factorial(n - r))
    document.getElementById("resultadoDos").innerHTML = `<p class="text-blue-700 text-lg font-mono">${resultado} </p>`;
});

