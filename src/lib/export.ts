import type { Project } from "@/types/database";

export async function exportToCSV(projects: Project[], filename: string = "whb-projects") {
  const Papa = (await import("papaparse")).default;

  const rows: Record<string, string>[] = [];

  projects.forEach((project) => {
    rows.push({
      Type: "Project",
      Name: project.name,
      Status: project.status,
      Priority: project.priority,
      Category: project.category,
      Summary: project.summary,
      Notes: project.notes,
      "Requirement Text": "",
      "Requirement Done": "",
      Tags: "",
    });

    project.requirements?.forEach((req) => {
      rows.push({
        Type: "Requirement",
        Name: project.name,
        Status: "",
        Priority: "",
        Category: "",
        Summary: "",
        Notes: "",
        "Requirement Text": req.text,
        "Requirement Done": req.done ? "Yes" : "No",
        Tags: req.tags.join(", "),
      });
    });
  });

  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportToPDF(projects: Project[], filename: string = "whb-projects") {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(20);
  doc.setTextColor(212, 175, 55);
  doc.text("WHB Companies - Project Report", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 28, { align: "center" });

  let yPosition = 40;

  const activeCount = projects.filter((p) => p.status === "active").length;
  const totalReqs = projects.reduce((sum, p) => sum + (p.requirements?.length || 0), 0);
  const doneReqs = projects.reduce(
    (sum, p) => sum + (p.requirements?.filter((r) => r.done).length || 0),
    0
  );

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Active Projects: ${activeCount}`, 14, yPosition);
  doc.text(`Total Requirements: ${totalReqs}`, 80, yPosition);
  doc.text(`Completed: ${doneReqs}`, 150, yPosition);

  yPosition += 15;

  const tableData = projects.map((project) => {
    const reqsDone = project.requirements?.filter((r) => r.done).length || 0;
    const reqsTotal = project.requirements?.length || 0;
    const progress = reqsTotal > 0 ? Math.round((reqsDone / reqsTotal) * 100) : 0;

    return [
      project.icon + " " + project.name,
      project.status === "active" ? "Active" : "Pipeline",
      project.priority.charAt(0).toUpperCase() + project.priority.slice(1),
      project.category,
      `${reqsDone}/${reqsTotal} (${progress}%)`,
    ];
  });

  autoTable(doc, {
    head: [["Project", "Status", "Priority", "Category", "Progress"]],
    body: tableData,
    startY: yPosition,
    theme: "striped",
    headStyles: {
      fillColor: [212, 175, 55],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 25 },
      2: { cellWidth: 25 },
      3: { cellWidth: 35 },
      4: { cellWidth: 35 },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yPosition = (doc as any).lastAutoTable.finalY + 15;

  const activeProjects = projects.filter((p) => p.status === "active" && p.requirements && p.requirements.length > 0);

  activeProjects.forEach((project) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(12);
    doc.setTextColor(212, 175, 55);
    doc.text(`${project.icon} ${project.name}`, 14, yPosition);
    yPosition += 5;

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(project.summary, 14, yPosition, { maxWidth: pageWidth - 28 });
    yPosition += 10;

    const reqData = project.requirements?.map((req) => [
      req.done ? "✓" : "○",
      req.text,
      req.tags.join(", "),
    ]) || [];

    autoTable(doc, {
      head: [["", "Requirement", "Tags"]],
      body: reqData,
      startY: yPosition,
      theme: "plain",
      headStyles: {
        fillColor: [245, 245, 245],
        textColor: [100, 100, 100],
        fontStyle: "bold",
        fontSize: 8,
      },
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 110 },
        2: { cellWidth: 50 },
      },
      didParseCell: (data) => {
        if (data.section === "body" && data.column.index === 0) {
          if (data.cell.raw === "✓") {
            data.cell.styles.textColor = [102, 187, 106];
            data.cell.styles.fontStyle = "bold";
          }
        }
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  });

  doc.save(`${filename}.pdf`);
}

export async function exportProjectToPDF(project: Project) {
  await exportToPDF([project], `${project.name.toLowerCase().replace(/\s+/g, "-")}-report`);
}

export async function exportProjectToCSV(project: Project) {
  await exportToCSV([project], `${project.name.toLowerCase().replace(/\s+/g, "-")}-data`);
}
