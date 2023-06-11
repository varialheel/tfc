// creamos las variables
const datas = document.getElementById("datas");
const errorContainer = document.getElementById("error");
const errorP = document.getElementById("errorP");
const loader = document.getElementById("loader");
const closeButton = document.getElementById("closeButton");
const historialModal = document.getElementById('historialModal');
const modalBody = document.getElementById("modalBody")
const modalLoader = document.getElementById("modalLoader")
const departamentoSelect = document.getElementById("departamento")
const dniMedico = document.getElementById("dniMedico")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const telefono = document.getElementById("telefono")
const email = document.getElementById("email")
const consulta = document.getElementById("consulta")
const insertDepartamento = document.getElementById("insertDepartamento")
const insertDepartamentoForm = document.getElementById("insertDepartamentoForm")
const insertArduino = document.getElementById("insertArduino")
const medicoForm = document.getElementById("medicoForm")
const insertMedicoSpan = document.getElementById("insertMedicoSpan")
const insertMedicoLoader = document.getElementById("insertMedicoLoader")
const modifyDepartamentoForm = document.getElementById('modifyDepartamentoForm');
const resultsBody = document.getElementById('resultsBody');
const resultsButton = document.getElementById('resultsButton');
const modifyDepartamentoInput = document.getElementById('modifyDepartamentoInput');
const modifyArduinoInput = document.getElementById('modifyArduinoInput');
const id_departamentoInput = document.getElementById('id_departamento');
const controlContainer = document.getElementById('controlContainer');
const modifyButtonContainer = document.getElementById('modifyButtonContainer');
const modifyButton = document.getElementById('modifyButton');
const deleteButton = document.getElementById('deleteButton');
const cancelButton = document.getElementById('cancelButton');
const modifyDepartamentoLoader = document.getElementById('modifyDepartamentoLoader');
const modifyDepartamentoSpan = document.getElementById('modifyDepartamentoSpan');
const insertDepartamentoLoader = document.getElementById('insertDepartamentoLoader');
const insertDepartamentoSpan = document.getElementById('insertDepartamentoSpan');
const nombreDepartamentoSpan = document.getElementById('nombreDepartamentoSpan');
const deleteDepartamentoButton = document.getElementById('deleteDepartamento');
const insertarDepartamentoInput = document.getElementById('insertDepartamentoInput');
const id_medicoInput = document.getElementById('id_medico');
const insertMedicError = document.getElementById('insertMedicError');
const modifyConsulta = document.getElementById('modifyConsulta');
const modifyDepartamentoSelect = document.getElementById('modifyDepartamentoSelect');
const rol = document.getElementById('rol');
const cambiarRol = document.getElementById('cambiarRol');
const modifyMedicoForm = document.getElementById('modifyMedicoForm');
const insertArduinoInput = document.getElementById('insertArduinoInput');
const modifyDepartamentError = document.getElementById('modifyDepartamentError');
const insertDepartamentError = document.getElementById('insertDepartamentError');
const modifyMedicError = document.getElementById('modifyMedicError');
// creamos una instancia de cada modal
const insertMedicoModal = new bootstrap.Modal(document.getElementById('insertMedico'));
const resultsModal = new bootstrap.Modal(document.getElementById('results'));
const modifyDepartamentoModal = new bootstrap.Modal(document.getElementById('modifyDepartamento'));
const eliminarModal = new bootstrap.Modal(document.getElementById('eliminarModal'));
const modifyMedicoModal = new bootstrap.Modal(document.getElementById('modifyMedicoModal'));
// creamos un array para los medicos y otro para los departamentos
let medicos = [];
let departamentos = [];
/**
 * insertmedico realizara una peticion para que con la informacion introducida se genere un usuario para dicho medico
 */
const insertMedico = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let body = {
        "id_medico": null,
        "dni_medico": dniMedico.value,
        "nombre": nombre.value,
        "apellido": apellido.value,
        "telefono": telefono.value,
        "email": email.value,
        "consulta": consulta.value,
        "id_departamento": departamentoSelect.value
    }
    insertMedicoSpan.innerText = ""
    insertMedicoLoader.classList.toggle("hidden")
    let result = await postRequest(`${baseUrl}register/?rol=medico`, body, user.token)
    insertMedicoSpan.innerText = "Aceptar"
    insertMedicoLoader.classList.toggle("hidden")
    if (typeof result == "number" || result == null) {
        loader.classList.toggle("hidden");
        button.innerText = "Aceptar";
        if (result == 400) {
            error = "Todos los campos son obligatorios.";
        } else if (result == 409) {
            error = "La persona que intenta registrar ya existe.";
        } else {
            error = "No se pudo conectar al servidor, por favor intentelo más tarde.";
        }
    } else {
        error = "Médico insertado.";
        resultsButton.addEventListener("click", () => {
            window.location.reload()
        })
    }
    resultsBody.innerText = error
    insertMedicoModal.hide()
    resultsModal.show()
}
/**
 * showdepartamentos recorrera el array de departamentos y generara una fila por cada departamento. Por cada departamento se realizara una busqueda en el array de medicos para mostrar los medicos
 * de dicho departamento
 */
