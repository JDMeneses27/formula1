// const loginForm = document.querySelector('#loginForm')
// loginForm.addEventListener('submit', (e) =>{
//     e.preventDefault()
//     const email = document.querySelector('#email').value
//     const password = document.querySelector('#password').value
//     const Users = JSON.parse(localStorage.getItem('users')) || []
//     const validUser = Users.find(user => user.email === email && user.password === password)
//     if(!validUser){
//         return alert('Usuario y/o contraseña incorrectos')
//     }
//     alert(`Bienvenido ${validUser.user}`)
//     window.location.href = "../html/index.html"
// })

import { users } from './roles.js';

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        window.location.href = `src/html/index.html?role=${user.role}`;
    } else {
        alert('Credenciales inválidas. Por favor, intente nuevamente.');
    }
});