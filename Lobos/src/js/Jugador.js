class Jugador{
    #nombre = "";
    #rol = "";
    #vivo= false;


    constructor(nombre,rol) {
        this.#nombre=nombre;
        this.#rol=rol;
    }

    getNombre() {
        return this.#nombre
    }

    getRol(){
        return this.#rol;
    }

    matar() {
        this.#vivo = false;
    }

    estaVivo(){
       return this.#vivo;
    }
}