// bernoulli.js
(function () {
  // Evita inicializar más de una vez
  if (window.__bernoulliInitialized) return;
  window.__bernoulliInitialized = true;

  document.addEventListener("DOMContentLoaded", () => {
    // Referencias seguras (null-check)
    const infoBtn = document.getElementById("bernoulli-info-btn");
    const infoModal = document.getElementById("infoModal");
    const closeModalBtn = document.getElementById("closeModalBtn");

    const graphBtn = document.getElementById("bernoulli-graph-btn");
    const graphModal = document.getElementById("graphModal");
    const closeGraphBtn = document.getElementById("closeGraphBtn");
    const calcBtn = document.getElementById("bernoulli-calc-btn");

    const inputP = document.getElementById("bernoulli-input-p");
    const inputX = document.getElementById("bernoulli-input-x");
    const resultPx = document.getElementById("bernoulli-result-px");
    const resultEx = document.getElementById("bernoulli-result-ex");
    const resultVarx = document.getElementById("bernoulli-result-varx");
    const canvas = document.getElementById("bernoulliChart");

    // Si faltan elementos, salimos con mensaje (útil para debugging)
    if (
      !infoBtn ||
      !infoModal ||
      !closeModalBtn ||
      !graphBtn ||
      !graphModal ||
      !closeGraphBtn ||
      !calcBtn ||
      !inputP ||
      !inputX ||
      !resultPx ||
      !resultEx ||
      !resultVarx ||
      !canvas
    ) {
      console.warn(
        "bernoulli.js: faltan elementos DOM. Revisa los IDs en el HTML."
      );
      return;
    }

    // Eventos modal info
    infoBtn.addEventListener("click", () => {
      infoModal.classList.remove("hidden");
      if (window.MathJax && typeof MathJax.typesetPromise === "function") {
        MathJax.typesetPromise().catch(() => {
          /*ignore*/
        });
      }
    });

    closeModalBtn.addEventListener("click", () =>
      infoModal.classList.add("hidden")
    );

    // Modal grafico
    let bernoulliChart = null;
    graphBtn.addEventListener("click", () => {
      graphModal.classList.remove("hidden");
      generarGraficoBernoulli();
    });
    closeGraphBtn.addEventListener("click", () =>
      graphModal.classList.add("hidden")
    );

    // Boton calcular
    calcBtn.addEventListener("click", () => {
      const p = parseFloat(inputP.value);
      const x = parseInt(inputX.value);

      if (isNaN(p) || p < 0 || p > 1) {
        alert("⚠️ Ingrese una probabilidad válida (0 ≤ p ≤ 1)");
        return;
      }
      if (x !== 0 && x !== 1) {
        alert("⚠️ El valor de x solo puede ser 0 o 1");
        return;
      }

      const Px = x === 1 ? p : 1 - p;
      const EX = p;
      const VarX = p * (1 - p);

      resultPx.value = Px.toFixed(4);
      resultEx.textContent = EX.toFixed(4);
      resultVarx.textContent = VarX.toFixed(4);
    });

    // Generar grafico (usa Chart.js, asegúrate de cargarlo antes)
    function generarGraficoBernoulli() {
      const p = parseFloat(inputP.value);
      if (isNaN(p) || p < 0 || p > 1) {
        alert("⚠️ Ingrese una probabilidad válida antes de mostrar el gráfico");
        return;
      }

      // Verifica Chart.js
      if (typeof Chart === "undefined") {
        alert(
          "⚠️ Chart.js no está cargado. Incluye la librería antes de este script."
        );
        return;
      }

      const ctx = canvas.getContext("2d");
      const data = {
        labels: ["x = 0", "x = 1"],
        datasets: [
          {
            label: "P(X = x)",
            data: [1 - p, p],
            backgroundColor: ["#60A5FA", "#34D399"],
            borderColor: ["#2563EB", "#059669"],
            borderWidth: 1.5,
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: `Distribución Bernoulli (p = ${p})` },
        },
        scales: { y: { beginAtZero: true, max: 1 } },
      };

      if (bernoulliChart) {
        try {
          bernoulliChart.destroy();
        } catch (e) {
          /*ignore*/
        }
      }

      bernoulliChart = new Chart(ctx, { type: "bar", data, options });
    }
  });
})();

