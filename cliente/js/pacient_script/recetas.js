// creamos las variables
const table = document.getElementById("table");
const recetasContainer = document.getElementById("recetas");
const errorContainer = document.getElementById("error");
const loader = document.getElementById("loader");
/**
 * 
 * @param receta 
 * @returns codigoQRBase64
 * generateQr hara uso de la libreria QRious para generar un codigo qr con los datos de la receta
 */
const generateQr = (receta) => {
    let qr = new QRious({
        value: `Medicamento: ${receta.medicamento}\nDosis: ${receta.dosis}\nDNI: ${receta.dni_paciente}`,
        size: 80
      });
      // guardamos la imagen base64 del código QR generado
      let codigoQRBase64 = qr.toDataURL();
      return codigoQRBase64;
}
/**
 * 
 * @param recetas
 *  createRecetas recorrera el array de recetas y creara una fila por cada receta
 */
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
/**
 * loadrecetas realizara una peticion para recoger los datos de las recetas del paciente
 */
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
// añadimos los eventos
window.addEventListener("DOMContentLoaded", () => {
    loadRecetas();
})