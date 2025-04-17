
//P.S MENSAJE DE ALYA: El codigo siguiente era generado todooooooo por ChatGPT, para probar si funcionan los metodos de clase juego , seguidemente si hara falto , se puede usar para finalizar el proyecto




const juego = new Juego();
let iniciado = false;
let currentVoter = null;

// Función para agregar un nuevo campo de jugador (para index.html)
function agregarJugador() {
    const listaJugadores = document.getElementById('listaJugadores');
    if (!listaJugadores) return;
    const numJugadores = listaJugadores.children.length + 1;

    const playerDiv = document.createElement('div');
    playerDiv.className = 'player-input';
    playerDiv.innerHTML = `
        <label for="jugador${numJugadores}">Nombre del Jugador ${numJugadores}:</label>
        <input type="text" id="jugador${numJugadores}" name="jugador${numJugadores}" required>
    `;
    listaJugadores.appendChild(playerDiv);
}

// Manejar el envío del formulario (para index.html)
document.getElementById('formularioJugadores')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputs = document.querySelectorAll('#listaJugadores input');
    const nombres = Array.from(inputs)
        .map(input => input.value.trim())
        .filter(nombre => nombre !== '');

    if (nombres.length < 5) {
        alert('Se requieren al menos 5 jugadores para iniciar el juego.');
        return;
    }

    try {
        localStorage.setItem('jugadores', JSON.stringify(nombres));
        console.log('Nombres guardados en localStorage:', nombres);

        iniciado = juego.iniciarJuego(nombres);
        if (!iniciado) {
            alert('Error al inicializar el juego. Intenta de nuevo.');
            return;
        }

        console.log('Redirigiendo a pantallaPrincipal.html');
        window.location.href = 'pantallaPrincipal.html';
    } catch (error) {
        console.error('Error al procesar el formulario:', error);
        alert('Ocurrió un error. Revisa la consola para más detalles.');
    }
});

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando juego');

    const playerList = document.getElementById('player-list');
    if (!playerList) {
        console.log('No se encontró player-list, probablemente estamos en index.html');
        return;
    }

    const nombresGuardados = localStorage.getItem('jugadores');
    if (nombresGuardados) {
        try {
            const nombres = JSON.parse(nombresGuardados);
            console.log('Nombres cargados desde localStorage:', nombres);

            if (!Array.isArray(nombres) || nombres.length < 5) {
                console.error('Nombres inválidos en localStorage:', nombres);
                playerList.innerHTML = '<p>Error: Datos de jugadores inválidos</p>';
                return;
            }

            iniciado = juego.iniciarJuego(nombres);
            if (!iniciado) {
                console.error('No se pudo inicializar el juego con los nombres guardados');
                playerList.innerHTML = '<p>Error: No se pudo iniciar el juego</p>';
                return;
            }

            renderMainScreen();
        } catch (error) {
            console.error('Error al parsear nombres desde localStorage:', error);
            playerList.innerHTML = '<p>Error: No se pudieron cargar los jugadores</p>';
        }
    } else {
        console.warn('No se encontraron nombres en localStorage');
        playerList.innerHTML = '<p>No hay jugadores. Regresa al formulario para agregar nombres.</p>';
    }
});

// Renderizar pantalla principal
function renderMainScreen() {
    console.log('Ejecutando renderMainScreen');

    const playerList = document.getElementById('player-list');
    if (!playerList) {
        console.error('Elemento player-list no encontrado');
        return;
    }

    if (!iniciado) {
        console.error('El juego no se inicializó correctamente');
        playerList.innerHTML = '<p>Error: No se pudo iniciar el juego</p>';
        return;
    }

    playerList.innerHTML = '';
    const jugadores = juego.getJugadores();
    console.log('Renderizando jugadores:', jugadores.map(j => j.getNombre()));

    if (jugadores.length === 0) {
        console.warn('No hay jugadores disponibles');
        playerList.innerHTML = '<p>No hay jugadores disponibles</p>';
        return;
    }

    jugadores.forEach(jugador => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        if (jugador.estaMuerto()) {
            playerDiv.classList.add('dead');
            playerDiv.textContent = `${jugador.getNombre()} (Muerto)`;
        } else if (jugador.haVotado()) {
            playerDiv.classList.add('voted');
            playerDiv.textContent = `${jugador.getNombre()} (Ya votó)`;
        } else {
            playerDiv.textContent = jugador.getNombre();
            playerDiv.onclick = () => {
                console.log(`Clic en jugador: ${jugador.getNombre()}`);
                showVoteScreen(jugador.getNombre());
            };
        }
        playerList.appendChild(playerDiv);
    });

    const resultElement = document.getElementById('result');
    if (resultElement) {
        console.log('Fase actual:', juego.getFase());
        resultElement.textContent = `Fase actual: ${juego.getFase()}`;
    } else {
        console.error('Elemento result no encontrado');
    }
}

