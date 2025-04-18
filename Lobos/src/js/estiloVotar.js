const juego = new Juego();
let iniciado = false;
let jugadorActual = null;

// Utilidades
const $ = (id) => document.getElementById(id);
const mostrar = (id) => $(id).style.display = 'block';
const ocultar = (id) => $(id).style.display = 'none';

// Agrega un nuevo campo para nombre de jugador
function agregarJugador() {
    const contenedor = $('listaJugadores');
    const btnAgregar = $('agregar');
    if (!contenedor) return;

    const total = contenedor.children.length;
    if (total >= 5) {
        alert('Lista de jugadores completa');
        btnAgregar.style.display = 'none';
        return;
    }

    const jugadorDiv = document.createElement('div');
    jugadorDiv.className = 'player-input';
    jugadorDiv.innerHTML = `
        <label>Nombre del Jugador ${total + 1}:</label>
        <input type="text" id="jugador${total + 1}" required>
    `;
    contenedor.appendChild(jugadorDiv);
}

// Enviar formulario con jugadores
$('formularioJugadores')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombres = Array.from(document.querySelectorAll('#listaJugadores input'))
        .map(input => input.value.trim())
        .filter(Boolean);

    if (nombres.length < 5) {
        return alert('Se requieren al menos 5 jugadores para iniciar.');
    }

    try {
        localStorage.setItem('jugadores', JSON.stringify(nombres));
        if (!juego.iniciarJuego(nombres)) throw new Error();

        window.location.href = '../pages/dashboardPersonajes.html';
    } catch {
        alert('Error al iniciar el juego.');
        console.error('No se pudo iniciar el juego.');
    }
});

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const panel = $('player-list');
    if (!panel) return;

    const data = localStorage.getItem('jugadores');
    if (!data) {
        panel.innerHTML = '<p>No hay jugadores. Regresa y agrégalos.</p>';
        return;
    }

    try {
        const nombres = JSON.parse(data);
        if (!Array.isArray(nombres) || nombres.length < 5) throw new Error();

        if (!juego.iniciarJuego(nombres)) throw new Error();

        iniciado = true;
        renderPantallaPrincipal();
    } catch {
        panel.innerHTML = '<p>Error al cargar los jugadores.</p>';
        console.error('Error al iniciar con datos guardados.');
    }
});

// Renderizar pantalla principal del juego
function renderPantallaPrincipal() {
    const panel = $('player-list');
    const resultado = $('result');
    if (!panel || !iniciado) return;

    const jugadores = juego.getJugadores();
    panel.innerHTML = '';

    if (!jugadores.length) {
        panel.innerHTML = '<p>No hay jugadores disponibles</p>';
        return;
    }

    jugadores.forEach(j => {
        const div = document.createElement('div');
        div.className = 'player';
        const nombre = j.getNombre();

        if (j.estaMuerto()) {
            div.classList.add('dead');
            div.textContent = `${nombre} (Muerto)`;
        } else if (j.haVotado()) {
            div.classList.add('voted');
            div.textContent = `${nombre} (Votó a: ${j.getVotoA()})`;
        } else {
            div.textContent = nombre;
            div.onclick = () => mostrarPantallaVoto(nombre);
        }

        panel.appendChild(div);
    });

    if (resultado) resultado.textContent = `Fase actual: ${juego.getFase()}`;
}

// Mostrar pantalla de votación
function mostrarPantallaVoto(nombreVotante) {
    if (juego.getFase() !== 'dia') {
        return alert('Solo se puede votar durante el día.');
    }

    const votante = juego.getJugadores().find(j => j.getNombre() === nombreVotante);
    if (votante?.haVotado()) {
        return alert('Ya has votado en esta ronda.');
    }

    jugadorActual = nombreVotante;

    ocultar('main-screen');
    mostrar('vote-screen');

    $('current-player').textContent = nombreVotante;
    const listaVotos = $('vote-list');
    listaVotos.innerHTML = '';

    juego.getJugadores().forEach(j => {
        if (j.getNombre() !== nombreVotante && !j.estaMuerto()) {
            const div = document.createElement('div');
            div.className = 'player';
            div.textContent = j.getNombre();
            div.onclick = () => votarPor(j.getNombre());
            listaVotos.appendChild(div);
        }
    });

    if (!listaVotos.children.length) {
        listaVotos.innerHTML = '<p>No hay jugadores disponibles para votar</p>';
    }
}

// Registrar el voto
function votarPor(nombreObjetivo) {
    if (!juego.votar(jugadorActual, nombreObjetivo)) {
        return alert('Error al registrar el voto.');
    }

    volverAPrincipal();

    const todosVotaron = juego.getJugadores().every(j => j.estaMuerto() || j.haVotado());
    if (todosVotaron) finalizarVotacion();
}

// Volver a la pantalla principal
function volverAPrincipal() {
    mostrar('main-screen');
    ocultar('vote-screen');
    renderPantallaPrincipal();
}

// Finalizar votación
function finalizarVotacion() {
    if (juego.getFase() !== 'dia') {
        return alert('Solo se puede finalizar la votación de día.');
    }

    const resultado = $('result');
    if (resultado) resultado.innerHTML = `<strong>${juego.finalizarVotacion()}</strong>`;

    mostrar('change-phase');
    ocultar('finalize-vote');
    renderPantallaPrincipal();
}

// Cambiar fase
function cambiarFase() {
    juego.siguienteFase();

    const fase = juego.getFase();
    $('result').innerHTML = `<strong>Fase actual: ${fase}</strong>`;

    if (fase === 'dia') {
        mostrar('finalize-vote');
    }

    renderPantallaPrincipal();

    if (fase.includes('ganaron')) {
        alert(`Juego terminado: ${fase}`);
        localStorage.removeItem('jugadores');
    }
}
