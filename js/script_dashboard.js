document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            const id = this.id;
            if (id === 'button-books') {
                loadCountries();
            } else if (id === 'button-borrow') {
                loadCities();
            }else if (id === 'button-usuarios') {
                loadUsers();
            }
        });
    });

    // Cargar los países por defecto cuando se cargue la página
    loadCountries();
});

function loadCountries() {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Limpiar el contenido actual

    // Crear la tarjeta para agregar nuevos países
    const cardAdd = document.createElement('div');
    cardAdd.className = 'card';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './addCountries.html';

    const imgAdd = document.createElement('img');
    imgAdd.src = 'resource/icons/agregar-pais.png'; // Asegúrate de tener la imagen en la ruta correcta

    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Puedes agregar nuevos países!';

    btnAdd.appendChild(imgAdd);
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);
    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);

    // Fetch para obtener los países
    fetch('http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementCountries/getCountries')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                // Crear la sección del nombre del país
                const name = document.createElement('h2');
                name.className = 'card-title';
                name.textContent = country.name;

                // Crear la sección de la capital
                const capital = document.createElement('p');
                capital.className = 'card-text';
                capital.textContent = `Capital: ${country.capital}`;

                // Crear la sección de la población
                const population = document.createElement('p');
                population.className = 'card-text';
                population.textContent = `Población: ${country.population}`;

                // Crear la sección del idioma
                const language = document.createElement('p');
                language.className = 'card-text';
                language.textContent = `Idioma: ${country.language}`;

                // Crear la sección de la moneda
                const currency = document.createElement('p');
                currency.className = 'card-text';
                currency.textContent = `Moneda: ${country.currency}`;

                // Crear la sección del área
                const area = document.createElement('p');
                area.className = 'card-text';
                area.textContent = `Área: ${country.area}`;

                // Crear el botón de eliminar
                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn btn-danger';
                btnEliminar.id = `btn-delete-${country.name}`;
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.setAttribute('data-name', country.name);

                // Agregar event listener al botón de eliminar
                btnEliminar.addEventListener('click', function () {
                    const countryName = this.getAttribute('data-name');
                    deleteCountryByName(countryName);
                });

                // Crear el botón de actualizar
                const btnActualizar = document.createElement('a');
                btnActualizar.className = 'btn btn-success margin-button';
                btnActualizar.id = `btn-update-${country.name}`;
                btnActualizar.textContent = 'Actualizar';

                // Agregar event listener al botón de actualizar
                btnActualizar.addEventListener('click', function () {
                    localStorage.setItem("countryData", JSON.stringify(country));
                    window.location.href = "./updateCountry.html";
                });

                // Agregar los componentes al body
                cardBody.appendChild(name);
                cardBody.appendChild(capital);
                cardBody.appendChild(population);
                cardBody.appendChild(language);
                cardBody.appendChild(currency);
                cardBody.appendChild(area);
                cardBody.appendChild(btnEliminar);
                cardBody.appendChild(btnActualizar);

                // Agregar el body al card
                card.appendChild(cardBody);

                // Agregar el card al content
                content.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
}

