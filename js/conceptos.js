// conceptos.js
// OJO: dobles \\ en comandos LaTeX (p. ej., \\cup, \\cap)
const conceptos = {
    union: {
      concepto:
        "La unión de A y B contiene todos los elementos que están en al menos uno de los conjuntos.",
      formula: "A \\cup B = \\{\\, x \\mid x \\in A \\;\\lor\\; x \\in B \\,\\}"
    },
    interseccion: {
      concepto:
        "La intersección de A y B es el conjunto de elementos que ambos tienen en común.",
      formula: "A \\cap B = \\{\\, x \\mid x \\in A \\;\\land\\; x \\in B \\,\\}"
    },
    "diferencia-ab": {
      concepto:
        "La diferencia A − B contiene los elementos que están en A pero no en B.",
      formula: "A - B = \\{\\, x \\in A \\mid x \\notin B \\,\\}"
    },
    "diferencia-ba": {
      concepto:
        "La diferencia B − A contiene los elementos que están en B pero no en A.",
      formula: "B - A = \\{\\, x \\in B \\mid x \\notin A \\,\\}"
    },
    "complemento-a": {
      concepto:
        "El complemento de A (respecto del universo U) son los elementos que están en U pero no en A.",
      formula: "A' = U \\setminus A = \\{\\, x \\in U \\mid x \\notin A \\,\\}"
    },
    "complemento-b": {
      concepto:
        "El complemento de B (respecto del universo U) son los elementos que están en U pero no en B.",
      formula: "B' = U \\setminus B = \\{\\, x \\in U \\mid x \\notin B \\,\\}"
    },
    "diferencia-simetrica": {
      concepto:
        "La diferencia simétrica contiene los elementos que están en exactamente uno de los conjuntos.",
      formula:
        "A \\triangle B = (A - B) \\cup (B - A) = (A \\cup B) \\setminus (A \\cap B)"
    },
    "producto-cartesiano": {
      concepto:
        "El producto cartesiano de A y B es el conjunto de todos los pares ordenados (a, b) con a en A y b en B.",
      formula: "A \\times B = \\{\\, (a,b) \\mid a \\in A,\\; b \\in B \\,\\}"
    },
    "variacionesSinRepeticion": {
        titulo: "Variaciones sin repetición",
        concepto: "Es el número de formas de elegir y ordenar k elementos de un conjunto de n elementos, sin repetir ninguno.",
        formula: "V(n, k) = n! / (n - k)!"
    },
    "variacionesConRepeticion": {
        titulo: "Variaciones con repetición",
        concepto: "Es el número de formas de elegir y ordenar k elementos de un conjunto de n elementos, permitiendo repetir elementos.",
        formula: "V'(n, k) = n^k"
    },
    "permutacionesSinRepeticion": {
        titulo: "Permutaciones sin repetición",
        concepto: "Es el número de formas de ordenar todos los elementos de un conjunto de n elementos distintos.",
        formula: "P(n) = n!"
    },
    "permutacionesConRepeticion": {
        titulo: "Permutaciones con repetición",
        concepto: "Es el número de formas de ordenar los elementos de un conjunto cuando algunos elementos se repiten.",
        formula: "P(n; n1, n2, ..., nk) = n! / (n1! * n2! * ... * nk!)"
    }
  };
  