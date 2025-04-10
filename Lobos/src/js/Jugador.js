class Jugador{
    #nombre;
    #rol =["aldeano","lobo"];
    #muerto= false;

    constructor(nombre,rol) {
        this.#nombre=nombre;
        this.#rol=rol;
        this.#estado="vivo";
    }

    getNombre() {
        return this.#nombre
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
}