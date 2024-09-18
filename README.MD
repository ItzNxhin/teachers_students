## ESTUDIANTES Y PROFESORES MVC - DTO - DAO - WEB

Este proyecto tiene la finalidad de gestionar profesores y estudiantes, con la capacidad de crear, consultar, editar y eliminar (CRUD), haciendo uso de Modelo, vista y controllador (MVC), Data tranfer Object (DTO), Data Access Object (DAO) y vista en web, usando HTML, CSS y Javascript, comunicando las dos partes del proyecto, backend con el controlador y el modelo, y frontend con la vista (WEB) a traves de servlets.

## DETALLES DEL PROYECTO

Este proyecto esta programado en java con maven (Version de java 17).

## DESPLEGAR PROYECTO

Para ver y usar las funcionalidades del proyecto, recomendamos el uso de Apache Tomcat, ya sea instalado localmente directamente o a traves de XAMPP. El servicio tomcat debe estar activo en el puerto predeterminado(8080), si no es el caso, cambiar el puerto del servicio a dicho puerto o cambiar todos los puertos de los metodos fetch en el Javascript del frontend al puerto que estara corriendo.

Para desplegarlo, dirigirse a http://localhost:8080/manager/html/, (Cambiar 8080 si esta en otro puerto), dirigirse a la seccion deslplegar y elegir el .war del proyecto, ubicado en la carpeta target del projecto. Otra opcion, si tiene installado Maven en el path del sistema, usar el comando mvn tomcat9:deploy para desplegar (Solo funciona si tiene, user:admin, password:admin como credenciales para entrar al manager, en caso contrario cambiar en el pom.xml, o en tomcat, en la carpeta conf, en el archivo tomcat-users.xml)

## PARTICIPANTES
- NAHIN JOSE PEÑARANDA MEJIA 20231020032
- ALEJANDRO MAURICIO JUNCO OVIEDO 20231020129

## ESTRUCTURA DE ARCHIVOS
- backend: Carpeta del proyecto 
- diagrama: Digrama de clases
- frontend: HTML, CSS y Javascript del proyecto
- data: Archivos binarios en caso de ser necesario