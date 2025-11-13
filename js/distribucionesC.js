// Información de las distribuciones
const distributionInfo = {
    uniforme: {
        title: "Distribución Uniforme",
        text: "La distribución uniforme continua describe una variable aleatoria que tiene igual probabilidad de tomar cualquier valor dentro de un intervalo [a, b]. Todos los valores en el intervalo son igualmente probables.",
        formulaP: "f(x) = \\begin{cases} \\frac{1}{b-a} & \\text{si } a \\leq x \\leq b \\\\ 0 & \\text{en otro caso} \\end{cases}",
        formulaEX: "E[X] = \\frac{a+b}{2}",
        formulaVarX: "Var(X) = \\frac{(b-a)^2}{12}"
    },
    normal: {
        title: "Distribución Normal",
        text: "La distribución normal (o gaussiana) es una de las distribuciones más importantes en estadística. Tiene forma de campana y está completamente determinada por su media (μ) y desviación estándar (σ).",
        formulaP: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}",
        formulaEX: "E[X] = \\mu",
        formulaVarX: "Var(X) = \\sigma^2"
    },
    exponencial: {
        title: "Distribución Exponencial",
        text: "La distribución exponencial modela el tiempo entre eventos en un proceso de Poisson. Tiene la propiedad de falta de memoria, lo que significa que la probabilidad de que un evento ocurra en el futuro no depende de cuánto tiempo ha pasado.",
        formulaP: "f(x) = \\begin{cases} \\lambda e^{-\\lambda x} & \\text{si } x \\geq 0 \\\\ 0 & \\text{si } x < 0 \\end{cases}",
        formulaEX: "E[X] = \\frac{1}{\\lambda}",
        formulaVarX: "Var(X) = \\frac{1}{\\lambda^2}"
    },
    lognormal: {
        title: "Distribución Log-Normal",
        text: "Una variable aleatoria tiene distribución log-normal si su logaritmo natural está normalmente distribuido. Es útil para modelar valores que no pueden ser negativos y que tienen una distribución asimétrica positiva.",
        formulaP: "f(x) = \\frac{1}{x\\sigma\\sqrt{2\\pi}} e^{-\\frac{(\\ln x - \\mu)^2}{2\\sigma^2}}",
        formulaEX: "E[X] = e^{\\mu + \\frac{\\sigma^2}{2}}",
        formulaVarX: "Var(X) = (e^{\\sigma^2} - 1)e^{2\\mu + \\sigma^2}"
    },
    gamma: {
        title: "Distribución Gamma",
        text: "La distribución gamma es una distribución de dos parámetros (α, β) que generaliza la distribución exponencial. Se utiliza para modelar tiempos de espera hasta que ocurren α eventos en un proceso de Poisson.",
        formulaP: "f(x) = \\frac{\\beta^\\alpha}{\\Gamma(\\alpha)} x^{\\alpha-1} e^{-\\beta x}",
        formulaEX: "E[X] = \\frac{\\alpha}{\\beta}",
        formulaVarX: "Var(X) = \\frac{\\alpha}{\\beta^2}"
    },
    beta: {
        title: "Distribución Beta",
        text: "La distribución beta es una distribución continua definida en el intervalo [0, 1]. Es útil para modelar proporciones o probabilidades. Sus parámetros α y β controlan la forma de la distribución.",
        formulaP: "f(x) = \\frac{x^{\\alpha-1}(1-x)^{\\beta-1}}{B(\\alpha, \\beta)}",
        formulaEX: "E[X] = \\frac{\\alpha}{\\alpha + \\beta}",
        formulaVarX: "Var(X) = \\frac{\\alpha\\beta}{(\\alpha+\\beta)^2(\\alpha+\\beta+1)}"
    }
};

// Función para obtener el tipo de probabilidad seleccionado
function getProbabilityType(distribution) {
    const selectedOption = document.querySelector(`#card-${distribution} .probability-option.selected`);
    return selectedOption ? selectedOption.getAttribute('data-type') : 'interval';
}

// Función Gamma (Γ) - Implementación usando la aproximación de Lanczos
function gammaFunction(z) {
    // Coeficientes para la aproximación de Lanczos
    const p = [
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];
    
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gammaFunction(1 - z));
    }
    
    z -= 1;
    let x = 0.99999999999980993;
    
    for (let i = 0; i < p.length; i++) {
        x += p[i] / (z + i + 1);
    }
    
    const t = z + p.length - 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

