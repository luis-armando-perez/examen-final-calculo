let ejemplosUniforme = null;

// Se carga solo una vez
fetch("data/ejemplos.json")
  .then((res) => res.json())
  .then((data) => {
    ejemplosUniforme = data;
    console.log("✅ Ejemplos cargados para Uniforme");
  })
  .catch((err) => console.error("Error cargando ejemplos:", err));

let ejemplosNormal = null;

fetch("data/ejemplos.json")
  .then(res => res.json())
  .then(data => {
    ejemplosNormal = data;
    console.log("✅ Ejemplos cargados para Normal");
  })
  .catch(err => console.error("Error cargando ejemplos (Normal):", err));

  let ejemplosExponencial = null;

fetch("data/ejemplos.json")
  .then(res => res.json())
  .then(data => {
    ejemplosExponencial = data;
    console.log("✅ Ejemplos cargados para Exponencial");
  })
  .catch(err => console.error("Error cargando ejemplos:", err));

let ejemplosLogNormal = null; // Cargar los ejemplos solo una vez

fetch("data/ejemplos.json")
  .then(res => res.json())
  .then(data => {
    ejemplosLogNormal = data;
    console.log("✅ Ejemplos cargados para Log-Normal");
  })
  .catch(err => console.error("Error cargando ejemplos Log-Normal:", err));
let ejemplosGamma = null;

// ============================
// Cargar ejemplos solo una vez
// ============================
fetch("data/ejemplos.json")
  .then(res => res.json())
  .then(data => {
    ejemplosGamma = data;
    console.log("✅ Ejemplos cargados para Gamma");
  })
  .catch(err => console.error("Error cargando ejemplos Gamma:", err));
// =====================================
// Utilidades matemáticas
// =====================================

function normalPDF(x, mu, sigma) {
  const c = 1 / (sigma * Math.sqrt(2 * Math.PI));
  return c * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
}

function normalCDF(x, mu, sigma) {
  return 0.5 * (1 + erf((x - mu) / (sigma * Math.sqrt(2))));
}

// Aproximación erf
function erf(z) {
  const t = 1 / (1 + 0.5 * Math.abs(z));
  const poly =
    t *
    Math.exp(
      -z * z -
        1.26551223 +
        t *
          (1.00002368 +
            t *
              (0.37409196 +
                t *
                  (0.09678418 +
                    t *
                      (-0.18628806 +
                        t *
                          (0.27886807 +
                            t *
                              (-1.13520398 +
                                t *
                                  (1.48851587 +
                                    t * (-0.82215223 + t * 0.17087277))))))))
    );
  return z >= 0 ? 1 - poly : poly - 1;
}

let normalChart = null;

<<<<<<< HEAD
// ===============================
// Mostrar/ocultar inputs según tipo
// ===============================
function updateNormalInputsVisibility() {
  const tipo = document.getElementById("normal-input-type").value;
  const xGroup = document.getElementById("normal-input-x-group");
  const rangeGroup = document.getElementById("normal-input-range-group");

  if (tipo === "between") {
    xGroup.classList.add("hidden");
    rangeGroup.classList.remove("hidden");
  } else {
    xGroup.classList.remove("hidden");
    rangeGroup.classList.add("hidden");
  }
}

document.getElementById("normal-input-type").addEventListener("change", updateNormalInputsVisibility);

