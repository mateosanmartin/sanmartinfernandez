
/*
  IMPORTACIONES

  jsPDF:
  Librería para crear documentos PDF desde JavaScript.

  autoTable:
  Complemento de jsPDF que permite crear tablas
  automáticamente a partir de arrays de datos.
*/
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/*
  FUNCIÓN: generarPDF(titulo, cabeceras, filas, nombreArchivo)

  OBJETIVO:
  Generar y descargar un PDF con un título,
  una fecha y una tabla de datos.

  PARÁMETROS:

  titulo:
  Texto que aparecerá al principio del PDF.

  cabeceras:
  Array con los nombres de las columnas.

  EJEMPLO:
  ["Nombre", "Apellidos", "DNI"]

  filas:
  Array de arrays con los datos de la tabla.

  EJEMPLO:
  [
    ["Ana", "García", "12345678Z"],
    ["Luis", "Pérez", "87654321X"]
  ]

  nombreArchivo:
  Nombre con el que se descargará el PDF.

  EJEMPLO:
  "listado_pacientes.pdf"

  IMPORTANTE:
  Esta función es reutilizable: sirve para
  pacientes, doctores y citas porque recibe
  los datos mediante parámetros.
*/
export const generarPDF = (titulo, cabeceras, filas, nombreArchivo) => {

  /*
    CREAR EL DOCUMENTO

    new jsPDF() crea una nueva instancia de PDF.

    doc es el objeto que utilizaremos para
    añadir contenido y guardar el archivo.
  */
  const doc = new jsPDF();

  /*
    AÑADIR EL TÍTULO

    setFontSize(18):
    Establece el tamaño de letra en 18 puntos.

    text(titulo, 14, 20):
    Escribe el título en las coordenadas:
    X = 14.
    Y = 20.

    Las coordenadas se expresan en las unidades
    configuradas para jsPDF, milímetros por defecto.
  */

  // Título
  doc.setFontSize(18);
  doc.text(titulo, 14, 20);

  /*
    AÑADIR LA FECHA

    setFontSize(10):
    Cambia el tamaño de letra a 10 puntos.

    new Date():
    Obtiene la fecha y hora actuales.

    toLocaleDateString("es-ES"):
    Convierte la fecha a un formato español.

    EJEMPLO:
    19/11/2026

    La fecha se escribe en:
    X = 14.
    Y = 28.
  */

  // Fecha
  doc.setFontSize(10);
  doc.text(
    `Fecha: ${new Date().toLocaleDateString("es-ES")}`,
    14,
    28
  );

  /*
    CREAR LA TABLA

    autoTable(doc, {...}) añade una tabla al PDF.

    PARÁMETROS:

    startY: 35
    La tabla comienza en la coordenada vertical 35.

    head: [cabeceras]
    Define las cabeceras de la tabla.

    Se utilizan corchetes porque autoTable espera
    un array de filas para la cabecera.

    body: filas
    Contiene las filas de datos.

    styles:
    Configuración general de las celdas.

    fontSize: 9
    Tamaño de letra de las celdas.

    cellPadding: 3
    Espacio interior de las celdas.

    headStyles:
    Configuración específica de la cabecera.

    fillColor: [30, 201, 164]
    Color de fondo de la cabecera en formato RGB.

    RGB significa:
    Red (rojo), Green (verde), Blue (azul).

    Cada valor puede ir de 0 a 255.
  */

  // Tabla
  autoTable(doc, {
    startY: 35,
    head: [cabeceras],
    body: filas,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [30, 201, 164],
    },
  });

  /*
    DESCARGAR EL PDF

    doc.save(nombreArchivo) genera la descarga
    del documento con el nombre indicado.

    EJEMPLO:
    generarPDF(
      "Pacientes",
      ["Nombre", "DNI"],
      [["Ana", "12345678Z"]],
      "pacientes.pdf"
    );

    El navegador descargará pacientes.pdf.
  */

  // Descargar PDF
  doc.save(nombreArchivo);
};
