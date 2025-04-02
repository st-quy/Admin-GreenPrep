import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (classes) => {
  const doc = new jsPDF();

  // Set font and style
  doc.setFont("times", "normal");
  doc.setFontSize(16);

  // Title
  doc.text("CLASS LIST", 105, 15, { align: "center" });

  // Overview information
  doc.setFontSize(12);
  doc.text(`TOTAL CLASSES: ${classes.length}`, 15, 25);
  doc.text(`EXPORT DATE: ${new Date().toLocaleDateString("en-US")}`, 15, 32);

  // Create table data
  const tableData = classes.map((cls, index) => [
    index + 1,
    cls.className,
    new Date(cls.createdAt).toLocaleDateString("en-US"),
    new Date(cls.updatedAt).toLocaleDateString("en-US"),
  ]);

  autoTable(doc, {
    startY: 40,
    head: [["No.", "Class Code", "Created Date", "Updated Date"]],
    body: tableData,
    theme: "grid",
    styles: {
      font: "times",
      fontSize: 11,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontSize: 12,
      halign: "center",
      font: "times",
    },
    bodyStyles: {
      fontSize: 11,
      halign: "center",
      font: "times",
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
      3: { cellWidth: 40 },
    },
    margin: { top: 15, right: 15, bottom: 15, left: 15 },
  });

  doc.save("class-list.pdf");
};