// ===============================
// Control principal
// ===============================
function controlNormal(accion) {
=======
// =====================================
// Función única: cálculo + gráfico
// =====================================

function controlNormal(accion) {

>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e
  const modalInfo = document.getElementById("modal-normal-info");
  const modalGraph = document.getElementById("modal-normal-graph");

  if (accion === "info") {
    modalInfo.classList.remove("hidden");
    return;
  }

  if (accion === "cerrar-info") {
    modalInfo.classList.add("hidden");
    return;
  }

  if (accion === "cerrar-grafico") {
    modalGraph.classList.add("hidden");
    return;
  }

  // =====================
  // Cargar ejemplo
  // =====================
  if (accion === "ejemplo") {
    const select = document.getElementById("normal-ejemplos-select");
    const key = select.value;

    if (!ejemplosNormal) {
      alert("Espera… aún no se cargaron los ejemplos.");
      return;
    }

    const ej = ejemplosNormal[key];
    if (!ej) return;

    document.getElementById("normal-input-mu").value = ej.mu;
    document.getElementById("normal-input-sigma").value = ej.sigma;
    document.getElementById("normal-input-type").value = ej.type;

    document.getElementById("normal-input-x").value = ej.x || "";
    document.getElementById("normal-input-a").value = ej.a || "";
    document.getElementById("normal-input-b").value = ej.b || "";

<<<<<<< HEAD
    //  Forzar actualización de inputs visibles
    document.getElementById("normal-input-type").dispatchEvent(new Event("change"));

=======
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e
    console.log("✅ Ejemplo Normal cargado:", ej.desc);
    return;
  }

  // =====================
  // Calcular + Graficar
  // =====================
  if (accion === "calcular") {
    calcularYGraficarNormal();
    return;
  }
}

<<<<<<< HEAD
// ===============================
// Función de cálculo + gráfico
// ===============================
function calcularYGraficarNormal() {
  // Abrir modal del gráfico (si quieres que solo el botón gráfico lo abra, quita esta línea)
  document.getElementById("modal-normal-graph").classList.remove("hidden");

=======
function calcularYGraficarNormal() {
  
  // Abrir modal del gráfico
  document.getElementById("modal-normal-graph").classList.remove("hidden");
  
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e
  const mu = parseFloat(document.getElementById("normal-input-mu").value);
  const sigma = parseFloat(document.getElementById("normal-input-sigma").value);
  const tipo = document.getElementById("normal-input-type").value;

  const x = parseFloat(document.getElementById("normal-input-x").value);
  const a = parseFloat(document.getElementById("normal-input-a").value);
  const b = parseFloat(document.getElementById("normal-input-b").value);

  let resultado = null;

  // ========== Cálculo ==========
  if (tipo === "less") resultado = normalCDF(x, mu, sigma);
  if (tipo === "greater") resultado = 1 - normalCDF(x, mu, sigma);
<<<<<<< HEAD
  if (tipo === "between") resultado = normalCDF(b, mu, sigma) - normalCDF(a, mu, sigma);
=======
  if (tipo === "between")
    resultado = normalCDF(b, mu, sigma) - normalCDF(a, mu, sigma);
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e
  if (tipo === "density") resultado = normalPDF(x, mu, sigma);

  // Mostrar resultados
  document.getElementById("normal-result-prob").value = resultado.toFixed(6);
  document.getElementById("normal-result-ex").textContent = mu;
<<<<<<< HEAD
  document.getElementById("normal-result-varx").textContent = (sigma * sigma).toFixed(4);
=======
  document.getElementById("normal-result-varx").textContent = (
    sigma * sigma
  ).toFixed(4);
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e

  // ========== Datos para gráfico ==========
  const xs = [];
  const ys = [];
  const ysShade = [];

  const minX = mu - 4 * sigma;
  const maxX = mu + 4 * sigma;
  const steps = 250;
  const inc = (maxX - minX) / steps;

  for (let v = minX; v <= maxX; v += inc) {
    const pdf = normalPDF(v, mu, sigma);

    xs.push(v);
    ys.push(pdf);

    let inside = false;
<<<<<<< HEAD
    if (tipo === "less" && v <= x) inside = true;
    if (tipo === "greater" && v >= x) inside = true;
    if (tipo === "between" && v >= a && v <= b) inside = true;
=======

    if (tipo === "less" && v <= x) inside = true;
    if (tipo === "greater" && v >= x) inside = true;
    if (tipo === "between" && v >= a && v <= b) inside = true;
    if (tipo === "density") inside = false;
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e

    ysShade.push(inside ? pdf : null);
  }

  // ========== Gráfico ==========
  const ctx = document.getElementById("normal-chart-canvas");

  if (normalChart) normalChart.destroy();

  normalChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xs,
      datasets: [
        {
          data: ys,
          borderColor: "red",
          borderWidth: 2,
          fill: false,
          tension: 0.08,
        },
        {
          data: ysShade,
          backgroundColor: "rgba(30,150,255,0.30)",
          borderColor: "rgba(0,0,255,0.2)",
          fill: true,
          pointRadius: 0,
          tension: 0.08,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { title: { display: true, text: "x" } },
        y: { title: { display: true, text: "f(x)" } },
      },
    },
  });
<<<<<<< HEAD
}

// ===============================
// Listeners de botones
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("normal-calc-btn").addEventListener("click", () => {
    controlNormal("calcular");
  });

  document.getElementById("normal-graph-btn").addEventListener("click", () => {
    controlNormal("calcular"); 
  });

  document.getElementById("normal-info-btn").addEventListener("click", () => {
    controlNormal("info");
  });

  document.getElementById("modal-normal-info-close").addEventListener("click", () => {
    controlNormal("cerrar-info");
  });

  document.getElementById("modal-normal-graph-close").addEventListener("click", () => {
    controlNormal("cerrar-grafico");
  });

  // Inicializar visibilidad de inputs
  updateNormalInputsVisibility();
});


=======

}

>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e




let uniformeChart = null;
<<<<<<< HEAD

// -------------------------------
// Mostrar/ocultar inputs según tipo
// -------------------------------
document.getElementById("uniforme-input-type").addEventListener("change", function () {
  const tipo = this.value;
  const xGroup = document.getElementById("uniforme-input-x-group");
  const rangeGroup = document.getElementById("uniforme-input-range-group");

  if (tipo === "between") {
    xGroup.classList.add("hidden");      
    rangeGroup.classList.remove("hidden"); 
  } else {
    xGroup.classList.remove("hidden");   
    rangeGroup.classList.add("hidden");  
  }
});

