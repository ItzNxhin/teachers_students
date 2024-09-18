package pack.controller;

import java.io.IOException;

import pack.model.Profesor;
import pack.model.persistence.MapHandler;
import pack.model.persistence.ProfesorDTO;
import pack.model.persistence.TeacherDAO;

public class GestorProfesores {

    TeacherDAO gT;
    public GestorProfesores(){
        try {
            gT = new TeacherDAO();
        } catch (Exception e) {
            
        }
    }

    public boolean exists(ProfesorDTO prfdto) throws IOException {
        if(gT.findID(prfdto.getId())!=null) return true;
        else return false;
    }

    public boolean exists(String id) throws IOException {
        if(gT.findID(id)!=null) return true;
        else return false;
    }
    
    public void create(ProfesorDTO estdto) throws IOException {
        Profesor profesor = new Profesor();
        profesor.setNombre(estdto.getNombre());
        profesor.setFacultad(estdto.getFacultad());
        profesor.setId(estdto.getId());
        profesor.setEdad(estdto.getEdad());
        profesor.setPuntosSalariales(estdto.getPuntosSalariales());

        gT.create(profesor);
    }

    public ProfesorDTO get(String id){
        return MapHandler.profesorToDTO(gT.findID(id));
    }

    public void edit(ProfesorDTO estdto) throws IOException{
        Profesor oldE = gT.findID(estdto.getId());
        Profesor newE = MapHandler.dTOToProfesor(estdto);
        gT.update(oldE, newE);
    }

    public void delete(String id) throws IOException{
        gT.delete(id);
    }
    
}
