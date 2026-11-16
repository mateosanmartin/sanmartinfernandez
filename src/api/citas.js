
import axios from "axios";

const API_URL = "http://localhost:3000/api/citas";

export const getCitas = async (pacienteDNI) => {
  const respuesta = await axios.get(API_URL, {
    params: pacienteDNI ? { pacienteDNI } : {},
  });

  return respuesta.data;
};

export const saveCita = async (cita) => {
  const respuesta = await axios.post(API_URL, cita);
  return respuesta.data;
};

export const updateCita = async (id, cita) => {
  const respuesta = await axios.put(`${API_URL}/${id}`, cita);
  return respuesta.data;
};

export const deleteCita = async (id) => {
  const respuesta = await axios.delete(`${API_URL}/${id}`);
  return respuesta.data;
};
