class Juego {
    #fase = 'dia';
    #turno;
    #listaJugadores = [];
    #numero_lobos = 1;
    #numero_jugadores = 5;
    //#numero_aldeanos = this.#numero_jugadores - this.#numero_lobos

    getJugadores() {
        return this.#listaJugadores;
    }
    getFase() {
        return this.#fase;
    }
    // Getter dinámico para el número de aldeanos vivos
    get numero_aldeanos() {
        return this.#listaJugadores.filter(jugador =>
            jugador.getRol() === 'aldeano' && !jugador.estaMuerto()
        ).length;
    }

    // Getter dinámico para el número de lobos vivos
    /*get numero_lobos() {
        return this.#listaJugadores.filter(jugador =>
            jugador.getRol() === 'lobo' && !jugador.estaMuerto()
        ).length;
    }*/

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
        // Limpiar lista anterior
        this.#listaJugadores = [];
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
        this.#fase = 'dia';
        this.#turno = 0;
        return listaNombres;
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
           return false
       }

       //registrar voto
       votado.incrementarVoto();
       votante.marcarComoVotado();
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
        this.jugadorConMasVotos();
        // Reiniciar votos solo de jugadores vivos
        this.#listaJugadores.forEach((jugador) => {
            if (!jugador.estaMuerto()) {
                jugador.resetearVoto();
                jugador.resetearVotoRonda();
            }
        });
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
        if (jugadoresEliminados.length === 1) {
            this.matarJugador(jugadoresEliminados[0]);
        }
    }

}