
# Tarea: Mi componente interactivo

## Registro de notas de estudiantes.

Este componente permite registrar el nombre y la nota de un estudiante, mostrar si está aprobado o desaprobado y eliminar los registros. También valida que los campos estén completos y que las notas estén entre 0 y 20.

## Codigo principal

```js
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
```

## Pruebas realizadas

| Accion | Resultado esperado | Cumple (Si/No) |
|---|---|---|
| Registrar a Ana con nota 17 | Aparece Ana con estado Aprobado en color verde. | Si |
| Registrar a Luis con nota 10 | Aparece Luis con estado Desaprobado en color rojo. | Si |
| Registrar una nota de 25 | Aparece un mensaje indicando que la nota debe estar entre 0 y 20. | Si |
| Enviar los campos vacios | Aparece un mensaje solicitando completar los campos. | Si |
| Presionar el boton Eliminar | El estudiante desaparece de la lista. | Si |

## Por que disene asi mi clase

Elegí los atributos nombre y nota porque son los datos necesarios para registrar a cada estudiante. Utilicé el método estado() para determinar si está aprobado o desaprobado y el método descripcion() para mostrar su información en la página de forma ordenada.
