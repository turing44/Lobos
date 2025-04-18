class Juego {
    #fase = "";
    #listaJugadores = [];
    #numero_jugadores = 0;

    #roles = {
        "aldeano": 4,
        "lobo": 1
    };


    constructor() {
        localStorage.roles = this.#roles;
        this.#numero_jugadores = this.obtenerNumeroJugadores();
    }

    getListaJugadores() {
        return this.#listaJugadores;
    }
    getFase() {
        return this.#fase;
    }




    iniciarJuego(){
        const listaNombres = JSON.parse(localStorage.getItem("listaNombres"));

        this.#listaJugadores = this.reordenarLista(this.crearJugadores(listaNombres));

    }

    reordenarLista(jugadores) {
        for (let i = jugadores.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [jugadores[i], jugadores[j]] = [jugadores[j], jugadores[i]];
        }
        return jugadores;
    }

    obtenerNumeroJugadores() {
        let jugadores = 0;
        for (let valor of Object.values(this.#roles)) {
            jugadores += valor;
        }
        return jugadores;
    }

    crearJugadores(listaNombres) {
        let indiceListaNombres = 0;
        let jugadores = [];

        for (let rol of Object.keys(this.#roles)) {
            for (let i = 0; i < this.#roles[rol]; i++) {
                let nombre = listaNombres[indiceListaNombres];
                jugadores.push(new Jugador(nombre, rol));
                indiceListaNombres++;
            }
        }

        console.log(jugadores);
        return jugadores;
    }
}