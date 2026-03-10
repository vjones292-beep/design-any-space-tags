"use client";

import { useMemo, useState } from "react";
import QRCode from "react-qr-code";

type Tag = {
productName: string;
price: string;
checkoutLink: string;
};

const makeEmptyTags = (): Tag[] =>
Array.from({ length: 6 }, () => ({
productName: "",
price: "",
checkoutLink: "",
}));

export default function Page() {
const [storeName, setStoreName] = useState("");
const [tags, setTags] = useState<Tag[]>(makeEmptyTags());

const readyCount = useMemo(() => {
return tags.filter(
(tag) =>
tag.productName.trim().length > 0 &&
tag.checkoutLink.trim().length > 0
).length;
}, [tags]);

function updateTag(index: number, field: keyof Tag, value: string) {
setTags((prev) =>
prev.map((tag, i) => (i === index ? { ...tag, [field]: value } : tag))
);
}

function clearAll() {
setStoreName("");
setTags(makeEmptyTags());
}

function printTags() {
window.print();
}

return (
<>
<main style={styles.page}>
<div style={styles.container}>
<header style={styles.header} className="no-print">
<div style={styles.badge}>Design Any Space</div>

<div style={styles.headerRow}>
<div style={styles.headerText}>
<h1 style={styles.title}>QR Product Tag Generator</h1>
<p style={styles.subtitle}>
Create one clean printable sheet with up to 6 different
product tags for markets, pop-ups, vintage booths, and retail
displays.
</p>
</div>

<div style={styles.buttonRow}>
<button onClick={clearAll} style={styles.secondaryButton}>
Clear All
</button>
<button onClick={printTags} style={styles.primaryButton}>
Print Tags
</button>
</div>
</div>
</header>

<section style={styles.infoGrid} className="no-print">
<div style={styles.infoCard}>
<div style={styles.infoLabel}>How it works</div>
<div style={styles.infoText}>
Add product details, paste each checkout link, then print one
mixed tag sheet.
</div>
</div>

<div style={styles.infoCard}>
<div style={styles.infoLabel}>Best for</div>
<div style={styles.infoText}>
Vendor booths, antique shops, furniture pieces, boutique
displays, and pop-up events.
</div>
</div>

<div style={styles.infoCard}>
<div style={styles.infoLabel}>Filled tags</div>
<div style={styles.readyText}>{readyCount} of 6 ready</div>
</div>
</section>

<div style={styles.mainGrid} className="main-grid">
<aside style={styles.sidebar} className="no-print">
<div style={styles.panel}>
<h2 style={styles.sectionTitle}>Tag Details</h2>

<div style={styles.fieldBlock}>
<label style={styles.label}>Store name:</label>
<input
type="text"
value={storeName}
onChange={(e) => setStoreName(e.target.value)}
style={styles.input}
/>
</div>

<div style={styles.tagsStack}>
{tags.map((tag, index) => (
<div key={index} style={styles.editorCard}>
<h3 style={styles.editorTitle}>Tag {index + 1}</h3>

<div style={styles.fieldBlock}>
<label style={styles.label}>Product name:</label>
<input
type="text"
value={tag.productName}
onChange={(e) =>
updateTag(index, "productName", e.target.value)
}
style={styles.input}
/>
</div>

<div style={styles.fieldBlock}>
<label style={styles.label}>Price:</label>
<input
type="text"
value={tag.price}
onChange={(e) =>
updateTag(index, "price", e.target.value)
}
style={styles.input}
/>
</div>

<div style={styles.fieldBlock}>
<label style={styles.label}>Checkout link:</label>
<input
type="url"
value={tag.checkoutLink}
onChange={(e) =>
updateTag(index, "checkoutLink", e.target.value)
}
style={styles.input}
/>
</div>
</div>
))}
</div>
</div>
</aside>

<section style={styles.previewSection}>
<div style={styles.panel}>
<div style={styles.previewHeader} className="no-print">
<div>
<h2 style={styles.sectionTitle}>Mixed Tag Sheet Preview</h2>
<p style={styles.previewSubtext}>
One printable sheet with up to 6 different product tags.
</p>
</div>

<div style={styles.previewSite}>designanyspace.com</div>
</div>

<div className="sheet-grid" style={styles.sheetGrid}>
{tags.map((tag, index) => {
const displayStore = storeName.trim();
const displayProduct = tag.productName.trim() || "Product Name";
const cleanedPrice = tag.price.trim().replace(/^\~+/, "");
const displayPrice = cleanedPrice ? `~${cleanedPrice}` : "~";
const hasLink = tag.checkoutLink.trim().length > 0;

return (
<div key={index} className="tag-wrap" style={styles.tagWrap}>
<div className="cut-guide cut-guide-tl" />
<div className="cut-guide cut-guide-tr" />
<div className="cut-guide cut-guide-bl" />
<div className="cut-guide cut-guide-br" />

<div className="tag-card" style={styles.tagCard}>
<div style={styles.tagInner}>
<div style={styles.tagHeaderRow}>
<div style={styles.tagStoreName}>
{displayStore || "Store Name"}
</div>

<div style={styles.tagQrColumn}>
<div style={styles.scanLabel}>Scan to pay</div>
<div style={styles.qrOuterBox}>
<div style={styles.qrInnerBox}>
{hasLink ? (
<QRCode
value={tag.checkoutLink}
size={74}
bgColor="#FFFFFF"
fgColor="#000000"
/>
) : (
<div style={styles.qrPlaceholder}>QR</div>
)}
</div>
</div>
</div>
</div>

<div style={styles.tagBottomLeft}>
<div style={styles.tagProductName}>
{displayProduct}
</div>
<div style={styles.tagPrice}>{displayPrice}</div>
<div style={styles.tagFooter}>
designanyspace.com
</div>
</div>
</div>
</div>
</div>
);
})}
</div>
</div>
</section>
</div>
</div>
</main>

<style jsx global>{`
html,
body {
margin: 0;
padding: 0;
background: #ffffff;
color: #111111;
font-family: "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive;
}

* {
box-sizing: border-box;
}

input,
button,
textarea,
select {
font-family: "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive;
}

.tag-wrap {
position: relative;
}

.cut-guide {
display: none;
}

@media (max-width: 1100px) {
.main-grid {
grid-template-columns: 1fr !important;
}

.sheet-grid {
grid-template-columns: 1fr !important;
}
}

@media print {
@page {
size: letter portrait;
margin: 0.35in;
}

.no-print {
display: none !important;
}

.main-grid {
display: block !important;
}

.sheet-grid {
display: grid !important;
grid-template-columns: 1fr 1fr !important;
gap: 12px !important;
}

.tag-wrap {
position: relative !important;
break-inside: avoid;
page-break-inside: avoid;
padding: 6px;
}

.tag-card {
break-inside: avoid;
page-break-inside: avoid;
}

.cut-guide {
display: block !important;
position: absolute;
width: 14px;
height: 14px;
pointer-events: none;
}

.cut-guide-tl {
top: 0;
left: 0;
border-top: 1px solid #000;
border-left: 1px solid #000;
}

.cut-guide-tr {
top: 0;
right: 0;
border-top: 1px solid #000;
border-right: 1px solid #000;
}

.cut-guide-bl {
bottom: 0;
left: 0;
border-bottom: 1px solid #000;
border-left: 1px solid #000;
}

.cut-guide-br {
bottom: 0;
right: 0;
border-bottom: 1px solid #000;
border-right: 1px solid #000;
}
}
`}</style>
</>
);
}

