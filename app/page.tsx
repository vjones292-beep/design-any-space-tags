"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Tag = {
productName: string;
price: string;
checkoutLink: string;
};

const STRIPE_UNLOCK_LINK = "https://buy.stripe.com/5kQ00j4VUbxn7tC8zS2oE00";

const makeEmptyTags = (): Tag[] =>
Array.from({ length: 6 }, () => ({
productName: "",
price: "",
checkoutLink: "",
}));

export default function Page() {
const [storeName, setStoreName] = useState("");
const [tags, setTags] = useState<Tag[]>(makeEmptyTags());
const [pdfUnlocked, setPdfUnlocked] = useState(false);
const [isDownloading, setIsDownloading] = useState(false);

const printRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
const unlocked = localStorage.getItem("pdfUnlocked");
if (unlocked === "true") {
setPdfUnlocked(true);
}
}, []);

const hasAnyContent = useMemo(() => {
return (
storeName.trim() !== "" ||
tags.some(
(tag) =>
tag.productName.trim() !== "" ||
tag.price.trim() !== "" ||
tag.checkoutLink.trim() !== ""
)
);
}, [storeName, tags]);

const updateTag = (index: number, field: keyof Tag, value: string) => {
setTags((prev) => {
const next = [...prev];
next[index] = {
...next[index],
[field]: value,
};
return next;
});
};

const resetAll = () => {
setStoreName("");
setTags(makeEmptyTags());
localStorage.removeItem("pdfUnlocked");
setPdfUnlocked(false);
};

