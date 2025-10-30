// Archivo: esperanza.js

document.addEventListener("DOMContentLoaded", () => {

    // --- LÓGICA DE ESPERANZA MATEMÁTICA DISCRETA ---

    const cantidadDiscreta = document.getElementById("cantidadDiscreta");
    const generarDiscretaBtn = document.getElementById("generarDiscreta");
    const inputsDiscretaContainer = document.getElementById("inputsDiscreta");
    const calcularDiscretaBtn = document.getElementById("calcularDiscreta");
    const resultadoDiscreta = document.getElementById("resultadoDiscreta");

    generarDiscretaBtn.addEventListener("click", () => {
        const N = parseInt(cantidadDiscreta.value);

        if (N > 0 && N <= 10) { 
            inputsDiscretaContainer.innerHTML = ''; 
            
            for (let i = 1; i <= N; i++) {
                const row = document.createElement('div');
                row.className = 'grid grid-cols-2 gap-2';
                row.innerHTML = `
                    <input id="dx${i}" type="number" step="any" class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="x${i} (Valor)">
                    <input id="dp${i}" type="number" step="any" min="0" class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="P(x${i}) (Prob)">
                `;
                inputsDiscretaContainer.appendChild(row);
            }
            calcularDiscretaBtn.classList.remove('hidden');
            resultadoDiscreta.textContent = '---';
        } else {
            alert("Por favor, ingresa un número válido de pares (entre 1 y 10).");
            inputsDiscretaContainer.innerHTML = '';
            calcularDiscretaBtn.classList.add('hidden');
        }
    });

    calcularDiscretaBtn.addEventListener("click", () => {
        const N = parseInt(cantidadDiscreta.value);
        let esperanza = 0;
        let sumaProbabilidades = 0;
        let esValido = true;

        for (let i = 1; i <= N; i++) {
            const xi = parseFloat(document.getElementById(`dx${i}`).value);
            const pi = parseFloat(document.getElementById(`dp${i}`).value);
            
            if (isNaN(xi) || isNaN(pi) || pi < 0) { 
                esValido = false;
                break;
            }

            esperanza += xi * pi;
            sumaProbabilidades += pi;
        }

        if (!esValido) {
            resultadoDiscreta.textContent = '¡Error! Verifica que todos los campos sean números y que P(xi) ≥ 0.';
            resultadoDiscreta.className = 'text-xl font-bold text-red-600';
            return;
        }

        if (Math.abs(sumaProbabilidades - 1) > 1e-4) {
            resultadoDiscreta.textContent = `¡Advertencia! La suma P(xi) es ${sumaProbabilidades.toFixed(4)}. E[X] = ${esperanza.toFixed(6)}`;
            resultadoDiscreta.className = 'text-xl font-bold text-orange-600';
        } else {
            resultadoDiscreta.textContent = esperanza.toFixed(6);
            resultadoDiscreta.className = 'text-2xl font-bold text-gray-800';
        }
    });


    // --- LÓGICA DE ESPERANZA MATEMÁTICA CONTINUA (MÚLTIPLES TRAMOS) ---

    const cantidadContinua = document.getElementById("cantidadContinua");
    const generarContinuaBtn = document.getElementById("generarContinua");
    const inputsContinuaContainer = document.getElementById("inputsContinua");
    const calcularContinuaBtn = document.getElementById("calcularContinua");
    const resultadoContinua = document.getElementById("resultadoContinua");

    /**
     * Implementación del método de Simpson para integración numérica.
     * @param {string} funcString La función f(x) ingresada por el usuario (ej: "k * x * x").
     * @param {number} a Límite inferior.
     * @param {number} b Límite superior.
     * @param {boolean} isKIntegral Si es true, calcula Integral(f(x)) (para k). Si es false, calcula Integral(x*f(x)) (para E[X]).
     * @param {number} kValue El valor de k a sustituir (usa 1.0 si isKIntegral es true).
     */
    function integrateSimpson(funcString, a, b, n = 10000, isKIntegral = false, kValue = 1.0) {
        if (n % 2 !== 0) n++; 
        const h = (b - a) / n;
        let sum = 0;

        // 1. Pre-procesamiento y sustitución de k
        let finalFuncString = funcString.replace(/t/g, 'x'); // Estandarizar a 'x'
        
        // Sustituir 'k' por su valor (o 1.0 si estamos calculando el núcleo para encontrar k)
        finalFuncString = finalFuncString.replace(/k/g, `(${kValue})`).replace(/K/g, `(${kValue})`);
        
        // 2. Definición del integrando (la función a evaluar)
        const integrand = new Function('x', `
            const Math = window.Math;
            let expr = "${finalFuncString}";

            if (!${isKIntegral}) {
                // Para E[X], la función es g(x) = x * f(x)
                expr = "x * (" + expr + ")";
            }

            try {
                // Evaluar la expresión. Esto debería ser robusto.
                // Es crucial que el usuario use 'x * x', 'Math.pow(x, 2)', o Math.exp()
                const result = eval(expr); 
                return isNaN(result) || !isFinite(result) ? NaN : result; 
            } catch (e) {
                return NaN; // Error de sintaxis o cálculo
            }
        `);

        // 3. Integración
        try {
            // Términos de los extremos (f(a) + f(b))
            let val_a = integrand(a);
            let val_b = integrand(b);
            if (isNaN(val_a) || isNaN(val_b)) return NaN;
            sum += val_a + val_b;

            for (let i = 1; i < n; i++) {
                const x_i = a + i * h;
                const y_i = integrand(x_i);

                if (isNaN(y_i)) { return NaN; } // Error crítico: detener
                
                if (i % 2 !== 0) {
                    sum += 4 * y_i;
                } else {
                    sum += 2 * y_i;
                }
            }
        } catch (e) {
            return NaN; // Error durante el loop
        }

        return (h / 3) * sum;
    }


    generarContinuaBtn.addEventListener("click", () => {
        const N = parseInt(cantidadContinua.value);

        if (N > 0 && N <= 5) { 
            inputsContinuaContainer.innerHTML = '';
            
            for (let i = 1; i <= N; i++) {
                const tramoDiv = document.createElement('div');
                tramoDiv.className = 'p-3 border-2 border-green-200 rounded-lg space-y-2';
                tramoDiv.innerHTML = `
                    <h4 class="font-semibold text-gray-700 text-sm">Tramo ${i}</h4>
                    <input id="cf${i}" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 font-mono text-sm" placeholder="Función f(x) (Ej: k * x * x)">
                    <p class="text-xs text-gray-500">Usar 'x' o 't'. Para x² usar 'x * x' o 'Math.pow(x, 2)'. Para $e^y$ usar Math.exp(y).</p>
                    <div class="grid grid-cols-2 gap-2">
                        <input id="ca${i}" type="number" step="any" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm" placeholder="Límite Inferior (a)">
                        <input id="cb${i}" type="number" step="any" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm" placeholder="Límite Superior (b)">
                    </div>
                `;
                inputsContinuaContainer.appendChild(tramoDiv);
            }
            calcularContinuaBtn.classList.remove('hidden');
            resultadoContinua.textContent = '---';
        } else {
            alert("Por favor, ingresa un número válido de tramos (entre 1 y 5).");
            inputsContinuaContainer.innerHTML = '';
            calcularContinuaBtn.classList.add('hidden');
        }
    });


    calcularContinuaBtn.addEventListener("click", () => {
        const N = parseInt(cantidadContinua.value);
        let esperanzaTotal = 0;
        let tramosFallidos = [];

        for (let i = 1; i <= N; i++) {
            const funcString = document.getElementById(`cf${i}`).value.trim();
            const a = parseFloat(document.getElementById(`ca${i}`).value);
            const b = parseFloat(document.getElementById(`cb${i}`).value);

            // Validaciones básicas de límites y función
            if (funcString === "" || isNaN(a) || isNaN(b) || a >= b) {
                tramosFallidos.push(i);
                continue;
            }

            let k_value = 1.0; 
            
            // --- Paso 1: Determinar y calcular k si es necesario ---
            if (funcString.includes('k') || funcString.includes('K')) {
                // Calcular la integral base (núcleo de f(x) sin k)
                // Usamos kValue=1.0 por defecto aquí.
                const integral_nucleo = integrateSimpson(funcString, a, b, 10000, true, 1.0);
                
                if (isNaN(integral_nucleo) || integral_nucleo < 1e-9) { 
                    tramosFallidos.push(i);
                    continue;
                }
                
                // Despejar k: k = 1 / Integral(f_nucleo(x))
                k_value = 1 / integral_nucleo;
            }

            // --- Paso 2: Calcular E[X] = Integral(x * f(x)) usando el valor de k ---
            // Usamos kValue calculado en el paso 1.
            const esperanzaTramo = integrateSimpson(funcString, a, b, 10000, false, k_value);

            if (isNaN(esperanzaTramo)) {
                tramosFallidos.push(i);
                continue;
            }

            esperanzaTotal += esperanzaTramo;
        }

        // Manejo de errores y visualización
        if (tramosFallidos.length > 0) {
            resultadoContinua.textContent = `¡Error! Revisa la función o límites en los tramos: ${tramosFallidos.join(', ')}. Recuerda usar 'x * x' o 'Math.pow(x, 2)'.`;
            resultadoContinua.className = 'text-xl font-bold text-red-600';
        } else {
            resultadoContinua.textContent = esperanzaTotal.toFixed(6);
            resultadoContinua.className = 'text-2xl font-bold text-gray-800';
        }
    });


    // --- LÓGICA DE MODAL (INFORMACIÓN) ---

    const esperanzaData = {
        discreta: {
            title: "Esperanza Matemática Discreta",
            text: `
                La Esperanza Matemática para una 
                <strong>variable aleatoria discreta</strong> (X) es el promedio ponderado de los valores.
                Se calcula como la suma de cada valor posible 
                ($x_i$) multiplicado por su probabilidad de ocurrencia ($P(x_i)$).
            `,
            formula: `E[X] = \\sum_{i=1}^{n} x_i \\cdot P(x_i)`
        },
        continua: {
            title: "Esperanza Matemática Continua (Tramos)",
            text: `
                Para una <strong>variable aleatoria continua</strong> (X) con función de densidad 
                definida por tramos, la esperanza total es la suma de las integrales en cada tramo.
                <br>
                <strong>⚠️ Formato de la función:</strong> Debe usar la sintaxis de JavaScript. 
                Utilice <code>x</code> o <code>t</code> como variable. Para $x^2$ use <code>x * x</code> o <code>Math.pow(x, 2)</code>.
                Si la función contiene <code>k</code>, el programa lo calcula automáticamente primero.
            `,
            formula: `E[X] = \\sum_i \\int_{a_i}^{b_i} x f_i(x) dx`
        }
    };

    const infoButtons = document.querySelectorAll(".btn-info");
    
    infoButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const key = e.currentTarget.getAttribute('data-info-key');
            const data = esperanzaData[key];

            if (data) {
                openModal(data.title, data.text, `$$${data.formula}$$`);
            }
        });
    });
});