const table = document.getElementById("table");
const recetasContainer = document.getElementById("recetas");
const errorContainer = document.getElementById("error");
const loader = document.getElementById("loader");
const generateQr = (receta) => {
    let qr = new QRious({
        value: `Medicamento: ${receta.medicamento}\nDosis: ${receta.dosis}\nDNI: ${receta.dni_paciente}`,
        size: 80
      });
      
      // Obtén la imagen base64 del código QR generado
      let codigoQRBase64 = qr.toDataURL();
      
      // Asigna la imagen base64 como el origen de la etiqueta <img>
      return codigoQRBase64;
}
const createRecetas = (recetas)=>{
    let fragment = document.createDocumentFragment();
    let tr;
    let td;
    recetas.forEach(element => {
        td = createTd();
        td.appendChild(createImg(generateQr(element),"qr receta"))
        tr = createTr();
        tr.appendChild(createTd(element.medicamento))
        tr.appendChild(createTd(element.dosis))
        tr.appendChild(createTd(element.frecuencia))
        tr.appendChild(createTd(`${element.nombre} ${element.apellido}`))
        tr.appendChild(td)
        fragment.appendChild(tr)
    });
    recetasContainer.appendChild(fragment)
}
const loadRecetas = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await getRequest(`${baseUrl}relations/?rel=receta,medico&key=id_medico&linkTo=dni_paciente&equalTo=${user.dni}`, user.token)
    loader.classList.toggle("hidden")
    if (typeof result == "number") {
        if (result == 404) {
            error = "Usted no tiene ninguna receta."
        } else if (result == 500) {
            error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
        }
        errorContainer.querySelector("h2").innerText = error;
        errorContainer.classList.toggle("hidden")
    } else {
        createRecetas(result.results)
        table.classList.toggle("hidden")
    }
}
window.addEventListener("DOMContentLoaded", () => {
    loadRecetas();
})