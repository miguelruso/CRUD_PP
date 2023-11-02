const urlObtenerusers = 'http://localhost/BLT/CRUD/api/obtenerusers.php'
const urlAgregaruser = 'http://localhost/BLT/CRUD/api/agregaruser.php'
const urlEditaruser = 'http://localhost/BLT/CRUD/api/editaruser.php'
const urlBorraruser = 'http://localhost/BLT/CRUD/api/borraruser.php'
let listaAfiliados = []
const objAfiliado = {
    nombre: '',
    apellido: '',
    user: '',
    password: '',
    email: '',
	level: ''
}
let editando = false
const formulario = document.querySelector('#formulario')
const idUserInput = document.querySelector('#idUser')
const nombreInput = document.querySelector('#nombre')
const apellidoInput = document.querySelector('#apellido')
const userInput = document.querySelector('#user')
const passwordInput = document.querySelector('#password')
const emailInput = document.querySelector('#email')
const levelInput = document.querySelector( '#level')
formulario.addEventListener('submit', validarFormulario)
function validarFormulario(e) {
    e.preventDefault()
    if([nombreInput.value, apellidoInput.value, userInput.value, passwordInput.value, emailInput.value, levelInput.value].includes('')) {
        alert('Todos los campos son obligatorios')
        return
    }
    if(editando) {
        editarAfiliado()
        editando = false
    } else {
        //objAfiliado.idUser = idUserInput.value
        objAfiliado.nombre = nombreInput.value
        objAfiliado.apellido = apellidoInput.value
        objAfiliado.user = userInput.value
        objAfiliado.password = passwordInput.value
        objAfiliado.email = emailInput.value
		objAfiliado.level = levelInput.value
        agregarAfiliado()
    }
}
async function obtenerAfiliado() {
    listaAfiliados = await fetch(urlObtenerusers)
    .then(respuesta => respuesta.json())
    .then(datos => datos)
    .catch(error => console.log(error))
    mostrarAfiliados()
}
obtenerAfiliado()
function mostrarAfiliados() {
        const divAfiliados = document.querySelector('.div-afiliados')
	    const table = document.createElement('table')
	    table.classList.add('table', 'table-bordered')
	    const headerRow = table.insertRow()
	    const headerCells = ['Nombre', 'Apellido', 'Usuario', 'DNI', 'E-mail', 'Nivel', 'Acciones']
	    headerCells.forEach(headerText => {
	    const headerCell = document.createElement('th')
	    headerCell.textContent = headerText
	    headerRow.appendChild(headerCell)
})
    listaAfiliados.forEach(afiliado => {
        const {idUser, nombre, apellido, user, password, email, level} = afiliado
        const dataRow = table.insertRow()
        const dataCells = [nombre, apellido, user, password, email, level]
	    dataCells.forEach(dataText => {
        const dataCell = dataRow.insertCell()
        dataCell.textContent = dataText
    })
	    const actionsCell = dataRow.insertCell()
        const editarBoton = document.createElement('button')
        editarBoton.onclick = () => cargarafiliado(afiliado)
        editarBoton.textContent = 'Editar'
        editarBoton.classList.add('btn', 'btn-editar')
		actionsCell.appendChild(editarBoton)
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarafiliado(idUser);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
		actionsCell.appendChild(eliminarBoton);
		divAfiliados.appendChild(table)
    })
}
async function agregarAfiliado() {
    const res = await fetch(urlAgregaruser,
        {
            method: 'POST',
            body: JSON.stringify(objAfiliado)
        })
        .then(respuesta => respuesta.json())
       // .then(data => data)
        .catch(error => alert(error))
        console.log(JSON.stringify(objAfiliado))
    if(res.msg === 'OK') {
        alert('Se registro exitosamente')
        limpiarHTML()
        obtenerAfiliado()
        formulario.reset()
        limpiarObjeto()
        console.log()
    }
}
async function editarAfiliado() {
    objAfiliado.nombre = nombreInput.value
    objAfiliado.apellido = apellidoInput.value
    objAfiliado.user = userInput.value
    objAfiliado.password = passwordInput.value
    objAfiliado.email = emailInput.value
	objAfiliado.level = levelInput.value
    const res = await fetch(urlEditaruser,
        {
            method: 'POST',
            body: JSON.stringify(objAfiliado)
        })
        .then(respuesta => respuesta.json())
        //.then(data => data)
        .catch(error => alert(error))
        console.log(JSON.stringify(objAfiliado))
    if(res && res.msg === 'OK')  {
        alert('Se actualizó correctamente')
        limpiarHTML()
        obtenerAfiliado()
        formulario.reset()
        limpiarObjeto()
    }
        document.getElementById('btnAgregar').textContent = 'Agregar'
        editando = false
       
}
async function eliminarafiliado(id) {
    const res = await fetch(urlBorraruser,
        {
            method: 'POST',
            body: JSON.stringify({'idUser': id})
        })
        .then(respuesta => respuesta.json())
        .then(data => data)
        .catch(error => alert(error))
        if(res.msg === 'OK') {
            alert('Se borró exitosamente')
            limpiarHTML()
            obtenerAfiliado()
            limpiarObjeto()
        }
}
function cargarafiliado(afiliado) {
    const {nombre, apellido, user, password, email, level} = afiliado
    nombreInput.value = nombre
    apellidoInput.value = apellido
    userInput.value = user
    passwordInput.value = password
    emailInput.value = email
	levelInput.value = level
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'
    editando = true
}
function limpiarHTML() {
    const divAfiliados = document.querySelector('.div-afiliados')
    while(divAfiliados.firstChild) {
        divAfiliados.removeChild(divAfiliados.firstChild)
    }
}
function limpiarObjeto() {
    objAfiliado.nombre = ''
    objAfiliado.apellido = ''
    objAfiliado.user = ''
    objAfiliado.password = ''
    objAfiliado.email = ''
	objAfiliado.level = ''
}