const showDepartamentos = () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let fragment = document.createDocumentFragment()
    let tr;
    let medicoTr
    let table;
    let td;
    let button;
    let buttonTd
    let detailTd;
    departamentos.forEach(element => {
        detailTd = createTd("", ["text-center"])
        detailTd.appendChild(createButton("Detalles", ["btn", "btn-primary", "detailButton"], element.id_departamento))
        td = createTd()
        tr = createTr()
        tr.appendChild(createTd(element.departamento))
        tr.appendChild(detailTd)
        table = createTable(["table"])
        medicos.filter(medico => medico.id_departamento == element.id_departamento).forEach(medico => {
            buttonTd = createTd()
            medicoTr = createTr()
            medicoTr.appendChild(createTd(medico.dni_medico, ["col-2", "text-center"]))
            medicoTr.appendChild(createTd(`${medico.nombre} ${medico.apellido}`, ["col-2", "text-center"]))
            medicoTr.appendChild(createTd(medico.telefono, ["col-2", "text-center"]))
            medicoTr.appendChild(createTd(medico.email, ["col-2", "text-center"]))
            medicoTr.appendChild(createTd(medico.consulta, ["col-2", "text-center"]))
            button = createButton("Modificar", ["col-12", "btn", "btn-info", "text-center", "modifyButton"], medico.id_medico)

            if (user.id_medico == medico.id_medico) {
                button.disabled = true
                button.classList.remove("btn-info")
            }
            buttonTd.appendChild(button)
            medicoTr.appendChild(buttonTd)
            table.appendChild(medicoTr)
        })
        td.appendChild(table)
        tr.appendChild(td)
        fragment.appendChild(tr)
    });
    datas.appendChild(fragment)
}
/**
 * loadDepartamentosOptions creara una option por cada departamento
 */
const loadDepartamentosOptions = () => {
    let fragment = document.createDocumentFragment()
    departamentos.forEach(element => {
        fragment.appendChild(createOption(element.departamento, element.id_departamento))
    })
    departamentoSelect.appendChild(fragment)
}
/**
 * 
 * @returns result.results
 * loadmedicos realizara una peticion para recoger los datos de todos los medicos
 */
const loadMedicos = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await getRequest(`${baseUrl}relations/?rel=medico,usuario&key=id_usuario`, user.token)
    if (typeof result == "number") {
        if (result == 500) {
            error = "No se pudo contectar al servidor. Por favor intentelo más tarde.";
        } else {
            error = "No se encontraron médicos.";
        }
        errorP.innerText = error;
        errorContainer.classList.remove("hidden")
        loader.classList.toggle("hidden")
        return false;
    } else {
        return result.results
    }
}
/**
 * 
 * @returns result.results
 * loadDepartamentos realizara una peticion para recoger los datos de todos los departamentos
 */
const loadDepartamentos = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await getRequest(`${baseUrl}departamento`, user.token)
    if (typeof result == "number") {
        if (result == 500) {
            error = "No se pudo contectar al servidor. Por favor intentelo más tarde.";
        } else {
            error = "No se pudo encontrar ningún departamento.";
        }
        errorP.innerText = error;
        errorContainer.classList.remove("hidden")
        loader.classList.toggle("hidden")
        return false;
    } else {
        return result.results
    }
}
/**
 * loaddatas comprobara que las peticiones se realizan correctamente y en ese caso se mostrara la informacion
 */
const loadDatas = async () => {
    if (departamentos = await loadDepartamentos()) {
        if (medicos = await loadMedicos()) {
            loader.classList.toggle("hidden")
            showDepartamentos()
            loadDepartamentosOptions()
        }
    }
}
/**
 * updatemedico realizara una peticion para modificar los datos del medico
 */
