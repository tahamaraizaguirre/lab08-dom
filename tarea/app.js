
// Clase para guardar los datos de cada estudiante
class Estudiante {
    constructor(nombre, nota) {
        this.nombre = nombre;
        this.nota = nota;
    }

    estado() {
        if (this.nota >= 13) {
            return "Aprobado";
        } else {
            return "Desaprobado";
        }
    }

    descripcion() {
        return this.nombre + " - Nota: " + this.nota + " - " + this.estado();
    }
}


const formulario = document.querySelector("#formulario");
const nombre = document.querySelector("#nombre");
const nota = document.querySelector("#nota");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#listaEstudiantes");

const estudiantes = [];

function mostrarEstudiantes() {
    lista.textContent = "";

    estudiantes.forEach((estudiante, indice) => {
        const elemento = document.createElement("li");
        elemento.textContent = estudiante.descripcion();

        if (estudiante.nota >= 13) {
            elemento.classList.add("aprobado");
        } else {
            elemento.classList.add("desaprobado");
        }

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        btnEliminar.addEventListener("click", () => {
            estudiantes.splice(indice, 1);
            mostrarEstudiantes();
        });

        elemento.appendChild(btnEliminar);
        lista.appendChild(elemento);
    });
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombreIngresado = nombre.value.trim();
    const notaIngresada = Number(nota.value);

    if (nombreIngresado === "" || nota.value === "") {
        mensaje.textContent = "Completa todos los campos.";
        mensaje.classList.add("error");
    } else if (notaIngresada < 0 || notaIngresada > 20) {
        mensaje.textContent = "La nota debe estar entre 0 y 20.";
        mensaje.classList.add("error");
    } else {
        const estudiante = new Estudiante(nombreIngresado, notaIngresada);

        estudiantes.push(estudiante);
        mostrarEstudiantes();

        mensaje.textContent = "Estudiante registrado correctamente.";
        mensaje.classList.remove("error");

        formulario.reset();
    }
});
