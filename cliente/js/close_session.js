const closeSession = document.getElementById("close_session");
closeSession.addEventListener("click",(event)=>{
    event.preventDefault();
    sessionStorage.removeItem("user");
    window.location="/index.html";
})