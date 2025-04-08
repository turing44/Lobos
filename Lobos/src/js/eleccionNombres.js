// Empezamos con un contador de jugadores en 1
let contadorJugadores = 1;

// Función para agregar nuevos jugadores
function agregarJugador() {
    contadorJugadores++; // Incrementamos el número del jugador

    // Creamos un nuevo div que tendrá el campo de entrada
    const nuevoCampoJugador = document.createElement('div');
    nuevoCampoJugador.classList.add('player-input'); // Añadimos estilo al nuevo campo

    // Creamos el HTML del nuevo campo de jugador
    nuevoCampoJugador.innerHTML = `
                <label for="jugador${contadorJugadores}">Nombre del Jugador ${contadorJugadores}:</label>
                <input type="text" id="jugador${contadorJugadores}" name="jugador${contadorJugadores}" required>
            `;

    // Agregamos el nuevo campo al formulario
    document.getElementById('listaJugadores').appendChild(nuevoCampoJugador);
}

// Cuando el formulario se envíe
document.getElementById('formularioJugadores').addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evitamos que el formulario se envíe de la manera tradicional

    // Creamos un arreglo para guardar los nombres de los jugadores
    const jugadores = [];

    // Recogemos todos los campos de entrada
    const entradas = document.querySelectorAll('input[type="text"]');

    // Agregamos cada valor de campo al arreglo de jugadores
    entradas.forEach(function(entrada) {
        jugadores.push(entrada.value);
    });

    // Mostramos los nombres de los jugadores
    alert("Jugadores: " + jugadores.join(", "));
});