//binomial

(function calcularBinomial() {
  // =====================
  // Funciones auxiliares
  // =====================
  function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let f = 1;
    for (let i = 2; i <= num; i++) f *= i;
    return f;
  }

  function combinatoria(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
  }

  // =====================
  // ELEMENTOS DEL DOM
  // =====================
  const infoBtn = document.getElementById("binomial-info-btn");
  const infoModal = document.getElementById("binomial-info-modal");
  const closeInfoBtn = document.getElementById("close-binomial-info");

  const graphBtn = document.getElementById("binomial-graph-btn");
  const graphModal = document.getElementById("binomial-graph-modal");
  const closeGraphBtn = document.getElementById("close-binomial-graph");

  const calcBtn = document.getElementById("binomial-calc-btn");
  const inputN = document.getElementById("binomial-input-n");
  const inputP = document.getElementById("binomial-input-p");
  const inputX = document.getElementById("binomial-input-x");

  const resultPx = document.getElementById("binomial-result-px");
  const resultEx = document.getElementById("binomial-result-ex");
  const resultVarX = document.getElementById("binomial-result-varx");

  let binomialChart = null;

  // =====================
  // MODAL DE INFORMACIÓN
  // =====================
  infoBtn.addEventListener("click", () => {
    infoModal.classList.remove("hidden");
    if (window.MathJax) MathJax.typesetPromise();
  });

  closeInfoBtn.addEventListener("click", () => {
    infoModal.classList.add("hidden");
  });

  // =====================
  // MODAL DEL GRÁFICO
  // =====================
  graphBtn.addEventListener("click", () => {
    graphModal.classList.remove("hidden");
    generarGraficoBinomial();
  });

  closeGraphBtn.addEventListener("click", () => {
    graphModal.classList.add("hidden");
  });

  // =====================
  // CÁLCULO DE DISTRIBUCIÓN BINOMIAL
  // =====================
  calcBtn.addEventListener("click", () => {
    const n = parseInt(inputN.value);
    const p = parseFloat(inputP.value);
    const k = parseInt(inputX.value);

    if (isNaN(n) || n < 1) {
      alert("⚠️ Ingrese un número válido de ensayos (n ≥ 1)");
      return;
    }
    if (isNaN(p) || p < 0 || p > 1) {
      alert("⚠️ Ingrese una probabilidad válida (0 ≤ p ≤ 1)");
      return;
    }
    if (isNaN(k) || k < 0 || k > n) {
      alert("⚠️ El valor de x debe cumplir 0 ≤ x ≤ n");
      return;
    }

    const Px = combinatoria(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    const EX = n * p;
    const VarX = n * p * (1 - p);

    resultPx.value = Px.toFixed(4);
    resultEx.textContent = EX.toFixed(4);
    resultVarX.textContent = VarX.toFixed(4);
  });

  // =====================
  // GRÁFICO BINOMIAL
  // =====================
  function generarGraficoBinomial() {
    const n = parseInt(inputN.value);
    const p = parseFloat(inputP.value);

    if (isNaN(n) || n < 1 || isNaN(p) || p < 0 || p > 1) {
      alert("⚠️ Ingrese valores válidos de n y p antes de mostrar el gráfico");
      return;
    }

    const labels = [];
    const data = [];
    for (let k = 0; k <= n; k++) {
      labels.push(`k=${k}`);
      data.push(combinatoria(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k));
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "P(X=k)",
          data: data,
          backgroundColor: "#60A5FA",
          borderColor: "#2563EB",
          borderWidth: 1.5,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: `Distribución Binomial (n=${n}, p=${p})`,
          color: "#1E3A8A",
          font: { size: 18, weight: "bold" },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 0.1 },
        },
      },
    };

    const ctx = document.getElementById("binomialChart").getContext("2d");

    if (binomialChart) binomialChart.destroy();
    binomialChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }
})();

