function addCountries() {
    // Obtén los valores de los campos del formulario
    let nameCity = document.getElementById('input-name').value;
    let capitalCity = document.getElementById('input-capital').value;
    let populationCity = document.getElementById('input-population').value;
    let languageCity = document.getElementById('input-language').value;
    let currencyCity = document.getElementById('input-currency').value;
    let areaCity = document.getElementById('input-area').value;

    // Define la estructura que transportará la información de la ciudad
    let cityData = {
        name: nameCity,
        capital: capitalCity,
        population: populationCity,
        language: languageCity,
        currency: currencyCity,
        area: areaCity
    };

    // Define la URI del servicio para agregar ciudades
    let url = 'http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementCountries/createCountries';
    
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

function updateCountry() {
    // Obtén los valores de los campos del formulario
    let name = document.getElementById('input-name').value.trim();
    let capital = document.getElementById('input-capital').value.trim();
    let population = document.getElementById('input-population').value.trim();
    let language = document.getElementById('input-language').value.trim();
    let currency = document.getElementById('input-currency').value.trim();
    let area = document.getElementById('input-area').value.trim();

    // Verifica que el nombre del país no esté vacío
    if (!name) {
        alert("Por favor, introduce el nombre del país.");
        return;
    }

    // Crea el objeto con los datos actualizados
    let countryData = {
        name: name,
        capital: capital,
        population: population,
        language: language,
        currency: currency,
        area: area
    };

    let url = 'http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementCountries/updateCountries';

    // Envía la solicitud de actualización
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(countryData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            alert("País actualizado exitosamente.");
            window.location.href = "./dashboard.html"; // Redirige al dashboard u otra página deseada
        } else {
            alert("No se pudo actualizar el país. Verifica que el nombre sea correcto.");
        }
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
        alert("Error al actualizar el país. Ver consola para detalles.");
    });
}