// Función Beta (B) - Implementación usando la función Gamma
function betaFunction(a, b) {
    return gammaFunction(a) * gammaFunction(b) / gammaFunction(a + b);
}

// Función Gamma Incompleta Regularizada
function regularizedGammaUpper(s, x) {
    if (x === 0) return 1;
    if (x < 0 || s <= 0) return NaN;
    
    const maxIterations = 100;
    const epsilon = 1e-10;
    
    let term = Math.pow(x, s) * Math.exp(-x) / gammaFunction(s);
    let sum = term;
    
    for (let k = 1; k <= maxIterations; k++) {
        term *= x / (s + k);
        sum += term;
        if (Math.abs(term) < epsilon) break;
    }
    
    return sum;
}

function regularizedGammaLower(s, x) {
    return 1 - regularizedGammaUpper(s, x);
}

// Función Beta Incompleta Regularizada
function regularizedBeta(x, a, b) {
    if (x === 0) return 0;
    if (x === 1) return 1;
    if (x < 0 || x > 1 || a <= 0 || b <= 0) return NaN;
    
    const maxIterations = 100;
    const epsilon = 1e-10;
    
    let term = Math.pow(x, a) * Math.pow(1 - x, b) / (a * betaFunction(a, b));
    let sum = term;
    
    for (let k = 0; k < maxIterations; k++) {
        term *= (a + k) * (a + b + k) * (1 - x) / ((a + k + 1) * (k + 1));
        sum += term;
        if (Math.abs(term) < epsilon) break;
    }
    
    return sum;
}

// Funciones de Modal
function openModal(title, text, formulaP, formulaEX, formulaVarX) {
    document.getElementById('modalTitle').innerHTML = title;
    document.getElementById('modalText').innerHTML = text;
    document.getElementById('modalFormula').innerHTML = formulaP ? `Función de Densidad f(x): $$${formulaP}$$` : '';
    document.getElementById('modalEX').innerHTML = formulaEX ? `Esperanza E[X]: ${formulaEX}` : '';
    document.getElementById('modalVarX').innerHTML = formulaVarX ? `Varianza Var(X): ${formulaVarX}` : '';
    document.getElementById('infoModal').style.display = "block";
    
    if (window.MathJax) {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "modalFormula", "modalEX", "modalVarX"]);
    }
}

// Funciones de cálculo actualizadas para todas las distribuciones
function calcularUniforme() {
    const a = parseFloat(document.getElementById('uniforme-input-a').value);
    const b = parseFloat(document.getElementById('uniforme-input-b').value);
    const probType = getProbabilityType('uniforme');
    
    if (isNaN(a) || isNaN(b)) {
        alert("Por favor, ingrese valores válidos para a y b");
        return;
    }
    
    if (a >= b) {
        alert("El límite inferior (a) debe ser menor que el límite superior (b)");
        return;
    }
    
    let fx = 0;
    let px = 0;
    let xValue = 0;
    
    // Obtener valores según el tipo de probabilidad
    if (probType === 'interval') {
        const x1 = parseFloat(document.getElementById('uniforme-input-x1').value);
        const x2 = parseFloat(document.getElementById('uniforme-input-x2').value);
        xValue = (x1 + x2) / 2;
        
        if (isNaN(x1) || isNaN(x2)) {
            alert("Por favor, ingrese valores válidos para los límites del intervalo");
            return;
        }
        
        const lower = Math.max(a, x1);
        const upper = Math.min(b, x2);
        if (upper > lower) {
            px = (upper - lower) / (b - a);
        }
    } else {
        const x = parseFloat(document.getElementById('uniforme-input-x').value);
        xValue = x;
        
        if (isNaN(x)) {
            alert("Por favor, ingrese un valor válido para x");
            return;
        }
        
        if (probType === 'less') {
            if (x <= a) px = 0;
            else if (x >= b) px = 1;
            else px = (x - a) / (b - a);
        } else { // greater
            if (x <= a) px = 1;
            else if (x >= b) px = 0;
            else px = (b - x) / (b - a);
        }
    }
    
    // Calcular densidad en el punto medio o en x
    if (xValue >= a && xValue <= b) {
        fx = 1 / (b - a);
    }
    
    // Calcular esperanza y varianza
    const ex = (a + b) / 2;
    const varx = Math.pow(b - a, 2) / 12;
    
    // Mostrar resultados
    document.getElementById('uniforme-result-fx').value = fx.toFixed(6);
    document.getElementById('uniforme-result-px').value = px.toFixed(6);
    document.getElementById('uniforme-result-ex').textContent = ex.toFixed(6);
    document.getElementById('uniforme-result-varx').textContent = varx.toFixed(6);
}