//geometrica
(function calcularGeometrica() {
  // =====================
  // ELEMENTOS DEL DOM
  // =====================
  const infoBtn = document.getElementById("geometrica-info-btn");
  const infoModal = document.getElementById("geometrica-info-modal");
  const closeInfoBtn = document.getElementById("close-geometrica-info");

  const graphBtn = document.getElementById("geometrica-graph-btn");
  const graphModal = document.getElementById("geometrica-graph-modal");
  const closeGraphBtn = document.getElementById("close-geometrica-graph");

  const calcBtn = document.getElementById("geometrica-calc-btn");
  const inputP = document.getElementById("geometrica-input-p");
  const inputX = document.getElementById("geometrica-input-x");

  const resultPx = document.getElementById("geometrica-result-px");
  const resultEx = document.getElementById("geometrica-result-ex");
  const resultVarX = document.getElementById("geometrica-result-varx");

  let geometricaChart = null;

  // =====================
  // MODAL DE INFORMACIÓN
  // =====================
  infoBtn.addEventListener("click", () => {
    infoModal.classList.remove("hidden");
    if (window.MathJax) MathJax.typesetPromise();
  });

  closeInfoBtn.addEventListener("click", () => {
    infoModal.classList.add("hidden");
  });

  // =====================
  // MODAL DEL GRÁFICO
  // =====================
  graphBtn.addEventListener("click", () => {
    graphModal.classList.remove("hidden");
    generarGraficoGeometrica();
  });

  closeGraphBtn.addEventListener("click", () => {
    graphModal.classList.add("hidden");
  });

  // =====================
  // CÁLCULO DE DISTRIBUCIÓN GEOMÉTRICA
  // =====================
  calcBtn.addEventListener("click", () => {
    const p = parseFloat(inputP.value);
    const x = parseInt(inputX.value);

    if (isNaN(p) || p <= 0 || p > 1) {
      alert("⚠️ Ingrese una probabilidad válida (0 < p ≤ 1)");
      return;
    }
    if (isNaN(x) || x < 1) {
      alert("⚠️ El valor de x debe ser x ≥ 1");
      return;
    }

    // Probabilidad P(X=x)
    const Px = Math.pow(1 - p, x - 1) * p;
    const EX = 1 / p;
    const VarX = (1 - p) / (p * p);

    resultPx.value = Px.toFixed(4);
    resultEx.textContent = EX.toFixed(4);
    resultVarX.textContent = VarX.toFixed(4);
  });

  // =====================
  // GRÁFICO GEOMÉTRICO
  // =====================
  function generarGraficoGeometrica() {
    const p = parseFloat(inputP.value);
    const xMax = parseInt(inputX.value);

    if (isNaN(p) || p <= 0 || p > 1 || isNaN(xMax) || xMax < 1) {
      alert("⚠️ Ingrese valores válidos de p y x antes de mostrar el gráfico");
      return;
    }

    const labels = [];
    const data = [];
    for (let x = 1; x <= xMax; x++) {
      labels.push(`x=${x}`);
      data.push(Math.pow(1 - p, x - 1) * p);
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "P(X=x)",
          data: data,
          backgroundColor: "#60A5FA",
          borderColor: "#2563EB",
          borderWidth: 1.5,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: `Distribución Geométrica (p=${p})`,
          color: "#1E3A8A",
          font: { size: 18, weight: "bold" },
        },
      },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 0.1 } },
      },
    };

    const ctx = document.getElementById("geometricaChart").getContext("2d");

    if (geometricaChart) geometricaChart.destroy();
    geometricaChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }
})();

