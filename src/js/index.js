
const params = new URLSearchParams(window.location.search);
const role = params.get('role');


const userRoleElement = document.getElementById('user-role');


if (role === 'admin') {
    userRoleElement.textContent = 'Administrador';
    userRoleElement.style.color = 'red'; 
} else if (role === 'user') {
    userRoleElement.textContent = 'Usuario';
    userRoleElement.style.color = 'blue';
} else {
    userRoleElement.textContent = 'Invitado';
    userRoleElement.style.color = 'gray';
}