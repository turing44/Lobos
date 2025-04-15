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
        if (entrada.value.trim() !== '') {
            jugadores.push(entrada.value.trim());
        }
    });

    // Validar que haya al menos 5 jugadores
    if (jugadores.length < 5) {
        alert("Se requieren al menos 5 jugadores para iniciar el juego.");
        return;
    }

    // Guardar los nombres en localStorage
    localStorage.setItem('jugadores', JSON.stringify(jugadores));

    // Mostrar los nombres de los jugadores (opcional, para depuración)
    console.log("Jugadores guardados:", jugadores);

    // Redirigir a la página del juego
    window.location.href = '../pages/dashboardPersonajes.html';
});