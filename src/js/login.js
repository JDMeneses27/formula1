function loguear()
{
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    if(user == "Peneses" && password == "1234" || user == "Admin" && password == "12345")
    {
        window.location="src/html/index.html"
    } else{
        alert("Usuario y/o contraseña incorrecta");
    }
}

let login = document.getElementById("button")
login.addEventListener("click", (e) => {
    e.preventDefault()
    loguear()
})