function updateCountry() {
    const name = document.getElementById('input-name').value;
    const capital = document.getElementById('input-capital').value;
    const population = document.getElementById('input-population').value;
    const language = document.getElementById('input-language').value;
    const currency = document.getElementById('input-currency').value;
    const area = document.getElementById('input-area').value;

    const updatedCountryData = {
        name: name,
        capital: capital,
        population: population,
        language: language,
        currency: currency,
        area: area
    };

    fetch(`http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementCountries/updateCountry`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCountryData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("País actualizado con éxito.");
        window.location.href = "./dashboard.html"; // Redirige al dashboard o a la página deseada
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function loadCities() {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Limpiar el contenido previo

    // Crear la tarjeta para agregar nuevas ciudades
    const cardAdd = document.createElement('div');
    cardAdd.className = 'card';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './addCities.html';

    const imgAdd = document.createElement('img');
    imgAdd.src = 'resource/icons/agregar-ciudad.png'; // Asegúrate de tener la imagen en la ruta correcta

    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Puedes agregar nuevas ciudades!';

    btnAdd.appendChild(imgAdd);
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);
    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);

    // Fetch para obtener las ciudades
    fetch('http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementCities/getCities')
        .then(response => response.json())
        .then(data => {
            data.forEach(city => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                // Crear la sección de nombre de la ciudad
                const name = document.createElement('h2');
                name.className = 'card-title';
                name.textContent = city.name;

                // Crear la sección del país
                const country = document.createElement('p');
                country.className = 'card-text';
                country.textContent = `País: ${city.country}`;

                // Crear la sección del código postal
                const zipCode = document.createElement('p');
                zipCode.className = 'card-text';
                zipCode.textContent = `Código Postal: ${city.zipCode}`;

                // Crear la sección del área
                const area = document.createElement('p');
                area.className = 'card-text';
                area.textContent = `Área: ${city.area}`;

                // Crear la sección del clima
                const weather = document.createElement('p');
                weather.className = 'card-text';
                weather.textContent = `Clima: ${city.weather}`;

                // Crear la sección del nombre del alcalde
                const nameMajor = document.createElement('p');
                nameMajor.className = 'card-text';
                nameMajor.textContent = `Nombre del Alcalde: ${city.nameMajor}`;

                // Crear el botón de eliminar
                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn btn-danger';
                btnEliminar.id = `btn-delete-${city.name}`;
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.setAttribute('data-name', city.name);

                // Agregar event listener al botón de eliminar
                btnEliminar.addEventListener('click', function () {
                    const cityName = this.getAttribute('data-name');
                    deleteCityByName(cityName);
                });

                // Crear el botón de actualizar
                const btnActualizar = document.createElement('a');
                btnActualizar.className = 'btn btn-success margin-button';
                btnActualizar.id = `btn-update-${city.name}`;
                btnActualizar.textContent = 'Actualizar';

                // Agregar event listener al botón de actualizar
                btnActualizar.addEventListener('click', function () {
                    localStorage.setItem("cityData", JSON.stringify(city));
                    window.location.href = "./updatepage.html";
                });

                // Agregar los componentes al body
                cardBody.appendChild(name);
                cardBody.appendChild(country);
                cardBody.appendChild(zipCode);
                cardBody.appendChild(area);
                cardBody.appendChild(weather);
                cardBody.appendChild(nameMajor);
                cardBody.appendChild(btnEliminar);
                cardBody.appendChild(btnActualizar);

                // Agregar el body al card
                card.appendChild(cardBody);

                // Agregar el card al content
                content.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
}



function loadUsers() {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Limpiar el contenido previo

    // Crear la tarjeta para agregar nuevos usuarios
    const cardAdd = document.createElement('div');
    cardAdd.className = 'card';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './createUser.html';

    const imgAdd = document.createElement('img');
    imgAdd.src = 'resource/icons/agregar-usuario.png'; // Asegúrate de tener la imagen en la ruta correcta

    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Puedes agregar nuevos usuarios!';

    btnAdd.appendChild(imgAdd);
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);
    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);

    // Fetch para obtener los usuarios
    fetch('http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementUser/getUsers')
        .then(response => response.json())
        .then(users => {
            if (users.length === 0) {
                content.innerHTML = '<p>No hay usuarios registrados.</p>';
                return;
            }

            users.forEach(user => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                // Crear la sección de nombre de usuario
                const name = document.createElement('h2');
                name.className = 'card-title';
                name.textContent = user.nameUser;

                // Crear la sección de contraseña (no se muestra por razones de seguridad)
                const password = document.createElement('p');
                password.className = 'card-text';
                password.textContent = `Contraseña: ${user.password}`;

                // Crear el botón de eliminar
                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn btn-danger';
                btnEliminar.id = `btn-delete-${user.nameUser}`;
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.setAttribute('data-nameuser', user.nameUser);
                
                // Agregar event listener al botón de eliminar
                btnEliminar.addEventListener('click', function () {
                    const nameuser = this.getAttribute('data-nameuser');
                    deleteUser(nameuser);
                });

                // Crear el botón de actualizar
                const btnActualizar = document.createElement('a');
                btnActualizar.className = 'btn btn-success margin-button';
                btnActualizar.id = `btn-update-${user.nameUser}`;
                btnActualizar.textContent = 'Actualizar';

                // Agregar event listener al botón de actualizar
                btnActualizar.addEventListener('click', function () {
                    localStorage.setItem("userData", JSON.stringify(user));
                    window.location.href = "./updateUser.html";
                });

                // Agregar los componentes al body
                cardBody.appendChild(name);
                cardBody.appendChild(password);
                cardBody.appendChild(btnEliminar);
                cardBody.appendChild(btnActualizar);

                // Agregar el body al card
                card.appendChild(cardBody);

                // Agregar el card al content
                content.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            content.innerHTML = `<p>Error al cargar usuarios: ${error.message}</p>`;
        });
}







function cleanContent() {
    const content = document.getElementById('content');
    content.innerHTML = '';
}







function deleteUser(nameuser) {
    fetch(`http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementUser/deleteUser?nameUser=${nameuser}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            alert("Usuario eliminado con éxito");
            loadUsers(); // Recargar la lista de usuarios
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function deleteCountryByName(name) {
    fetch(`http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementCountries/deleteCountries?nameCountries=${name}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se eliminó el registro");
        loadCountries();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error en la operación: ', error);
    });
}

function deleteCityByName(name) {
    let url = 'http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementCities/deleteCities?nameCities=' + name;
    fetch(url, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert("Se eliminó el registro");
            cleanContent();
            loadCities();
        })
        .catch(error => {
            console.error('Ocurrió el siguiente error en la operación: ', error);
        });
}