function calcularNormal() {
    const mu = parseFloat(document.getElementById('normal-input-mu').value);
    const sigma = parseFloat(document.getElementById('normal-input-sigma').value);
    const probType = getProbabilityType('normal');
    
    if (isNaN(mu) || isNaN(sigma) || sigma <= 0) {
        alert("Por favor, ingrese valores válidos para μ y σ (>0)");
        return;
    }
    
    let fx = 0;
    let px = 0;
    let xValue = 0;
    
    // Función de distribución acumulada normal
    const cdf = (val) => 0.5 * (1 + math.erf((val - mu) / (sigma * math.sqrt(2))));
    
    // Obtener valores según el tipo de probabilidad
    if (probType === 'interval') {
        const x1 = parseFloat(document.getElementById('normal-input-x1').value);
        const x2 = parseFloat(document.getElementById('normal-input-x2').value);
        xValue = (x1 + x2) / 2;
        
        if (isNaN(x1) || isNaN(x2)) {
            alert("Por favor, ingrese valores válidos para los límites del intervalo");
            return;
        }
        
        px = cdf(x2) - cdf(x1);
    } else {
        const x = parseFloat(document.getElementById('normal-input-x').value);
        xValue = x;
        
        if (isNaN(x)) {
            alert("Por favor, ingrese un valor válido para x");
            return;
        }
        
        if (probType === 'less') {
            px = cdf(x);
        } else { // greater
            px = 1 - cdf(x);
        }
    }
    
    // Calcular densidad
    fx = math.exp(-0.5 * math.pow((xValue - mu) / sigma, 2)) / (sigma * math.sqrt(2 * math.PI));
    
    // Calcular esperanza y varianza
    const ex = mu;
    const varx = math.pow(sigma, 2);
    
    // Mostrar resultados
    document.getElementById('normal-result-fx').value = fx.toFixed(6);
    document.getElementById('normal-result-px').value = px.toFixed(6);
    document.getElementById('normal-result-ex').textContent = ex.toFixed(6);
    document.getElementById('normal-result-varx').textContent = varx.toFixed(6);
}

function calcularExponencial() {
    const lambda = parseFloat(document.getElementById('exponencial-input-lambda').value);
    const probType = getProbabilityType('exponencial');
    
    if (isNaN(lambda) || lambda <= 0) {
        alert("Por favor, ingrese un valor válido para λ (>0)");
        return;
    }
    
    let fx = 0;
    let px = 0;
    let xValue = 0;
    
    // Obtener valores según el tipo de probabilidad
    if (probType === 'interval') {
        const x1 = parseFloat(document.getElementById('exponencial-input-x1').value);
        const x2 = parseFloat(document.getElementById('exponencial-input-x2').value);
        xValue = (x1 + x2) / 2;
        
        if (isNaN(x1) || isNaN(x2) || x1 < 0 || x2 < 0) {
            alert("Por favor, ingrese valores válidos para los límites del intervalo (≥0)");
            return;
        }
        
        px = math.exp(-lambda * x1) - math.exp(-lambda * x2);
    } else {
        const x = parseFloat(document.getElementById('exponencial-input-x').value);
        xValue = x;
        
        if (isNaN(x) || x < 0) {
            alert("Por favor, ingrese un valor válido para x (≥0)");
            return;
        }
        
        if (probType === 'less') {
            px = 1 - math.exp(-lambda * x);
        } else { // greater
            px = math.exp(-lambda * x);
        }
    }
    
    // Calcular densidad
    if (xValue >= 0) {
        fx = lambda * math.exp(-lambda * xValue);
    }
    
    // Calcular esperanza y varianza
    const ex = 1 / lambda;
    const varx = 1 / math.pow(lambda, 2);
    
    // Mostrar resultados
    document.getElementById('exponencial-result-fx').value = fx.toFixed(6);
    document.getElementById('exponencial-result-px').value = px.toFixed(6);
    document.getElementById('exponencial-result-ex').textContent = ex.toFixed(6);
    document.getElementById('exponencial-result-varx').textContent = varx.toFixed(6);
}