//binomial negativa ensayos
(function calcularBinomialNegativa() {
  // =====================
  // Funciones auxiliares
  // =====================
  function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let f = 1;
    for (let i = 2; i <= num; i++) f *= i;
    return f;
  }

  function combinatoria(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
  }

  // =====================
  // ELEMENTOS DEL DOM
  // =====================
  const infoBtn = document.getElementById("binomialNegativa-info-btn");
  const infoModal = document.getElementById("binomialNegativa-info-modal");
  const closeInfoBtn = document.getElementById("close-binomialNegativa-info");

  const graphBtn = document.getElementById("binomialNegativa-graph-btn");
  const graphModal = document.getElementById("binomialNegativa-graph-modal");
  const closeGraphBtn = document.getElementById("close-binomialNegativa-graph");

  const calcBtn = document.getElementById("binomialNegativa-calc-btn");
  const inputR = document.getElementById("binomialNegativa-input-r");
  const inputP = document.getElementById("binomialNegativa-input-p");
  const inputX = document.getElementById("binomialNegativa-input-x");

  const resultPx = document.getElementById("binomialNegativa-result-px");
  const resultEx = document.getElementById("binomialNegativa-result-ex");
  const resultVarX = document.getElementById("binomialNegativa-result-varx");

  let chartNegativa = null;

  // =====================
  // MODAL DE INFORMACIÓN
  // =====================
  infoBtn.addEventListener("click", () => {
    infoModal.classList.remove("hidden");
    if (window.MathJax) MathJax.typesetPromise();
  });

  closeInfoBtn.addEventListener("click", () => {
    infoModal.classList.add("hidden");
  });

  // =====================
  // MODAL DEL GRÁFICO
  // =====================
  graphBtn.addEventListener("click", () => {
    graphModal.classList.remove("hidden");
    generarGraficoBinomialNegativa();
  });

  closeGraphBtn.addEventListener("click", () => {
    graphModal.classList.add("hidden");
  });

  // =====================
  // CÁLCULO DE DISTRIBUCIÓN BINOMIAL NEGATIVA
  // =====================
  calcBtn.addEventListener("click", () => {
    const r = parseInt(inputR.value);
    const p = parseFloat(inputP.value);
    const x = parseInt(inputX.value);

    if (isNaN(r) || r < 1) {
      alert("⚠️ Ingrese un número válido de éxitos deseados (r ≥ 1)");
      return;
    }
    if (isNaN(p) || p <= 0 || p > 1) {
      alert("⚠️ Ingrese una probabilidad válida (0 < p ≤ 1)");
      return;
    }
    if (isNaN(x) || x < r) {
      alert("⚠️ El valor de x debe cumplir x ≥ r");
      return;
    }

    // P(X=x) = combinatoria(x-1, r-1) * p^r * (1-p)^(x-r)
    const Px =
      combinatoria(x - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, x - r);
    const EX = r / p;
    const VarX = (r * (1 - p)) / (p * p);

    resultPx.value = Px.toFixed(4);
    resultEx.textContent = EX.toFixed(4);
    resultVarX.textContent = VarX.toFixed(4);
  });

  // =====================
  // GRÁFICO BINOMIAL NEGATIVA
  // =====================
  function generarGraficoBinomialNegativa() {
    const r = parseInt(inputR.value);
    const p = parseFloat(inputP.value);

    if (isNaN(r) || r < 1 || isNaN(p) || p <= 0 || p > 1) {
      alert("⚠️ Ingrese valores válidos de r y p antes de mostrar el gráfico");
      return;
    }

    // Generar datos hasta un límite (por ejemplo r + 15)
    const maxX = r + 15;
    const labels = [];
    const data = [];
    for (let x = r; x <= maxX; x++) {
      labels.push(`x=${x}`);
      data.push(
        combinatoria(x - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, x - r)
      );
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "P(X=x)",
          data: data,
          backgroundColor: "#60A5FA",
          borderColor: "#2563EB",
          borderWidth: 1.5,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: `Distribución Binomial Negativa (r=${r}, p=${p})`,
          color: "#1E3A8A",
          font: { size: 18, weight: "bold" },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 0.05 },
        },
      },
    };

    const ctx = document
      .getElementById("binomialNegativaChart")
      .getContext("2d");

    if (chartNegativa) chartNegativa.destroy();
    chartNegativa = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }
})();

