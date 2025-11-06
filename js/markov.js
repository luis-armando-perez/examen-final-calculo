// Archivo: markov.js

document.addEventListener("DOMContentLoaded", () => {
  const dimNInput = document.getElementById("dimN");
  const generarMatricesBtn = document.getElementById("generarMatricesBtn");
  const matricesContainer = document.getElementById("matricesContainer");
  const v0Container = document.getElementById("v0Container");
  const pContainer = document.getElementById("pContainer");
  const calculoContainer = document.getElementById("calculoContainer");
  const numPasosInput = document.getElementById("numPasos");
  const calcularMarkovBtn = document.getElementById("calcularMarkovBtn");
  const resultadoMarkov = document.getElementById("resultadoMarkov");
  const errorMsg = document.getElementById("errorMsg");

  let N = 2; // Dimensión por defecto

  // Dentro de tu DOMContentLoaded en markov.js
const selectEjemplo = document.getElementById("markov-ejemplos-select");

// Fetch de ejemplos
fetch("data/ejemplos.json")
  .then(res => res.json())
  .then(ejemplos => {
    selectEjemplo.addEventListener("change", () => {
      const key = selectEjemplo.value;
      if (key && ejemplos[key]) {
        const ej = ejemplos[key];
        const N = ej.estados.length;

        // Generar inputs de V0 y P según N
        generarInputs(N);

        // Llenar V0 con distribución uniforme (por defecto) o 0s
        ej.estados.forEach((_, j) => {
          const v0Input = document.getElementById(`v0-${j}`);
          if (v0Input) v0Input.value = (1 / N).toFixed(2); // ejemplo de inicialización uniforme
        });

        // Llenar la matriz de transición
        for (let i = 0; i < N; i++) {
          for (let j = 0; j < N; j++) {
            const pInput = document.getElementById(`p-${i}-${j}`);
            if (pInput) pInput.value = ej.probabilidades_transicion[i][j];
          }
        }

        console.log(`Ejemplo seleccionado: ${ej.desc}`);
      } else {
        // Si no selecciona nada, limpiar todo
        generarInputs(2); // default 2x2
      }
    });
  })
  .catch(err => console.error("Error cargando ejemplos de Markov:", err));


  function generarInputs(dim) {
    N = dim;
    v0Container.innerHTML = "";
    pContainer.innerHTML = "";
    matricesContainer.classList.remove("hidden");
    calculoContainer.classList.remove("hidden");
    errorMsg.classList.add("hidden");
    resultadoMarkov.textContent = "---";

    // Generar V0 (Vector de Fila 1 x N)
    for (let j = 0; j < N; j++) {
      v0Container.innerHTML += `
                <input id="v0-${j}" type="number" step="any" min="0" class="w-20 px-2 py-1 border border-indigo-300 rounded matrix-input" placeholder="V0[${j}]">
            `;
    }

    // Generar Matriz P (N x N)
    let tableHTML = '<table class="w-full border-collapse">';
    for (let i = 0; i < N; i++) {
      tableHTML += "<tr>";
      for (let j = 0; j < N; j++) {
        tableHTML += `
                    <td class="p-1 border border-gray-200">
                        <input id="p-${i}-${j}" type="number" step="any" min="0" class="w-full text-center px-1 py-1 border border-green-300 rounded matrix-input" placeholder="P[${i},${j}]">
                    </td>
                `;
      }
      tableHTML += "</tr>";
    }
    tableHTML += "</table>";
    pContainer.innerHTML = tableHTML;
  }

  // 1. Multiplicación de un Vector Fila (1xN) por una Matriz Cuadrada (NxN)
  function multiplyVectorMatrix(vector, matrix) {
    const dim = vector.length;
    if (dim !== matrix.length) {
      throw new Error("Dimensiones no coinciden para la multiplicación V*P.");
    }
    const resultVector = new Array(dim).fill(0);

    for (let j = 0; j < dim; j++) {
      // Columna del resultado
      for (let i = 0; i < dim; i++) {
        // Sumatoria
        resultVector[j] += vector[i] * matrix[i][j];
      }
    }
    return resultVector;
  }

  // 2. Multiplicación de dos Matrices Cuadradas (NxN * NxN)
  function multiplyMatrices(A, B) {
    const dim = A.length;
    if (dim !== B.length || A[0].length !== dim) {
      throw new Error("Matrices no son cuadradas o no coinciden en dimensión.");
    }
    const result = new Array(dim).fill(0).map(() => new Array(dim).fill(0));

    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        for (let k = 0; k < dim; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return result;
  }

  // 3. Potencia de una Matriz Cuadrada (P^n)
  function matrixPower(matrix, n) {
    const dim = matrix.length;
    if (n === 0) {
      // Matriz identidad para P^0
      const identity = new Array(dim)
        .fill(0)
        .map((_, i) => new Array(dim).fill(0).map((_, j) => (i === j ? 1 : 0)));
      return identity;
    }
    if (n === 1) return matrix;

    // Optimización para potencias: P^n = P^(n/2) * P^(n/2)
    if (n % 2 === 0) {
      const halfPower = matrixPower(matrix, n / 2);
      return multiplyMatrices(halfPower, halfPower);
    } else {
      // P^n = P * P^(n-1)
      return multiplyMatrices(matrix, matrixPower(matrix, n - 1));
    }
  }

  // --- LÓGICA DE INTERFAZ Y EVENTOS ---

  // Evento para generar inputs
  generarMatricesBtn.addEventListener("click", () => {
    const dim = parseInt(dimNInput.value);
    if (dim >= 2 && dim <= 5) {
      generarInputs(dim);
    } else {
      alert("Por favor, ingresa una dimensión N entre 2 y 5.");
    }
  });

  // Evento principal para calcular Vn = V0 * P^n
  calcularMarkovBtn.addEventListener("click", () => {
    errorMsg.classList.add("hidden");
    resultadoMarkov.textContent = "Calculando...";

    const nPasos = parseInt(numPasosInput.value);
    if (isNaN(nPasos) || nPasos < 0) {
      errorMsg.textContent =
        "El número de pasos (n) debe ser un entero no negativo.";
      errorMsg.classList.remove("hidden");
      resultadoMarkov.textContent = "---";
      return;
    }

    // 1. Leer V0 y P de los inputs
    let V0 = [];
    let P = [];
    let esValido = true;

    // Leer V0
    for (let j = 0; j < N; j++) {
      const value = parseFloat(document.getElementById(`v0-${j}`).value);
      if (isNaN(value)) {
        esValido = false;
        break;
      }
      V0.push(value);
    }
    if (!esValido) {
      errorMsg.textContent =
        "Error en el Vector Inicial V0: Asegúrate de que todos los valores sean números.";
      errorMsg.classList.remove("hidden");
      resultadoMarkov.textContent = "---";
      return;
    }

    // Leer Matriz P
    for (let i = 0; i < N; i++) {
      P[i] = [];
      for (let j = 0; j < N; j++) {
        const value = parseFloat(document.getElementById(`p-${i}-${j}`).value);
        if (isNaN(value)) {
          esValido = false;
          break;
        }
        P[i].push(value);
      }
      if (!esValido) {
        break;
      }
    }

    if (!esValido) {
      errorMsg.textContent =
        "Error en la Matriz de Transición P: Asegúrate de que todos los valores sean números.";
      errorMsg.classList.remove("hidden");
      resultadoMarkov.textContent = "---";
      return;
    }

    try {
      let Vn = [];

      if (nPasos === 0) {
        // Si n=0, Vn = V0
        Vn = V0;
      } else if (nPasos === 1) {
        // Si n=1, Vn = V0 * P
        Vn = multiplyVectorMatrix(V0, P);
      } else {
        // 2. Calcular P^n
        const P_n = matrixPower(P, nPasos);

        // 3. Calcular Vn = V0 * P^n
        Vn = multiplyVectorMatrix(V0, P_n);
      }

      // 4. Formatear y mostrar resultado
      const resultText = `[ ${Vn.map((v) => v.toFixed(6)).join(" | ")} ]`;
      resultadoMarkov.textContent = resultText;
      // Actualizar el gráfico con los nuevos valores de Vn
      renderMarkovChart(Vn);

      resultadoMarkov.className =
        "text-2xl font-mono p-4 bg-indigo-100 border border-indigo-300 rounded-lg";
    } catch (e) {
      errorMsg.textContent = `Error de Cálculo: ${e.message}`;
      errorMsg.classList.remove("hidden");
      resultadoMarkov.textContent = "---";
    }
  });

  // --- LÓGICA DE MODAL (INFORMACIÓN) ---

  const markovData = {
    markov: {
      title: "Teorema y Cadenas de Markov",
      text: `
                El Teorema de Markov modela un sistema que transiciona entre un número finito de estados. 
                La <strong>propiedad de Markov</strong> establece que la probabilidad de pasar a un estado
                futuro solo depende del estado actual.
                <br><br>
                <ul>
                    <li><strong>Vector Inicial (V₀):</strong> Distribución de probabilidades en el tiempo t=0.</li>
                    <li><strong>Matriz de Transición (P):</strong> Matriz donde P{ij} es la probabilidad de ir del estado i al estado j en un solo paso. La suma de cada <strong>fila</strong> debe ser 1.</li>
                </ul>
            `,
      formula: `V_n = V_0 \\cdot P^n`,
    },
  };

  const infoButton = document.getElementById("btnInfoMarkov");

  infoButton.addEventListener("click", (e) => {
    const key = e.currentTarget.getAttribute("data-info-key");
    const data = markovData[key];

    if (data && typeof openModal === "function") {
      openModal(data.title, data.text, `$$${data.formula}$$`);
    }
  });

  // Generar la interfaz inicial
  generarInputs(N);
  let markovChart = null;

  function renderMarkovChart(vector) {
    const ctx = document.getElementById("markov-chart");
    if (!ctx) return;

    // Si ya hay un gráfico previo, destruirlo para evitar duplicados
    if (markovChart) {
      markovChart.destroy();
    }

    const labels = vector.map((_, i) => `Estado ${i + 1}`);

    markovChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Distribución del sistema (Vₙ)",
            data: vector,
            backgroundColor: [
              "rgba(54, 162, 235, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(255, 99, 132, 0.7)",
              "rgba(153, 102, 255, 0.7)",
            ].slice(0, vector.length),
            borderColor: "rgba(0,0,0,0.1)",
            borderWidth: 1,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Evolución de la Cadena de Markov",
            color: "#1e293b",
            font: { size: 18, weight: "bold" },
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `Prob: ${ctx.raw.toFixed(4)}`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Estados",
              color: "#475569",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Probabilidad",
              color: "#475569",
            },
            ticks: {
              callback: (v) => v.toFixed(2),
            },
          },
        },
      },
    });
  }
});

// --- GRAFICO DE MARKOV CON CHART.JS ---