function calcularLognormal() {
    const mu = parseFloat(document.getElementById('lognormal-input-mu').value);
    const sigma = parseFloat(document.getElementById('lognormal-input-sigma').value);
    const probType = getProbabilityType('lognormal');
    
    if (isNaN(mu) || isNaN(sigma) || sigma <= 0) {
        alert("Por favor, ingrese valores válidos para μ y σ (>0)");
        return;
    }
    
    let fx = 0;
    let px = 0;
    let xValue = 0;
    
    // Función de distribución acumulada log-normal CORREGIDA
    const cdf = (val) => {
        if (val <= 0) return 0;
        const z = (Math.log(val) - mu) / sigma;
        return 0.5 * (1 + math.erf(z / Math.sqrt(2)));
    };
    
    if (probType === 'interval') {
        const x1 = parseFloat(document.getElementById('lognormal-input-x1').value);
        const x2 = parseFloat(document.getElementById('lognormal-input-x2').value);
        xValue = (x1 + x2) / 2;
        
        if (isNaN(x1) || isNaN(x2) || x1 <= 0 || x2 <= 0) {
            alert("Por favor, ingrese valores válidos para los límites del intervalo (>0)");
            return;
        }
        
        px = Math.max(0, cdf(x2) - cdf(x1)); // Asegurar que no sea negativo
    } else {
        const x = parseFloat(document.getElementById('lognormal-input-x').value);
        xValue = x;
        
        if (isNaN(x) || x <= 0) {
            alert("Por favor, ingrese un valor válido para x (>0)");
            return;
        }
        
        if (probType === 'less') {
            px = cdf(x);
        } else { // greater
            px = Math.max(0, 1 - cdf(x)); // Asegurar que no sea negativo
        }
    }
    
    // Calcular densidad CORREGIDA
    if (xValue > 0) {
        const exponent = -0.5 * Math.pow((Math.log(xValue) - mu) / sigma, 2);
        fx = Math.exp(exponent) / (xValue * sigma * Math.sqrt(2 * Math.PI));
    }
    
    // Calcular esperanza y varianza
    const ex = Math.exp(mu + Math.pow(sigma, 2) / 2);
    const varx = (Math.exp(Math.pow(sigma, 2)) - 1) * Math.exp(2 * mu + Math.pow(sigma, 2));
    
    // Mostrar resultados
    document.getElementById('lognormal-result-fx').value = fx.toFixed(6);
    document.getElementById('lognormal-result-px').value = px.toFixed(6);
    document.getElementById('lognormal-result-ex').textContent = ex.toFixed(6);
    document.getElementById('lognormal-result-varx').textContent = varx.toFixed(6);
}

// Función Gamma (Γ) - Implementación mejorada
function gammaFunction(z) {
    // Coeficientes para la aproximación de Lanczos
    const p = [
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];
    
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gammaFunction(1 - z));
    }
    
    z -= 1;
    let x = 0.99999999999980993;
    
    for (let i = 0; i < p.length; i++) {
        x += p[i] / (z + i + 1);
    }
    
    const t = z + p.length - 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

// Función Beta (B) - Implementación usando la función Gamma
function betaFunction(a, b) {
    return gammaFunction(a) * gammaFunction(b) / gammaFunction(a + b);
}

// Función Gamma Incompleta Regularizada Inferior - IMPLEMENTACIÓN CORREGIDA
function regularizedGammaLower(s, x) {
    if (x < 0) return 0;
    if (x === 0) return 0;
    if (s <= 0) return NaN;
    
    // Para valores grandes de x, usar la relación con la función gamma superior
    if (x > s + 10) {
        return 1 - regularizedGammaUpper(s, x);
    }
    
    const maxIterations = 1000;
    const epsilon = 1e-15;
    
    let term = 1 / s;
    let sum = term;
    
    for (let k = 1; k <= maxIterations; k++) {
        term = term * x / (s + k);
        const prevSum = sum;
        sum += term;
        
        if (Math.abs(term) < epsilon || Math.abs(sum - prevSum) < epsilon) {
            break;
        }
    }
    
    const result = Math.pow(x, s) * Math.exp(-x) * sum / gammaFunction(s);
    return Math.max(0, Math.min(1, result));
}

