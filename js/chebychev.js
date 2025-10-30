// Archivo: chebychev.js

document.addEventListener("DOMContentLoaded", () => {
    
    // --- DATOS Y FÓRMULAS DEL TEOREMA ---
    const chebychevData = {
        title: 'Teorema de Chebyshev',
        text: 'El Teorema de Chebyshev (o Desigualdad de Chebyshev) establece que, para cualquier distribución de datos (sin importar su forma), la proporción de valores que caen dentro de k desviaciones estándar de la media es al menos 1 - 1/k^2, donde k es cualquier constante mayor que 1.',
        
        // Probabilidad Mínima
        formulaProb: 'P(\\mu - k\\sigma < X < \\mu + k\\sigma) \\ge 1 - \\frac{1}{k^2}, \\quad \\text{para } k > 1',
        
        // Rangos
        formulaRange: 'Rango Inferior: μ-kσ  Rango Superior: μ+kσ',
        
        // IDs de Inputs y Resultados
        inputMuId: 'chebychev-input-mu',
        inputSigmaId: 'chebychev-input-sigma',
        inputKId: 'chebychev-input-k',
        
        resultProbId: 'chebychev-result-prob',
        resultProbPercentId: 'chebychev-result-prob-percent',
        resultLowerId: 'chebychev-result-lower',
        resultUpperId: 'chebychev-result-upper'
    };
    
    // --- LÓGICA DE CÁLCULO ---
    function calculateChebychev() {
        // 1. Obtener valores de los inputs
        const mu = parseFloat(document.getElementById(chebychevData.inputMuId).value);
        const sigma = parseFloat(document.getElementById(chebychevData.inputSigmaId).value);
        const k = parseFloat(document.getElementById(chebychevData.inputKId).value);

        // 2. Validar Inputs
        if (isNaN(mu) || isNaN(sigma) || isNaN(k)) {
            alert("Error: Por favor, ingrese valores numéricos válidos para la Media, Desviación Estándar y k.");
            return;
        }
        
        if (sigma <= 0) {
            alert("Error: La Desviación Estándar (σ) debe ser mayor que cero.");
            return;
        }

        if (k <= 1) {
            alert("Error: La constante k debe ser mayor que 1 para aplicar el Teorema de Chebyshev.");
            return;
        }

        // 3. Calcular Resultados

        // Teorema de Chebyshev: P >= 1 - 1/k^2
        const probMin = 1 - (1 / (k * k));
        
        // Rangos
        // NOTA: Para el caso específico de k=2, el rango es μ ± 2σ
        const lowerBound = mu - (k * sigma);
        const upperBound = mu + (k * sigma);

        // 4. Mostrar Resultados
        
        // Probabilidad Mínima (Decimal y Porcentaje)
        document.getElementById(chebychevData.resultProbId).textContent = probMin.toFixed(6);
        document.getElementById(chebychevData.resultProbPercentId).textContent = (probMin * 100).toFixed(2) + '%';
        
        // Rangos
        document.getElementById(chebychevData.resultLowerId).textContent = lowerBound.toFixed(4);
        document.getElementById(chebychevData.resultUpperId).textContent = upperBound.toFixed(4);
    }

    // --- ASIGNACIÓN DE EVENTOS ---

    // 1. Botón de Cálculo
    document.getElementById('chebychev-calc-btn').addEventListener('click', calculateChebychev);

    // 2. Botón de Información (Modal)
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