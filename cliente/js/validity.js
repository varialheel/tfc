const checkMail = (input) => {
    let valid = "";
    if (input.validity.valueMissing) {
        valid = "La dirección de correo es obligatoria."
    } else if (!input.validity.valid) {
        valid = "La dirección de correo no es correcta."
    }
    return valid
}
const checkFecNac = (input) => {
    let date = new Date(input.value);
    let actualDate = new Date();
    actualDate = actualDate.setFullYear(actualDate.getFullYear() - 18)
    date.setHours(0, 0, 0, 0);
    actualDate.setHours(0, 0, 0, 0);
    let valid = "";
    if (input.validity.valueMissing) {
        valid = "La fecha de nacimiento es obligatoria."
    } else if (date > actualDate) {
        valid = "La edad minima es 18 años."
    }
    return valid
}
const checkCita = (input) => {
    let date = new Date(input.value);
    let actualDate = new Date();
    let valid = "";
    date.setHours(0, 0, 0, 0);
    actualDate.setHours(0, 0, 0, 0);
    if (input.validity.valueMissing) {
        valid = "La fecha de la cita es obligatoria."
    } else if (date < actualDate) {
        valid = "La fecha de la cita no puede ser anterior a la fecha actual."
    }
    return valid
}
const checkText = (input, name) => {
    let valid = "";
    if (input.validity.valueMissing) {
        valid = `El campo ${name} es obligatorio.`
    }
    return valid
}
const checkConsulta = (input) => {
    let valid = "";
    if (input.validity.valueMissing) {
        valid = `El campo consulta es obligatorio.`
    } else if (input.length>6) {
        valid = `El nombre de la consulta es demasiado largo.`
    }
    return valid
}
const checkDni = (input) => {
    let letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    let number = input.value.slice(0, -1);
    let valid = "";
    if (input.validity.valueMissing) {
        valid = `El DNI es obligatorio.`
    } else if (input.value.length !== 9) {
        valid = "La longitud del DNI no es correcta"
    } else if (!(/[0-9]{8}[A-Z]{1}/.test(input.value))) {
        valid = "El formato del DNI no es correcto"
    } else if (letras.charAt(number % 23) != input.value.slice(-1).toUpperCase()) {
        valid = "La letra del DNI no es correcta."
    }
    return valid
}
const checkPassword = (input) => {
    let valid = "";
    if (input.validity.valueMissing) {
        valid = `La contraseña es obligatorio.`
    } else if (input.value.length < 8) {
        valid = "La longitud de la contraseña no es correcta"
    }
    return valid
}
const checkTelefono = (input) => {
    let valid = "";
    if (input.validity.valueMissing) {
        valid = `El formato del número de teléfono es obligatorio.`
    } else if (!/^\d{9}$/.test(input.value)) {
        valid = "El formato del número de teléfono no es correcto."
    }
    return valid
}
const checkIp = (input) => {
    let valid = "";
    if (input.validity.valueMissing) {
        valid = `La ip es obligatorio.`
    } else if (!/^(?:\d{1,3}\.){3}\d{1,3}$/.test(input.value)) {
        valid = "La ip no es correcta"
    }
    return valid
}
const checkHour = (input)=>{
    let valid = "";
    if (input.validity.valueMissing) {
        valid = `La hora es obligatoria.`
    } else if (input.value.split(':')[0] < 8 || input.value.split(':')[0] > 20) {
        valid = "La hora debe estar entre las 8 am y las 8 pm."
    }
    return valid
}