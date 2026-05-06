import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Generate and download Invoice PDF in professional format
 * @param {Object} order - Order object containing invoice data
 */
export async function generateInvoicePdf(order) {
  console.log(order, "table data");
  if (!order) return;

  const doc = new jsPDF();

  // === Helper functions ===
  const fmt = (n) => `₹${Number(n || 0).toFixed(2)}`;
  const num = (v) => (v === undefined || v === null ? 0 : Number(v));

  // === Add logo ===
  try {
    const logoUrl = 'https://backend.dhantag.com/uploads/dhantag.png';
    const logoData = await getBase64FromUrl(logoUrl);
    doc.addImage(logoData, 'PNG', 14, 10, 25, 25);
  } catch {
    console.log("Logo not available");
  }

  // === Company Header ===
  doc.setFontSize(16).setFont(undefined, 'bold');
  doc.text("DHANTAG INDIA PRIVATE LIMITED", 105, 20, { align: "center" });

  doc.setFontSize(10).setFont(undefined, 'normal');
  doc.text("Shop No. G-23 Manglam, Block-C, Hathoj", 105, 27, { align: "center" });
  doc.text("Kalwar Road, Jhotwara Jaipur - 302012", 105, 32, { align: "center" });
  doc.text("Phone No.: +91-8905520273", 105, 37, { align: "center" });
  doc.line(14, 40, 196, 40);

  // === Invoice Info ===
  doc.setFontSize(9);
  doc.text(`Invoice No. : ${order.billNumber || "N/A"}`, 14, 47);
  doc.text(`Date : ${order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}`, 120, 47);
  doc.text(`Txn ID : ${order.txnId || "N/A"}`, 14, 52);
  doc.text(`Payment Mode : ${order.mediumOfPayment || "N/A"}`, 120, 52);

  // === Buyer Info ===
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text("Shipping Address :", 14, 64);
  doc.setFont(undefined, 'normal');
  doc.text(`${order.name || "Customer"}`, 14, 70);
  doc.text(`Direct Seller ID : ${order.userId || "N/A"}`, 14, 75);
  const addressLines = doc.splitTextToSize(order.shippingAddress || "N/A", 100);
  doc.text(addressLines, 14, 80);
  doc.text(`Mobile: ${order.phone || "N/A"}`, 14, 90);

  // === Table Header ===
  let tableY = 100;
  doc.setFillColor(220, 220, 220);
  doc.rect(14, tableY, 182, 8, 'F');
  doc.setFontSize(8).setFont(undefined, 'bold');

  // Define column positions
  const col = {
    sno: 18,
    product: 30,
    hsn: 95,
    qty: 120,
    dp: 135,
    cgst: 155,
    sgst: 170,
    net: 188
  };

  // === Header titles ===
  doc.text("S No.", col.sno, tableY + 5.5, { align: "center" });
  doc.text("Product Name", col.product, tableY + 5.5);
  doc.text("HSN", col.hsn, tableY + 5.5, { align: "right" });
  doc.text("Qty", col.qty, tableY + 5.5, { align: "right" });
  doc.text("DP Price", col.dp, tableY + 5.5, { align: "right" });
  doc.text("CGST", col.cgst, tableY + 5.5, { align: "right" });
  doc.text("SGST", col.sgst, tableY + 5.5, { align: "right" });
  doc.text("Net Amt", col.net, tableY + 5.5, { align: "right" });

  // === Product Rows ===
  tableY += 10;
  doc.setFont(undefined, 'normal').setTextColor(0, 0, 0);

  let totalQty = 0,
      totalDP = 0,
      totalCGST = 0,
      totalSGST = 0,
      totalNet = 0;

  order.items?.forEach((item, index) => {
    const y = tableY + index * 8;

    const qty = num(item.quantity);
    const dp = num(item.dp);
    const totalDPRow = dp * qty;
    const cgst = num((item.cgst / 100) * totalDPRow);
    const sgst = num((item.sgst / 100) * totalDPRow);
    const net = num(item.netAmount || totalDPRow + cgst + sgst);

    // Product data
    doc.text(String(index + 1), col.sno, y, { align: "center" });
    doc.text(item.title || "Product", col.product, y);
    doc.text(item.productCode || "N/A", col.hsn, y, { align: "right" });
    doc.text(String(qty), col.qty, y, { align: "right" });
    doc.text(fmt(dp), col.dp, y, { align: "right" });
    doc.text(fmt(cgst), col.cgst, y, { align: "right" });
    doc.text(fmt(sgst), col.sgst, y, { align: "right" });
    doc.text(fmt(net), col.net, y, { align: "right" });

    // Totals
    totalQty += qty;
    totalDP += totalDPRow;
    totalCGST += cgst;
    totalSGST += sgst;
    totalNet += net;
  });

  // === Total Row ===
  const totalY = tableY + (order.items?.length || 1) * 8 + 5;
  doc.setFillColor(240, 240, 240);
  doc.rect(14, totalY - 3, 182, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.text("Total", col.product, totalY + 2);
  doc.text(String(totalQty), col.qty, totalY + 2, { align: "right" });
  doc.text(fmt(totalDP), col.dp, totalY + 2, { align: "right" });
  doc.text(fmt(totalCGST), col.cgst, totalY + 2, { align: "right" });
  doc.text(fmt(totalSGST), col.sgst, totalY + 2, { align: "right" });
  doc.text(fmt(totalNet), col.net, totalY + 2, { align: "right" });

  // === Amount in Words ===
  const netTotal = Math.round(totalNet);
  doc.setFontSize(9);
  doc.text(`Amount in Words: ${numberToWords(netTotal)} Only`, 14, totalY + 15);

  // === Declaration & Footer ===
  doc.setFontSize(8).setFont(undefined, 'bold');
  doc.text("Declaration", 14, totalY + 25);
  doc.setFont(undefined, 'normal');
  doc.text("1. Certified that particulars given above are true and correct.", 14, totalY + 30);
  doc.text("2. All matters are subject to Jaipur jurisdiction.", 14, totalY + 34);
  doc.text("3. We are not responsible for any damage during transit.", 14, totalY + 38);

  doc.text("Authorised signatory", 180, 280, { align: "right" });

  const fileName = `Invoice_${order.billNumber || order.id || "order"}.pdf`;
  doc.save(fileName);
}




/**
 * Convert number to words - IMPROVED
 */
function numberToWords(num) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if (num === 0) return 'Zero';
  
  let words = '';
  let rupees = Math.floor(num);
  
  // Handle thousands
  if (rupees >= 1000) {
    const thousands = Math.floor(rupees / 1000);
    words += numberToWords(thousands) + ' Thousand ';
    rupees %= 1000;
  }
  
  // Handle hundreds
  if (rupees >= 100) {
    const hundreds = Math.floor(rupees / 100);
    words += ones[hundreds] + ' Hundred ';
    rupees %= 100;
  }
  
  // Handle tens and ones
  if (rupees > 0) {
    if (words !== '') words += 'and ';
    
    if (rupees < 10) {
      words += ones[rupees];
    } else if (rupees < 20) {
      words += teens[rupees - 10];
    } else {
      words += tens[Math.floor(rupees / 10)];
      if (rupees % 10 > 0) {
        words += ' ' + ones[rupees % 10];
      }
    }
  }
  
  return 'Rs. ' + words.trim() + ' Rupees';
}