const buildQrUrl = (value: string) => {
return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
value
)}`;
};

const formatPrice = (value: string) => {
const trimmed = value.trim();

if (!trimmed) return "~0.00";
if (trimmed.startsWith("~")) return trimmed;

return `~${trimmed}`;
};

const handleDownloadPDF = async () => {
if (!printRef.current) return;

try {
setIsDownloading(true);

const canvas = await html2canvas(printRef.current, {
scale: 2,
useCORS: true,
backgroundColor: "#ffffff",
});

const imgData = canvas.toDataURL("image/png");
const pdf = new jsPDF({
orientation: "portrait",
unit: "pt",
format: "letter",
});

const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();

pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
pdf.save("designanyspace-qr-tags.pdf");
} catch (error) {
console.error("PDF download failed:", error);
alert("Unable to generate PDF.");
} finally {
setIsDownloading(false);
}
};

const handlePdfButtonClick = () => {
if (pdfUnlocked) {
handleDownloadPDF();
return;
}

window.location.href = STRIPE_UNLOCK_LINK;
};

return (
<main style={styles.page}>
<div style={styles.shell}>
<div style={styles.leftColumn}>
<div style={styles.headerBlock}>
<p style={styles.eyebrow}>DESIGNANYSPACE</p>
<h1 style={styles.title}>QR Tag Generator</h1>
<p style={styles.subtitle}>
Create a clean printable tag sheet with 6 QR checkout tags per
page.
</p>
</div>

<div style={styles.card}>
<label style={styles.label}>Business Name</label>
<input
value={storeName}
onChange={(e) => setStoreName(e.target.value)}
placeholder="Business name"
style={styles.input}
/>
</div>

<div style={styles.card}>
<div style={styles.cardTopRow}>
<h2 style={styles.sectionTitle}>Tag Details</h2>
<button
type="button"
onClick={resetAll}
style={styles.secondaryButton}
>
Clear All
</button>
</div>

<div style={styles.formsWrap}>
{tags.map((tag, index) => (
<div key={index} style={styles.tagFormCard}>
<div style={styles.tagFormHeader}>Tag {index + 1}</div>

<label style={styles.label}>Product Name</label>
<input
value={tag.productName}
onChange={(e) =>
updateTag(index, "productName", e.target.value)
}
placeholder="Product name"
style={styles.input}
/>

<label style={styles.label}>Price</label>
<input
value={tag.price}
onChange={(e) => updateTag(index, "price", e.target.value)}
placeholder="350"
style={styles.input}
/>

<label style={styles.label}>Checkout Link</label>
<input
value={tag.checkoutLink}
onChange={(e) =>
updateTag(index, "checkoutLink", e.target.value)
}
placeholder="https://"
style={styles.input}
/>
</div>
))}
</div>
</div>

<div style={styles.actionRow}>
<button
type="button"
onClick={handlePdfButtonClick}
style={styles.primaryButton}
disabled={!hasAnyContent || isDownloading}
>
{isDownloading
? "Preparing PDF..."
: pdfUnlocked
? "Download PDF"
: "Unlock PDF – $9"}
</button>
</div>

{!pdfUnlocked && (
<p style={styles.helperText}>
One-time unlock for printable PDF tag sheets.
</p>
)}
</div>

<div style={styles.rightColumn}>
<div style={styles.previewHeader}>
<h2 style={styles.previewTitle}>Live Preview</h2>
<p style={styles.previewSub}>6 tags per printable page</p>
</div>

<div ref={printRef} style={styles.printPage}>
<div style={styles.grid}>
{tags.map((tag, index) => {
const hasQr = tag.checkoutLink.trim() !== "";

return (
<div key={index} style={styles.tagCard}>
<div style={styles.tagTopRow}>
<div style={styles.tagBusinessName}>
{storeName.trim() || "BUSINESS NAME"}
</div>
</div>

<div style={styles.qrSection}>
<div style={styles.qrWrap}>
{hasQr ? (
<img
src={buildQrUrl(tag.checkoutLink)}
alt={`QR code ${index + 1}`}
style={styles.qrImage}
/>
) : (
<div style={styles.qrPlaceholder}>QR appears here</div>
)}
</div>

<div style={styles.scanText}>scan to pay</div>
</div>

<div style={styles.bottomBox}>
<div style={styles.productName}>
{tag.productName.trim() || "Product Name"}
</div>
<div style={styles.price}>{formatPrice(tag.price)}</div>
</div>
</div>
);
})}
</div>
</div>
</div>
</div>
</main>
);
}

const commonFont = {
fontFamily: "Arial, Helvetica, sans-serif",
fontWeight: 700,
} as const;

const styles: Record<string, React.CSSProperties> = {
page: {
minHeight: "100vh",
background: "#f7f7f5",
padding: "32px 20px",
...commonFont,
},
shell: {
maxWidth: 1400,
margin: "0 auto",
display: "grid",
gridTemplateColumns: "420px 1fr",
gap: 24,
alignItems: "start",
},
leftColumn: {
display: "flex",
flexDirection: "column",
gap: 18,
},
rightColumn: {
display: "flex",
flexDirection: "column",
gap: 12,
},
headerBlock: {
padding: 4,
},
eyebrow: {
margin: 0,
fontSize: 12,
letterSpacing: 1.6,
textTransform: "uppercase",
color: "rgba(0,0,0,0.55)",
...commonFont,
},
title: {
margin: "6px 0 8px",
fontSize: 34,
lineHeight: 1.05,
color: "#111",
...commonFont,
},
subtitle: {
margin: 0,
fontSize: 15,
lineHeight: 1.6,
color: "rgba(0,0,0,0.66)",
...commonFont,
},
card: {
background: "#fff",
border: "1px solid rgba(0,0,0,0.08)",
borderRadius: 20,
padding: 18,
boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
},
cardTopRow: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: 14,
gap: 12,
},
sectionTitle: {
margin: 0,
fontSize: 18,
color: "#111",
...commonFont,
},
label: {
display: "block",
fontSize: 13,
color: "#222",
marginBottom: 8,
marginTop: 10,
...commonFont,
},
input: {
width: "100%",
border: "1px solid rgba(0,0,0,0.12)",
borderRadius: 12,
padding: "12px 14px",
fontSize: 14,
outline: "none",
background: "#fff",
boxSizing: "border-box",
...commonFont,
},
formsWrap: {
display: "grid",
gridTemplateColumns: "1fr",
gap: 12,
},
tagFormCard: {
border: "1px solid rgba(0,0,0,0.08)",
borderRadius: 16,
padding: 14,
background: "#fafafa",
},
tagFormHeader: {
fontSize: 13,
marginBottom: 6,
color: "#111",
...commonFont,
},
actionRow: {
display: "flex",
gap: 12,
},
primaryButton: {
appearance: "none",
border: "none",
background: "#111",
color: "#fff",
borderRadius: 16,
padding: "14px 18px",
fontSize: 15,
cursor: "pointer",
width: "100%",
...commonFont,
},
secondaryButton: {
appearance: "none",
border: "1px solid rgba(0,0,0,0.12)",
background: "#fff",
color: "#111",
borderRadius: 12,
padding: "10px 14px",
fontSize: 13,
cursor: "pointer",
...commonFont,
},
helperText: {
margin: 0,
fontSize: 13,
color: "rgba(0,0,0,0.6)",
...commonFont,
},
previewHeader: {
display: "flex",
justifyContent: "space-between",
alignItems: "end",
gap: 12,
padding: "4px 2px",
},
previewTitle: {
margin: 0,
fontSize: 20,
color: "#111",
...commonFont,
},
previewSub: {
margin: 0,
fontSize: 13,
color: "rgba(0,0,0,0.6)",
...commonFont,
},
printPage: {
width: "100%",
maxWidth: 816,
aspectRatio: "8.5 / 11",
background: "#fff",
border: "1px solid rgba(0,0,0,0.08)",
borderRadius: 18,
padding: 22,
boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
boxSizing: "border-box",
},
grid: {
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: 18,
height: "100%",
},
tagCard: {
border: "1.5px solid #111",
borderRadius: 18,
display: "flex",
flexDirection: "column",
overflow: "hidden",
background: "#fff",
minHeight: 0,
},
tagTopRow: {
borderBottom: "1.5px solid #111",
padding: "8px 12px",
minHeight: 32,
display: "flex",
alignItems: "center",
justifyContent: "flex-start",
},
tagBusinessName: {
fontSize: 11,
textTransform: "uppercase",
letterSpacing: 1,
color: "#111",
textAlign: "left",
...commonFont,
},
qrSection: {
flex: 1,
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
padding: "12px 12px 10px",
gap: 8,
},
qrWrap: {
width: "100%",
display: "flex",
alignItems: "center",
justifyContent: "center",
minHeight: 150,
},
qrImage: {
width: "140px",
height: "140px",
objectFit: "contain",
},
qrPlaceholder: {
width: 140,
height: 140,
border: "1.5px dashed rgba(0,0,0,0.25)",
borderRadius: 12,
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: 13,
color: "rgba(0,0,0,0.45)",
textAlign: "center",
padding: 12,
boxSizing: "border-box",
...commonFont,
},
scanText: {
fontSize: 12,
color: "#111",
textTransform: "lowercase",
...commonFont,
},
bottomBox: {
borderTop: "1.5px solid #111",
padding: "12px 14px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
gap: 4,
minHeight: 76,
},
productName: {
fontSize: 15,
color: "#111",
lineHeight: 1.2,
wordBreak: "break-word",
...commonFont,
},
price: {
fontSize: 15,
color: "#111",
...commonFont,
},
};