const updateMedico = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let medico = medicos.filter(medico => medico.id_medico == id_medicoInput.value)[0]
    let body = {
        "id_medico": id_medicoInput.value,
        "dni_medico": medico.dni_medico,
        "nombre": medico.nombre,
        "apellido": medico.apellido,
        "telefono": medico.telefono,
        "email": medico.email,
        "consulta": modifyConsulta.value,
        "id_departamento": modifyDepartamentoSelect.value,
        "id_usuario": medico.id_usuario
    }
    // comprobaremos si se ha cambiado el rol, en caso de que se quiera cambiar se realizara una peticion para modificar los datos del medico y luego otra para modificar el rol
    if (medico.rol != rol.value) {
        let resultMedico = await putRequest(`${baseUrl}medico`, body, user.token)
        if (typeof resultMedico == "number") {
            if (resultMedico == 409) {
                error = "El departamento no pudo ser modificado"
            } else {
                error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
            }
        } else {
            let rolBody = {
                "id_usuario": medico.id_usuario,
                "rol": rol.value
            }
            let resultRol = await putRequest(`${baseUrl}changeRol`, rolBody, user.token)
            if (typeof resultRol == "number") {
                if (resultRol == 409) {
                    error = "El departamento no pudo ser modificado"
                } else {
                    error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
                }
            } else {
                error = "Información actualizada correctamente";
                resultsButton.addEventListener("click", () => {
                    window.location.reload()
                })
            }
            resultsBody.innerText = error
            modifyDepartamentoLoader.classList.toggle("hidden")
            modifyDepartamentoSpan.innerText = "Aceptar"
            modifyDepartamentoModal.hide()
            resultsModal.show()
        }
    } else {
        // en caso de que no se quiera cambiar el rol solo se realizara una peticion
        let resultMedico = await putRequest(`${baseUrl}medico`, body, user.token)
        if (typeof resultMedico == "number") {
            if (resultMedico == 409) {
                error = "El departamento no pudo ser modificado"
            } else {
                error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
            }
        } else {
            error = "Información actualizada correctamente";
            resultsButton.addEventListener("click", () => {
                window.location.reload()
            })
        }
        resultsBody.innerText = error
        modifyDepartamentoLoader.classList.toggle("hidden")
        modifyDepartamentoSpan.innerText = "Aceptar"
        modifyDepartamentoModal.hide()
        resultsModal.show()
    }

}
/**
 * 
 * @param id
 * searchDepartamento buscara en el array de departamentos y se mostrara los datos de dicho departamento 
 */
const searchDepartamento = (id) => {
    departamento = departamentos.filter(departamento => departamento.id_departamento == id)[0]
    id_departamentoInput.value = id
    modifyDepartamentoInput.value = departamento.departamento
    modifyArduinoInput.value = departamento.arduino
    modifyDepartamentoModal.show()
}
/**
 * 
 * @param id
 * searchMedico buscara en el array de medicos y se mostrara los datos de dicho medico 
 */
const searchMedico = (id) => {
    let option;
    let fragment = document.createDocumentFragment()
    let medico = medicos.filter(medico => medico.id_medico == id)[0]
    departamentos.forEach(element => {
        option = createOption(element.departamento, element.id_departamento)
        if (medico.id_departamento == element.id_departamento) {
            option.selected = true
        }
        fragment.appendChild(option)
    });
    id_medicoInput.value = medico.id_medico
    modifyConsulta.value = medico.consulta
    modifyDepartamentoSelect.appendChild(fragment)
    rol.value = medico.rol
    modifyMedicoModal.show();
}
/**
 * updatedepartamento realizara una peticion para modificar el departamento
 */
const updateDepartamento = async () => {
    let error = ""
    let user = JSON.parse(sessionStorage.getItem("user"));
    let body = {
        "id_departamento": id_departamentoInput.value,
        "departamento": modifyDepartamentoInput.value,
        "arduino": modifyArduinoInput.value
    }
    modifyDepartamentoLoader.classList.toggle("hidden")
    modifyDepartamentoSpan.innerText = ""
    let resultAccount = await putRequest(`${baseUrl}departamento`, body, user.token)
    if (typeof resultAccount == "number") {
        if (resultAccount == 409) {
            error = "El departamento no pudo ser modificado"
        } else {
            error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
        }
    } else {
        error = "Información actualizada correctamente";
        resultsButton.addEventListener("click", () => {
            window.location.reload()
        })
    }
    resultsBody.innerText = error
    modifyDepartamentoLoader.classList.toggle("hidden")
    modifyDepartamentoSpan.innerText = "Aceptar"
    modifyDepartamentoModal.hide()
    resultsModal.show()
}
/**
 * deleteDepartamento realizara una peticion para eliminar el departamento
 */