//binomial negativa fracasos
(function calcularBinomialNegativaFracasos() {
  // =====================
  // Funciones auxiliares
  // =====================
  function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let f = 1;
    for (let i = 2; i <= num; i++) f *= i;
    return f;
  }

  function combinatoria(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
  }

  // =====================
  // ELEMENTOS DEL DOM
  // =====================
  const infoBtn = document.getElementById("binomialNegativaFracasos-info-btn");
  const infoModal = document.getElementById(
    "binomialNegativaFracasos-info-modal"
  );
  const closeInfoBtn = document.getElementById(
    "close-binomialNegativaFracasos-info"
  );

  const graphBtn = document.getElementById(
    "binomialNegativaFracasos-graph-btn"
  );
  const graphModal = document.getElementById(
    "binomialNegativaFracasos-graph-modal"
  );
  const closeGraphBtn = document.getElementById(
    "close-binomialNegativaFracasos-graph"
  );

  const calcBtn = document.getElementById("binomialNegativaFracasos-calc-btn");
  const inputR = document.getElementById("binomialNegativaFracasos-input-r");
  const inputP = document.getElementById("binomialNegativaFracasos-input-p");
  const inputX = document.getElementById("binomialNegativaFracasos-input-x");

  const resultPx = document.getElementById(
    "binomialNegativaFracasos-result-px"
  );
  const resultEx = document.getElementById(
    "binomialNegativaFracasos-result-ex"
  );
  const resultVarX = document.getElementById(
    "binomialNegativaFracasos-result-varx"
  );

  let chartNegativaFracasos = null;

  // =====================
  // MODAL DE INFORMACIÓN
  // =====================
  infoBtn.addEventListener("click", () => {
    infoModal.classList.remove("hidden");
    if (window.MathJax) MathJax.typesetPromise();
  });

  closeInfoBtn.addEventListener("click", () => {
    infoModal.classList.add("hidden");
  });

  // =====================
  // MODAL DEL GRÁFICO
  // =====================
  graphBtn.addEventListener("click", () => {
    graphModal.classList.remove("hidden");
    generarGraficoBinomialNegativaFracasos();
  });

  closeGraphBtn.addEventListener("click", () => {
    graphModal.classList.add("hidden");
  });

  // =====================
  // CÁLCULO DE DISTRIBUCIÓN BINOMIAL NEGATIVA (Fracasos)
  // =====================
  calcBtn.addEventListener("click", () => {
    const r = parseInt(inputR.value);
    const p = parseFloat(inputP.value);
    const x = parseInt(inputX.value);

    if (isNaN(r) || r < 1) {
      alert("⚠️ Ingrese un número válido de éxitos deseados (r ≥ 1)");
      return;
    }
    if (isNaN(p) || p <= 0 || p > 1) {
      alert("⚠️ Ingrese una probabilidad válida (0 < p ≤ 1)");
      return;
    }
    if (isNaN(x) || x < 0) {
      alert("⚠️ El valor de x debe cumplir x ≥ 0");
      return;
    }

    // P(X=x) = combinatoria(x+r-1, x) * p^r * (1-p)^x
    const Px = combinatoria(x + r - 1, x) * Math.pow(p, r) * Math.pow(1 - p, x);
    const EX = (r * (1 - p)) / p;
    const VarX = (r * (1 - p)) / (p * p);

    resultPx.value = Px.toFixed(4);
    resultEx.textContent = EX.toFixed(4);
    resultVarX.textContent = VarX.toFixed(4);
  });

  // =====================
  // GRÁFICO BINOMIAL NEGATIVA (Fracasos)
  // =====================
  function generarGraficoBinomialNegativaFracasos() {
    const r = parseInt(inputR.value);
    const p = parseFloat(inputP.value);

    if (isNaN(r) || r < 1 || isNaN(p) || p <= 0 || p > 1) {
      alert("⚠️ Ingrese valores válidos de r y p antes de mostrar el gráfico");
      return;
    }

    // Generar datos hasta un límite razonable (por ejemplo r + 15 fracasos)
    const maxX = 15;
    const labels = [];
    const data = [];
    for (let x = 0; x <= maxX; x++) {
      labels.push(`x=${x}`);
      data.push(
        combinatoria(x + r - 1, x) * Math.pow(p, r) * Math.pow(1 - p, x)
      );
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "P(X=x)",
          data: data,
          backgroundColor: "#A78BFA",
          borderColor: "#7C3AED",
          borderWidth: 1.5,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: `Distribución Binomial Negativa (Fracasos, r=${r}, p=${p})`,
          color: "#4C1D95",
          font: { size: 18, weight: "bold" },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 0.05 },
        },
      },
    };

    const ctx = document
      .getElementById("binomialNegativaFracasosChart")
      .getContext("2d");

    if (chartNegativaFracasos) chartNegativaFracasos.destroy();
    chartNegativaFracasos = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }
})();

//poison

