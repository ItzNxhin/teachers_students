package co.edu.udistrital.teachers_students.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import co.edu.udistrital.teachers_students.Model.Estudiante;
import co.edu.udistrital.teachers_students.Model.Profesor;
import co.edu.udistrital.teachers_students.Model.persistence.EstudentDAO;
import co.edu.udistrital.teachers_students.Model.persistence.TeacherDAO;
import jakarta.annotation.PostConstruct;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TeachersStudentsApplication {

    EstudentDAO gE;
    TeacherDAO gP;

    @PostConstruct
    public void init(){
        try {
            gE = new EstudentDAO();
            gP = new TeacherDAO();
        } catch (Exception e) {
            // TODO: handle exception
        }
        

    }
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://127.0.0.1:5501")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    //Insertar persona
     @PostMapping("/FrontEnd/insertarProfesor")
    public void insertarPostulante(@RequestBody Profesor persona) {
        try{
            gP.create(persona);
        }
        catch(Exception e){
        }
    }

    @PostMapping("/FrontEnd/insertarEstudiante")
    public void insertarBuscador(@RequestBody Estudiante persona) {
        try{
            gE.create(persona);
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}
