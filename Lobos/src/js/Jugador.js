class Jugador{
    #nombre;
    #rol =["aldeano","lobo"];
    #estado;

    constructor(nombre,rol) {
        this.#nombre=nombre;
        this.#rol=rol;
        this.#estado="vivo";
    }

    estaVivo(){
        if(this.#estado === "vivo"){
            return true;
        } else if(this.#estado === "muerto"){
            return false
        }

    }
    getRol(){
        return this.#rol;
    }

    matar() {
        this.#estado = "muerto";
    }
}