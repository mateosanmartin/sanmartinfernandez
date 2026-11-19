
<template>
  <!--
    CONTENEDOR PRINCIPAL

    class="politica-privacidad" permite aplicar
    los estilos específicos del componente.
  -->
  <div class="politica-privacidad">

    <!-- Título principal de la página. -->
    <h4>Política de privacidad y confidencialidad</h4>

    <!-- Subtítulo de la primera sección. -->
    <h5>Protección de datos y confidencialidad</h5>

    <!--
      PÁRRAFOS

      Son elementos HTML estáticos.

      No utilizan interpolaciones,
      eventos ni variables reactivas.
    -->
    <p>
      Para poder registrar y gestionar sus datos como paciente, es necesario
      aceptar las condiciones de confidencialidad y protección de datos.
    </p>

    <p>
      Sus datos personales y sanitarios serán tratados de forma confidencial y
      utilizados únicamente para las finalidades relacionadas con la gestión de
      su atención sanitaria y los servicios proporcionados por Sanidade Teis.
    </p>

    <!-- Sección de datos recopilados. -->
    <h5>¿Qué datos se recopilan?</h5>

    <p>
      Para la gestión del paciente pueden solicitarse datos identificativos y de
      contacto, como nombre, apellidos, DNI/NIE, fecha de nacimiento, teléfono,
      correo electrónico y datos de domicilio.
    </p>

    <!-- Sección de confidencialidad. -->
    <h5>Confidencialidad</h5>

    <p>
      La información facilitada por el paciente será tratada de manera
      confidencial y no será utilizada para fines distintos de los relacionados
      con la gestión y atención sanitaria.
    </p>

    <!-- Sección de protección de información. -->
    <h5>Protección de la información</h5>

    <p>
      Se aplicarán las medidas necesarias para proteger los datos frente a
      accesos, modificaciones o usos no autorizados.
    </p>

    <!-- Sección de derechos del paciente. -->
    <h5>Derechos del paciente</h5>

    <p>
      El paciente puede ejercer sus derechos de acceso, rectificación,
      supresión, oposición y demás derechos reconocidos por la normativa vigente
      en materia de protección de datos.
    </p>

    <!--
      SECCIÓN DE ACEPTACIÓN

      Explica la finalidad de la casilla
      que el paciente marca en el formulario.

      Este componente no modifica por sí mismo
      ninguna variable del formulario.
    -->
    <h5>Aceptación</h5>

    <p>
      Al marcar la casilla de aceptación, el paciente declara haber leído y
      comprendido esta información y acepta el tratamiento de sus datos de
      acuerdo con las condiciones indicadas.
    </p>

    <!--
      AVISO DESTACADO

      class="aviso" permite aplicar un estilo
      diferente si existe una regla CSS
      que seleccione esa clase.

      strong destaca la palabra "Importante".

      Este texto aclara que se trata
      de un proyecto didáctico.
    -->
    <p class="aviso">
      <strong>Importante:</strong> Este texto tiene carácter informativo y forma
      parte de un proyecto didáctico. No sustituye una política de privacidad
      legal ni el asesoramiento de un profesional en materia de protección de
      datos.
    </p>
  </div>
</template>

<style scoped>
/*
  CONTENEDOR PRINCIPAL

  width: 100%:
  Ocupa todo el ancho disponible.

  padding:
  Añade espacio interior.

  box-sizing: border-box:
  Incluye el padding dentro del ancho.

  height: auto:
  Ajusta la altura al contenido.

  max-height: none:
  No establece una altura máxima.

  overflow: visible:
  Permite que el contenido sea visible.

  background y border-radius:
  Definen el fondo blanco y las esquinas redondeadas.
*/
.politica-privacidad {
  width: 100%;
  padding: 25px 30px 40px;
  box-sizing: border-box;

  height: auto;
  max-height: none;
  overflow: visible;

  background: white;
  border-radius: 8px;
}

/*
  TÍTULOS

  La coma entre selectores significa que
  las mismas reglas se aplican tanto
  a los h4 como a los h5.

  margin-bottom añade separación inferior.
*/
.politica-privacidad h4,
.politica-privacidad h5 {
  margin-bottom: 15px;
}

/*
  PÁRRAFOS

  margin-bottom:
  Separación entre párrafos.

  line-height:
  Espaciado vertical entre líneas.
*/
.politica-privacidad p {
  margin-bottom: 20px;
  line-height: 1.6;
}

/*
  DISEÑO RESPONSIVE

  @media (max-width: 768px):
  Se aplica cuando la pantalla mide
  768 píxeles de ancho o menos.

  Ajusta márgenes y padding para móviles.
*/
@media (max-width: 768px) {
  .politica-privacidad {
    margin: 10px auto;
    padding: 20px 15px 30px;
  }
}
</style>
