
// Archivo: distribuciones.js

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. FUNCIONES AUXILIARES DE ÁLGEBRA ---

    // Factorial (n!)
    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Coeficiente Binomial (n C x) = n! / (x! * (n-x)!)
    function combinations(n, x) {
        // Redondeamos para evitar errores de coma flotante en los enteros
        n = Math.round(n);
        x = Math.round(x);
        if (x < 0 || x > n) return 0;
        if (x === 0 || x === n) return 1;
        if (x > n / 2) x = n - x; 

        let num = 1;
        let den = 1;
        for (let i = 1; i <= x; i++) {
            num *= (n - i + 1);
            den *= i;
        }
        return num / den;
    }

    // --- 2. LÓGICA DE CÁLCULO PARA CADA DISTRIBUCIÓN ---

    const calculators = {
        
        // --- 1. BERNOULLI ---
        'bernoulli': {
            calculate: (params, x) => {
                const p = params.p;
                const EX = p;
                const VarX = p * (1 - p);
                let PX = NaN;
                if (x === 0) PX = 1 - p;
                if (x === 1) PX = p;
                return { EX, VarX, PX };
            },
            title: 'Bernoulli',
            text: 'Modela un único experimento con solo dos resultados posibles: éxito (1) o fracaso (0).',
            formulaP: 'P(X=x) = \\begin{cases} p & \\text{si } x=1 \\\\ 1-p & \\text{si } x=0 \\end{cases}',
            formulaEX: 'E[X] = p',
            formulaVarX: 'Var(X) = p(1-p)',
            inputIds: ['p'],
            xInputId: 'bernoulli-input-x'
        },

        // --- 2. BINOMIAL ---
        'binomial': {
            calculate: (params, x) => {
                const n = params.n;
                const p = params.p;
                if (x < 0 || x > n || p < 0 || p > 1) return { EX: n * p, VarX: n * p * (1 - p), PX: 0 };
                const PX = combinations(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
                const EX = n * p;
                const VarX = n * p * (1 - p);
                return { EX, VarX, PX };
            },
            title: 'Binomial',
            text: 'Modela el número de éxitos (x) en una secuencia de n ensayos de Bernoulli independientes con una probabilidad de éxito (p) constante.',
            formulaP: 'P(X=x) = \\binom{n}{x} p^x (1-p)^{n-x}',
            formulaEX: 'E[X] = np',
            formulaVarX: 'Var(X) = np(1-p)',
            inputIds: ['n', 'p'],
            xInputId: 'binomial-input-x'
        },
        
        // --- 3. GEOMÉTRICA ---
        'geometrica': {
            calculate: (params, x) => {
                const p = params.p;
                if (x < 1 || p < 0 || p > 1) return { EX: 1 / p, VarX: (1 - p) / Math.pow(p, 2), PX: 0 };
                const PX = Math.pow(1 - p, x - 1) * p;
                const EX = 1 / p;
                const VarX = (1 - p) / Math.pow(p, 2);
                return { EX, VarX, PX };
            },
            title: 'Geométrica',
            text: 'Modela el número de ensayos (x) hasta obtener el primer éxito en una secuencia de ensayos de Bernoulli independientes.',
            formulaP: 'P(X=x) = (1-p)^{x-1} p, \\quad x=1, 2, 3, \\dots',
            formulaEX: 'E[X] = 1/p',
            formulaVarX: 'Var(X) = 1-p/p^2',
            inputIds: ['p'],
            xInputId: 'geometrica-input-x'
        },

        // --- 4. BINOMIAL NEGATIVA (Ensayos Totales) ---
        'binomialNegativa': {
            calculate: (params, x) => {
                const r = params.r;
                const p = params.p;
                if (x < r || p < 0 || p > 1) return { EX: r / p, VarX: r * (1 - p) / Math.pow(p, 2), PX: 0 };
                const PX = combinations(x - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, x - r);
                const EX = r / p;
                const VarX = r * (1 - p) / Math.pow(p, 2);
                return { EX, VarX, PX };
            },
            title: 'Binomial Negativa (Ensayos Totales)',
            text: 'Modela el número total de ensayos (x) necesarios para obtener un número fijo de éxitos (r).',
            formulaP: 'P(X=x) = \\binom{x-1}{r-1} p^r (1-p)^{x-r}, \\quad x=r, r+1, \\dots',
            formulaEX: 'E[X] = r/p',
            formulaVarX: 'Var(X) = r(1-p)/p^2',
            inputIds: ['r', 'p'],
            xInputId: 'binomialNegativa-input-x'
        },
        
        // --- 5. BINOMIAL NEGATIVA (Fracasos) ---
        'binomialNegativaFracasos': {
            calculate: (params, x) => {
                const r = params.r;
                const p = params.p;
                
                // x aquí representa fracasos, debe ser >= 0
                if (x < 0 || p < 0 || p > 1) return { EX: r * (1 - p) / p, VarX: r * (1 - p) / Math.pow(p, 2), PX: 0 };
                
                // P(X=x) = (x + r - 1 C r - 1) * p^r * (1 - p)^x
                const PX = combinations(x + r - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, x);
                const EX = r * (1 - p) / p; // Esperanza para la variable: 'número de fracasos'
                const VarX = r * (1 - p) / Math.pow(p, 2); 
                
                return { EX, VarX, PX };
            },
            title: 'Binomial Negativa (Fracasos)',
            text: 'Modela el número de fracasos (x) que ocurren antes de obtener el r-ésimo éxito.',
            formulaP: 'P(X=x) = \\binom{x+r-1}{r-1} p^r (1-p)^{x}, \\quad x=0, 1, 2, \\dots',
            formulaEX: 'E[X] = r(1-p)/p',
            formulaVarX: 'Var(X) = r(1-p)/p^2',
            inputIds: ['r', 'p'],
            xInputId: 'binomialNegativaFracasos-input-x'
        },


        // --- 6. POISSON ---
        'poisson': {
            calculate: (params, x) => {
                const lambda = params.lambda;
                if (x < 0 || lambda <= 0 || !Number.isInteger(x)) return { EX: lambda, VarX: lambda, PX: 0 };
                const PX = (Math.exp(-lambda) * Math.pow(lambda, x)) / factorial(x);
                const EX = lambda;
                const VarX = lambda;
                return { EX, VarX, PX };
            },
            title: 'Poisson',
            text: 'Modela el número de eventos (x) que ocurren en un intervalo fijo de tiempo o espacio, con una tasa media conocida (λ).',
            formulaP: 'P(X=x) = \\frac{e^{-\\lambda} \\lambda^x}{x!}, \\quad x=0, 1, 2, \\dots',
            formulaEX: 'E[X] = λ',
            formulaVarX: 'Var(X) = λ',
            inputIds: ['lambda'],
            xInputId: 'poisson-input-x'
        },

        // --- 7. HIPERGEOMÉTRICA ---
        'hipergeometrica': {
            calculate: (params, x) => {
                const N = params.N; 
                const K = params.K; 
                const n = params.n; 
                
                if (!Number.isInteger(N) || !Number.isInteger(K) || !Number.isInteger(n) || N <= 0 || K > N || n > N) {
                    return { EX: NaN, VarX: NaN, PX: NaN };
                }

                const x_min = Math.max(0, n - (N - K));
                const x_max = Math.min(n, K);
                const p_poblacion = K / N;
                const factor_correccion = (N - n) / (N - 1);
                const EX = n * p_poblacion;
                const VarX = EX * (1 - p_poblacion) * factor_correccion;

                if (x < x_min || x > x_max || !Number.isInteger(x)) {
                    return { EX, VarX, PX: 0 };
                }
                
                const num1 = combinations(K, x);
                const num2 = combinations(N - K, n - x);
                const den = combinations(N, n);

                const PX = (num1 * num2) / den;
                
                return { EX, VarX, PX };
            },
            title: 'Hipergeométrica',
            text: 'Modela el número de éxitos (x) en una muestra de tamaño n tomada de una población finita N, sin reemplazo.',
            formulaP: 'P(X=x) = \\frac{\\binom{K}{x} \\binom{N-K}{n-x}}{\\binom{N}{n}}',
            formulaEX: 'E[X] = n* K/N',
            formulaVarX: 'Var(X) = n* K/N *(1 - K/N)* N-n/N-1',
            inputIds: ['N', 'K', 'n'],
            xInputId: 'hipergeometrica-input-x'
        }
    };
    
    // --- 3. LÓGICA DE EVENTOS ---

    // Lista de claves actualizada
    const distributionKeys = [
        'bernoulli', 
        'binomial', 
        'geometrica', 
        'binomialNegativa', 
        'binomialNegativaFracasos', // <-- Nueva clave
        'poisson', 
        'hipergeometrica'
    ];

    distributionKeys.forEach(key => {
        const calcData = calculators[key];
        
        // 1. Evento de CÁLCULO
        const calcBtn = document.getElementById(`${key}-calc-btn`);
        if (calcBtn) {
            calcBtn.addEventListener('click', () => {
                const params = {};
                let allValid = true;

                // Recoger Parámetros (p, n, lambda, etc.)
                calcData.inputIds.forEach(id => {
                    const inputElement = document.getElementById(`${key}-input-${id}`);
                    const value = parseFloat(inputElement.value);
                    
                    if (isNaN(value)) { allValid = false; }
                    
                    // N, K, n y r deben ser enteros
                    if (['N', 'K', 'n', 'r'].includes(id) && !Number.isInteger(value)) { allValid = false; }
                    
                    params[id] = value;
                });

                // Recoger Valor x (k)
                const xElement = document.getElementById(calcData.xInputId);
                const x = parseFloat(xElement.value);
                
                if (isNaN(x) || !Number.isInteger(x)) { allValid = false; }

                if (!allValid) {
                    alert(`¡Error en la ${calcData.title}! Verifica que todos los parámetros sean números válidos (p.ej., enteros, 0 < p < 1).`);
                    return;
                }
                
                // Calcular
                const results = calcData.calculate(params, x);

                // Mostrar Resultados
                document.getElementById(`${key}-result-ex`).textContent = isNaN(results.EX) ? 'ERROR' : results.EX.toFixed(6);
                document.getElementById(`${key}-result-varx`).textContent = isNaN(results.VarX) ? 'ERROR' : results.VarX.toFixed(6);
                document.getElementById(`${key}-result-px`).value = isNaN(results.PX) ? 'ERROR' : results.PX.toFixed(6);
            });
        }
        
        // 2. Evento de INFO Modal
        const infoBtn = document.getElementById(`${key}-info-btn`);
        if (infoBtn) {
            infoBtn.addEventListener('click', () => {
                if (typeof openModal === 'function') {
                    openModal(
                        `Distribución ${calcData.title}`, 
                        calcData.text, 
                        calcData.formulaP, 
                        calcData.formulaEX, 
                        calcData.formulaVarX
                    );
                }
            });
        }
    });
});
