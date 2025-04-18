class Juego {
    #fase = "";
    #listaJugadores = [];
    #roles = {
        aldeanos: 4,
        lobos: 1
    }

    constructor() {
        localStorage.roles = this.#roles
    }

    getJugadores() {
        return this.#listaJugadores;
    }
    getFase() {
        return this.#fase;
    }




    iniciarJuego() {
        const listaNombres = JSON.parse(localStorage.listaNombre);
        // Validar Lista
        if (listaNombres.length < this.#numero_jugadores) {
            console.error("No hay suficientes nombres para iniciar el juego");
            return;
        }




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
       // jugador.getRol() === 'lobo' ? this.#numero_lobos-- : this.numero_aldeanos--;
    }

    votar(nombreVotante , nombreVotado){
        const votante =this.#listaJugadores.find((j) => j.getNombre()===nombreVotante && !j.estaMuerto());
        const votado =this.#listaJugadores.find((j) => j.getNombre() === nombreVotado && !j.estaMuerto());

        // Validaciones
       if(!this.validarVoto(votante,votado)){
           return false;
       }

       //registrar voto
       votado.incrementarVoto();
       votante.marcarComoVotado(nombreVotado);

       return true;
    }
    validarVoto(votante,votado){
        if (!votante) {
            console.error("El votante no existe o está muerto");
            return false;
        }
        if (!votado) {
            console.error("El jugador votado no existe o está muerto");
            return false;
        }
        if(votado===votante){
            console.error("El jugador no puede votas a si mismo")
            return false;
        }
        return true;
    }
    finalizarVotacion(){
        const { jugadoresEliminados, maxVotos } = this.jugadorConMasVotos();

        // Generar mensaje de resultado
        let resultText;
        if (jugadoresEliminados.length === 1) {
            this.matarJugador(jugadoresEliminados[0]);
            resultText = `El jugador ${jugadoresEliminados[0].getNombre()} ha sido eliminado por la votación.`;
        } else if (jugadoresEliminados.length > 1) {
            resultText = 'Hubo un empate en la votación. Nadie ha sido eliminado.';
        } else {
            resultText = 'Nadie recibió votos en esta ronda.';
        }
        // Reiniciar votos solo de jugadores vivos
        this.#listaJugadores.forEach((jugador) => {
            if (!jugador.estaMuerto()) {
                jugador.resetearVoto();
                jugador.resetearVotoRonda();
            }
        });
        return resultText;
    }
    jugadorConMasVotos(){
        let maxVotos=0;
        let jugadoresEliminados= [];
        // Encontrar jugadores con más votos
        this.#listaJugadores.forEach((jugador) => {
            if (!jugador.estaMuerto()) {
                if (jugador.getVoto() > maxVotos) {
                    maxVotos = jugador.getVoto();
                    jugadoresEliminados = [jugador];
                } else if (jugador.getVoto() === maxVotos && maxVotos > 0) {
                    jugadoresEliminados.push(jugador); // Añadir al empate
                }
            }
        });

        return {
            jugadoresEliminados,
            maxVotos
        };
    }

}