=======
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e
function controlUniforme(accion) {
  const modalInfo = document.getElementById("modal-uniforme-info");
  const modalGraph = document.getElementById("modal-uniforme-graph");

  // -------------------------------
  // ACCIONES DE MODALES
  // -------------------------------
  if (accion === "info") {
    modalInfo.classList.remove("hidden");
    return;
  }

  if (accion === "cerrar-info") {
    modalInfo.classList.add("hidden");
    return;
  }

  if (accion === "abrir-grafico") {
    modalGraph.classList.remove("hidden");
<<<<<<< HEAD
=======
    // No calculamos todavía, solo se abre el modal.
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e
    return;
  }

  if (accion === "cerrar-grafico") {
    modalGraph.classList.add("hidden");
    return;
  }
<<<<<<< HEAD

=======
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e
  // -------------------------------
  // CARGAR EJEMPLO DESDE SELECT
  // -------------------------------
  if (accion === "ejemplo") {
    const selectEj = document.getElementById("uniforme-ejemplos-select");
    const key = selectEj.value;

    if (!ejemplosUniforme) {
      alert("Los ejemplos todavía no se han cargado.");
      return;
    }

    if (key && ejemplosUniforme[key]) {
      const ej = ejemplosUniforme[key];
      document.getElementById("uniforme-input-a").value = ej.a;
      document.getElementById("uniforme-input-b").value = ej.b;
<<<<<<< HEAD
      document.getElementById("uniforme-input-x").value = ej.x || "";
      document.getElementById("uniforme-input-a2").value = ej.a2 || "";
      document.getElementById("uniforme-input-b2").value = ej.b2 || "";
      document.getElementById("uniforme-input-type").value = ej.type;

      // 🔥 Forzar actualización de inputs visibles
      document.getElementById("uniforme-input-type").dispatchEvent(new Event("change"));

=======
      document.getElementById("uniforme-input-x").value = ej.x;
      document.getElementById("uniforme-input-type").value = ej.type;
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e
      console.log("Ejemplo cargado:", ej.desc);
    } else {
      console.warn("Ejemplo no encontrado en JSON");
    }

    return;
  }
<<<<<<< HEAD

=======
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e
  // -------------------------------
  // ACCIÓN: CALCULAR + GRAFICAR
  // -------------------------------
  if (accion === "calcular") {
    const a = parseFloat(document.getElementById("uniforme-input-a").value);
    const b = parseFloat(document.getElementById("uniforme-input-b").value);
    const tipo = document.getElementById("uniforme-input-type").value;
    const x = parseFloat(document.getElementById("uniforme-input-x").value);
    const a2 = parseFloat(document.getElementById("uniforme-input-a2").value);
    const b2 = parseFloat(document.getElementById("uniforme-input-b2").value);

    if (b <= a) {
      alert("Error: b debe ser mayor que a.");
      return;
    }

    const f = 1 / (b - a);
    let resultado = 0;

    if (tipo === "density") resultado = x >= a && x <= b ? f : 0;
    if (tipo === "less") resultado = x < a ? 0 : x > b ? 1 : (x - a) / (b - a);
    if (tipo === "greater")
      resultado = x < a ? 1 : x > b ? 0 : (b - x) / (b - a);
    if (tipo === "between") {
      const low = Math.max(a, a2);
      const high = Math.min(b, b2);
      resultado = high > low ? (high - low) / (b - a) : 0;
    }

    // Mostrar resultado
    document.getElementById("uniforme-result-prob").value =
      resultado.toFixed(6);

    // EX y VarX
    const ex = (a + b) / 2;
    const varx = Math.pow(b - a, 2) / 12;

    document.getElementById("uniforme-result-ex").textContent = ex.toFixed(4);
    document.getElementById("uniforme-result-varx").textContent =
      varx.toFixed(4);

    // -------------------------------
    // GRAFICAR
    // -------------------------------
    const xs = [];
    const ys = [];
    const ysShade = [];

    const steps = 200;
    const minX = a - (b - a) * 0.2;
    const maxX = b + (b - a) * 0.2;
    const inc = (maxX - minX) / steps;

    for (let t = minX; t <= maxX; t += inc) {
      const y = t >= a && t <= b ? f : 0;
      xs.push(t);
      ys.push(y);

      let inside = false;

      if (tipo === "density") inside = t >= x && t <= x;
      if (tipo === "less") inside = t >= a && t <= Math.min(x, b);
      if (tipo === "greater") inside = t >= Math.max(x, a) && t <= b;
      if (tipo === "between") inside = t >= a2 && t <= b2;

      ysShade.push(inside ? y : null);
    }

    const ctx = document.getElementById("uniforme-chart");

    if (uniformeChart) uniformeChart.destroy();

    uniformeChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xs,
        datasets: [
          {
            label: "Uniforme",
            data: ys,
            borderColor: "red",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          },
          {
            label: "Área",
            data: ysShade,
            backgroundColor: "rgba(30,144,255,0.35)",
            borderColor: "rgba(30,144,255,0.35)",
            pointRadius: 0,
            fill: true,
          },
        ],
      },
    });

    return;
  }
}

<<<<<<< HEAD

=======
>>>>>>> 61f6add1b83872c7d395d4537023a3f83b84da6e
// ===============================
// FUNCIONES MATEMÁTICAS
// ===============================
function exponencialPDF(x, lambda) {
  return x >= 0 ? lambda * Math.exp(-lambda * x) : 0;
}

function exponencialCDF(x, lambda) {
  return x >= 0 ? 1 - Math.exp(-lambda * x) : 0;
}

// ===============================
// GRÁFICO GLOBAL
// ===============================
let exponencialChart = null;

// ===============================
// FUNCION ÚNICA: cálculo + gráfico + modales
// ===============================

