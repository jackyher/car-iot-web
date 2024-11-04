// Función para obtener el parámetro de la URL
function getQueryParam(param) {
    let params = new URLSearchParams(window.location.search);
    return params.get(param);
}

// Obtiene el valor del nombre
let nombre = getQueryParam('nombre');

// Muestra el nombre en el campo de input o directamente en la página
if (nombre) {
    document.getElementById("nombreInput").value = nombre; // Asigna el nombre al input, si existe
}

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones
    const buttons = document.querySelectorAll('.square-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remueve la clase de borde de los demás botones
            buttons.forEach(btn => btn.classList.remove('active-border'));

            // Añade la clase de borde al botón que fue presionado
            button.classList.add('active-border');
        });
    });
});

// Función para enviar los datos a la API de forma asíncrona
async function enviarDatos(status, nombre, idDevice) {
    try {
        const response = await fetch("http://54.166.197.213:5000/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: parseInt(status), // Convertir el status a número
                name: nombre,
                id_device: idDevice
            })
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta de la API");
        }

        const data = await response.json();
        console.log("Éxito:", data);
    } catch (error) {
        console.error("Error al enviar datos:", error);
    }
}

// Configuración de eventos de clic en cada botón para enviar datos rápidamente
document.addEventListener("DOMContentLoaded", function () {
    const nombreInput = document.getElementById("nombreInput");
    const botones = document.querySelectorAll(".icon");

    botones.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.id; // Obtener el ID del botón (status)
            const nombre = nombreInput.value; // Obtener el valor del input
            const idDevice = btoa(nombre); // Generar el idDevice codificando el nombre en Base64

            // Llamar a la función de envío de datos sin esperar la respuesta
            enviarDatos(status, nombre, idDevice);

            // Cambiar las imágenes de los LEDs según el ID del botón
            cambiarLeds(status);
        });
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    await cargarUltimoRegistro();

    document.getElementById("show-previous-records").addEventListener("click", async () => {
        const previousRecordsSection = document.getElementById("previous-records-section");
        if (previousRecordsSection.style.display === "none") {
            await cargarTodosLosRegistros();
            previousRecordsSection.style.display = "block";
        } else {
            previousRecordsSection.style.display = "none";
        }
    });
});

// Función para cargar el último registro
async function cargarUltimoRegistro() {
    try {
        const response = await fetch("http://54.166.197.213:5000/api/last");
        if (!response.ok) throw new Error("Error al obtener el último registro");

        const record = await response.json();
        const tbody = document.querySelector("#last-record-table tbody");
        tbody.innerHTML = `
            <tr>
                <td>${record.id}</td>
                <td>${record.name}</td>
                <td>${record.id_device}</td>
                <td>${record.ip_client}</td>
                <td>${record.status}</td>
                <td>${record.date}</td>
            </tr>
        `;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Actualiza el último registro cada 2 segundos
setInterval(cargarUltimoRegistro, 2000);

// Función para cargar todos los registros
async function cargarTodosLosRegistros() {
    try {
        const response = await fetch("http://54.166.197.213:5000/api/read");
        if (!response.ok) throw new Error("Error al obtener los registros");

        const records = await response.json();
        const tbody = document.querySelector("#all-records-table tbody");
        records.reverse(); // Invierte el arreglo de registros
        tbody.innerHTML = records
            .map(record => `
                <tr>
                    <td>${record.id}</td>
                    <td>${record.name}</td>
                    <td>${record.id_device}</td>
                    <td>${record.ip_client}</td>
                    <td>${record.status}</td>
                    <td>${record.date}</td>
                </tr>
            `)
            .join("");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Función para cambiar las imágenes de los LEDs según el botón presionado
function cambiarLeds(id) {
    // Apagar todas las LEDs primero
    const ledElements = document.querySelectorAll('.overlay-led1, .overlay-led2, .overlay-led3, .overlay-led4');
    ledElements.forEach(led => {
        led.src = "/static/img/led-off.png"; // Cambiar todas a apagado
    });

    // Encender LEDs según el ID del botón
    switch (id) {
        case "1":
            document.querySelector(".overlay-led1").src = "/static/img/led-on.png"; // led1
            document.querySelector(".overlay-led2").src = "/static/img/led-on.png"; // led2
            break;
        case "2":
            document.querySelector(".overlay-led1").src = "/static/img/led-on.png"; // led1
            document.querySelector(".overlay-led3").src = "/static/img/led-on.png"; // led3
            break;
        case "3":
            // Todos LEDs están apagados, ya están configurados al inicio
            break;
        case "4":
            document.querySelector(".overlay-led2").src = "/static/img/led-on.png"; // led2
            document.querySelector(".overlay-led4").src = "/static/img/led-on.png"; // led4
            break;
        case "5":
            document.querySelector(".overlay-led3").src = "/static/img/led-on.png"; // led3
            document.querySelector(".overlay-led4").src = "/static/img/led-on.png"; // led4
            break;
        case "6":
            document.querySelector(".overlay-led1").src = "/static/img/led-on.png"; // led1
            document.querySelector(".overlay-led3").src = "/static/img/led-on.png"; // led3
            break;
        case "7":
            document.querySelector(".overlay-led2").src = "/static/img/led-on.png"; // led2
            document.querySelector(".overlay-led4").src = "/static/img/led-on.png"; // led4
            break;
    }
}