// Función Gamma Incompleta Regularizada Superior
function regularizedGammaUpper(s, x) {
    if (x <= 0) return 1;
    if (s <= 0) return NaN;
    
    const maxIterations = 1000;
    const epsilon = 1e-15;
    
    let term = 1;
    let sum = term;
    
    for (let k = 1; k <= maxIterations; k++) {
        term = term * (s - k) / x;
        if (k > s) break; // La serie diverge cuando k > s
        const prevSum = sum;
        sum += term;
        
        if (Math.abs(term) < epsilon || Math.abs(sum - prevSum) < epsilon) {
            break;
        }
    }
    
    const result = Math.pow(x, s) * Math.exp(-x) * sum / gammaFunction(s);
    return Math.max(0, Math.min(1, result));
}

// Función Beta Incompleta Regularizada - IMPLEMENTACIÓN COMPLETAMENTE NUEVA
function regularizedBeta(x, a, b) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    if (a <= 0 || b <= 0) return NaN;
    
    // Para x > 0.5, usar la relación de simetría
    if (x > 0.5) {
        return 1 - regularizedBeta(1 - x, b, a);
    }
    
    const maxIterations = 1000;
    const epsilon = 1e-15;
    
    let term = 1;
    let sum = term;
    
    for (let k = 0; k < maxIterations; k++) {
        term = term * (a + k) * (1 - x) / ((a + b + k) * (k + 1));
        const prevSum = sum;
        sum += term;
        
        if (Math.abs(term) < epsilon || Math.abs(sum - prevSum) < epsilon) {
            break;
        }
    }
    
    const result = Math.pow(x, a) * Math.pow(1 - x, b) * sum / (a * betaFunction(a, b));
    return Math.max(0, Math.min(1, result));
}

// Función Gamma CORREGIDA
function calcularGamma() {
    const alpha = parseFloat(document.getElementById('gamma-input-alpha').value);
    const beta_val = parseFloat(document.getElementById('gamma-input-beta').value);
    const probType = getProbabilityType('gamma');
    
    if (isNaN(alpha) || isNaN(beta_val) || alpha <= 0 || beta_val <= 0) {
        alert("Por favor, ingrese valores válidos para α (>0) y β (>0)");
        return;
    }
    
    let fx = 0;
    let px = 0;
    let xValue = 0;
    
    console.log("Gamma - alpha:", alpha, "beta:", beta_val, "probType:", probType);
    
    if (probType === 'interval') {
        const x1 = parseFloat(document.getElementById('gamma-input-x1').value);
        const x2 = parseFloat(document.getElementById('gamma-input-x2').value);
        xValue = (x1 + x2) / 2;
        
        if (isNaN(x1) || isNaN(x2) || x1 < 0 || x2 < 0) {
            alert("Por favor, ingrese valores válidos para los límites del intervalo (≥0)");
            return;
        }
        
        console.log("Gamma - x1:", x1, "x2:", x2);
        
        // Calcular CDF usando la nueva implementación
        const cdf1 = regularizedGammaLower(alpha, beta_val * x1);
        const cdf2 = regularizedGammaLower(alpha, beta_val * x2);
        px = cdf2 - cdf1;
        
        console.log("Gamma - cdf1:", cdf1, "cdf2:", cdf2, "px:", px);
    } else {
        const x = parseFloat(document.getElementById('gamma-input-x').value);
        xValue = x;
        
        if (isNaN(x) || x < 0) {
            alert("Por favor, ingrese un valor válido para x (≥0)");
            return;
        }
        
        const cdf = regularizedGammaLower(alpha, beta_val * x);
        if (probType === 'less') {
            px = cdf;
        } else { // greater
            px = 1 - cdf;
        }
    }
    
    // Calcular densidad
    if (xValue > 0) {
        const gamma_alpha = gammaFunction(alpha);
        if (gamma_alpha > 0 && isFinite(gamma_alpha)) {
            fx = (Math.pow(beta_val, alpha) / gamma_alpha) * 
                 Math.pow(xValue, alpha - 1) * 
                 Math.exp(-beta_val * xValue);
        }
    }
    
    // Calcular esperanza y varianza
    const ex = alpha / beta_val;
    const varx = alpha / Math.pow(beta_val, 2);
    
    console.log("Gamma - fx:", fx, "px:", px, "ex:", ex, "varx:", varx);
    
    // Mostrar resultados
    document.getElementById('gamma-result-fx').value = isFinite(fx) ? fx.toFixed(6) : "Error";
    document.getElementById('gamma-result-px').value = isFinite(px) ? Math.max(0, Math.min(1, px)).toFixed(6) : "Error";
    document.getElementById('gamma-result-ex').textContent = ex.toFixed(6);
    document.getElementById('gamma-result-varx').textContent = varx.toFixed(6);
}