function controlExponencial(accion) {
  const modalInfo = document.getElementById("modal-exponencial-info");
  const modalGraph = document.getElementById("modal-exponencial-graph");

  // Abrir info
  if (accion === "info") {
    modalInfo.classList.remove("hidden");
    return;
  }

  // Cerrar info
  if (accion === "cerrar-info") {
    modalInfo.classList.add("hidden");
    return;
  }

  // Cerrar gráfico
  if (accion === "cerrar-grafico") {
    modalGraph.classList.add("hidden");
    return;
  }

  // ==============================
  // Cargar ejemplo desde JSON
  // ==============================
  if (accion === "ejemplo") {
    const sel = document.getElementById("exponencial-ejemplos-select");
    const key = sel.value;

    if (!ejemplosExponencial) {
      alert("Los ejemplos todavía no han cargado.");
      return;
    }

    if (key && ejemplosExponencial[key]) {
      const ej = ejemplosExponencial[key];

      document.getElementById("exponencial-input-lambda").value = ej.lambda;
      document.getElementById("exponencial-input-x").value = ej.x || "";
      document.getElementById("exponencial-input-type").value = ej.type;

      console.log("✅ Ejemplo Exponencial cargado:", ej.desc);
    }

    return;
  }

  // ==============================
  // Calcular y graficar
  // ==============================
  if (accion === "calcular") {
    calcularYGraficarExponencial();
    return;
  }
}

function calcularYGraficarExponencial() {
  const lambda = parseFloat(
    document.getElementById("exponencial-input-lambda").value
  );
  const tipo = document.getElementById("exponencial-input-type").value;
  const x = parseFloat(document.getElementById("exponencial-input-x").value);

  let resultado = null;

  // -----------------------------
  // Cálculo
  // -----------------------------
  if (tipo === "less") resultado = exponencialCDF(x, lambda);
  if (tipo === "greater") resultado = 1 - exponencialCDF(x, lambda);
  if (tipo === "density") resultado = exponencialPDF(x, lambda);

  // -----------------------------
  // Mostrar resultados
  // -----------------------------
  document.getElementById("exponencial-result-prob").value =
    resultado.toFixed(6);
  document.getElementById("exponencial-result-ex").textContent = (
    1 / lambda
  ).toFixed(4);
  document.getElementById("exponencial-result-varx").textContent = (
    1 /
    (lambda * lambda)
  ).toFixed(4);

  // -----------------------------
  // Construir datos para gráfico
  // -----------------------------
  const xs = [];
  const ys = [];
  const ysShade = [];
  const maxX = Math.max(10 / lambda, x * 1.5 || 10);
  const steps = 200;
  const inc = maxX / steps;

  for (let v = 0; v <= maxX; v += inc) {
    const pdf = exponencialPDF(v, lambda);
    xs.push(v);
    ys.push(pdf);

    let isInside = false;
    if (tipo === "less" && v <= x) isInside = true;
    if (tipo === "greater" && v >= x) isInside = true;
    if (tipo === "density") isInside = false;

    ysShade.push(isInside ? pdf : null);
  }

  // -----------------------------
  // Crear gráfico
  // -----------------------------
  const ctx = document.getElementById("exponencialChart");
  if (exponencialChart) exponencialChart.destroy();

  exponencialChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xs,
      datasets: [
        {
          label: "Densidad Exponencial",
          data: ys,
          borderColor: "red",
          borderWidth: 2,
          fill: false,
          tension: 0.1,
        },
        {
          label: "Área",
          data: ysShade,
          borderColor: "rgba(0,0,255,0.3)",
          backgroundColor: "rgba(30,144,255,0.35)",
          pointRadius: 0,
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { title: { display: true, text: "x" } },
        y: { title: { display: true, text: "f(x)" } },
      },
    },
  });

  
}
// -----------------------------
  // MODALES
  // -----------------------------
  const modalInfo = document.getElementById("modal-exponencial-info");
  const modalGraph = document.getElementById("modal-exponencial-graph");

  document
    .getElementById("exponencial-info-btn")
    .addEventListener("click", () => modalInfo.classList.remove("hidden"));
  document
    .getElementById("modal-exponencial-info-close")
    .addEventListener("click", () => modalInfo.classList.add("hidden"));

  document
    .getElementById("exponencial-graph-btn")
    .addEventListener("click", () => modalGraph.classList.remove("hidden"));
  document
    .getElementById("modal-exponencial-graph-close")
    .addEventListener("click", () => modalGraph.classList.add("hidden"));

  window.addEventListener("click", (e) => {
    if (e.target === modalInfo) modalInfo.classList.add("hidden");
    if (e.target === modalGraph) modalGraph.classList.add("hidden");
  });

// ===============================
// FUNCIONES MATEMÁTICAS
// ===============================

function lognormalPDF(x, mu, sigma) {
  return x > 0
    ? (1 / (x * sigma * Math.sqrt(2 * Math.PI))) *
        Math.exp(-Math.pow(Math.log(x) - mu, 2) / (2 * sigma * sigma))
    : 0;
}

function lognormalCDF(x, mu, sigma) {
  if (x <= 0) return 0;
  return 0.5 * (1 + erf((Math.log(x) - mu) / (sigma * Math.sqrt(2))));
}

