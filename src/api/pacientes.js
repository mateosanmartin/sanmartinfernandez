
import axios from "axios";

// Dirección base del backend.
// Express está escuchando en localhost, puerto 3000.
const API_URL = "http://localhost:3000/api";

/*
  GET: obtener todos los pacientes.

  axios.get realiza una petición HTTP GET.
  await espera la respuesta del servidor.
  res.data contiene los datos enviados por Express.
*/
export async function getPacientes() {
  const res = await axios.get(`${API_URL}/pacientes`);
  return res.data;
}

/*
  POST: crear un paciente.

  Recibe un objeto paciente con los datos del formulario.
  axios.post envía ese objeto en el cuerpo de la petición.
  Devuelve el paciente guardado por el backend.
*/
export async function savePaciente(paciente) {
  const res = await axios.post(`${API_URL}/pacientes`, paciente);
  return res.data;
}

/*
  PUT: actualizar un paciente existente.

  id: identificador _id del paciente en MongoDB.
  paciente: objeto con los nuevos datos.

  El backend utiliza el id para saber qué paciente modificar.
*/
export async function updatePaciente(id, paciente) {
  const res = await axios.put(
    `${API_URL}/pacientes/${id}`,
    paciente
  );

  return res.data;
}

/*
  DELETE: eliminar un paciente.

  Recibe el _id del paciente.
  No necesita enviar el objeto completo.
*/
export async function deletePaciente(id) {
  const res = await axios.delete(`${API_URL}/pacientes/${id}`);
  return res.data;
}
