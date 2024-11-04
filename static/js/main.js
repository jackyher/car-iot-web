document.getElementById("submitButton").onclick = function () {
    var nombre = document.getElementById("nombre").value; // Obtiene el valor del input
    if (nombre) {
        // Redirige a la página control.html en la carpeta pages
        window.location.href = '/control?nombre=' + encodeURIComponent(nombre); 
    } else {
        alert('Por favor ingrese su nombre'); // Muestra un mensaje si el campo está vacío
    }
};