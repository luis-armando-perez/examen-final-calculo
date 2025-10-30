// Mantén tu objeto de títulos como ya lo tienes:
const modalTitles = {
  union: "Unión (A ∪ B)",
  interseccion: "Intersección (A ∩ B)",
  "diferencia-ab": "Diferencia (A - B)",
  "diferencia-ba": "Diferencia (B - A)",
  "complemento-a": "Complemento (A')",
  "complemento-b": "Complemento (B')",
  "diferencia-simetrica": "Diferencia Simétrica (A △ B)",
  "producto-cartesiano": "Producto Cartesiano (A × B)",
};

function openModal(operation) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const modalTitle = document.getElementById("modal-title");
  const modalContentText = document.getElementById("modal-content-text");

  const modalFormula = document.getElementById("modal-content-formula");

  modalTitle.textContent = modalTitles[operation] || "Operación";


  const info = (typeof conceptos !== "undefined") ? conceptos[operation] : null;
  modalContentText.textContent = info?.concepto || "Sin información disponible.";
  modalFormula.textContent = info?.formula ? `$$${info.formula}$$` : "";

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  setTimeout(() => {
    modal.classList.remove("bg-opacity-50");
    modal.classList.add("bg-opacity-50");
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);

  if (window.MathJax && modalFormula.textContent) {
    MathJax.typesetPromise([modalFormula]).catch(() => {/* noop */});
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Cerrar modal con la tecla Escape (igual)
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});


document.getElementById("btnCalcular").addEventListener("click", () => {
  const conjuntoA = document.getElementById("conjuntoA").value.split(',').map(x => x.trim()).filter(x => x !== "");
  const conjuntoB = document.getElementById("conjuntoB").value.split(',').map(x => x.trim()).filter(x => x !== "");
  const conjuntoC = document.getElementById("conjuntoC").value.split(',').map(x => x.trim()).filter(x => x !== "");
  const conjuntoUni = document.getElementById("conjuntoUni").value.split(',').map(x => x.trim()).filter(x => x !== "");

  const A = new Set(conjuntoA);
  const B = new Set(conjuntoB);
  const C = new Set(conjuntoC);
  const Uni = new Set(conjuntoUni);

  const complementoA = new Set([...Uni].filter(x => !A.has(x)));
  const complementoB = new Set([...Uni].filter(x => !B.has(x)));

  
  const union = new Set([...A, ...B]);
  const interseccion = new Set([...A].filter(x => B.has(x)));
  const diferenciaAB = new Set([...A].filter(x => !B.has(x)));
  const diferenciaBA = new Set([...B].filter(x => !A.has(x)));

  const diferenciaSimetrica = new Set([...diferenciaAB, ...diferenciaBA]);

  const complementoDifSim = new Set([...Uni].filter(x => !diferenciaSimetrica.has(x)));

  const resultadoOperacionEspecial = new Set([...complementoDifSim].filter(x => C.has(x)));

  const resultadoDifSimInterC = new Set([...diferenciaSimetrica].filter(x => C.has(x)));


  document.getElementById("resultadoUnion").innerHTML = `<span class="text-gray-700">${[...union].join(", ")}</span>`;
  document.getElementById("resultadoInter").innerHTML = `<span class="text-gray-700">${[...interseccion].join(", ")}</span>`;
  document.getElementById("resultadoAB").innerHTML = `<span class="text-gray-700">${[...diferenciaAB].join(", ")}</span>`;
  document.getElementById("resultadoBA").innerHTML = `<span class="text-gray-700">${[...diferenciaBA].join(", ")}</span>`;
  document.getElementById("resultadoDif").innerHTML = `<span class="text-gray-700">${[...diferenciaSimetrica].join(", ")}</span>`;
  document.getElementById("complementoA").innerHTML = `<span class="text-gray-700">${[...complementoA].join(", ")}</span>`;
  document.getElementById("complementoB").innerHTML = `<span class="text-gray-700">${[...complementoB].join(", ")}</span>`;
  document.getElementById("combinacionesResultados").innerHTML = `<span class="text-gray-700">${[...resultadoOperacionEspecial].join(", ")}</span>`;
  document.getElementById("combinacionesResultadosDos").innerHTML = `<span class="text-gray-700">${[...resultadoDifSimInterC].join(", ")}</span>`;

});





