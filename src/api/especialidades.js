
import axios from "axios";

// Dirección del endpoint que proporciona las especialidades.
const URL = "http://localhost:3000/api/especialidades";

/*
  FUNCIÓN: obtenerEspecialidades

  Hace una petición GET para obtener las especialidades.

  respuesta.data es el cuerpo de la respuesta HTTP.
  respuesta.data.especialidades es el array que necesitamos
  para rellenar el desplegable de especialidades médicas.
*/
export async function obtenerEspecialidades() {
  const respuesta = await axios.get(URL);

  return respuesta.data.especialidades;
}
