document.addEventListener("DOMContentLoaded", () => {
  const menu = `
    <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div class="flex justify-between items-center px-6 py-3">
        <!-- Logo -->
        <div class="text-2xl font-extrabold text-blue-600">            <a href="index.html"
            >La calculadora</a></div>

        <!-- Botón Hamburguesa -->
        <button id="menu-toggle"
          class="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Menú principal -->
        <ul id="menuLinks"
          class="hidden md:flex md:space-x-6 flex-col md:flex-row md:items-center absolute md:static left-0 top-14 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-10 transition-all duration-300 md:rounded-none rounded-b-lg">
          
          <li>
            <a href="index.html"
              class="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">Chebyshev</a>
          </li>

          <li>
            <a href="markov.html"
              class="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">Markov</a>
          </li>

          <!-- Submenú -->
          <li class="relative">
            <div class="flex items-center justify-between px-4 py-2 text-gray-700 font-medium">
              <a href="./distribucionesD.html" class="hover:text-blue-600">
                Discretas
              </a>
              <button id="distribuciones-btn" class="ml-2 text-gray-700 hover:text-blue-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <!-- Lista desplegable -->
            <ul id="sub-menu"
                class="hidden md:absolute left-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-56 transition-all duration-200 md:z-50 z-0">
              <li><a href="#card-bernoulli"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Bernoulli</a></li>
              <li><a href="#card-binomial"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Binomial</a></li>
              <li><a href="#card-geometrica"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Geométrica</a></li>
              <li><a href="#card-binomialNegativa"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Binomial Negativa (Ensayo)</a></li>
              <li><a href="#card-binomialNegativaFracasos"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Binomial Negativa (Fracasos)</a></li>
              <li><a href="#card-poisson"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Poisson</a></li>
              <li><a href="#card-hipergeometrica"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Hipergeométrica</a></li>
            </ul>
          </li>

          

          <li class="relative">

            <div class="flex items-center justify-between px-4 py-2 text-gray-700 font-medium">
              <a href="continuas.html" class="hover:text-blue-600">
                Continuas
              </a>
              <button id="continuas-btn" class="ml-2 text-gray-700 hover:text-blue-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <!-- Lista desplegable -->
            <ul id="sub-menu-dos"
              class="hidden absolute left-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-56 transition-all duration-200">
              <li><a href="#card-uniforme"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Uniforme</a></li>
              <li><a href="#card-normal"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Normal</a></li>
              <li><a href="#card-exponencial"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Exponencial</a></li>
              <li><a href="#card-lognormal"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Log-normal</a></li>
              <li><a href="#card-gamma"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Gamma</a></li>
              <li><a href="#card-beta"
                class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Beta</a></li>
             
            </ul>
          </li>
        </ul>
      </div>
    </nav>

  `;

  document.body.insertAdjacentHTML("afterbegin", menu);

  const menuToggle = document.getElementById("menu-toggle");
  const menuLinks = document.getElementById("menuLinks");

  menuToggle.addEventListener("click", () => {
    menuLinks.classList.toggle("hidden");
  });

  const distribucionesBtn = document.getElementById("distribuciones-btn");
  const subMenu = document.getElementById("sub-menu");

  distribucionesBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    subMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#distribuciones-btn")) {
      subMenu.classList.add("hidden");
    }
  });

  const continuasBtn = document.getElementById("continuas-btn");
  const subMenuDos = document.getElementById("sub-menu-dos");
  continuasBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    subMenuDos.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#continuas-btn")) {
      subMenuDos.classList.add("hidden");
    }
  });

  document.querySelectorAll("#sub-menu a, #sub-menu-dos a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 100; // altura del menú
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    });
  });

  //envolver tarjetas y resaltar
  const cards = document.querySelectorAll(".card");

  document.querySelectorAll("#sub-menu a, #sub-menu-dos a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 100;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });

        cards.forEach((c) =>
          c.classList.remove(
            "ring-4",
            "ring-red-400",
            "shadow-2xl",
            "scale-[1.02]"
          )
        );

        target.classList.add(
          "ring-4",
          "ring-red-400",
          "shadow-2xl",
          "scale-[1.02]",
          "transition-all",
          "duration-500"
        );
      }
    });
  });
  // === Estilo global moderno para SELECT y OPTION ===
const globalSelectStyles = `



select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 220px;
  padding: 0.6rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.6rem;
  background: #f9fafb url('data:image/svg+xml;utf8,<svg fill="%236b7280" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 8l3 3 3-3z"/></svg>') no-repeat right 0.8rem center;
  background-size: 1rem;
  color: #1e293b;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.50s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

select:hover {
  border-color: #94a3b8;
  background-color: #f1f5f9;
}

select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.25);
  background-color: #fff;
}

option {
  font-weight: 500;
  background-color: #fff;
  color: #1e293b;
}

option:hover {
  background-color: #e2e8f0;
}

option:checked {
  background-color: #dbeafe;
  color: #1d4ed8;
}
`;

// Inyectar los estilos globales al documento
const styleTag = document.createElement("style");
styleTag.textContent = globalSelectStyles;
document.head.appendChild(styleTag);

});
