import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CoverPage from "./CoverPage";

const Publisher = ({ students }) => {
  const containerRef = useRef();

  const exportStudentPDF = async (student) => {
    const node = document.createElement("div");
    node.style.width = "210mm";
    node.style.minHeight = "297mm";
    node.style.padding = "20px";
    node.style.backgroundColor = "white";
    node.style.position = "absolute";
    node.style.top = "-9999px";
    document.body.appendChild(node);

    // Render CoverPage component inside temp node
    const root = React.createElement(CoverPage, { student });
    const { createRoot } = await import("react-dom/client");
    const reactRoot = createRoot(node);
    reactRoot.render(root);

    // Wait for render to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(node, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${student.name.replace(/ /g, "_")}.pdf`);

    document.body.removeChild(node);
  };

  const handlePublishAll = async () => {
    for (const student of students) {
      await exportStudentPDF(student);
    }
    alert("✅ Đã xuất toàn bộ PDF cho học sinh!");
  };

  return (
    <div className="mt-6">
      <button
        onClick={handlePublishAll}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        📤 Publish All PDFs
      </button>
    </div>
  );
};

export default Publisher;
