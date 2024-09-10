document.addEventListener('DOMContentLoaded', () => {
    // Botones del menú principal
    const estudiantesBtn = document.getElementById('estudiantesBtn');
    const profesoresBtn = document.getElementById('profesoresBtn');

    // Menús de estudiantes y profesores
    const menuEstudiantes = document.getElementById('menu-estudiantes');
    const menuProfesores = document.getElementById('menu-profesores');

    // Botones de los menús de estudiantes
    const crearEstudianteBtn = document.getElementById('crearEstudianteBtn');
    const actualizarEstudianteBtn = document.getElementById('actualizarEstudianteBtn');
    const buscarEstudianteBtn = document.getElementById('buscarEstudianteBtn');
    const borrarEstudianteBtn = document.getElementById('borrarEstudianteBtn');

    // Botones de los menús de profesores
    const crearProfesorBtn = document.getElementById('crearProfesorBtn');
    const actualizarProfesorBtn = document.getElementById('actualizarProfesorBtn');
    const buscarProfesorBtn = document.getElementById('buscarProfesorBtn');
    const borrarProfesorBtn = document.getElementById('borrarProfesorBtn');

    // Secciones de cada menú para estudiantes
    const menuCrearEstudiante = document.getElementById('menu-crear-estudiante');
    const menuActualizarEstudiante = document.getElementById('menu-actualizar-estudiante');
    const menuBuscarEstudiante = document.getElementById('menu-buscar-estudiante');
    const menuBorrarEstudiante = document.getElementById('menu-borrar-estudiante');

    // Secciones de cada menú para profesores
    const menuCrearProfesor = document.getElementById('menu-crear-profesor');
    const menuActualizarProfesor = document.getElementById('menu-actualizar-profesor');
    const menuBuscarProfesor = document.getElementById('menu-buscar-profesor');
    const menuBorrarProfesor = document.getElementById('menu-borrar-profesor');

    // Datos simulados de estudiantes
    const estudiantes = [
        { nombre: 'Juan Pérez', id: '123', edad: 21, facultad: 'Ingeniería', promedio: 4.5 },
        { nombre: 'Ana Gómez', id: '124', edad: 22, facultad: 'Medicina', promedio: 4.7 }
    ];

    const profesores = [
        { nombre: 'Dr. López', id: '001', edad: 45, facultad: 'Ingeniería', puntosSalariales: 10 },
        { nombre: 'Dra. Martínez', id: '002', edad: 38, facultad: 'Ciencias Sociales', puntosSalariales: 12 }
    ];

    // Mostrar menú de estudiantes
    estudiantesBtn.addEventListener('click', () => {
        menuEstudiantes.style.display = 'block';
        menuProfesores.style.display = 'none';
        hideAllSections();
    });

    // Mostrar menú de profesores
    profesoresBtn.addEventListener('click', () => {
        menuProfesores.style.display = 'block';
        menuEstudiantes.style.display = 'none';
        hideAllSections();
    });

    // Mostrar las secciones específicas para estudiantes
    crearEstudianteBtn.addEventListener('click', () => showSection(menuCrearEstudiante));
    actualizarEstudianteBtn.addEventListener('click', () => showSection(menuActualizarEstudiante));
    buscarEstudianteBtn.addEventListener('click', () => showSection(menuBuscarEstudiante));
    borrarEstudianteBtn.addEventListener('click', () => showSection(menuBorrarEstudiante));

    // Mostrar las secciones específicas para profesores
    crearProfesorBtn.addEventListener('click', () => showSection(menuCrearProfesor));
    actualizarProfesorBtn.addEventListener('click', () => showSection(menuActualizarProfesor));
    buscarProfesorBtn.addEventListener('click', () => showSection(menuBuscarProfesor));
    borrarProfesorBtn.addEventListener('click', () => showSection(menuBorrarProfesor));

    // Función para mostrar una sección y ocultar todas las demás
    function showSection(section) {
        hideAllSections();
        section.style.display = 'block';
    }

    // Función para ocultar todas las secciones
    function hideAllSections() {
        const sections = document.querySelectorAll('.menu-section');
        sections.forEach(section => section.style.display = 'none');
    }

    // Manejo del formulario de creación de estudiante
    const formCrearEstudiante = document.getElementById('form-crear-estudiante');
    if (formCrearEstudiante) {
        formCrearEstudiante.addEventListener('submit', (event) => {
            event.preventDefault();  // Evitar el envío del formulario y el recargo de la página

            const nombre = document.getElementById('nombre').value;
            const facultad = document.getElementById('facultad').value;
            const edad = document.getElementById('edad').value;
            const promedio = document.getElementById('promedio').value;
            const id = document.getElementById('id').value;

            // Aquí podrías agregar la lógica para guardar el estudiante o enviarlo a tu backend
            console.log(`Estudiante creado: ${nombre}, Facultad: ${facultad}, Edad: ${edad}, Promedio: ${promedio}, ID: ${id}`);

            // Reseteo del formulario tras crear el estudiante
            formCrearEstudiante.reset();
        });
    }

    // Manejo del formulario de creación de profesor
    const formCrearProfesor = document.getElementById('form-crear-profesor');
    if (formCrearProfesor) {
        formCrearProfesor.addEventListener('submit', (event) => {
            event.preventDefault();  // Evitar el envío del formulario y el recargo de la página

            const nombre = document.getElementById('nombre-profesor').value;
            const facultad = document.getElementById('facultad-profesor').value;
            const puntosSalariales = document.getElementById('puntos-salariales').value;
            const edad = document.getElementById('edad-profesor').value;
            const id = document.getElementById('id-profesor').value;

            // Aquí podrías agregar la lógica para guardar el profesor o enviarlo a tu backend
            console.log(`Profesor creado: ${nombre}, Facultad: ${facultad}, Puntos Salariales: ${puntosSalariales}, Edad: ${edad}, ID: ${id}`);

            // Reseteo del formulario tras crear el profesor
            formCrearProfesor.reset();
        });
    }

    // Manejo del formulario de búsqueda y actualización de estudiante
    const formBuscarEstudiante = document.getElementById('form-buscar-estudiante');
    const formActualizarEstudiante = document.getElementById('form-actualizar-estudiante');
    const mensajeErrorEstudiante = document.getElementById('mensaje-error-estudiante');

    if (formBuscarEstudiante) {
        formBuscarEstudiante.addEventListener('submit', (event) => {
            event.preventDefault();

            const idBuscar = document.getElementById('id-buscar-estudiante').value;
            const estudiante = estudiantes.find(e => e.id === idBuscar);

            if (estudiante) {
                // Mostrar formulario de actualización con datos del estudiante
                document.getElementById('nombre-estudiante').value = estudiante.nombre;
                document.getElementById('facultad-estudiante').value = estudiante.facultad;
                document.getElementById('edad-estudiante').value = estudiante.edad;
                document.getElementById('promedio-estudiante').value = estudiante.promedio;

                formActualizarEstudiante.style.display = 'block';
                mensajeErrorEstudiante.style.display = 'none';
            } else {
                // Mostrar mensaje de error
                formActualizarEstudiante.style.display = 'none';
                mensajeErrorEstudiante.style.display = 'block';
            }
        });
    }

    if (formActualizarEstudiante) {
        formActualizarEstudiante.addEventListener('submit', (event) => {
            event.preventDefault();

            const id = document.getElementById('id-buscar-estudiante').value; // Usar el ID del formulario de búsqueda
            const nombre = document.getElementById('nombre-estudiante').value;
            const facultad = document.getElementById('facultad-estudiante').value;
            const edad = document.getElementById('edad-estudiante').value;
            const promedio = document.getElementById('promedio-estudiante').value;

            // Buscar y actualizar el estudiante
            const index = estudiantes.findIndex(e => e.id === id);
            if (index !== -1) {
                estudiantes[index] = { nombre, facultad, edad, promedio, id };
                console.log(`Estudiante actualizado: ${JSON.stringify(estudiantes[index])}`);
            }

            // Resetear formulario
            formActualizarEstudiante.reset();
            formActualizarEstudiante.style.display = 'none';
        });
    }

    // Manejo del formulario de búsqueda y actualización de profesor
    const formBuscarProfesor = document.getElementById('form-buscar-profesor');
    const formActualizarProfesor = document.getElementById('form-actualizar-profesor');
    const mensajeErrorProfesor = document.getElementById('mensaje-error-profesor');

    if (formBuscarProfesor) {
        formBuscarProfesor.addEventListener('submit', (event) => {
            event.preventDefault();

            const idBuscar = document.getElementById('id-buscar-profesor').value;
            const profesor = profesores.find(p => p.id === idBuscar);

            if (profesor) {
                // Mostrar formulario de actualización con datos del profesor
                document.getElementById('nombre-profesor').value = profesor.nombre;
                document.getElementById('facultad-profesor').value = profesor.facultad;
                document.getElementById('puntos-salariales-profesor').value = profesor.puntosSalariales;
                document.getElementById('edad-profesor').value = profesor.edad;

                formActualizarProfesor.style.display = 'block';
                mensajeErrorProfesor.style.display = 'none';
            } else {
                // Mostrar mensaje de error
                formActualizarProfesor.style.display = 'none';
                mensajeErrorProfesor.style.display = 'block';
            }
        });
    }

    if (formActualizarProfesor) {
        formActualizarProfesor.addEventListener('submit', (event) => {
            event.preventDefault();

            const id = document.getElementById('id-buscar-profesor').value; // Usar el ID del formulario de búsqueda
            const nombre = document.getElementById('nombre-profesor').value;
            const facultad = document.getElementById('facultad-profesor').value;
            const puntosSalariales = document.getElementById('puntos-salariales-profesor').value;
            const edad = document.getElementById('edad-profesor').value;

            // Buscar y actualizar el profesor
            const index = profesores.findIndex(p => p.id === id);
            if (index !== -1) {
                profesores[index] = { nombre, facultad, puntosSalariales, edad, id };
                console.log(`Profesor actualizado: ${JSON.stringify(profesores[index])}`);
            }

            // Resetear formulario
            formActualizarProfesor.reset();
            formActualizarProfesor.style.display = 'none';
        });
    }

    // Formularios y mensajes para buscar estudiante
    const resultadoBusquedaEstudiante = document.getElementById('resultado-busqueda-estudiante');


    // Mostrar el menú de búsqueda de estudiante
    buscarEstudianteBtn.addEventListener('click', () => {
        document.getElementById('menu-buscar-estudiante').style.display = 'block';
    });

    // Manejo del formulario para buscar estudiante
    formBuscarEstudiante.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        const idBuscar = document.getElementById('id-buscar-estudiante').value;
        const estudiante = estudiantes.find(e => e.id === idBuscar);  // Buscar en la lista de estudiantes

        if (estudiante) {
            // Mostrar detalles del estudiante
            document.getElementById('resultado-nombre').textContent = `Nombre: ${estudiante.nombre}`;
            document.getElementById('resultado-facultad').textContent = `Facultad: ${estudiante.facultad}`;
            document.getElementById('resultado-edad').textContent = `Edad: ${estudiante.edad}`;
            document.getElementById('resultado-promedio').textContent = `Promedio: ${estudiante.promedio}`;
            document.getElementById('resultado-id').textContent = `ID: ${estudiante.id}`;

            // Muestra la sección con el resultado
            resultadoBusquedaEstudiante.style.display = 'block';
            mensajeErrorEstudiante.style.display = 'none';

            // NO ocultar las secciones relacionadas con estudiantes
            menuEstudiantes.style.display = 'block';  // Asegurarse de que el menú de estudiantes siga visible
        } else {
            // Mostrar mensaje de error si no se encuentra el estudiante
            resultadoBusquedaEstudiante.style.display = 'none';
            mensajeErrorEstudiante.style.display = 'block';
        }
    });

    // Manejo del formulario de búsqueda de profesor (no relacionado con actualizar)
    const formBuscarProfesorDatos = document.getElementById('form-buscar-profesor-datos');
    const resultadoBusquedaProfesor = document.getElementById('resultado-busqueda-profesor');
    const mensajeErrorBuscarProfesor = document.getElementById('mensaje-error-buscar-profesor');

    // Mostrar el menú de búsqueda de profesor
    buscarProfesorBtn.addEventListener('click', () => {
        hideAllSections();
        document.getElementById('menu-buscar-profesor-datos').style.display = 'block'; // Mostrar el menú de búsqueda de profesores
    });

    // Manejo del formulario para buscar profesor por ID
    if (formBuscarProfesorDatos) {
        formBuscarProfesorDatos.addEventListener('submit', (event) => {
            event.preventDefault();

            const idBuscar = document.getElementById('id-buscar-profesor-datos').value;
            const profesor = profesores.find(p => p.id === idBuscar);  // Buscar en la lista de profesores

            if (profesor) {
                // Mostrar detalles del profesor
                document.getElementById('resultado-nombre-profesor').textContent = `Nombre: ${profesor.nombre}`;
                document.getElementById('resultado-facultad-profesor').textContent = `Facultad: ${profesor.facultad}`;
                document.getElementById('resultado-puntos-salariales-profesor').textContent = `Puntos Salariales: ${profesor.puntosSalariales}`;
                document.getElementById('resultado-edad-profesor').textContent = `Edad: ${profesor.edad}`;
                document.getElementById('resultado-id-profesor').textContent = `ID: ${profesor.id}`;

                resultadoBusquedaProfesor.style.display = 'block';
                mensajeErrorBuscarProfesor.style.display = 'none';
            } else {
                // Mostrar mensaje de error si no se encuentra el profesor
                resultadoBusquedaProfesor.style.display = 'none';
                mensajeErrorBuscarProfesor.style.display = 'block';
            }
        });
    }

});