function addCities() {
    // Obtén los valores de los campos del formulario
    let nameCity = document.getElementById('input-name-cities').value;
    let countryCity = document.getElementById('input-name-countries').value;
    let zipCodeCity = document.getElementById('input-zipCode').value;
    let areaCity = document.getElementById('input-area').value;
    let weatherCity = document.getElementById('input-weather').value;
    let nameMajorCity = document.getElementById('input-name-major').value;

    // Define la estructura que transportará la información de la ciudad
    let cityData = {
        name: nameCity,
        country: countryCity,
        zipCode: zipCodeCity,
        area: areaCity,
        weather: weatherCity,
        nameMajor: nameMajorCity
    };

    // Define la URI del servicio para agregar ciudades
    let url = 'http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementCities/createCities';
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cityData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se agregó el registro de la ciudad.");
        window.location.href = "./dashboard.html"; // Redirige al dashboard o a la página deseada
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}

function updateCity() {
    // Obtén los valores de los campos del formulario
    let name = document.getElementById('input-name-cities').value.trim();
    let country = document.getElementById('input-name-countries').value.trim();
    let zipCode = document.getElementById('input-zipCode').value.trim();
    let area = document.getElementById('input-area').value.trim();
    let weather = document.getElementById('input-weather').value.trim();
    let nameMajor = document.getElementById('input-name-major').value.trim();

    // Verifica que el nombre de la ciudad no esté vacío
    if (!name) {
        alert("Por favor, introduce el nombre de la ciudad.");
        return;
    }

    // Crea el objeto con los datos actualizados
    let cityData = {
        name: name,
        country: country,
        zipCode: zipCode,
        area: area,
        weather: weather,
        nameMajor: nameMajor
    };

    let url = 'http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementCities/updateCities';

    // Envía la solicitud de actualización
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cityData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            alert("Ciudad actualizada exitosamente.");
            window.location.href = "./dashboard.html"; // Redirige al dashboard u otra página deseada
        } else {
            alert("No se pudo actualizar la ciudad. Verifica que el nombre sea correcto.");
        }
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
        alert("Error al actualizar la ciudad. Ver consola para detalles.");
    });
}

