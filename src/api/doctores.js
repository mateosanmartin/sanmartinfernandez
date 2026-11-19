
import axios from "axios";

// Dirección base de las peticiones al backend.
const API_URL = "http://localhost:3000/api";

/*
  POST: guardar un nuevo doctor.

  doctor contiene los datos introducidos en el formulario.
  Devuelve el documento creado en MongoDB.
*/
export async function saveDoctor(doctor) {
  const res = await axios.post(`${API_URL}/doctores`, doctor);
  return res.data;
}

/*
  GET: obtener todos los doctores.

  PASO A PASO:
  1. Solicita los doctores al backend.
  2. sort() ordena el array por apellidos.
  3. localeCompare() compara textos alfabéticamente.
  4. "es" indica que se usa la configuración española.
  5. sensitivity: "base" ignora diferencias de
     mayúsculas y acentos al comparar.
  6. Devuelve el array ordenado.

  IMPORTANTE:
  sort() modifica el array sobre el que se ejecuta.
*/
export async function getDoctores() {
  const res = await axios.get(`${API_URL}/doctores`);

  res.data.sort((a, b) =>
    a.apeldoc.localeCompare(
      b.apeldoc,
      "es",
      { sensitivity: "base" }
    )
  );

  return res.data;
}

/*
  GET: obtener doctores de una especialidad.

  especialidad: nombre de la especialidad buscada.

  encodeURIComponent() prepara el texto para incluirlo
  correctamente en la URL, incluso si contiene espacios,
  acentos u otros caracteres especiales.
*/
export async function getDoctorByEspecialidad(especialidad) {
  const res = await axios.get(
    `${API_URL}/doctores/especialidad/${encodeURIComponent(especialidad)}`
  );

  return res.data;
}

/*
  PUT: modificar un doctor.

  id: identificador de MongoDB.
  doctor: objeto con los datos actualizados.
*/
export async function modifyDoctor(id, doctor) {
  const res = await axios.put(`${API_URL}/doctores/${id}`, doctor);
  return res.data;
}

/*
  DELETE: eliminar un doctor mediante su _id.
*/
export async function deleteDoctor(id) {
  const res = await axios.delete(`${API_URL}/doctores/${id}`);
  return res.data;
}
