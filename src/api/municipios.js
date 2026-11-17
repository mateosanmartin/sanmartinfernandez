
import axios from "axios";

const URL = "http://localhost:3000/api/municipios";

// Obtener todas las provincias
export async function obtenerProvincias() {
    const respuesta = await axios.get(URL);

    return respuesta.data.provincias;
}

// Obtener los municipios de una provincia
export async function obtenerMunicipios(idProvincia) {
    const respuesta = await axios.get(URL);

    const municipios = respuesta.data.municipios;

    return municipios.filter(
        (municipio) =>
            String(municipio.id).substring(0, 2) ===
            String(idProvincia).padStart(2, "0")
    );
}
