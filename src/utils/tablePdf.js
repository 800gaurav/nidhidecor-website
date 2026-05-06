import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatCellValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  if (typeof value === "number") {
    return value.toLocaleString("en-IN");
  }

  return String(value);
};

export const downloadTablePdf = ({
  title = "Report",
  filename = "report.pdf",
  columns = [],
  rows = [],
}) => {
  const exportableColumns = columns.filter(
    (column) => column?.key && column.pdf !== false
  );

  const doc = new jsPDF({
    orientation: exportableColumns.length > 5 ? "landscape" : "portrait",
    unit: "mm",
    format: "a4",
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(title, 14, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  doc.text(`Generated on ${new Date().toLocaleString("en-IN")}`, 14, 24);

  const head = [exportableColumns.map((column) => column.title || column.key)];
  const body = rows.map((row, index) =>
    exportableColumns.map((column) => {
      const rawValue =
        typeof column.exportValue === "function"
          ? column.exportValue(row[column.key], row, index)
          : row[column.key];

      return formatCellValue(rawValue);
    })
  );

  autoTable(doc, {
    startY: 30,
    head,
    body,
    margin: { left: 14, right: 14 },
    styles: {
      font: "helvetica",
      fontSize: 8.5,
      cellPadding: 3,
      lineColor: [225, 232, 240],
      lineWidth: 0.2,
      valign: "middle",
    },
    headStyles: {
      fillColor: [0, 51, 153],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    bodyStyles: {
      textColor: [31, 41, 55],
    },
  });

  doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
};
