document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ Plantilla del menú
  const menu = `
    <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div class="flex justify-between items-center px-6 py-3">
        <!-- Logo -->
        <div class="text-2xl font-extrabold text-blue-600">xddd</div>

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
            <a href="chebychev.html"
              class="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">Chebyshev</a>
          </li>

          <!-- Submenú -->
          <li class="relative">
            <button id="distribuciones-btn"
              class="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-medium flex items-center">
              <a href="./distribucionesD.html">Distribuciones</a>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Lista desplegable -->
            <ul id="sub-menu"
              class="hidden absolute left-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-56 transition-all duration-200">
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

          <li>
            <a href="markov.html"
              class="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">Markov</a>
          </li>
        </ul>
      </div>
    </nav>

  `;

  // 2️⃣ Insertamos el menú en el body (o donde quieras)
  document.body.insertAdjacentHTML("afterbegin", menu);

  // 3️⃣ Lógica del botón hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const menuLinks = document.getElementById("menuLinks");

  menuToggle.addEventListener("click", () => {
    menuLinks.classList.toggle("hidden");
  });

  // 4️⃣ Lógica del submenú “Distribuciones”
  const distribucionesBtn = document.getElementById("distribuciones-btn");
  const subMenu = document.getElementById("sub-menu");

  distribucionesBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    subMenu.classList.toggle("hidden");
  });

  // 5️⃣ Cerrar submenú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#distribuciones-btn")) {
      subMenu.classList.add("hidden");
    }
  });
});
