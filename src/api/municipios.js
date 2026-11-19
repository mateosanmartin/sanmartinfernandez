
import axios from "axios";

// Endpoint que devuelve las provincias y los municipios.
const URL = "http://localhost:3000/api/municipios";

/*
  FUNCIÓN: obtenerProvincias

  1. Hace una petición GET al backend.
  2. El backend devuelve un objeto con los datos.
  3. Accedemos a respuesta.data.provincias.
  4. Devolvemos únicamente el array de provincias.
*/
export async function obtenerProvincias() {
  const respuesta = await axios.get(URL);

  return respuesta.data.provincias;
}

/*
  FUNCIÓN: obtenerMunicipios

  OBJETIVO:
  Obtener únicamente los municipios de una provincia.

  PARÁMETRO:
  idProvincia: código de la provincia seleccionada.

  PASO A PASO:
  1. Pedimos todos los municipios al backend.
  2. filter() recorre el array de municipios.
  3. String(municipio.id) convierte su código a texto.
  4. substring(0, 2) obtiene los dos primeros caracteres,
     que identifican la provincia.
  5. padStart(2, "0") garantiza que el código de provincia
     tenga dos caracteres, añadiendo un cero a la izquierda.
  6. Solo conservamos los municipios cuyos códigos coinciden.

  EJEMPLO:
  Si idProvincia es "36", obtenemos los municipios
  cuyos códigos comienzan por "36".
*/
export async function obtenerMunicipios(idProvincia) {
  const respuesta = await axios.get(URL);

  const municipios = respuesta.data.municipios;

  return municipios.filter(
    (municipio) =>
      String(municipio.id).substring(0, 2) ===
      String(idProvincia).padStart(2, "0")
  );
}
