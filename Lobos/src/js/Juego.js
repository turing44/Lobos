class Juego {
    #fase;
    #turno;
    #listaJugadores = [];
    #NUMERO_LOBOS = 1;
    #NUMERO_JUGADORES = 5;

    reordenarLista(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    iniciarJuego(listaNombres) {
        // Validar Lista
        if (listaNombres.length < this.#NUMERO_JUGADORES) {
            console.log("No hay suficientes nombres para iniciar el juego");
            return;
        }

        // Reordenar aleatoriamente
        listaNombres = this.reordenarLista(listaNombres);

        // Crear Jugadores
        let lobosSinAsignar = this.#NUMERO_LOBOS;
        listaNombres.forEach((nombre) => { // Cambié a arrow function
            if (lobosSinAsignar > 0) {
                this.#listaJugadores.push(new Jugador(nombre, "lobo"));
            } else {
                this.#listaJugadores.push(new Jugador(nombre, "aldeano"));
            }

            lobosSinAsignar--;
        });
    }

    siguienteFase() {

    }
}