(function calcularPoisson() {
  // =====================
  // Función factorial
  // =====================
  function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let f = 1;
    for (let i = 2; i <= num; i++) f *= i;
    return f;
  }

  // =====================
  // Elementos del DOM
  // =====================
  const infoBtn = document.getElementById("poisson-info-btn");
  const infoModal = document.getElementById("poisson-info-modal");
  const closeInfoBtn = document.getElementById("close-poisson-info");

  const graphBtn = document.getElementById("poisson-graph-btn");
  const graphModal = document.getElementById("poisson-graph-modal");
  const closeGraphBtn = document.getElementById("close-poisson-graph");

  const calcBtn = document.getElementById("poisson-calc-btn");
  const inputLambda = document.getElementById("poisson-input-lambda");
  const inputX = document.getElementById("poisson-input-x");

  const resultPx = document.getElementById("poisson-result-px");
  const resultEx = document.getElementById("poisson-result-ex");
  const resultVarX = document.getElementById("poisson-result-varx");

  let poissonChart = null;

  // =====================
  // Modal de información
  // =====================
  infoBtn.addEventListener("click", () => {
    infoModal.classList.remove("hidden");
    if (window.MathJax) MathJax.typesetPromise();
  });

  closeInfoBtn.addEventListener("click", () => {
    infoModal.classList.add("hidden");
  });

  // =====================
  // Modal del gráfico
  // =====================
  graphBtn.addEventListener("click", () => {
    graphModal.classList.remove("hidden");
    generarGraficoPoisson();
  });

  closeGraphBtn.addEventListener("click", () => {
    graphModal.classList.add("hidden");
  });

  // =====================
  // Cálculo de Poisson
  // =====================
  calcBtn.addEventListener("click", () => {
    const lambda = parseFloat(inputLambda.value);
    const x = parseInt(inputX.value);

    if (isNaN(lambda) || lambda <= 0) {
      alert("⚠️ Ingrese una tasa λ válida (λ > 0)");
      return;
    }
    if (isNaN(x) || x < 0) {
      alert("⚠️ Ingrese un valor de x válido (x ≥ 0)");
      return;
    }

    const Px = (Math.pow(lambda, x) * Math.exp(-lambda)) / factorial(x);
    const EX = lambda;
    const VarX = lambda;

    resultPx.value = Px.toFixed(4);
    resultEx.textContent = EX.toFixed(4);
    resultVarX.textContent = VarX.toFixed(4);
  });

  // =====================
  // Generar gráfico Poisson
  // =====================
  function generarGraficoPoisson() {
    const lambda = parseFloat(inputLambda.value);
    if (isNaN(lambda) || lambda <= 0) {
      alert("⚠️ Ingrese un valor válido de λ antes de mostrar el gráfico");
      return;
    }

    // Generamos valores hasta xMax ≈ λ + 4*sqrt(λ) para mostrar la curva
    const xMax = Math.max(10, Math.ceil(lambda + 4 * Math.sqrt(lambda)));
    const labels = [];
    const data = [];

    for (let k = 0; k <= xMax; k++) {
      labels.push(`x=${k}`);
      data.push((Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k));
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "P(X=x)",
          data: data,
          backgroundColor: "#60A5FA",
          borderColor: "#2563EB",
          borderWidth: 1.5,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: `Distribución Poisson (λ=${lambda})`,
          color: "#1E3A8A",
          font: { size: 18, weight: "bold" },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 0.05 },
        },
      },
    };

    const ctx = document.getElementById("poissonChart").getContext("2d");

    if (poissonChart) poissonChart.destroy();
    poissonChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }
})();

