const inputsJugadores = document.getElementById("inputs-jugadores");
const btnAgregarNuevoJugador = document.getElementById("agregar-nuevo-jugador");
const formulario = document.getElementById("formulario-jugadores");



let contador = 1;

btnAgregarNuevoJugador.addEventListener("click", () => {
    const nuevoCampo = document.createElement("nuevoCampo");
    nuevoCampo.innerHTML =
        `<input 
        type="text" 
        placeholder="Nombre del jugador ${contador}" 
        
        <!--le especifico la clase para luego meter en un array todos los inputs que tenga esa clase-->
        class="input-nombre" 
        
        id="jugador-${contador}" 
        required>
        `;

    inputsJugadores.appendChild(nuevoCampo);

    contador++;
});

formulario.addEventListener("submit", e => {
    e.preventDefault(); // los formularios por defecto al hacer submit recargan la pagina,
                        // ponemos esto para que no lo haga


    const inputs = document.querySelectorAll(".input-nombre");

    const listaNombres = Array.from(inputs)
        .map(input => input.value.trim());

    localStorage.listaNombres = JSON.stringify(listaNombres);


    console.log("Nombres: ", localStorage.listaNombres);
    window.location.href = "dashboardPersonajes.html";
});