const styles: { [key: string]: React.CSSProperties } = {
page: {
minHeight: "100vh",
background: "#ffffff",
color: "#111111",
},
container: {
maxWidth: "1320px",
margin: "0 auto",
padding: "24px 20px 40px",
},
header: {
border: "1px solid rgba(0,0,0,0.10)",
borderRadius: 22,
background: "#fff",
padding: 20,
boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
marginBottom: 20,
},
badge: {
display: "inline-block",
border: "1px solid rgba(0,0,0,0.10)",
borderRadius: 999,
padding: "7px 12px",
fontSize: 16,
fontWeight: 700,
marginBottom: 10,
},
headerRow: {
display: "flex",
flexWrap: "wrap",
justifyContent: "space-between",
alignItems: "flex-end",
gap: 16,
},
headerText: {
minWidth: 0,
flex: "1 1 600px",
},
title: {
margin: 0,
fontSize: 38,
lineHeight: 1.05,
fontWeight: 700,
},
subtitle: {
margin: "10px 0 0 0",
maxWidth: 800,
fontSize: 18,
lineHeight: 1.45,
},
buttonRow: {
display: "flex",
gap: 10,
flexWrap: "wrap",
},
primaryButton: {
background: "#111111",
color: "#ffffff",
border: "1px solid #111111",
borderRadius: 14,
padding: "12px 18px",
fontSize: 16,
fontWeight: 700,
cursor: "pointer",
},
secondaryButton: {
background: "#ffffff",
color: "#111111",
border: "1px solid #111111",
borderRadius: 14,
padding: "12px 18px",
fontSize: 16,
fontWeight: 700,
cursor: "pointer",
},
infoGrid: {
display: "grid",
gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
gap: 12,
marginBottom: 20,
},
infoCard: {
border: "1px solid rgba(0,0,0,0.10)",
borderRadius: 20,
padding: 14,
background: "#fff",
boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
},
infoLabel: {
fontSize: 16,
fontWeight: 700,
marginBottom: 8,
},
infoText: {
fontSize: 18,
lineHeight: 1.4,
},
readyText: {
fontSize: 34,
fontWeight: 700,
lineHeight: 1.1,
marginTop: 8,
},
mainGrid: {
display: "grid",
gridTemplateColumns: "380px minmax(0, 1fr)",
gap: 20,
alignItems: "start",
},
sidebar: {
minWidth: 0,
},
previewSection: {
minWidth: 0,
},
panel: {
border: "1px solid rgba(0,0,0,0.10)",
borderRadius: 22,
padding: 18,
background: "#fff",
boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
},
sectionTitle: {
margin: 0,
fontSize: 22,
fontWeight: 700,
},
fieldBlock: {
marginTop: 14,
},
label: {
display: "block",
marginBottom: 7,
fontSize: 18,
fontWeight: 700,
},
input: {
width: "100%",
height: 46,
borderRadius: 14,
border: "1px solid rgba(0,0,0,0.14)",
padding: "0 14px",
fontSize: 18,
outline: "none",
background: "#fff",
},
tagsStack: {
display: "grid",
gap: 14,
marginTop: 16,
},
editorCard: {
border: "1px solid rgba(0,0,0,0.10)",
borderRadius: 18,
padding: 14,
background: "#fff",
},
editorTitle: {
margin: 0,
fontSize: 22,
fontWeight: 700,
},
previewHeader: {
display: "flex",
justifyContent: "space-between",
alignItems: "flex-start",
gap: 12,
marginBottom: 14,
},
previewSubtext: {
margin: "6px 0 0 0",
fontSize: 18,
},
previewSite: {
fontSize: 16,
fontWeight: 700,
paddingTop: 4,
},
sheetGrid: {
display: "grid",
gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
gap: 12,
},
tagWrap: {
position: "relative",
},
tagCard: {
border: "1.5px solid rgba(0,0,0,0.85)",
borderRadius: 18,
background: "#fff",
aspectRatio: "2 / 1",
overflow: "hidden",
},
tagInner: {
height: "100%",
padding: "16px 18px 14px 18px",
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
},
tagHeaderRow: {
display: "flex",
justifyContent: "space-between",
alignItems: "flex-start",
gap: 14,
},
tagStoreName: {
fontSize: 26,
lineHeight: 1,
fontWeight: 700,
maxWidth: "65%",
wordBreak: "break-word",
minHeight: 26,
},
tagQrColumn: {
display: "flex",
flexDirection: "column",
alignItems: "center",
gap: 6,
flexShrink: 0,
},
scanLabel: {
fontSize: 14,
lineHeight: 1,
fontWeight: 700,
textAlign: "center",
},
qrOuterBox: {
width: 96,
height: 96,
border: "1.5px solid rgba(0,0,0,0.85)",
borderRadius: 12,
display: "flex",
alignItems: "center",
justifyContent: "center",
background: "#fff",
},
qrInnerBox: {
width: 80,
height: 80,
display: "flex",
alignItems: "center",
justifyContent: "center",
background: "#fff",
},
qrPlaceholder: {
fontSize: 18,
fontWeight: 700,
color: "rgba(0,0,0,0.55)",
},
tagBottomLeft: {
display: "flex",
flexDirection: "column",
justifyContent: "flex-end",
alignItems: "flex-start",
gap: 6,
minWidth: 0,
maxWidth: "65%",
},
tagProductName: {
fontSize: 22,
lineHeight: 1.05,
fontWeight: 700,
wordBreak: "break-word",
},
tagPrice: {
fontSize: 24,
lineHeight: 1,
fontWeight: 700,
},
tagFooter: {
fontSize: 14,
lineHeight: 1.1,
color: "rgba(0,0,0,0.75)",
},
};