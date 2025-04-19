// ICONOS
const imgMuerto = "https://img.icons8.com/?size=100&id=5DxlE3Q32K0Q&format=png&color=000000";
const imgOjo = "https://img.icons8.com/?size=100&id=60022&format=png&color=000000";

// ELEMENTOS DEL DOM
const contenedorPrincipal = document.getElementById("contenedor-principal");
const cabeceraFase = document.getElementById("fase");


// INSTANCIA DEL JUEGO
const juego = new Juego();
juego.iniciarJuego();
mostrarJugadores();
cabeceraFase.innerHTML = "VER ROLES";

document.getElementById("boton-matar").innerHTML = "COMENZAR";



// FUNCIONES PRINCIPALES

function mostrarJugadores() {
    contenedorPrincipal.innerHTML = "";

    const formulario = crearFormularioVotacion();

    for (let jugador of juego.getListaJugadores()) {
        const cuadroJugador = crearCuadroJugador(jugador, formulario.listaCheckboxes);
        formulario.elemento.appendChild(cuadroJugador);
    }

    const boton = crearBotonMatar(formulario.listaCheckboxes);
    formulario.elemento.appendChild(boton);

    contenedorPrincipal.appendChild(formulario.elemento);
}

function logicaElegido(nombre) {
    juego.matarJugador(nombre);
    alert(`${nombre} ha muerto`);
    siguienteFase();
}

function siguienteFase() {
    const estado = juego.comprobarVictoria();

    if (estado === "AUN HAY LOBOS") {
        if (!["NOCHE", "DIA"].includes(cabeceraFase.innerHTML)) {
            activarModoNoche();
        } else if (cabeceraFase.innerHTML === "NOCHE") {
            activarModoDia();
        } else if (cabeceraFase.innerHTML === "DIA") {
            activarModoNoche();
        }

        mostrarJugadores();
    } else {
        contenedorPrincipal.innerHTML = `<h1><center>${estado}</center></h1>`;
    }
}

// COMPONENTES DEL JUEGO

function crearFormularioVotacion() {
    const form = document.createElement("form");
    const listaCheckboxes = [];
    return { elemento: form, listaCheckboxes };
}

function crearCuadroJugador(jugador, listaCheckboxes) {
    const nombre = jugador.getNombre();
    const estaVivo = jugador.estaVivo();

    const contenedor = document.createElement("div");
    contenedor.id = `cuadro-${nombre}`;
    contenedor.innerHTML = estaVivo
        ? nombre
        : `<img src="${imgMuerto}" alt="muerto"> ${nombre}`;

    const checkbox = crearCheckbox(nombre, estaVivo, listaCheckboxes);
    const botonVerRol = crearBotonVerRol(nombre, jugador);

    contenedor.appendChild(checkbox);
    contenedor.appendChild(botonVerRol);

    return contenedor;
}

function crearCheckbox(nombre, estaVivo, listaCheckboxes) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "voto";
    checkbox.id = `voto-${nombre}`;
    checkbox.disabled = !estaVivo;

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            listaCheckboxes.forEach(cb => {
                if (cb !== checkbox) cb.checked = false;
            });
        }
    });

    listaCheckboxes.push(checkbox);
    return checkbox;
}

function crearBotonVerRol(nombre, jugador) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.innerHTML = `<img src="${imgOjo}" alt="ver rol">`;
    boton.addEventListener("click", () => {
        alert(`${nombre} es: ${jugador.getRol()}`);
    });
    return boton;
}

function crearBotonMatar(listaCheckboxes) {
    const boton = document.createElement("button");
    boton.type = "submit";
    boton.id = "boton-matar";
    boton.textContent = "MATAR A LA BESTIA";

    boton.addEventListener("click", (e) => {
        e.preventDefault();

        const seleccionado = listaCheckboxes.find(cb => cb.checked);

        if (seleccionado) {
            const nombre = seleccionado.id.replace("voto-", "");
            logicaElegido(nombre);
        } else {
            // controlo aqui que no sea la primera fase, la de ver roles
            if (boton.textContent === "MATAR A LA BESTIA") {
                alert("Debes seleccionar a alguien para votar");
            }
            siguienteFase();
        }
    });

    return boton;
}

// MODOS DE FASE

function activarModoNoche() {
    cabeceraFase.innerHTML = "NOCHE";
    document.getElementById("sonidoLobo").play();
}

function activarModoDia() {
    cabeceraFase.innerHTML = "DIA";
    document.getElementById("sonidoAldeano").play();
}