// Función Beta CORREGIDA
function calcularBeta() {
    const alpha = parseFloat(document.getElementById('beta-input-alpha').value);
    const beta_val = parseFloat(document.getElementById('beta-input-beta').value);
    const probType = getProbabilityType('beta');
    
    if (isNaN(alpha) || isNaN(beta_val) || alpha <= 0 || beta_val <= 0) {
        alert("Por favor, ingrese valores válidos para α (>0) y β (>0)");
        return;
    }
    
    let fx = 0;
    let px = 0;
    let xValue = 0;
    
    console.log("Beta - alpha:", alpha, "beta:", beta_val, "probType:", probType);
    
    if (probType === 'interval') {
        const x1 = parseFloat(document.getElementById('beta-input-x1').value);
        const x2 = parseFloat(document.getElementById('beta-input-x2').value);
        xValue = (x1 + x2) / 2;
        
        if (isNaN(x1) || isNaN(x2) || x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) {
            alert("Por favor, ingrese valores válidos para los límites del intervalo (0 ≤ x ≤ 1)");
            return;
        }
        
        console.log("Beta - x1:", x1, "x2:", x2);
        
        // Calcular CDF usando la nueva implementación
        const cdf1 = regularizedBeta(x1, alpha, beta_val);
        const cdf2 = regularizedBeta(x2, alpha, beta_val);
        px = cdf2 - cdf1;
        
        console.log("Beta - cdf1:", cdf1, "cdf2:", cdf2, "px:", px);
    } else {
        const x = parseFloat(document.getElementById('beta-input-x').value);
        xValue = x;
        
        if (isNaN(x) || x < 0 || x > 1) {
            alert("Por favor, ingrese un valor válido para x (0 ≤ x ≤ 1)");
            return;
        }
        
        const cdf = regularizedBeta(x, alpha, beta_val);
        if (probType === 'less') {
            px = cdf;
        } else { // greater
            px = 1 - cdf;
        }
    }
    
    // Calcular densidad
    if (xValue > 0 && xValue < 1) {
        const beta_func = betaFunction(alpha, beta_val);
        if (beta_func > 0 && isFinite(beta_func)) {
            fx = Math.pow(xValue, alpha - 1) * 
                 Math.pow(1 - xValue, beta_val - 1) / 
                 beta_func;
        }
    }
    
    // Calcular esperanza y varianza
    const ex = alpha / (alpha + beta_val);
    const varx = (alpha * beta_val) / (Math.pow(alpha + beta_val, 2) * (alpha + beta_val + 1));
    
    console.log("Beta - fx:", fx, "px:", px, "ex:", ex, "varx:", varx);
    
    // Mostrar resultados
    document.getElementById('beta-result-fx').value = isFinite(fx) ? fx.toFixed(6) : "Error";
    document.getElementById('beta-result-px').value = isFinite(px) ? Math.max(0, Math.min(1, px)).toFixed(6) : "Error";
    document.getElementById('beta-result-ex').textContent = ex.toFixed(6);
    document.getElementById('beta-result-varx').textContent = varx.toFixed(6);
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Asignar eventos a los botones de información
    document.querySelectorAll('.btn-info').forEach(button => {
        button.addEventListener('click', function() {
            const key = this.getAttribute('data-info-key');
            const info = distributionInfo[key];
            if (info) {
                openModal(info.title, info.text, info.formulaP, info.formulaEX, info.formulaVarX);
            }
        });
    });

    // Asignar eventos a los botones de cálculo
    document.getElementById('uniforme-calc-btn').addEventListener('click', calcularUniforme);
    document.getElementById('normal-calc-btn').addEventListener('click', calcularNormal);
    document.getElementById('exponencial-calc-btn').addEventListener('click', calcularExponencial);
    document.getElementById('lognormal-calc-btn').addEventListener('click', calcularLognormal);
    document.getElementById('gamma-calc-btn').addEventListener('click', calcularGamma);
    document.getElementById('beta-calc-btn').addEventListener('click', calcularBeta);

    // Cerrar modal
    document.getElementById('closeModalBtn').onclick = function() {
        document.getElementById('infoModal').style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == document.getElementById('infoModal')) {
            document.getElementById('infoModal').style.display = "none";
        }
    }
});