// Reutilizamos la función erf del normal
function erf(z) {
  const t = 1 / (1 + 0.5 * Math.abs(z));
  const poly =
    t *
    Math.exp(
      -z * z -
        1.26551223 +
        t *
          (1.00002368 +
            t *
              (0.37409196 +
                t *
                  (0.09678418 +
                    t *
                      (-0.18628806 +
                        t *
                          (0.27886807 +
                            t *
                              (-1.13520398 +
                                t *
                                  (1.48851587 +
                                    t * (-0.82215223 + t * 0.17087277))))))))
    );
  return z >= 0 ? 1 - poly : poly - 1;
}

// ===============================
// GRÁFICO GLOBAL
// ===============================
let lognormalChart = null;

// ===============================
// FUNCION ÚNICA
// ===============================
function controlLogNormal(accion) {
  const modalInfo = document.getElementById("modal-lognormal-info");
  const modalGraph = document.getElementById("modal-lognormal-graph");

  // --------------------------
  // MODALES
  // --------------------------
  if (accion === "info") {
    modalInfo.classList.remove("hidden");
    return;
  }
  if (accion === "cerrar-info") {
    modalInfo.classList.add("hidden");
    return;
  }
  if (accion === "cerrar-grafico") {
    modalGraph.classList.add("hidden");
    return;
  }

  // --------------------------
  // EJEMPLOS
  // --------------------------
  if (accion === "ejemplo") {
    const selectEj = document.getElementById("lognormal-ejemplos-select");
    const key = selectEj.value;

    if (!ejemplosLogNormal) {
      alert("Los ejemplos todavía no han cargado, espera un momento.");
      return;
    }

    if (key && ejemplosLogNormal[key]) {
      const ej = ejemplosLogNormal[key];

      document.getElementById("lognormal-input-mu").value = ej.mu;
      document.getElementById("lognormal-input-sigma").value = ej.sigma;
      document.getElementById("lognormal-input-x").value = ej.x || "";
      document.getElementById("lognormal-input-a").value = ej.a || "";
      document.getElementById("lognormal-input-b").value = ej.b || "";
      document.getElementById("lognormal-input-type").value = ej.type;

      console.log("✅ Ejemplo Log-Normal cargado:", ej.desc);
    }
    return;
  }

  // --------------------------
  // CALCULAR + GRAFICAR
  // --------------------------
  if (accion === "calcular") {
    calcularYGraficarLogNormal();
  }
}
function calcularYGraficarLogNormal() {
  const mu = parseFloat(document.getElementById("lognormal-input-mu").value);
  const sigma = parseFloat(
    document.getElementById("lognormal-input-sigma").value
  );
  const tipo = document.getElementById("lognormal-input-type").value;
  const x = parseFloat(document.getElementById("lognormal-input-x").value);

  let resultado = null;

  // -----------------------------
  // Cálculo
  // -----------------------------
  if (tipo === "less") resultado = lognormalCDF(x, mu, sigma);
  if (tipo === "greater") resultado = 1 - lognormalCDF(x, mu, sigma);
  if (tipo === "density") resultado = lognormalPDF(x, mu, sigma);

  // -----------------------------
  // Mostrar resultados
  // -----------------------------
  document.getElementById("lognormal-result-prob").value = resultado.toFixed(6);
  document.getElementById("lognormal-result-ex").textContent = Math.exp(
    mu + (sigma * sigma) / 2
  ).toFixed(4);
  document.getElementById("lognormal-result-varx").textContent = (
    (Math.exp(sigma * sigma) - 1) *
    Math.exp(2 * mu + sigma * sigma)
  ).toFixed(4);

  // -----------------------------
  // Construir datos para gráfico
  // -----------------------------
  const xs = [];
  const ys = [];
  const ysShade = [];
  const maxX = Math.max(10 * Math.exp(mu), x * 1.5 || 10);
  const steps = 200;
  const inc = maxX / steps;

  for (let v = 0; v <= maxX; v += inc) {
    const pdf = lognormalPDF(v, mu, sigma);
    xs.push(v);
    ys.push(pdf);

    let isInside = false;
    if (tipo === "less" && v <= x) isInside = true;
    if (tipo === "greater" && v >= x) isInside = true;
    if (tipo === "density") isInside = false;

    ysShade.push(isInside ? pdf : null);
  }

  // -----------------------------
  // Crear gráfico
  // -----------------------------
  const ctx = document.getElementById("lognormalChart");
  if (lognormalChart) lognormalChart.destroy();

  lognormalChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xs,
      datasets: [
        {
          label: "Densidad Log-Normal",
          data: ys,
          borderColor: "red",
          borderWidth: 2,
          fill: false,
          tension: 0.1,
        },
        {
          label: "Área",
          data: ysShade,
          borderColor: "rgba(0,0,255,0.3)",
          backgroundColor: "rgba(30,144,255,0.35)",
          pointRadius: 0,
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { title: { display: true, text: "x" } },
        y: { title: { display: true, text: "f(x)" } },
      },
    },
  });

  // -----------------------------
  // MODALES
  // -----------------------------

}
  const modalInfoLog = document.getElementById("modal-lognormal-info");
  const modalGraphLog = document.getElementById("modal-lognormal-graph");

  document
    .getElementById("lognormal-info-btn")
    .addEventListener("click", () => modalInfoLog.classList.remove("hidden"));
  document
    .getElementById("modal-lognormal-info-close")
    .addEventListener("click", () => modalInfoLog.classList.add("hidden"));

  document
    .getElementById("lognormal-graph-btn")
    .addEventListener("click", () => modalGraphLog.classList.remove("hidden"));
  document
    .getElementById("modal-lognormal-graph-close")
    .addEventListener("click", () => modalGraphLog.classList.add("hidden"));

  window.addEventListener("click", (e) => {
    if (e.target === modalInfo) modalInfoLog.classList.add("hidden");
    if (e.target === modalGraph) modalGraphLog.classList.add("hidden");
  });
