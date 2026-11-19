
// GUARDAR EN CARPETA src/utils/alertas.js

/*
  IMPORTACIÓN DE SWEETALERT2

  Swal permite mostrar ventanas emergentes
  personalizadas en lugar de utilizar alert()
  o confirm() del navegador.

  Swal.fire() muestra una alerta y devuelve
  una Promise, por lo que podemos utilizar await.
*/
import Swal from 'sweetalert2'

/*
  FUNCIÓN: alertaExito(mensaje, titulo = 'Correcto')

  OBJETIVO:
  Mostrar una alerta cuando una operación
  termina correctamente.

  PARÁMETROS:
  mensaje: texto que queremos mostrar.
  titulo: título de la ventana.

  El título tiene un valor por defecto:
  'Correcto'.

  Si no pasamos un segundo argumento,
  se utiliza ese título automáticamente.

  CONFIGURACIÓN:
  icon: 'success' -> icono de éxito.
  title -> título.
  text -> mensaje.
  confirmButtonText -> texto del botón.

  return devuelve la Promise de Swal.fire(),
  permitiendo esperar a que el usuario cierre
  la alerta mediante await.
*/

// Alerta de éxito
export const alertaExito = (mensaje, titulo = 'Correcto') => {
    return Swal.fire({
        icon: 'success',
        title: titulo,
        text: mensaje,
        confirmButtonText: 'Aceptar'
    })
}

/*
  FUNCIÓN: alertaError(mensaje, titulo = 'Error')

  OBJETIVO:
  Mostrar una alerta cuando ocurre un error.

  FUNCIONAMIENTO:
  Es similar a alertaExito, pero utiliza
  el icono 'error'.

  EJEMPLO:
  alertaError("No se pudo guardar el paciente.");

  También podemos personalizar el título:
  alertaError("Error de conexión", "Servidor");
*/

// Alerta de error
export const alertaError = (mensaje, titulo = 'Error') => {
    return Swal.fire({
        icon: 'error',
        title: titulo,
        text: mensaje,
        confirmButtonText: 'Aceptar'
    })
}

/*
  FUNCIÓN: alertaInfo(mensaje, titulo = 'Información')

  OBJETIVO:
  Mostrar información al usuario sin indicar
  que haya ocurrido un éxito o un error.

  icon: 'info' muestra el icono informativo.

  EJEMPLO:
  alertaInfo("Debes seleccionar un paciente.");
*/

// Alerta informativa
export const alertaInfo = (mensaje, titulo = 'Información') => {
    return Swal.fire({
        icon: 'info',
        title: titulo,
        text: mensaje,
        confirmButtonText: 'Aceptar'
    })
}

/*
  FUNCIÓN: alertaConfirmacion(mensaje, titulo = '¿Estás seguro?')

  OBJETIVO:
  Preguntar al usuario si quiere continuar
  antes de realizar una operación importante.

  EJEMPLO:
  Antes de eliminar un paciente o actualizar
  los datos de un doctor.

  CONFIGURACIÓN:

  icon: 'question'
  Muestra un icono de interrogación.

  showCancelButton: true
  Añade un botón para cancelar.

  confirmButtonText: 'Aceptar'
  Texto del botón de confirmación.

  cancelButtonText: 'Cancelar'
  Texto del botón de cancelación.

  reverseButtons: false
  Mantiene el orden normal de los botones.

  RESULTADO:

  Swal.fire() devuelve una Promise.

  Cuando el usuario responde, podemos
  comprobar la propiedad isConfirmed.

  EJEMPLO DE USO:

  const resultado = await alertaConfirmacion(
    "¿Quieres eliminar este paciente?"
  );

  if (resultado.isConfirmed) {
    // Aquí realizaríamos la eliminación.
  }

  IMPORTANTE:
  Esta función solamente pregunta.
  No elimina ni modifica ningún registro.
*/

// Confirmación de una acción
export const alertaConfirmacion = (mensaje, titulo = '¿Estás seguro?') => {
    return Swal.fire({
        icon: 'question',
        title: titulo,
        text: mensaje,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: false
    })
}
