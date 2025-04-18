// limpiamos si hay algo de la partida anterior
localStorage.clear();


function handleCheckClick(event) {
    event.preventDefault();
    const modal = new bootstrap.Modal(document.getElementById('normasModal'));
    modal.show();
}

function marcarCheck() {
    const check = document.getElementById('exampleCheck1');
    check.checked = true;
    actualizarBoton();
}

function desmarcarCheck() {
    const check = document.getElementById('exampleCheck1');
    check.checked = false;
    actualizarBoton();
}

function actualizarBoton() {
    const check = document.getElementById('exampleCheck1');
    const boton = document.getElementById('jugarBtn');
    boton.disabled = !check.checked;
}

document.querySelector('form').addEventListener('submit', function (e) {
    const check = document.getElementById('exampleCheck1');
    if (!check.checked) {
        e.preventDefault();
        alert('Debes aceptar las normas antes de jugar 🧠');
    }
});