// ===============================
// FUNCIONES MATEMÁTICAS
// ===============================
function gammaPDF(x, alpha, beta) {
  if (x <= 0) return 0;
  return (
    (Math.pow(beta, alpha) * Math.pow(x, alpha - 1) * Math.exp(-beta * x)) /
    gammaFunc(alpha)
  );
}

// Función Gamma usando aproximación de Lanczos
function gammaFunc(z) {
  const p = [
    676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012,
    9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gammaFunc(1 - z));
  z -= 1;
  let x = 0.99999999999980993;
  for (let i = 0; i < p.length; i++) x += p[i] / (z + i + 1);
  const t = z + p.length - 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

// Función CDF aproximada usando sumatoria de Simpson
function gammaCDF(x, alpha, beta) {
  if (x <= 0) return 0;
  const n = 1000;
  let sum = 0;
  const dx = x / n;
  for (let i = 0; i <= n; i++) {
    const xi = i * dx;
    const coef = i === 0 || i === n ? 1 : i % 2 === 0 ? 2 : 4;
    sum += coef * gammaPDF(xi, alpha, beta);
  }
  return (dx / 3) * sum;
}

// ===============================
// GRÁFICO GLOBAL
// ===============================
let gammaChart = null;

// ===============================
// FUNCION UNICA: Cálculo + gráfico + modales
// ===============================
function controlGamma(accion) {
  const modalInfo = document.getElementById("modal-gamma-info");
  const modalGraph = document.getElementById("modal-gamma-graph");

  // ---------------------------
  // Modales
  // ---------------------------
  if (accion === "info") {
    modalInfo.classList.remove("hidden");
    return;
  }
  if (accion === "cerrar-info") {
    modalInfo.classList.add("hidden");
    return;
  }
  if (accion === "cerrar-grafico") {
    modalGraph.classList.add("hidden");
    return;
  }

  // ---------------------------
  // Ejemplos
  // ---------------------------
  if (accion === "ejemplo") {
    const selectEj = document.getElementById("gamma-ejemplos-select");
    const key = selectEj.value;

    if (!ejemplosGamma) {
      alert("Los ejemplos todavía no han cargado, espera un momento.");
      return;
    }

    if (key && ejemplosGamma[key]) {
      const ej = ejemplosGamma[key];

      document.getElementById("gamma-input-alpha").value = ej.alpha;
      document.getElementById("gamma-input-beta").value = ej.beta;
      document.getElementById("gamma-input-x").value = ej.x || "";
      document.getElementById("gamma-input-type").value = ej.type;

      console.log("✅ Ejemplo Gamma cargado:", ej.desc);
    }
    return;
  }

  // ---------------------------
  // Calcular + Graficar
  // ---------------------------
  if (accion === "calcular") {
    calcularYGraficarGamma();
  }
}
  function calcularYGraficarGamma() {
    const alpha = parseFloat(document.getElementById("gamma-input-alpha").value);
    const beta = parseFloat(document.getElementById("gamma-input-beta").value);
    const tipo = document.getElementById("gamma-input-type").value;
    const x = parseFloat(document.getElementById("gamma-input-x").value);

    /*// Modales
    const modalInfo = document.getElementById("modal-gamma-info");
    const modalGraph = document.getElementById("modal-gamma-graph");

    document
      .getElementById("gamma-info-btn")
      .addEventListener("click", () => modalInfo.classList.remove("hidden"));
    document
      .getElementById("modal-gamma-info-close")
      .addEventListener("click", () => modalInfo.classList.add("hidden"));

    document
      .getElementById("gamma-graph-btn")
      .addEventListener("click", () => modalGraph.classList.remove("hidden"));
    document
      .getElementById("modal-gamma-graph-close")
      .addEventListener("click", () => modalGraph.classList.add("hidden"));*/

    let resultado = null;
    if (tipo === "less") resultado = gammaCDF(x, alpha, beta);
    if (tipo === "greater") resultado = 1 - gammaCDF(x, alpha, beta);
    if (tipo === "density") resultado = gammaPDF(x, alpha, beta);

    // Mostrar resultados
    document.getElementById("gamma-result-prob").value = resultado.toFixed(6);
    document.getElementById("gamma-result-ex").textContent = (
      alpha / beta
    ).toFixed(4);
    document.getElementById("gamma-result-varx").textContent = (
      alpha /
      (beta * beta)
    ).toFixed(4);

    // Construir datos gráfico
    const xs = [];
    const ys = [];
    const ysShade = [];
    const maxX = Math.max(10, x * 1.5);
    const steps = 200;
    const inc = maxX / steps;

    for (let v = 0; v <= maxX; v += inc) {
      const pdf = gammaPDF(v, alpha, beta);
      xs.push(v);
      ys.push(pdf);

      let isInside = false;
      if (tipo === "less" && v <= x) isInside = true;
      if (tipo === "greater" && v >= x) isInside = true;
      if (tipo === "density") isInside = false;
      ysShade.push(isInside ? pdf : null);
    }

    // Crear gráfico
    const ctx = document.getElementById("gammaChart");
    if (gammaChart) gammaChart.destroy();
    gammaChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xs,
        datasets: [
          {
            label: "Densidad Gamma",
            data: ys,
            borderColor: "red",
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
          {
            label: "Área",
            data: ysShade,
            borderColor: "rgba(0,0,255,0.3)",
            backgroundColor: "rgba(30,144,255,0.35)",
            pointRadius: 0,
            fill: true,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { title: { display: true, text: "x" } },
          y: { title: { display: true, text: "f(x)" } },
        },
      },
    });

    window.addEventListener("click", (e) => {
      if (e.target === modalInfo) modalInfo.classList.add("hidden");
      if (e.target === modalGraph) modalGraph.classList.add("hidden");
    });
  }

  // Modales
    const modalInfoGamma = document.getElementById("modal-gamma-info");
    const modalGraphGamma = document.getElementById("modal-gamma-graph");

    document
      .getElementById("gamma-info-btn")
      .addEventListener("click", () => modalInfoGamma.classList.remove("hidden"));
    document
      .getElementById("modal-gamma-info-close")
      .addEventListener("click", () => modalInfoGamma.classList.add("hidden"));

    document
      .getElementById("gamma-graph-btn")
      .addEventListener("click", () => modalGraphGamma.classList.remove("hidden"));
    document
      .getElementById("modal-gamma-graph-close")
      .addEventListener("click", () => modalGraphGamma.classList.add("hidden"));

