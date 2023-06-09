const deleteButton = document.getElementById("deleteButton")
const loaderDelete = document.getElementById("loaderDelete")
const deleteSpan = document.getElementById("deleteSpan")
const deleteAccount = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    deleteSpan.innerText=""
    loaderDelete.classList.toggle("hidden")
    let result = await deleteRequest(`${baseUrl}usuario`, user.token);
    deleteSpan.innerText="Eliminar cuenta"
    loaderDelete.classList.toggle("hidden")
    if (typeof result == "number") {
        if (result == 500) {
            resultsBody.innerText = "El usuario no se pudo eliminar. Por favor vuelva a intentarlo.";
        }
    } else {
        resultsBody.innerText = "El usuario ha sido eliminado correctamente.";
        resultsButton.addEventListener("click",()=>{
            sessionStorage.removeItem("user")
            window.location = "../../index.html";
        })
    }
    resultsModal.show();
}
deleteButton.addEventListener("click",()=>{
    deleteAccount()
})