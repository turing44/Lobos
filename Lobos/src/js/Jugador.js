class Jugador{
    #nombre;
    #rol =["aldeano","lobo"];
    #muerto= false;
    #voto = 0;
    #haVotado=false;
    #aQuienVoto = null;
    #votoA = null;
    constructor(nombre,rol) {
        this.#nombre=nombre;
        this.#rol=rol;
        this.#voto=0;
    }

    getNombre() {
        return this.#nombre
    }

    getVoto(){
        return this.#voto;
    }
    incrementarVoto(){
        this.#voto +=1;
    }
    resetearVoto(){
        this.#voto=0;
    }
    getRol(){
        return this.#rol;
    }

    matar() {
        this.#muerto = true;
    }
    estaMuerto(){
       return this.#muerto;
    }

    haVotado() {
        return this.#haVotado;
    }

    marcarComoVotado(nombreVotado) {
        this.#haVotado = true;
        this.#votoA = nombreVotado;
    }

    getVotoA() {
        return this.#votoA;
    }

    resetearVotoRonda() {
        this.#haVotado = false;
        this.#votoA = null;
    }

    getAQuienVoto() {
        return this.#aQuienVoto;
    }
}