// =====================================
// Eventos
// =====================================

// Botón calcular
document
  .getElementById("normal-calc-btn")
  .addEventListener("click", calcularYGraficarNormal);

// Botón mostrar gráfico
document
  .getElementById("normal-graph-btn")
  .addEventListener("click", calcularYGraficarNormal);

// Botones cerrar modales
document
  .getElementById("modal-normal-info-close")
  .addEventListener("click", () => {
    document.getElementById("modal-normal-info").classList.add("hidden");
  });

document
  .getElementById("modal-normal-graph-close")
  .addEventListener("click", () => {
    document.getElementById("modal-normal-graph").classList.add("hidden");
  });

// Icono de información
document.getElementById("normal-info-btn").addEventListener("click", () => {
  document.getElementById("modal-normal-info").classList.remove("hidden");
});

// Cerrar al hacer clic afuera
window.addEventListener("click", (e) => {
  if (e.target.id === "modal-normal-info") e.target.classList.add("hidden");
  if (e.target.id === "modal-normal-graph") e.target.classList.add("hidden");
});

//uniforme
document
  .getElementById("uniforme-info-btn")
  .addEventListener("click", () => controlUniforme("info"));

document
  .getElementById("modal-uniforme-info-close")
  .addEventListener("click", () => controlUniforme("cerrar-info"));

document
  .getElementById("uniforme-calc-btn")
  .addEventListener("click", () => controlUniforme("calcular"));

document
  .getElementById("uniforme-graph-btn")
  .addEventListener("click", () => controlUniforme("abrir-grafico"));

document
  .getElementById("modal-uniforme-graph-close")
  .addEventListener("click", () => controlUniforme("cerrar-grafico"));

//exponencial
document
  .getElementById("exponencial-calc-btn")
  .addEventListener("click", calcularYGraficarExponencial);
document
  .getElementById("exponencial-graph-btn")
  .addEventListener("click", calcularYGraficarExponencial);

document
  .getElementById("lognormal-calc-btn")
  .addEventListener("click", calcularYGraficarLogNormal);
document
  .getElementById("lognormal-graph-btn")
  .addEventListener("click", calcularYGraficarLogNormal);

document
  .getElementById("gamma-calc-btn")
  .addEventListener("click", calcularYGraficarGamma);
document
  .getElementById("gamma-graph-btn")
  .addEventListener("click", calcularYGraficarGamma);

// ===============================
// FUNCIONES MATEMÁTICAS
// ===============================
function betaPDF(x, alpha, beta) {
  if (x < 0 || x > 1) return 0;
  return (
    (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) / betaFunc(alpha, beta)
  );
}

function betaFunc(a, b) {
  return (gammaFunc(a) * gammaFunc(b)) / gammaFunc(a + b);
}

// Función Gamma (usada en beta)
function gammaFunc(z) {
  const p = [
    676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012,
    9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gammaFunc(1 - z));
  z -= 1;
  let x = 0.99999999999980993;
  for (let i = 0; i < p.length; i++) x += p[i] / (z + i + 1);
  const t = z + p.length - 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

// Aproximación CDF Beta usando sumatoria de Simpson
function betaCDF(x, alpha, beta) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const n = 1000;
  let sum = 0;
  const dx = x / n;
  for (let i = 0; i <= n; i++) {
    const xi = i * dx;
    const coef = i === 0 || i === n ? 1 : i % 2 === 0 ? 2 : 4;
    sum += coef * betaPDF(xi, alpha, beta);
  }
  return (dx / 3) * sum;
}
//ejemplos
let ejemplosBeta = null;

