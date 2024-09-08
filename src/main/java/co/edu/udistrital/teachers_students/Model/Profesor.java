package co.edu.udistrital.teachers_students.Model;

/**
 * Esta es la sub clase para los profesores
 */
public class Profesor extends Persona{

    private int puntosSalariales;

    public Profesor(String nombre, String id, int edad, String facultad, int psalarios) {
        super(nombre, id, edad, facultad);
        this.puntosSalariales = psalarios;
    }

    public int getPuntosSalariales() {
        return puntosSalariales;
    }

    public void setPuntosSalariales(int puntosSalariales) {
        this.puntosSalariales = puntosSalariales;
    }

    @Override
    public String toString() {
        return "Profesor [puntosSalariales=" + puntosSalariales + ", nombre=" + nombre + ", id=" + id + ", edad=" + edad
                + ", facultad=" + facultad + "]";
    }

    
}
