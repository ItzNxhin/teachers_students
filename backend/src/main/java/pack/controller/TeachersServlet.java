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

import pack.model.persistence.ProfesorDTO;

@WebServlet("/api/controllerProfesores")
public class TeachersServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        GestorProfesores gestion = new GestorProfesores();
        GestorID existencia = new GestorID();
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
            int puntos = jsonObject.getInt("puntos");
            // Creacion del DTO
            ProfesorDTO est = new ProfesorDTO();
            est.setNombre(nombre);
            est.setId(id);
            est.setEdad(edad);
            est.setFacultad(facultad);
            est.setPuntosSalariales(puntos);
            if (edit) {
                gestion.edit(est);
                message = "El profesor fue actualizado con exito";
            } else {
                // Verificar existencia, y si existe guardar
                if (existencia.exists(est))
                    message = "No se puede crear porque ya existe un profesor con esa ID";
                else {
                    gestion.create(est);
                    message = "El profesor se creo con exito";
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
        GestorProfesores gestion = new GestorProfesores();
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
                ProfesorDTO est = gestion.get(id);
                jsonResponse.put("nombre", est.getNombre());
                jsonResponse.put("edad", est.getEdad());
                jsonResponse.put("facultad", est.getFacultad());
                jsonResponse.put("puntos", est.getPuntosSalariales());
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
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        GestorProfesores gestion = new GestorProfesores();
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
            gestion.delete(id);
            message = "El profesor ha sido eliminado con existo";
        } catch (Exception e) {
            message = e.getMessage();
        }

        jsonResponse.put("status", "success");
        jsonResponse.put("message", message);
        out.print(jsonResponse.toString());
    }
}