/**
 * Helper function to convert image URL to base64 (for logo)
 */
async function getBase64FromUrl(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error("Could not load logo");
  }
}



/**
 * generateDynamicInvoicePdf
 *
 * Dependencies (install if not already):
 *   npm install jspdf jspdf-autotable
 *
 * Usage:
 *   import { generateDynamicInvoicePdf } from "./generateDynamicInvoicePdf";
 *   generateDynamicInvoicePdf(columns, row, companyInfo);
 *
 * companyInfo (optional):
 *   {
 *     name: "Your Company Pvt Ltd",
 *     address: "123, MG Road, Jaipur, Rajasthan - 302001",
 *     phone: "+91 98765 43210",
 *     email: "info@company.com",
 *     gst: "GSTIN: 08ABCDE1234F1Z5",
 *     logoBase64: "<base64 string>",   // optional
 *   }
 */



// ─── Color Palette ───────────────────────────────────────────────────────────
const COLORS = {
  primary:      [15,  40,  80],   // deep navy
  accent:       [234, 179, 8],    // golden amber
  accentLight:  [254, 243, 199],  // soft gold bg
  headerText:   [255, 255, 255],
  bodyText:     [30,  30,  40],
  mutedText:    [120, 120, 140],
  border:       [220, 225, 235],
  rowAlt:       [247, 249, 252],
  white:        [255, 255, 255],
  green:        [22,  163, 74],
  red:          [220, 38,  38],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt  = (val) => (val != null && val !== "" ? `Rs. ${Number(val).toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "N/A");
const isAmt = (key) => ["amount", "price", "dp", "total", "charge", "fee", "tax", "discount", "payable", "paid", "balance"].some((k) => key.toLowerCase().includes(k));

const setColor  = (doc, rgb, type = "text") => {
  if (type === "fill") doc.setFillColor(...rgb);
  else doc.setTextColor(...rgb);
};

const drawRect  = (doc, x, y, w, h, rgb, radius = 0) => {
  setColor(doc, rgb, "fill");
  if (radius > 0) {
    doc.roundedRect(x, y, w, h, radius, radius, "F");
  } else {
    doc.rect(x, y, w, h, "F");
  }
};

const drawLine  = (doc, x1, y1, x2, y2, rgb = COLORS.border, lw = 0.3) => {
  doc.setDrawColor(...rgb);
  doc.setLineWidth(lw);
  doc.line(x1, y1, x2, y2);
};

// ─── Main Export ─────────────────────────────────────────────────────────────
export const generateDynamicInvoicePdf = (
  columns,
  row,
  companyInfo = {}
) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const PW = doc.internal.pageSize.getWidth();   // 210
  const PH = doc.internal.pageSize.getHeight();  // 297
  const ML = 14, MR = 14;
  const CW = PW - ML - MR;

  const company = {
    name:    companyInfo.name    || "DHANTAG INDIA PVT. LTD",
    address: companyInfo.address || "Shop No. G-23 Manglam, Block-C, Hathoj Kalwar Road, Jhotwara Jaipur - 302012",
    phone:   companyInfo.phone   || "+91 8905520273",
    email:   companyInfo.email   || "info@dhantag.com",
    // gst:     companyInfo.gst     || "GSTIN: 07ABCDE1234F1Z5",
    logo:    companyInfo.logoBase64 || 'https://backend.dhantag.com/uploads/dhantag.png',
  };

  // ── 1. HEADER BAND ──────────────────────────────────────────────────────────
  drawRect(doc, 0, 0, PW, 42, COLORS.primary);

  // Gold accent stripe at top
  drawRect(doc, 0, 0, PW, 3, COLORS.accent);

  // Logo area
  if (company.logo) {
    doc.addImage(company.logo, "PNG", ML, 8, 22, 22);
  } else {
    // Initials badge
    drawRect(doc, ML, 7, 22, 22, COLORS.accent, 4);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    setColor(doc, COLORS.primary);
    const initials = company.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("");
    doc.text(initials, ML + 11, 21, { align: "center" });
  }

  // Company name & tagline
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  setColor(doc, COLORS.white);
  doc.text(company.name, ML + 27, 17);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  setColor(doc, [180, 200, 230]);
  doc.text(company.address, ML + 27, 23);
  doc.text(`${company.phone}  |  ${company.email} `, ML + 27, 29);

  // "INVOICE" badge (right side)
  drawRect(doc, PW - MR - 36, 9, 36, 14, COLORS.accent, 3);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  setColor(doc, COLORS.primary);
  doc.text("INVOICE", PW - MR - 18, 19, { align: "center" });

  // ── 2. META STRIP (bill no, date, status) ───────────────────────────────────
  const metaY = 48;
  drawRect(doc, ML, metaY, CW, 18, COLORS.accentLight, 3);

  // Bill number
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  setColor(doc, COLORS.primary);
 
  doc.setFont("helvetica", "normal");
  setColor(doc, COLORS.bodyText);


  // Date
  const dateX = ML + CW * 0.28;
  doc.setFont("helvetica", "bold");
  setColor(doc, COLORS.primary);
  doc.text("DATE", dateX, metaY + 7);
  doc.setFont("helvetica", "normal");
  setColor(doc, COLORS.bodyText);
  doc.text(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }), dateX, metaY + 13);

  // Transaction type / status
  const statusX = ML + CW * 0.56;
  doc.setFont("helvetica", "bold");
  setColor(doc, COLORS.primary);
  doc.text("TYPE", statusX, metaY + 7);
  doc.setFont("helvetica", "normal");
  setColor(doc, COLORS.bodyText);
  doc.text(row.transactionType || row.type || "Transaction", statusX, metaY + 13);

  // Status badge
  const status     = (row.status || "").toLowerCase();
  const statusBadge = status === "approved" || status === "success" || status === "completed"
    ? { label: "SUCCESS", color: COLORS.green }
    : status === "rejected" || status === "failed"
    ? { label: "FAILED",  color: COLORS.red }
    : { label: "PENDING", color: [217, 119, 6] };

  const badgeX = ML + CW * 0.82;
  drawRect(doc, badgeX, metaY + 3, 28, 9, statusBadge.color, 2);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  setColor(doc, COLORS.white);
  doc.text(statusBadge.label, badgeX + 14, metaY + 9, { align: "center" });

  // ── 3. PARTY INFO (From / To) ────────────────────────────────────────────────
  const partyY = metaY + 25;

  // Left block — Billed By
  drawRect(doc, ML, partyY, CW / 2 - 4, 28, COLORS.rowAlt, 3);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  setColor(doc, COLORS.mutedText);
  doc.text("BILLED BY", ML + 5, partyY + 7);
  doc.setFontSize(9);
  setColor(doc, COLORS.bodyText);
  doc.setFont("helvetica", "bold");
  doc.text(company.name, ML + 5, partyY + 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setColor(doc, COLORS.mutedText);
  doc.text(company.address, ML + 5, partyY + 19, { maxWidth: CW / 2 - 10 });

  // Right block — Billed To
  const rightX = ML + CW / 2 + 4;
  drawRect(doc, rightX, partyY, CW / 2 - 4, 28, COLORS.rowAlt, 3);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  setColor(doc, COLORS.mutedText);

  setColor(doc, COLORS.bodyText);

  setColor(doc, COLORS.mutedText);


  // ── 4. DETAILS TABLE ─────────────────────────────────────────────────────────
  // Separate amount fields from detail fields
  const exportableCols = columns.filter(
    (col) => col?.key && col.key !== "action" && typeof col.render !== "function"
  );
  const amountCols  = exportableCols.filter((c) => isAmt(c.key));
  const detailCols  = exportableCols.filter((c) => !isAmt(c.key));

  const tableY = partyY + 34;

  // Section label
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  setColor(doc, COLORS.primary);
  doc.text("TRANSACTION DETAILS", ML, tableY - 3);
  drawLine(doc, ML, tableY - 1, PW - MR, tableY - 1, COLORS.accent, 0.5);

  // Build table rows (2-column layout: label | value)
  const tableRows = detailCols.map((col) => {
    let value = row[col.key];
    return [col.title, value != null && value !== "" ? String(value) : "N/A"];
  });

  autoTable(doc, {
    startY:    tableY + 1,
    head:      [["Field", "Value"]],
    body:      tableRows,
    margin:    { left: ML, right: MR },
    tableWidth: CW,
    styles: {
      font:       "helvetica",
      fontSize:   9,
      cellPadding: 3.5,
      textColor:  COLORS.bodyText,
      lineColor:  COLORS.border,
      lineWidth:  0.2,
    },
    headStyles: {
      fillColor:  COLORS.primary,
      textColor:  COLORS.white,
      fontStyle:  "bold",
      fontSize:   9,
      halign:     "left",
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: CW * 0.38, fillColor: [240, 244, 251] },
      1: { cellWidth: CW * 0.62 },
    },
    alternateRowStyles: { fillColor: COLORS.rowAlt },
    didDrawPage: () => {},
  });

  // ── 5. AMOUNT SUMMARY BOX ────────────────────────────────────────────────────
  if (amountCols.length > 0) {
    const amtY = doc.lastAutoTable.finalY + 8;
    const boxW = 90;
    const boxX = PW - MR - boxW;

    // Section label
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    setColor(doc, COLORS.primary);
    doc.text("AMOUNT SUMMARY", boxX, amtY - 2);

    let rowY = amtY + 2;
    const rowH = 8;

    amountCols.forEach((col, i) => {
      const isLast = i === amountCols.length - 1;
      const bg = isLast ? COLORS.primary : i % 2 === 0 ? COLORS.white : COLORS.rowAlt;
      drawRect(doc, boxX, rowY, boxW, rowH, bg);
      drawLine(doc, boxX, rowY, boxX + boxW, rowY, COLORS.border, 0.2);

      doc.setFontSize(isLast ? 9.5 : 8.5);
      doc.setFont("helvetica", isLast ? "bold" : "normal");
      setColor(doc, isLast ? COLORS.white : COLORS.mutedText);
      doc.text(col.title, boxX + 4, rowY + 5.5);

      setColor(doc, isLast ? COLORS.accent : COLORS.bodyText);
      doc.setFont("helvetica", "bold");
      doc.text(fmt(row[col.key]), boxX + boxW - 4, rowY + 5.5, { align: "right" });

      rowY += rowH;
    });

    // Bottom border
    drawLine(doc, boxX, rowY, boxX + boxW, rowY, COLORS.primary, 0.5);
  }

  // ── 6. FOOTER ────────────────────────────────────────────────────────────────
  const footerY = PH - 20;
  drawRect(doc, 0, footerY, PW, 20, COLORS.primary);
  drawRect(doc, 0, footerY, PW, 2, COLORS.accent); // gold top stripe

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  setColor(doc, [180, 200, 230]);
  doc.text("Thank you for your transaction! For queries, contact us at " + company.email, PW / 2, footerY + 8, { align: "center" });

  doc.setFontSize(7.5);
  setColor(doc, [120, 140, 170]);
  doc.text(`Generated on ${new Date().toLocaleString("en-IN")}  |  ${company.name}`, PW / 2, footerY + 14, { align: "center" });

  // Page numbers (multi-page support)
  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(7.5);
    setColor(doc, [150, 165, 190]);
    doc.text(`Page ${p} of ${totalPages}`, PW - MR, footerY + 8, { align: "right" });
  }

  // ── 7. SAVE ──────────────────────────────────────────────────────────────────
  doc.save(`Invoice_${row.billNumber || row.id || "data"}.pdf`);
};
