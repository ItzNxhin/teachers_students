package pack.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import org.json.JSONObject;

import pack.model.persistence.EstudianteDTO;

@WebServlet("/Controller")
public class StudentServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        GestorEstudiantes gestion = new GestorEstudiantes();
        String message = "";
        // Configura el tipo de contenido de la respuesta
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Lee el JSON del cuerpo de la solicitud
        StringBuilder stringBuilder = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        String json = stringBuilder.toString();

        // Procesa el JSON
        JSONObject jsonObject = new JSONObject(json);

        try {
            // Obtener los datos del json
            Boolean edit = jsonObject.getBoolean("edit");
            String nombre = jsonObject.getString("nombre");
            String id = jsonObject.getString("id");
            int edad = jsonObject.getInt("edad");
            String facultad = jsonObject.getString("facultad");
            float promedio = jsonObject.getFloat("promedio");
            // Creacion del DTO
            EstudianteDTO est = new EstudianteDTO();
            est.setNombre(nombre);
            est.setId(id);
            est.setEdad(edad);
            est.setFacultad(facultad);
            est.setPromedio(promedio);
            if (edit) {
                gestion.edit(est);
                message = "El estudiante fue actualizado con exito";
            } else {
                // Verificar existencia, y si existe guardar
                if (gestion.exists(est))
                    message = "No se puede crear porque ya existe un estudiante con esa ID";
                else {
                    gestion.create(est);
                    message = "El estudiante se creo con exito";
                }
            }

        } catch (Exception e) {
            message = e.getMessage();
        }

        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("status", "success");
        jsonResponse.put("message", message);
        out.print(jsonResponse.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        GestorEstudiantes gestion = new GestorEstudiantes();
        Boolean exist = false;
        String message = "";
        // Configura el tipo de contenido de la respuesta
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Obtener el parámetro 'id' de la URL
        String id = request.getParameter("id");

        // Procesa el JSON y prepara la respuesta
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try {
            // Verificar existencia, y si existe, mandar datos
            if (gestion.exists(id)) {
                EstudianteDTO est = gestion.get(id);
                jsonResponse.put("nombre", est.getNombre());
                jsonResponse.put("edad", est.getEdad());
                jsonResponse.put("facultad", est.getFacultad());
                jsonResponse.put("promedio", est.getPromedio());
                exist = true;
            } else {
                exist = false;
            }

        } catch (Exception e) {
            message = e.getMessage();
        }

        jsonResponse.put("exist", exist);
        jsonResponse.put("status", "success");
        jsonResponse.put("message", message);
        out.print(jsonResponse.toString());
    }
}