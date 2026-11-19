
import axios from "axios";

// URL de los endpoints relacionados con las citas.
const API_URL = "http://localhost:3000/api/citas";

/*
  GET: obtener las citas.

  pacienteDNI es opcional.

  Si recibimos un DNI:
  params envía ?pacienteDNI=... en la URL.

  Si no recibimos DNI:
  params es un objeto vacío y pedimos todas las citas.

  El backend debe interpretar ese parámetro.
*/
export const getCitas = async (pacienteDNI) => {
  const respuesta = await axios.get(API_URL, {
    params: pacienteDNI ? { pacienteDNI } : {},
  });

  return respuesta.data;
};

/*
  POST: guardar una cita nueva.

  cita es el objeto con fecha, hora, doctor,
  paciente y demás datos del formulario.
*/
export const saveCita = async (cita) => {
  const respuesta = await axios.post(API_URL, cita);
  return respuesta.data;
};

/*
  PUT: actualizar una cita existente.

  id identifica la cita.
  cita contiene los datos que queremos guardar.
*/
export const updateCita = async (id, cita) => {
  const respuesta = await axios.put(`${API_URL}/${id}`, cita);
  return respuesta.data;
};

/*
  DELETE: eliminar una cita por su identificador.
*/
export const deleteCita = async (id) => {
  const respuesta = await axios.delete(`${API_URL}/${id}`);
  return respuesta.data;
};
