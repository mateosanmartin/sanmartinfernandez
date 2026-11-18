
<template>
  <div class="sobre-nos">
    <h4>Sobre nós</h4>

    <p class="introduccion">
      En Sanidade Teis cuidamos de tu salud con una atención cercana,
      profesional y personalizada.
    </p>

    <div class="contenedor-tarjetas">
      <div
        v-for="tarjeta in tarjetas"
        :key="tarjeta.id"
        class="tarjeta"
      >
        <img
          :src="tarjeta.imagen"
          :alt="tarjeta.titulo"
          class="imagen-tarjeta"
        />

        <div class="contenido-tarjeta">
          <h5>{{ tarjeta.titulo }}</h5>
          <p>{{ tarjeta.descripcion }}</p>

          <button
            class="btn-informacion"
            @click="abrirInformacion(tarjeta)"
          >
            Más información
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="tarjetaSeleccionada"
      class="fondo-modal"
      @click.self="cerrarInformacion"
    >
      <div class="modal-informacion">
        <button class="cerrar-modal" @click="cerrarInformacion">
          &times;
        </button>

        <h5>{{ tarjetaSeleccionada.titulo }}</h5>
        <p>{{ tarjetaSeleccionada.informacion }}</p>

        <button class="btn-informacion" @click="cerrarInformacion">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tarjetaSeleccionada = ref(null);

const tarjetas = [
  {
    id: 1,
    titulo: "Nuestro centro",
    imagen: "/centro.jpg",
    descripcion: "Un espacio dedicado al bienestar y a la atención sanitaria de nuestros pacientes.",
    informacion: "Sanidade Teis es un proyecto educativo que representa un centro sanitario moderno, orientado a facilitar la gestión de pacientes, doctores y citas médicas."
  },
  {
    id: 2,
    titulo: "Nuestros profesionales",
    imagen: "/profesionales.jpg",
    descripcion: "Profesionales de diferentes especialidades médicas.",
    informacion: "Nuestra aplicación permite consultar y gestionar profesionales de distintas especialidades, facilitando la organización de los servicios sanitarios."
  },
  {
    id: 3,
    titulo: "Atención al paciente",
    imagen: "/atencion.jpg",
    descripcion: "Una atención cercana y adaptada a las necesidades de cada paciente.",
    informacion: "La plataforma facilita el registro, la consulta y la actualización de los datos de los pacientes."
  },
  {
    id: 4,
    titulo: "Servicios médicos",
    imagen: "/serviciosmedicos.jpg",
    descripcion: "Diferentes especialidades para una atención sanitaria completa.",
    informacion: "Sanidade Teis incluye especialidades como cardiología, pediatría, dermatología, traumatología, neurología y oftalmología."
  },
  {
    id: 5,
    titulo: "Gestión de citas",
    imagen: "/citas.jpg",
    descripcion: "Organización sencilla y eficiente de las citas médicas.",
    informacion: "El sistema permite relacionar pacientes con profesionales médicos para facilitar la organización de las consultas."
  },
  {
    id: 6,
    titulo: "Nuestro compromiso",
    imagen: "/compromiso.jpg",
    descripcion: "Comprometidos con la calidad, la confianza y el bienestar.",
    informacion: "Sanidade Teis busca representar una gestión sanitaria accesible, organizada y respetuosa con la confidencialidad de los datos."
  }
];

function abrirInformacion(tarjeta) {
  tarjetaSeleccionada.value = tarjeta;
}

function cerrarInformacion() {
  tarjetaSeleccionada.value = null;
}
</script>

<style scoped>
/* CONTENEDOR PRINCIPAL */
.sobre-nos {
  width: 100%;
  padding: 0.5rem 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  margin-top: 1rem;
  margin-bottom: 60px;

}

/* MISMO H4 QUE AVISO LEGAL */
.sobre-nos h4 {
  margin: 0 0 25px;
  padding: 12px 15px;

  background-color: #89fcbd;
  color: #174d32;

  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
}

/* TÍTULOS H5 */
.sobre-nos h5 {
  margin: 0 0 15px;
  color: #174d32;
  font-size: 1rem;
  font-weight: 600;
}

/* PÁRRAFOS */
.sobre-nos p {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #333;
  font-size: 0.95rem;
}

.introduccion {
  text-align: center;
  margin-bottom: 30px !important;
}

/* TARJETAS */
.contenedor-tarjetas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.tarjeta {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tarjeta:hover {
  transform: translateY(-4px);
  box-shadow: 0 7px 18px rgba(0, 0, 0, 0.16);
}

.imagen-tarjeta {
  width: 100%;
  height: 190px;
  object-fit: cover;
}

.contenido-tarjeta {
  padding: 20px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
}

.contenido-tarjeta p {
  flex: 1;
}

/* BOTONES */
.btn-informacion {
  background: #4eaa7a;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-informacion:hover {
  background: #368c61;
}

/* MODAL */
.fondo-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 2000;
  padding: 20px;
}

.modal-informacion {
  background: white;
  padding: 30px;
  border-radius: 8px;

  max-width: 500px;
  width: 100%;
  box-sizing: border-box;

  position: relative;
  text-align: center;
}

.modal-informacion p {
  margin-bottom: 25px;
}

.cerrar-modal {
  position: absolute;
  right: 15px;
  top: 10px;

  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #555;
}

/* TABLET */
@media (max-width: 992px) {
  .contenedor-tarjetas {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* MÓVIL */
@media (max-width: 600px) {
  .sobre-nos {
    margin: 10px auto;
    padding: 20px 15px 30px;
  }

  .contenedor-tarjetas {
    grid-template-columns: 1fr;
  }

  .imagen-tarjeta {
    height: 200px;
  }
}
</style>
