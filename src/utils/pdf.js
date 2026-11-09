import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generarPDF = (titulo, cabeceras, filas, nombreArchivo) => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text(titulo, 14, 20);

  // Fecha
  doc.setFontSize(10);
  doc.text(
    `Fecha: ${new Date().toLocaleDateString("es-ES")}`,
    14,
    28
  );

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

  // Descargar PDF
  doc.save(nombreArchivo);
};