const contenedor = document.getElementById("contenedor-principal");
const juego = new Juego();

juego.iniciarJuego();


for (let jugador of juego.getListaJugadores()) {
    const nuevoBotonJugador = document.createElement("button");
    nuevoBotonJugador.innerHTML = jugador.getNombre();
    contenedor.appendChild(nuevoBotonJugador);
}
