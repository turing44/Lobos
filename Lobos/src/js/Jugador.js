class Jugador{
    #nombre;
    #rol =["aldeano","lobo"];
    #muerto= false;
    #voto;
    #haVotado=false;
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

    marcarComoVotado() {
        this.#haVotado = true;
    }

    resetearVotoRonda() {
        this.#haVotado = false;
    }
}