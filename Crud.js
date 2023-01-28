let listaPersona = [];

const objPersona = {
    id: '',
    nombre: '',
    edad: ''
}

let editando = false;
let arraypersona = [];

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const edadInput = document.querySelector('#edad');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || edadInput.value === '') {
        alert('Debes de llenar todo');
        return;
    }

    if(editando) {
        editarPersona();
        editando = false;
    } else {
        objPersona.id = Date.now();
        objPersona.nombre = nombreInput.value;
        objPersona.edad = edadInput.value;

        agregarPersona();
    }
}

function agregarPersona() {

    listaPersona.push({...objPersona});

    mostrarPersona();

    formulario.reset();
    limpiarObjeto();
}
{
    function clicked(event){
        console.log("Click de la funcion")
        alert("Soy una alerta")
        console.log(event)
    }
}
function guardar (){
    let valorButton = document.getElementById("formulario").value;
    let nombre = JSON.parse(localStorage.getItem("nombre")) ? JSON.parse(localStorage.getItem("nombre")):
[]
console.log(valorButton)
nombre.push(valorButton)
console.log(nombre)
console.log(JSON.stringify(nombre))
localStorage.setItem("nombre", JSON.stringify(nombre))
document.getElementById("formulario").value = ""
}


function limpiarObjeto() {
    objPersona.id = '';
    objPersona.nombre = '';
    objPersona.edad = '';
}

function mostrarPersona() {
    limpiarHTML();

    const divPersona = document.querySelector('.div-persona');
    
    listaPersona.forEach(persona => {
        const {id, nombre, edad} = persona;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${nombre} - ${edad}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarPersona(persona);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarPersona(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divPersona.appendChild(parrafo);
        divPersona.appendChild(hr);
    });
}

function cargarPersona(persona) {
    const {id, nombre, edad} = persona;

    nombreInput.value = nombre;
    edadInput.value = edad;

    objPersona.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarPersona() {

    objPersona.nombre = nombreInput.value;
    objPersona.edad = edadInput.value;

    listaPersona.map(persona => {

        if(persona.id === objPersona.id) {
            persona.id = objPersona.id;
            persona.nombre = objPersona.nombre;
            persona.edad = objPersona.edad;

        }

    });

    limpiarHTML();
    mostrarPersona();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarPersona(id) {

    listaPersona = listaPersona.filter(persona => persona.id !== id);

    limpiarHTML();
    mostrarPersona();
}

function limpiarHTML() {
    const divPersona = document.querySelector('.div-persona');
    while(divPersona.firstChild) {
        divPersona.removeChild(divPersona.firstChild);
    }
}