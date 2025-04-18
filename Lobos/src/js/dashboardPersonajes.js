const imgMuerto = "https://img.icons8.com/?size=100&id=5DxlE3Q32K0Q&format=png&color=000000";
const imgVotar = "https://img.icons8.com/?size=100&id=24601&format=png&color=000000";
const imgOjo = "https://img.icons8.com/?size=100&id=60022&format=png&color=000000";


const contenedor = document.getElementById("contenedor-principal");
const botonSiguiente = document.getElementById("siguiente-fase");
const cabecera = document.getElementById("fase");
const juego = new Juego();


juego.iniciarJuego();


do {
    cabecera.innerHTML = juego.getFase();

    refrescarUI();



} while (juego.comprobarVictoria() !== "AUN HAY LOBOS")



botonSiguiente.addEventListener("click", () => {
    juego.siguienteFase();
});


function refrescarUI() {
    for (let jugador of juego.getListaJugadores()) {
        const nombre = jugador.getNombre();

        const divJugador = document.createElement("div");
        divJugador.id = `cuadro-${nombre}`;
        divJugador.innerHTML = nombre;

        if (jugador.estaVivo() === false) {
            divJugador.innerHTML = `<img src="${imgMuerto}" alt="votar"> ${nombre}`;

        }

        const botonVerRol = document.createElement("button");
        botonVerRol.id = `boton-ver-rol-${nombre}`;
        botonVerRol.className = "boton-ver-rol";
        botonVerRol.innerHTML = `<img src="${imgOjo}" alt="ver rol">`;

        const botonVotar = document.createElement("button");
        botonVotar.id = `boton-votar-${nombre}`;
        botonVotar.className = "boton-votar";
        botonVotar.innerHTML = `<img src="${imgVotar}" alt="votar">`;
        botonVotar.disabled = true;

        botonVerRol.addEventListener("click", () => {
            alert(nombre + " es: " + jugador.getRol())
        })

        divJugador.appendChild(botonVotar);
        divJugador.appendChild(botonVerRol);

        contenedor.appendChild(divJugador);
    }
}

