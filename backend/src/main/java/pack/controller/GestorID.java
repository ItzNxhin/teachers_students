package pack.controller;

import java.io.IOException;

import pack.model.persistence.EstudentDAO;
import pack.model.persistence.EstudianteDTO;
import pack.model.persistence.ProfesorDTO;
import pack.model.persistence.TeacherDAO;

public class GestorID {
    EstudentDAO gE;
    TeacherDAO gT;
    public GestorID(){
        try {
            gE = new EstudentDAO();
            gT = new TeacherDAO();
        } catch (Exception e) {
            
        }
    }

    public boolean exists(EstudianteDTO estdto) throws IOException {
        if(gE.findID(estdto.getId())!=null || gT.findID(estdto.getId())!=null) return true;
        else return false;
    }

    public boolean exists(ProfesorDTO estdto) throws IOException {
        if(gE.findID(estdto.getId())!=null || gT.findID(estdto.getId())!=null) return true;
        else return false;
    }

    public boolean exists(String id) throws IOException {
        if(gE.findID(id)!=null || gT.findID(id)!=null) return true;
        else return false;
    }
}
