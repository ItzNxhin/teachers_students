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

@WebServlet("/Controller")
public class StudentServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
        String nombre = jsonObject.getString("nombre");
        //int id = jsonObject.getInt("id");
        int edad = jsonObject.getInt("edad");
        String facultad = jsonObject.getString("facultad");
        double promedio = jsonObject.getDouble("promedio");

        System.out.println(edad);
        // Aquí puedes hacer lo que necesites con los datos, como guardarlos en una base de datos

        // Respuesta de éxito
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("status", "success");
        jsonResponse.put("message", "Estudiante recibido con éxito.");
        out.print(jsonResponse.toString());
    }
}