// Mostrar pantalla de votación
function showVoteScreen(playerName) {
    console.log(`Mostrando pantalla de votación para: ${playerName}`);

    if (juego.getFase() !== 'dia') {
        console.warn('Intento de votar fuera de la fase día');
        alert('Solo se puede votar durante el día.');
        return;
    }

    const votante = juego.getJugadores().find(j => j.getNombre() === playerName);
    if (votante && votante.haVotado()) {
        console.warn(`El jugador ${playerName} ya votó`);
        alert('Ya has votado en esta ronda.');
        return;
    }

    currentVoter = playerName;
    const mainScreen = document.getElementById('main-screen');
    const voteScreen = document.getElementById('vote-screen');
    if (mainScreen && voteScreen) {
        mainScreen.style.display = 'none';
        voteScreen.style.display = 'block';
    } else {
        console.error('Elementos main-screen o vote-screen no encontrados');
        return;
    }

    const currentPlayer = document.getElementById('current-player');
    if (currentPlayer) {
        currentPlayer.textContent = playerName;
    } else {
        console.error('Elemento current-player no encontrado');
    }

    const voteList = document.getElementById('vote-list');
    if (!voteList) {
        console.error('Elemento vote-list no encontrado');
        return;
    }

    voteList.innerHTML = '';
    const jugadores = juego.getJugadores();
    console.log('Jugadores disponibles para votar:', jugadores.map(j => j.getNombre()));

    jugadores.forEach(jugador => {
        if (jugador.getNombre() !== playerName && !jugador.estaMuerto()) {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player';
            playerDiv.textContent = jugador.getNombre();
            playerDiv.onclick = () => {
                console.log(`Votando por: ${jugador.getNombre()}`);
                vote(jugador.getNombre());
            };
            voteList.appendChild(playerDiv);
        }
    });

    if (voteList.children.length === 0) {
        console.warn('No hay jugadores disponibles para votar');
        voteList.innerHTML = '<p>No hay jugadores disponibles para votar</p>';
    }
}

// Registrar voto
function vote(playerName) {
    console.log(`Registrando voto de ${currentVoter} por ${playerName}`);

    if (juego.votar(currentVoter, playerName)) {
        backToMain();

        // Verificar si todos los jugadores vivos han votado
        const todosVotaron = juego.getJugadores().every(jugador =>
            jugador.estaMuerto() || jugador.haVotado()
        );
        if (todosVotaron) {
            console.log('Todos los jugadores han votado, finalizando votación');
            finalizarVotacion();
        }
    } else {
        console.error('Error al registrar el voto');
        alert('Error al registrar el voto');
    }
}

// Volver a la pantalla principal
function backToMain() {
    console.log('Volviendo a la pantalla principal');

    const mainScreen = document.getElementById('main-screen');
    const voteScreen = document.getElementById('vote-screen');
    if (mainScreen && voteScreen) {
        mainScreen.style.display = 'block';
        voteScreen.style.display = 'none';
        renderMainScreen();
    } else {
        console.error('Elementos main-screen o vote-screen no encontrados');
    }
}

// Finalizar votación
function finalizarVotacion() {
    console.log('Finalizando votación');

    if (juego.getFase() !== 'dia') {
        console.warn('Intento de finalizar votación fuera de la fase día');
        alert('La votación solo puede finalizar durante el día.');
        return;
    }

    const resultText = juego.finalizarVotacion();
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.innerHTML = `<strong>${resultText}</strong>`;
    } else {
        console.error('Elemento result no encontrado');
    }

    // Mostrar el botón de cambio de fase
    const changePhaseButton = document.getElementById('change-phase');
    if (changePhaseButton) {
        changePhaseButton.style.display = 'block';
    }

    // Ocultar el botón de finalizar votación
    const finalizeButton = document.getElementById('finalize-vote');
    if (finalizeButton) {
        finalizeButton.style.display = 'none';
    }

    renderMainScreen();
}

// Cambiar a la siguiente fase
function cambiarFase() {
    console.log('Cambiando fase');

    juego.siguienteFase();

    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.innerHTML = `<strong>Fase actual: ${juego.getFase()}</strong>`;
    }


    // Mostrar el botón de finalizar votación si la nueva fase es 'dia'
    const finalizeButton = document.getElementById('finalize-vote');
    if (finalizeButton && juego.getFase() === 'dia') {
        finalizeButton.style.display = 'block';
    }

    renderMainScreen();

    const fase = juego.getFase();
    console.log('Nueva fase:', fase);
    if (fase === 'los aldeanos ganaron' || fase === 'los lobos ganaron') {
        alert(`¡Juego terminado! ${fase}`);
        localStorage.removeItem('jugadores');
    }
}