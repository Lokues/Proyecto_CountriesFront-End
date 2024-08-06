// createUserScript.js

function registerUser() {
    const username = document.getElementById('new-nameuser').value.trim();
    const password = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    if (!username || !password || !confirmPassword) {
        alert('Todos los campos deben ser completados.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    const user = {
        nameUser: username,
        password: password
    };

    fetch('http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementUser/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.text(); // Leer la respuesta como texto
    })
    .then(text => {
        try {
            const data = JSON.parse(text); // Intentar analizar el texto como JSON
            if (data.success) {
                alert('Usuario agregado exitosamente.');
                document.getElementById('new-nameuser').value = '';
                document.getElementById('new-password').value = '';
                document.getElementById('confirm-password').value = '';
            } else {
                alert('Usuario agregado exitosamente.');
            }
        } catch (error) {
            console.error('Error al analizar JSON:', error);
            alert('Error al agregar el usuario.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar el usuario.');
    });
}



function updateUser() {
    // Obtén los valores de los campos del formulario
    const username = document.getElementById('new-nameuser').value.trim();
    const password = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Verifica que todos los campos estén completos
    if (!username || !password || !confirmPassword) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Crea el objeto con los datos actualizados
    const updatedUserData = {
        username: username,
        password: password
    };

    // Envía la solicitud de actualización
    fetch('http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementUsers/updateUser', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUserData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Usuario actualizado con éxito.");
        window.location.href = "./dashboard.html"; // Redirige al dashboard o a la página deseada
    })
    .catch(error => {
        console.error('Error:', error);
    });
}