//hipergeometrica
(function calcularHipergeometrica() {
  // =====================
  // Funciones auxiliares
  // =====================
  function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let f = 1;
    for (let i = 2; i <= num; i++) f *= i;
    return f;
  }

  function combinatoria(n, k) {
    if (k > n || k < 0) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k));
  }

  // =====================
  // ELEMENTOS DEL DOM
  // =====================
  const infoBtn = document.getElementById("hipergeometrica-info-btn");
  const infoModal = document.getElementById("hipergeometrica-info-modal");
  const closeInfoBtn = document.getElementById("close-hipergeometrica-info");

  const graphBtn = document.getElementById("hipergeometrica-graph-btn");
  const graphModal = document.getElementById("hipergeometrica-graph-modal");
  const closeGraphBtn = document.getElementById("close-hipergeometrica-graph");

  const calcBtn = document.getElementById("hipergeometrica-calc-btn");
  const inputN = document.getElementById("hipergeometrica-input-N");
  const inputK = document.getElementById("hipergeometrica-input-K");
  const inputn = document.getElementById("hipergeometrica-input-n");
  const inputX = document.getElementById("hipergeometrica-input-x");

  const resultPx = document.getElementById("hipergeometrica-result-px");
  const resultEx = document.getElementById("hipergeometrica-result-ex");
  const resultVarX = document.getElementById("hipergeometrica-result-varx");

  let hipergeometricaChart = null;

  // =====================
  // MODAL DE INFORMACIÓN
  // =====================
  infoBtn.addEventListener("click", () => {
    infoModal.classList.remove("hidden");
    if (window.MathJax) MathJax.typesetPromise();
  });

  closeInfoBtn.addEventListener("click", () => {
    infoModal.classList.add("hidden");
  });

  // =====================
  // MODAL DEL GRÁFICO
  // =====================
  graphBtn.addEventListener("click", () => {
    graphModal.classList.remove("hidden");
    generarGraficoHipergeometrica();
  });

  closeGraphBtn.addEventListener("click", () => {
    graphModal.classList.add("hidden");
  });

  // =====================
  // CÁLCULO HIPERGEOMÉTRICA
  // =====================
  calcBtn.addEventListener("click", () => {
    const N = parseInt(inputN.value);
    const K = parseInt(inputK.value);
    const n = parseInt(inputn.value);
    const x = parseInt(inputX.value);

    if (isNaN(N) || N < 1) {
      alert("⚠️ Ingrese un tamaño de población válido (N ≥ 1)");
      return;
    }
    if (isNaN(K) || K < 0 || K > N) {
      alert(
        "⚠️ Ingrese un número válido de éxitos en la población (0 ≤ K ≤ N)"
      );
      return;
    }
    if (isNaN(n) || n < 1 || n > N) {
      alert("⚠️ Ingrese un tamaño de muestra válido (1 ≤ n ≤ N)");
      return;
    }
    if (isNaN(x) || x < 0 || x > Math.min(K, n)) {
      alert("⚠️ Ingrese un valor válido de x (0 ≤ x ≤ min(K, n))");
      return;
    }

    const Px =
      (combinatoria(K, x) * combinatoria(N - K, n - x)) / combinatoria(N, n);
    const EX = n * (K / N);
    const VarX = n * (K / N) * ((N - K) / N) * ((N - n) / (N - 1));

    resultPx.value = Px.toFixed(4);
    resultEx.textContent = EX.toFixed(4);
    resultVarX.textContent = VarX.toFixed(4);
  });

  // =====================
  // GRÁFICO HIPERGEOMÉTRICA
  // =====================
  function generarGraficoHipergeometrica() {
    const N = parseInt(inputN.value);
    const K = parseInt(inputK.value);
    const n = parseInt(inputn.value);

    if (
      isNaN(N) ||
      N < 1 ||
      isNaN(K) ||
      K < 0 ||
      K > N ||
      isNaN(n) ||
      n < 1 ||
      n > N
    ) {
      alert(
        "⚠️ Ingrese valores válidos de N, K y n antes de mostrar el gráfico"
      );
      return;
    }

    const labels = [];
    const data = [];
    const maxX = Math.min(K, n);

    for (let x = 0; x <= maxX; x++) {
      labels.push(`x=${x}`);
      data.push(
        (combinatoria(K, x) * combinatoria(N - K, n - x)) / combinatoria(N, n)
      );
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "P(X=x)",
          data: data,
          backgroundColor: "#60A5FA",
          borderColor: "#2563EB",
          borderWidth: 1.5,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: `Distribución Hipergeométrica (N=${N}, K=${K}, n=${n})`,
          color: "#1E3A8A",
          font: { size: 18, weight: "bold" },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 0.05 },
        },
      },
    };

    const ctx = document
      .getElementById("hipergeometricaChart")
      .getContext("2d");

    if (hipergeometricaChart) hipergeometricaChart.destroy();
    hipergeometricaChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }
})();
