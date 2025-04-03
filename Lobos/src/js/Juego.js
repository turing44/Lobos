class Juego {
    #faseActual;

    constructor() {
        this.#faseActual = "noche";
    }

    fase() {
        if(this.#faseActual === "noche") {
            return "Noche";
        } else {
            return "Día";
        }
    }

    cambiarFase() {
        if(this.#faseActual === "noche") {
            this.#faseActual = "dia";
        } else {
            this.#faseActual = "noche";
        }
    }
}