// ============================
// Cargar ejemplos solo una vez
// ============================
fetch("data/ejemplos.json")
  .then(res => res.json())
  .then(data => {
    ejemplosBeta = data;
    console.log("✅ Ejemplos cargados para Beta");
  })
  .catch(err => console.error("Error cargando ejemplos Beta:", err));

// ============================
// Función de control Beta
// ============================
function controlBeta(accion) {
  const modalInfo = document.getElementById("modal-beta-info");
  const modalGraph = document.getElementById("modal-beta-graph");

  // ---------------------------
  // Modales
  // ---------------------------
  if (accion === "info") {
    modalInfo.classList.remove("hidden");
    return;
  }
  if (accion === "cerrar-info") {
    modalInfo.classList.add("hidden");
    return;
  }
  if (accion === "cerrar-grafico") {
    modalGraph.classList.add("hidden");
    return;
  }

  // ---------------------------
  // Ejemplos
  // ---------------------------
  if (accion === "ejemplo") {
    const selectEj = document.getElementById("beta-ejemplos-select");
    const key = selectEj.value;

    if (!ejemplosBeta) {
      alert("Los ejemplos todavía no han cargado, espera un momento.");
      return;
    }

    if (key && ejemplosBeta[key]) {
      const ej = ejemplosBeta[key];

      document.getElementById("beta-input-alpha").value = ej.alpha;
      document.getElementById("beta-input-beta").value = ej.beta;
      document.getElementById("beta-input-x").value = ej.x || "";
      document.getElementById("beta-input-type").value = ej.type;

      console.log("✅ Ejemplo Beta cargado:", ej.desc);
    }
    return;
  }

  // ---------------------------
  // Calcular + Graficar
  // ---------------------------
  if (accion === "calcular") {
    calcularYGraficarBeta();
  }
}
// ===============================
// GRÁFICO GLOBAL
// ===============================

let betaChart = null;

// ===============================
// FUNCION UNICA: Cálculo + gráfico + modales
// ===============================
function calcularYGraficarBeta() {
  const alpha = parseFloat(document.getElementById("beta-input-alpha").value);
  const beta = parseFloat(document.getElementById("beta-input-beta").value);
  const tipo = document.getElementById("beta-input-type").value;
  const x = parseFloat(document.getElementById("beta-input-x").value);

  let resultado = null;
  if (tipo === "less") resultado = betaCDF(x, alpha, beta);
  if (tipo === "greater") resultado = 1 - betaCDF(x, alpha, beta);
  if (tipo === "density") resultado = betaPDF(x, alpha, beta);

  // Mostrar resultados
  document.getElementById("beta-result-prob").value = resultado.toFixed(6);
  document.getElementById("beta-result-ex").textContent = (
    alpha /
    (alpha + beta)
  ).toFixed(4);
  document.getElementById("beta-result-varx").textContent = (
    (alpha * beta) /
    ((alpha + beta) ** 2 * (alpha + beta + 1))
  ).toFixed(4);

  // Construir datos gráfico
  const xs = [];
  const ys = [];
  const ysShade = [];
  const steps = 200;
  const inc = 1 / steps;

  for (let v = 0; v <= 1; v += inc) {
    const pdf = betaPDF(v, alpha, beta);
    xs.push(v);
    ys.push(pdf);

    let isInside = false;
    if (tipo === "less" && v <= x) isInside = true;
    if (tipo === "greater" && v >= x) isInside = true;
    if (tipo === "density") isInside = false;
    ysShade.push(isInside ? pdf : null);
  }

  // Crear gráfico
  const ctx = document.getElementById("betaChart");
  if (betaChart) betaChart.destroy();
  betaChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xs,
      datasets: [
        {
          label: "Densidad Beta",
          data: ys,
          borderColor: "red",
          borderWidth: 2,
          fill: false,
          tension: 0.1,
        },
        {
          label: "Área",
          data: ysShade,
          borderColor: "rgba(0,0,255,0.3)",
          backgroundColor: "rgba(30,144,255,0.35)",
          pointRadius: 0,
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { title: { display: true, text: "x" } },
        y: { title: { display: true, text: "f(x)" } },
      },
    },
  });

  
}
// Modales
  const modalInfoBeta = document.getElementById("modal-beta-info");
  const modalGraphBeta= document.getElementById("modal-beta-graph");

  document
    .getElementById("beta-info-btn")
    .addEventListener("click", () => modalInfoBeta.classList.remove("hidden"));
  document
    .getElementById("modal-beta-info-close")
    .addEventListener("click", () => modalInfoBeta.classList.add("hidden"));

  document
    .getElementById("beta-graph-btn")
    .addEventListener("click", () => modalGraphBeta.classList.remove("hidden"));
  document
    .getElementById("modal-beta-graph-close")
    .addEventListener("click", () => modalGraphBeta.classList.add("hidden"));

  window.addEventListener("click", (e) => {
    if (e.target === modalInfo) modalInfoBeta.classList.add("hidden");
    if (e.target === modalGraph) modalGraphBeta.classList.add("hidden");
  });

// ===============================
// EVENTOS
// ===============================
document
  .getElementById("beta-calc-btn")
  .addEventListener("click", calcularYGraficarBeta);
document
  .getElementById("beta-graph-btn")
  .addEventListener("click", calcularYGraficarBeta);
