function validateUser(){
    var nameUser = document.getElementById("input-user").value;
    var password = document.getElementById("input-password").value;

    fetch('http://localhost:8080/Proyecto_AlejandroVillanueva/rest/ManagementUser/validateUser?nameUser=' + nameUser +'&password='+password)
    .then(response => response.json())
    .then(response => {
        if(response){
            window.location.href = "./dashboard.html";
        }else{
            alert("El usuario no se encuentra registrado.");
        }
    })
    .catch(error => console.error('Error:', error));
}

// Bootstrap form validation
(function () {
    'use strict';

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
})();