const deleteDepartamento = async () => {
    if (medicos.filter(medico => medico.id_departamento == id_departamentoInput.value).length == 0) {
        let user = JSON.parse(sessionStorage.getItem("user"));
        let result = await deleteRequest(`${baseUrl}departamento/?id_departamento=${id_departamentoInput.value}`, user.token);
        if (typeof result == "number") {
            if (result == 500) {
                resultsBody.innerText = "El departamento no se pudo eliminar. Por favor vuelva a intentarlo.";
            }
        } else {
            resultsBody.innerText = "El departamento ha sido eliminado correctamente.";
            resultsButton.addEventListener("click", () => {
                window.location.reload()
            })
        }
    } else {
        resultsBody.innerText = "No se puede borrar el departamento. Por favor cambie primero de departamento a sus médicos.";
    }
    eliminarModal.hide()
    resultsModal.show();

}
/**
 * insertarDepartamento realizara una peticion para insertar el departamento
 */
const insertarDepartamento = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));

    let body = {
        "id_departamento": null,
        "departamento": insertarDepartamentoInput.value,
        "arduino": insertArduinoInput.value
    }
    insertDepartamentoSpan.innerText = ""
    insertDepartamentoLoader.classList.toggle("hidden")
    let result = await postRequest(`${baseUrl}departamento`, body, user.token)
    insertDepartamentoSpan.innerText = "Aceptar"
    insertDepartamentoLoader.classList.toggle("hidden")
    // let result = "await postRequest(`${baseUrl}register/?rol=paciente`,body)"
    if (typeof result == "number" || result == null) {
        loader.classList.toggle("hidden");
        button.innerText = "Aceptar";
        if (result == 400) {
            error = "Todos los campos son obligatorios.";
        } else if (result == 409) {
            error = "El departamento que intenta crear ya existe.";
        } else {
            error = "No se pudo conectar al servidor, por favor intentelo más tarde.";
        }
    } else {
        error = "Departamento insertado.";
        resultsButton.addEventListener("click", () => {
            window.location.reload()
        })
    }
    resultsBody.innerText = error
    insertMedicoModal.hide()
    resultsModal.show()
}
// añadimos los eventos
window.addEventListener("DOMContentLoaded", () => {
    loadDatas()
})
medicoForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let error = checkDni(dniMedico) || checkText(nombre, "nombre") || checkText(apellido, "apellido") || checkTelefono(telefono) || checkMail(email) || checkConsulta(consulta) || checkText(departamentoSelect, "departamento")
    if (error == "") {
        insertMedico()
    } else {
        insertMedicError.innerText = error
    }
})
datas.addEventListener("click", (event) => {
    if (event.target.tagName == "BUTTON" && event.target.classList.contains("detailButton")) {
        searchDepartamento(event.target.getAttribute("id"))
    } else if (event.target.tagName == "BUTTON" && event.target.classList.contains("modifyButton")) {
        searchMedico(event.target.getAttribute("id"))
    }
})
modifyButton.addEventListener("click", () => {
    modifyDepartamentoInput.disabled = false;
    modifyArduinoInput.disabled = false;
    controlContainer.classList.toggle("hidden")
    modifyButtonContainer.classList.toggle("hidden")
})
cancelButton.addEventListener("click", () => {
    searchDepartamento(id_departamentoInput.value)
    modifyDepartamentoInput.disabled = true;
    modifyArduinoInput.disabled = true;
    controlContainer.classList.toggle("hidden")
    modifyButtonContainer.classList.toggle("hidden")
})
modifyDepartamentoForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let error = checkText(modifyDepartamentoInput,"departamento") || checkIp(modifyArduinoInput)
    if (error == "") {
        updateDepartamento()
    } else {
        modifyDepartamentError.innerText=error
    }
})
document.getElementById('eliminarModal').addEventListener("hidden.bs.modal", () => {
    modifyDepartamentoModal.show()
})
deleteButton.addEventListener("click", () => {
    modifyDepartamentoModal.hide()
    nombreDepartamentoSpan.innerText = departamentos.filter(departamento => departamento.id_departamento == id_departamentoInput.value)[0].departamento
    eliminarModal.show()
})
deleteDepartamentoButton.addEventListener("click", () => {
    deleteDepartamento()
})
insertDepartamentoForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let error = checkText(insertarDepartamentoInput,"departamento") || checkIp(insertArduinoInput)
    if (error == "") {
        insertarDepartamento()
    } else {
        insertDepartamentError.innerText=error
    }
})
cambiarRol.addEventListener("click", () => {
    if (rol.value == "medico") {
        rol.value = "admin"
    } else {
        rol.value = "medico"
    }
})
modifyMedicoForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let error = checkText(modifyConsulta,"consulta") || checkText(modifyDepartamentoSelect) || checkText(rol, "rol")
    if (error=="") {
        updateMedico()
    } else {
        modifyMedicError.innerText=error
    }
})