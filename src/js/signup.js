// const signupForm = document.querySelector('#signupForm')
// signupForm.addEventListener('submit', (e) =>{
//     e.preventDefault()
//     const user = document.querySelector('#user').value
//     const email = document.querySelector('#email').value
//     const password = document.querySelector('#password').value

//     const Users = JSON.parse(localStorage.getItem('users'))  || []
//     const isuserRegistered = Users.find(user => user.email === email)
//     if(isuserRegistered){
//         return alert('El usuario ya esta registrado')
//     }

//     Users.push({user: user, email: email, password: password})
//     localStorage.setItem('users', JSON.stringify(Users))
//     alert('Registro completo')
//     window.location.href = 'login.html'
// })