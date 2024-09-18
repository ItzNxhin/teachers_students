document.addEventListener('DOMContentLoaded', function () {
    // Función para ocultar todos los formularios y resetear sus campos
    function ocultarTodosLosFormularios() {
        const formularios = [
            'menu-crear-estudiante', 'menu-actualizar-estudiante', 'menu-buscar-estudiante', 'menu-borrar-estudiante',
            'menu-crear-profesor', 'menu-actualizar-profesor', 'menu-buscar-profesor', 'menu-borrar-profesor'
        ];
        formularios.forEach(formId => {
            document.getElementById(formId).style.display = 'none';
            // Resetear los formularios cuando se ocultan
            const form = document.querySelector(`#${formId} form`);
            if (form) {
                form.reset();
            }
        });
    }

    // Función para mostrar un menú específico y resetear los formularios
    function mostrarMenu(menuId) {
        document.querySelectorAll('.menu').forEach(menu => {
            menu.style.display = 'none';
            // Resetear los formularios cuando se oculta el menú
            const form = menu.querySelector('form');
            if (form) {
                form.reset();
            }
        });
        document.getElementById(menuId).style.display = 'block';
    }

    // Función para mostrar un formulario específico y resetear los campos
    function mostrarFormulario(formularioId) {
        ocultarTodosLosFormularios();
        document.getElementById(formularioId).style.display = 'block';
    }

    // Botones de navegación
    document.getElementById('btn-estudiantes').addEventListener('click', () => {
        mostrarMenu('menu-estudiantes');
        ocultarTodosLosFormularios();
    });

    document.getElementById('btn-profesores').addEventListener('click', () => {
        mostrarMenu('menu-profesores');
        ocultarTodosLosFormularios();
    });

    // Menú de estudiantes
    document.getElementById('btn-crear-estudiante').addEventListener('click', () => {
        mostrarFormulario('menu-crear-estudiante');
    });

    document.getElementById('btn-actualizar-estudiante').addEventListener('click', () => {
        mostrarFormulario('menu-actualizar-estudiante');
    });

    document.getElementById('btn-buscar-estudiante').addEventListener('click', () => {
        mostrarFormulario('menu-buscar-estudiante');
    });

    document.getElementById('btn-borrar-estudiante').addEventListener('click', () => {
        mostrarFormulario('menu-borrar-estudiante');
    });

    // Menú de profesores
    document.getElementById('btn-crear-profesor').addEventListener('click', () => {
        mostrarFormulario('menu-crear-profesor');
    });

    document.getElementById('btn-actualizar-profesor').addEventListener('click', () => {
        mostrarFormulario('menu-actualizar-profesor');
    });

    document.getElementById('btn-buscar-profesor').addEventListener('click', () => {
        mostrarFormulario('menu-buscar-profesor');
    });

    document.getElementById('btn-borrar-profesor').addEventListener('click', () => {
        mostrarFormulario('menu-borrar-profesor');
    });

    // Formulario de crear estudiante
    document.getElementById('form-crear-estudiante').addEventListener('submit', function (e) {
        e.preventDefault();
        let estudent = {
            edit: false,
            nombre: this.nombre.value,
            id: this.id.value,
            edad: this.edad.value,
            facultad: this.facultad.value,
            promedio: this.promedio.value

        }
        console.log('hola')
        fetch('http://localhost:8080/backend/api/controllerEstudiantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estudent) // Convertimos el objeto a JSON
        })
            .then(response => response.json()) // Esperamos la respuesta en formato JSON
            .then(data => alert(data.message))
            .catch(error => console.error('Error:', error));
    });

    // Formulario de actualizar estudiante
    document.getElementById('form-buscar-estudiante-actualizar').addEventListener('submit', function (e) {
        e.preventDefault();
        const estudianteId = this.querySelector('input').value;
        console.log('Buscar estudiante con ID:', estudianteId);

        fetch(`http://localhost:8080/backend/api/controllerEstudiantes?id=${estudianteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json()) // Esperamos la respuesta en formato JSON
            .then(data => {
                if (!data.exist) {
                    this.reset();
                    alert("Estudiante no existe")
                    document.getElementById('resultado-busqueda-estudiante').style.display = 'block';
                    document.getElementById('mensaje-error-buscar-estudiante').style.display = 'none';
                }
                else {
                    const datosEstudiante = {
                        nombre: data.nombre,
                        facultad: data.facultad,
                        edad: data.edad,
                        promedio: data.promedio
                    };
                    document.getElementById('input-nombre-estudiante-actualizar').value = datosEstudiante.nombre;
                    document.getElementById('input-facultad-estudiante-actualizar').value = datosEstudiante.facultad;
                    document.getElementById('input-edad-estudiante-actualizar').value = datosEstudiante.edad;
                    document.getElementById('input-promedio-estudiante-actualizar').value = datosEstudiante.promedio;
                    document.getElementById('form-actualizar-estudiante').style.display = 'block';
                    document.getElementById('mensaje-error-estudiante').style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    });

    document.getElementById('form-actualizar-estudiante').addEventListener('submit', function (e) {
        e.preventDefault();
        let estudent = {
            edit: true,
            nombre: this.nombre.value,
            id: document.getElementById('form-buscar-estudiante-actualizar').querySelector('input').value,
            edad: this.edad.value,
            facultad: this.facultad.value,
            promedio: this.promedio.value

        }
        console.log('hola')
        fetch('http://localhost:8080/backend/api/controllerEstudiantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estudent) // Convertimos el objeto a JSON
        })
            .then(response => response.json()) // Esperamos la respuesta en formato JSON
            .then(data => alert(data.message))
            .catch(error => console.error('Error:', error));
    });

    // Formulario de buscar estudiante
    document.getElementById('form-buscar-estudiante-datos').addEventListener('submit', function (e) {
        e.preventDefault();
        const estudianteId = this.querySelector('input').value;
        console.log('Buscar estudiante con ID:', estudianteId);

        fetch(`http://localhost:8080/backend/api/controllerEstudiantes?id=${estudianteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json()) // Esperamos la respuesta en formato JSON
            .then(data => {
                if (!data.exist) {
                    alert("Estudiante no existe")
                    document.getElementById('resultado-busqueda-estudiante').style.display = 'block';
                    document.getElementById('mensaje-error-buscar-estudiante').style.display = 'none';
                }
                else {
                    const datosEstudiante = {
                        nombre: data.nombre,
                        facultad: data.facultad,
                        edad: data.edad,
                        promedio: data.promedio
                    };
                    document.getElementById('resultado-nombre-estudiante').textContent = `Nombre: ${datosEstudiante.nombre}`;
                    document.getElementById('resultado-facultad-estudiante').textContent = `Facultad: ${datosEstudiante.facultad}`;
                    document.getElementById('resultado-edad-estudiante').textContent = `Edad: ${datosEstudiante.edad}`;
                    document.getElementById('resultado-promedio-estudiante').textContent = `Promedio: ${datosEstudiante.promedio}`;
                    document.getElementById('resultado-busqueda-estudiante').style.display = 'block';
                    document.getElementById('mensaje-error-buscar-estudiante').style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    });

    // Formulario de borrar estudiante
    document.getElementById('form-buscar-estudiante-borrar').addEventListener('submit', function (e) {
        e.preventDefault();
        const estudianteId = this.querySelector('input').value;
        console.log('Buscar estudiante con ID:', estudianteId);

        fetch(`http://localhost:8080/backend/api/controllerEstudiantes?id=${estudianteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json()) // Esperamos la respuesta en formato JSON
            .then(data => {
                if (!data.exist) {
                    alert("Estudiante no existe")
                    document.getElementById('resultado-busqueda-estudiante').style.display = 'block';
                    document.getElementById('mensaje-error-buscar-estudiante').style.display = 'none';
                }
                else {
                    const datosEstudiante = {
                        nombre: data.nombre,
                        facultad: data.facultad,
                        edad: data.edad,
                        promedio: data.promedio
                    };
                    document.getElementById('detalle-nombre-estudiante-borrar').textContent = `Nombre: ${datosEstudiante.nombre}`;
                    document.getElementById('detalle-facultad-estudiante-borrar').textContent = `Facultad: ${datosEstudiante.facultad}`;
                    document.getElementById('detalle-edad-estudiante-borrar').textContent = `Edad: ${datosEstudiante.edad}`;
                    document.getElementById('detalle-promedio-estudiante-borrar').textContent = `Promedio: ${datosEstudiante.promedio}`;
                    document.getElementById('detalles-estudiante').style.display = 'block';
                    document.getElementById('mensaje-error-borrar-estudiante').style.display = 'none';
                }
            })

    });

    document.getElementById('btn-confirmar-borrar-estudiante').addEventListener('click', function (e) {
        e.preventDefault();
        const estudianteId = document.getElementById('form-buscar-estudiante-borrar').querySelector('input').value;
        console.log('Buscar estudiante con ID:', estudianteId);

        fetch(`http://localhost:8080/backend/api/controllerEstudiantes?id=${estudianteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json()) // Esperamos la respuesta en formato JSON
            .then(data => {
                alert(data.message)
            })
    })

    ocultarTodosLosFormularios();
});

// Menú de crear profesor
document.getElementById('form-crear-profesor').addEventListener('submit', function (e) {
    e.preventDefault();
    // agregar la lógica para enviar los datos del formulario
    console.log('Profesor creado:', {
        nombre: this.nombre.value,
        facultad: this.facultad.value,
        puntosSalariales: this['puntos-salariales'].value,
        edad: this.edad.value,
        id: this.id.value
    });
    alert('Profesor creado con éxito.');
    this.reset();
});

// Formulario de actualizar profesor
document.getElementById('form-buscar-profesor-actualizar').addEventListener('submit', function (e) {
    e.preventDefault();
    const profesorId = this.id.value;
    console.log('Buscar profesor con ID:', profesorId);
    // Ejemplo de datos para actualizar
    const datosProfesor = {
        nombre: 'Ana López',
        facultad: 'Matemáticas',
        puntosSalariales: 5000,
        edad: 35
    };
    document.getElementById('input-nombre-profesor-actualizar').value = datosProfesor.nombre;
    document.getElementById('input-facultad-profesor-actualizar').value = datosProfesor.facultad;
    document.getElementById('input-puntos-salariales-profesor-actualizar').value = datosProfesor.puntosSalariales;
    document.getElementById('input-edad-profesor-actualizar').value = datosProfesor.edad;
    document.getElementById('form-actualizar-profesor').style.display = 'block';
    document.getElementById('mensaje-error-profesor-actualizar').style.display = 'none';
});

document.getElementById('form-actualizar-profesor').addEventListener('submit', function (e) {
    e.preventDefault();
    // agregar la lógica para actualizar los datos del profesor
    console.log('Profesor actualizado:', {
        nombre: this.nombre.value,
        facultad: this.facultad.value,
        puntosSalariales: this['puntos-salariales'].value,
        edad: this.edad.value
    });
    alert('Profesor actualizado con éxito.');
    this.reset();
});

// Formulario de buscar profesor
document.getElementById('form-buscar-profesor-datos').addEventListener('submit', function (e) {
    e.preventDefault();
    const profesorId = this.querySelector('input').value;
    console.log('Buscar profesor con ID:', profesorId);
    // Ejemplo de datos encontrados
    const datosProfesor = {
        nombre: 'Ana López',
        facultad: 'Matemáticas',
        puntosSalariales: 5000,
        edad: 35
    };
    document.getElementById('resultado-nombre-profesor').textContent = `Nombre: ${datosProfesor.nombre}`;
    document.getElementById('resultado-facultad-profesor').textContent = `Facultad: ${datosProfesor.facultad}`;
    document.getElementById('resultado-puntos-salariales-profesor').textContent = `Puntos Salariales: ${datosProfesor.puntosSalariales}`;
    document.getElementById('resultado-edad-profesor').textContent = `Edad: ${datosProfesor.edad}`;
    document.getElementById('resultado-busqueda-profesor').style.display = 'block';
    document.getElementById('mensaje-error-buscar-profesor').style.display = 'none';
});

// Formulario de borrar profesor
document.getElementById('form-buscar-profesor-borrar').addEventListener('submit', function (e) {
    e.preventDefault();
    const profesorId = this.id.value;
    console.log('Buscar profesor para borrar con ID:', profesorId);
    // Ejemplo de datos para confirmar borrado
    const datosProfesor = {
        nombre: 'Ana López',
        facultad: 'Matemáticas',
        puntosSalariales: 5000,
        edad: 35
    };
    document.getElementById('detalle-nombre-profesor-borrar').textContent = `Nombre: ${datosProfesor.nombre}`;
    document.getElementById('detalle-facultad-profesor-borrar').textContent = `Facultad: ${datosProfesor.facultad}`;
    document.getElementById('detalle-puntos-salariales-profesor-borrar').textContent = `Puntos Salariales: ${datosProfesor.puntosSalariales}`;
    document.getElementById('detalle-edad-profesor-borrar').textContent = `Edad: ${datosProfesor.edad}`;
    document.getElementById('detalles-profesor').style.display = 'block';
    document.getElementById('mensaje-error-borrar-profesor').style.display = 'none';
});

document.getElementById('btn-confirmar-borrar-profesor').addEventListener('click', function () {
    // agregar la lógica para borrar el profesor
    alert('Profesor borrado con éxito.');
    ocultarTodosLosFormularios();
});

