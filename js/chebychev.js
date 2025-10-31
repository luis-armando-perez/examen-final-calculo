// Archivo: chebychev.js
document.addEventListener("DOMContentLoaded", () => {

    const chebychevData = {
        title: 'Teorema de Chebyshev',
        text: 'El Teorema de Chebyshev establece que, para cualquier distribución de datos, la proporción de valores dentro de k desviaciones estándar de la media es al menos 1 - 1/k².',
        formulaProb: 'P(\\mu - k\\sigma < X < \\mu + k\\sigma) \\ge 1 - \\frac{1}{k^2}, \\quad k > 1',
        formulaRange: 'Rango Inferior: μ−kσ  Rango Superior: μ+kσ',
        inputMuId: 'chebychev-input-mu',
        inputSigmaId: 'chebychev-input-sigma',
        inputKId: 'chebychev-input-k',
        resultProbId: 'chebychev-result-prob',
        resultProbPercentId: 'chebychev-result-prob-percent',
        resultLowerId: 'chebychev-result-lower',
        resultUpperId: 'chebychev-result-upper'
    };

    let chartInstance = null; // para actualizar el gráfico sin duplicarlo

    function calculateChebychev() {
        const mu = parseFloat(document.getElementById(chebychevData.inputMuId).value);
        const sigma = parseFloat(document.getElementById(chebychevData.inputSigmaId).value);
        const k = parseFloat(document.getElementById(chebychevData.inputKId).value);

        if (isNaN(mu) || isNaN(sigma) || isNaN(k)) {
            alert("Error: Por favor, ingrese valores numéricos válidos.");
            return;
        }
        if (sigma <= 0) {
            alert("Error: σ debe ser mayor que cero.");
            return;
        }
        if (k <= 1) {
            alert("Error: k debe ser mayor que 1.");
            return;
        }

        const probMin = 1 - (1 / (k * k));
        const lowerBound = mu - (k * sigma);
        const upperBound = mu + (k * sigma);

        document.getElementById(chebychevData.resultProbId).textContent = probMin.toFixed(6);
        document.getElementById(chebychevData.resultProbPercentId).textContent = (probMin * 100).toFixed(2) + '%';
        document.getElementById(chebychevData.resultLowerId).textContent = lowerBound.toFixed(4);
        document.getElementById(chebychevData.resultUpperId).textContent = upperBound.toFixed(4);

        // --- GRAFICAR DISTRIBUCIÓN (normal como referencia) ---
        const xValues = [];
        const yValues = [];

        // simulamos puntos de -4σ a +4σ
        for (let x = mu - 4 * sigma; x <= mu + 4 * sigma; x += sigma / 20) {
            const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
            xValues.push(x.toFixed(2));
            yValues.push(y);
        }

        // crear dataset del área destacada entre los límites
        const highlight = xValues.map((x, i) =>
            (x >= lowerBound && x <= upperBound) ? yValues[i] : null
        );

        const ctx = document.getElementById('chebychev-chart').getContext('2d');
        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: [
                    {
                        label: 'Distribución (referencia normal)',
                        data: yValues,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 0
                    },
                    {
                        label: `Área entre μ±${k}σ`,
                        data: highlight,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.3)',
                        fill: true,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Distribución y Teorema de Chebyshev (k=${k})`
                    },
                    legend: { position: 'bottom' },
                    tooltip: { mode: 'index' }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Valor X' }
                    },
                    y: {
                        title: { display: true, text: 'Densidad (f(x))' },
                        ticks: { display: false }
                    }
                }
            }
        });
    }

    document.getElementById('chebychev-calc-btn').addEventListener('click', calculateChebychev);

    document.getElementById('chebychev-info-btn').addEventListener('click', () => {
        if (typeof openModal === 'function') {
            openModal(
                chebychevData.title,
                chebychevData.text,
                chebychevData.formulaProb,
                chebychevData.formulaRange
            );
        }
    });
});
