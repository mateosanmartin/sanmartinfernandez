
<template>
  <div class="aviso-legal">
    <h4>Aviso legal</h4>

    <h5>Información general</h5>
    <p>
      Bienvenido a Sanidade Teis. El presente aviso legal regula
      el acceso y uso de esta aplicación web, desarrollada
      con fines educativos para la gestión de pacientes,
      doctores y citas médicas.
    </p>

    <h5>Identificación del sitio web</h5>
    <p>
      <strong>Nombre de la aplicación:</strong> Sanidade Teis.
    </p>
    <p>
      <strong>Finalidad:</strong> Proyecto académico de desarrollo
      de aplicaciones web.
    </p>
    <p>
      <strong>Actividad:</strong> Simulación de un sistema de
      gestión sanitaria.
    </p>

    <h5>Condiciones de uso</h5>
    <p>
      El usuario se compromete a utilizar esta aplicación
      de forma responsable y conforme a la legislación vigente.
      Queda prohibido utilizarla para actividades ilícitas,
      fraudulentas o que puedan perjudicar a terceros.
    </p>

    <h5>Propiedad intelectual</h5>
    <p>
      Los contenidos, el diseño y el código desarrollado
      específicamente para esta aplicación forman parte
      de un proyecto educativo.
    </p>
    <p>
      Las herramientas, bibliotecas y recursos de terceros
      utilizados en el proyecto conservan sus respectivas
      licencias y derechos de propiedad intelectual.
    </p>

    <h5>Responsabilidad</h5>
    <p>
      Sanidade Teis es una aplicación de carácter didáctico
      y no constituye un servicio sanitario real.
    </p>
    <p>
      La información mostrada tiene fines demostrativos
      y no debe utilizarse para realizar diagnósticos,
      tratamientos o decisiones médicas.
    </p>

    <h5>Protección de datos personales</h5>
    <p>
      El tratamiento de los datos introducidos en la aplicación
      se describe en el apartado de política de privacidad.
    </p>
    <p>
      Se recomienda utilizar exclusivamente datos ficticios
      para las pruebas y demostraciones del proyecto.
    </p>

    <h5>Enlaces externos</h5>
    <p>
      Esta aplicación puede contener enlaces a páginas web
      externas. Sus contenidos y condiciones de uso son
      responsabilidad de sus respectivos titulares.
    </p>

    <h5>Modificaciones</h5>
    <p>
      El contenido de este aviso legal podrá actualizarse
      cuando se introduzcan cambios en la aplicación
      o en sus funcionalidades.
    </p>

    <h5>Legislación aplicable</h5>
    <p>
      Este proyecto se desarrolla en España y toma como
      referencia la normativa española y europea aplicable,
      especialmente en materia de protección de datos
      y servicios digitales.
    </p>

    <p class="aviso">
      <strong>Importante:</strong>
      Este aviso legal tiene carácter informativo y forma
      parte de un proyecto didáctico. No sustituye un aviso
      legal profesional ni implica que Sanidade Teis preste
      servicios sanitarios reales.
    </p>
  </div>
</template>

<style scoped>
.aviso-legal {
  width: 100%;
  padding: 25px 30px 40px;
  box-sizing: border-box;

  height: auto;
  max-height: none;
  overflow: visible;

  background: white;
  border-radius: 8px;
}

.aviso-legal h4 {
  margin: 0 0 25px;
  padding: 12px 15px;

  background-color: #89fcbd;
  color: #174d32;

  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
}

.aviso-legal h5 {
  margin: 25px 0 12px;
  color: #174d32;
  font-size: 1rem;
  font-weight: 600;
}

.aviso-legal p {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #333;
  font-size: 0.95rem;
  text-align: justify;
}

.aviso {
  margin-top: 30px;
  padding: 15px;

  background-color: #f3f7f5;
  border-left: 4px solid #5fcf91;
  border-radius: 4px;
}

/* MÓVIL */
@media (max-width: 768px) {
  .aviso-legal {
    margin: 10px auto;
    padding: 20px 15px 30px;
  }

  .aviso-legal p {
    text-align: left;
  }
}
</style>
