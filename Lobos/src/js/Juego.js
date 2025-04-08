class Juego {
    #fase;
    #turno;
    #listaJugadores = [];
    #numero_lobos = 1;
    #numero_jugadores = 5;
    #numero_aldeanos = this.#numero_jugadores - this.#numero_lobos


    getFase() {
        return this.#fase;
    }
    get numero_aldeanos() {
        return this.#numero_jugadores - this.#numero_lobos;
    }

    reordenarLista(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    iniciarJuego(listaNombres) {
        // Validar Lista
        if (listaNombres.length < this.#numero_jugadores) {
            console.error("No hay suficientes nombres para iniciar el juego");
            return;
        }

        // Reordenar aleatoriamente
        listaNombres = this.reordenarLista(listaNombres);

        // Crear Jugadores
        let lobosSinAsignar = this.#numero_lobos;
        listaNombres.forEach((nombre) => { 
            if (lobosSinAsignar > 0) {
                this.#listaJugadores.push(new Jugador(nombre, "lobo"));
            } else {
                this.#listaJugadores.push(new Jugador(nombre, "aldeano"));
            }

            lobosSinAsignar--;
        });
    }

    siguienteFase() {
        if (this.numero_aldeanos > this.#numero_lobos) {
            this.#turno++;

            this.#fase = this.#fase === 'dia' ? 'noche' : 'dia';

        } else if (this.#numero_lobos <= 0) {
            this.#fase = 'los aldeanos ganaron'
        } else {
            this.#fase = 'los lobos ganaron'
        }
    }

    matarJugador(jugador) {
        const index = this.#listaJugadores.indexOf(jugador);// se comprueba si el jugador existe en la lista de jugadores.
        if (index === -1) {
            console.error("El jugador no está en la lista");
            return;
        }
        jugador.matar();
        jugador.getRol() === 'lobo' ? this.#numero_lobos-- : this.numero_aldeanos--;
    }


}