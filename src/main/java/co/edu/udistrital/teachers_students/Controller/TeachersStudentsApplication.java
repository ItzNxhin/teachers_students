package co.edu.udistrital.teachers_students.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import co.edu.udistrital.teachers_students.Model.Estudiante;
import co.edu.udistrital.teachers_students.Model.Profesor;
import co.edu.udistrital.teachers_students.Model.persistence.EstudentDAO;
import co.edu.udistrital.teachers_students.Model.persistence.ProfesorDTO;
import co.edu.udistrital.teachers_students.Model.persistence.TeacherDAO;
import jakarta.annotation.PostConstruct;

import java.util.ArrayList;

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
    public void insertarProfesor(@RequestBody Profesor persona) {
        try{
            gP.create(persona);
        }
        catch(Exception e){
        }
    }

    @PostMapping("/FrontEnd/insertarEstudiante")
    public void insertarEstudiante(@RequestBody Estudiante persona) {
        try{
            gE.create(persona);
        }
        catch(Exception e){
            System.out.println(e);
        }
    }

    //Existencia de una persona
    @GetMapping("/FrontEnd/exiteEstudiante")
	public Boolean existeEstudiante(@RequestBody String id){
        if (!gE.ids().isEmpty()) if(gE.ids().contains(id)) return true;
        else return false;
        
        return false;
	}

    @GetMapping("/FrontEnd/exiteProfesor")
    public Boolean existeProfesor(@RequestBody String id)throws Exception{
        if (!gP.ids().isEmpty()) if(gP.ids().contains(id)) return true;
        else return false;
        
        return false;
	}

    //Eliminar una persona
    @PostMapping("/FrontEnd/eliminarProfesor")
	public void eliminarProfesor(@RequestBody String cedula){
		try {
			gP.delete(cedula);
		} catch (Exception e) {

		}
		System.out.println(cedula);
	}

    @PostMapping("/FrontEnd/eliminarEstudiante")
	public void eliminarEstudiante(@RequestBody String cedula){
		try {
			gE.delete(cedula);
		} catch (Exception e) {

		}
		System.out.println(cedula);
	}

    //Actualizar una persona
    @PostMapping("/FrontEnd/editarProfesor")
    public void editarProfesor(@RequestBody Profesor persona) {
        try{
            gP.update(gP.findID(persona.getId()), persona);
        }
        catch(Exception e){
        }
    }

    @PostMapping("/FrontEnd/editarEstudiante")
    public void editarEstudiante(@RequestBody Estudiante persona) {
        try{
            gE.update(gE.findID(persona.getId()), persona);
        }
        catch(Exception e){
            System.out.println(e);
        }
    }

    //Consultas
    //Lista de cedulas
    @GetMapping("/FrontEnd/traerCedulasEstudiantes")
	public ArrayList<String> traerCedulasEstudiantes()throws Exception{
        return gE.ids();
	}

    @GetMapping("/FrontEnd/traerCedulasProfesores")
    public ArrayList<String> traerCedulasProfesores()throws Exception{
        return gP.ids();
	}
    //Persona
    @GetMapping("/FrontEnd/traerEstudiante")
	public Estudiante traerEstudiante(@RequestBody String id)throws Exception{
        return gE.findID(id);
	}

    @GetMapping("/FrontEnd/traerProfesor")
	public Profesor traerProfesor(@RequestBody String id)throws Exception{
        return gP.findID(id);
	}
}
