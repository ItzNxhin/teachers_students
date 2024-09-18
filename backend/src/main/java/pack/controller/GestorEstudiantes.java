package pack.controller;

import java.io.IOException;

import pack.model.Estudiante;
import pack.model.persistence.EstudentDAO;
import pack.model.persistence.EstudianteDTO;
import pack.model.persistence.MapHandler;

public class GestorEstudiantes  {
    
    EstudentDAO gE;
    public GestorEstudiantes(){
        try {
            gE = new EstudentDAO();
        } catch (Exception e) {
            
        }
    }

    public boolean exists(EstudianteDTO estdto) throws IOException {
        if(gE.findID(estdto.getId())!=null) return true;
        else return false;
    }

    public boolean exists(String id) throws IOException {
        if(gE.findID(id)!=null) return true;
        else return false;
    }
    
    public void create(EstudianteDTO estdto) throws IOException {
        Estudiante estudent = new Estudiante();
        estudent.setNombre(estdto.getNombre());
        estudent.setId(estdto.getId());
        estudent.setEdad(estdto.getEdad());
        estudent.setPromedio(estdto.getPromedio());

        gE.create(estudent);
    }

    public EstudianteDTO get(String id){
        return MapHandler.estudianteToDTO(gE.findID(id));
    }

}
