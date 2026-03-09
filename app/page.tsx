"use client";

import { useMemo, useState } from "react";
import QRCode from "react-qr-code";

type TagItem = {
productName: string;
price: string;
checkoutLink: string;
};

const createEmptyTags = (): TagItem[] =>
Array.from({ length: 6 }, () => ({
productName: "",
price: "",
checkoutLink: "",
}));

export default function HomePage() {
const [shopName, setShopName] = useState("Design Any Space");
const [tags, setTags] = useState<TagItem[]>(createEmptyTags());

const readyCount = useMemo(() => {
return tags.filter(
(tag) =>
tag.productName.trim().length > 0 && tag.checkoutLink.trim().length > 0
).length;
}, [tags]);

const updateTag = (
index: number,
field: keyof TagItem,
value: string
) => {
setTags((prev) =>
prev.map((tag, i) => (i === index ? { ...tag, [field]: value } : tag))
);
};

const clearAll = () => {
setShopName("Design Any Space");
setTags(createEmptyTags());
};

const printSheet = () => {
window.print();
};

return (
<>
<main style={styles.page}>
<div style={styles.container}>
<header style={styles.headerCard}>
<div style={styles.badge}>Design Any Space</div>

<div style={styles.headerRow}>
<div>
<h1 style={styles.title}>QR Product Tag Generator</h1>
<p style={styles.subtitle}>
Create one clean printable sheet with up to 6 different
product tags for markets, pop-ups, vintage booths, and retail
displays.
</p>
</div>

<div style={styles.buttonRow} className="no-print">
<button type="button" onClick={clearAll} style={styles.secondaryButton}>
Clear All
</button>
<button type="button" onClick={printSheet} style={styles.primaryButton}>
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

<div style={styles.mainGrid}>
<aside style={styles.sidebar} className="no-print">
<div style={styles.panel}>
<h2 style={styles.sectionTitle}>Tag Details</h2>

<div style={styles.fieldBlock}>
<label style={styles.label}>Shop name</label>
<input
type="text"
value={shopName}
onChange={(e) => setShopName(e.target.value)}
style={styles.input}
/>
</div>

<div style={styles.tagsStack}>
{tags.map((tag, index) => (
<div key={index} style={styles.tagEditorCard}>
<h3 style={styles.tagEditorTitle}>Tag {index + 1}</h3>

<div style={styles.fieldBlock}>
<label style={styles.label}>Product name</label>
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
<label style={styles.label}>Price</label>
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
<label style={styles.label}>Checkout link</label>
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
<div style={styles.previewHeader}>
<div>
<h2 style={styles.sectionTitle}>Mixed Tag Sheet Preview</h2>
<p style={styles.previewSubtext} className="no-print">
One printable sheet with up to 6 different product tags.
</p>
</div>
<div style={styles.previewSite} className="no-print">
designanyspace.com
</div>
</div>

<div className="tag-sheet-grid" style={styles.tagSheetGrid}>
{tags.map((tag, index) => {
const hasLink = tag.checkoutLink.trim().length > 0;

return (
<article key={index} className="tag-card" style={styles.tagCard}>
<div style={styles.tagInner}>
<div style={styles.tagBrand}>
{(shopName || "Design Any Space").toUpperCase()}
</div>

<div style={styles.tagMiddle}>
<div style={styles.tagTextColumn}>
<div style={styles.tagNameWrap}>
<div style={styles.tagName}>
{tag.productName.trim() || "Product Name"}
</div>
</div>

<div>
<div style={styles.tagPrice}>
{tag.price.trim() || ""}
</div>
<div style={styles.tagFooter}>
created by: designanyspace.com
</div>
</div>
</div>

<div style={styles.qrColumn}>
<div style={styles.qrBox}>
{hasLink ? (
<QRCode
value={tag.checkoutLink}
size={82}
bgColor="#FFFFFF"
fgColor="#000000"
/>
) : (
<div style={styles.qrPlaceholder}>QR</div>
)}
</div>
<div style={styles.scanText}>Scan to Buy</div>
</div>
</div>
</div>
</article>
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
font-family: Arial, Helvetica, sans-serif;
}

* {
box-sizing: border-box;
}

@media (max-width: 1100px) {
.tag-sheet-grid {
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

body {
background: white !important;
}

.tag-sheet-grid {
display: grid !important;
grid-template-columns: 1fr 1fr !important;
gap: 10px !important;
}

.tag-card {
break-inside: avoid;
page-break-inside: avoid;
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
headerCard: {
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
fontSize: 12,
fontWeight: 600,
letterSpacing: 0.3,
marginBottom: 10,
},
headerRow: {
display: "flex",
flexWrap: "wrap",
justifyContent: "space-between",
alignItems: "flex-end",
gap: 16,
},
title: {
margin: 0,
fontSize: 50,
lineHeight: 1.05,
fontWeight: 800,
},
subtitle: {
margin: "10px 0 0 0",
maxWidth: 800,
fontSize: 16,
lineHeight: 1.5,
color: "rgba(0,0,0,0.7)",
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
fontSize: 14,
fontWeight: 700,
cursor: "pointer",
},
secondaryButton: {
background: "#ffffff",
color: "#111111",
border: "1px solid #111111",
borderRadius: 14,
padding: "12px 18px",
fontSize: 14,
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
padding: 16,
background: "#fff",
boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
},
infoLabel: {
fontSize: 12,
textTransform: "uppercase",
letterSpacing: 1,
fontWeight: 700,
color: "rgba(0,0,0,0.55)",
marginBottom: 8,
},
infoText: {
fontSize: 15,
lineHeight: 1.45,
},
readyText: {
fontSize: 30,
fontWeight: 800,
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
fontWeight: 800,
},
fieldBlock: {
marginTop: 14,
},
label: {
display: "block",
marginBottom: 7,
fontSize: 14,
fontWeight: 600,
},
input: {
width: "100%",
height: 46,
borderRadius: 14,
border: "1px solid rgba(0,0,0,0.14)",
padding: "0 14px",
fontSize: 14,
outline: "none",
background: "#fff",
},
tagsStack: {
display: "grid",
gap: 14,
marginTop: 16,
},
tagEditorCard: {
border: "1px solid rgba(0,0,0,0.10)",
borderRadius: 18,
padding: 14,
background: "#fff",
},
tagEditorTitle: {
margin: 0,
fontSize: 18,
fontWeight: 800,
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
fontSize: 14,
color: "rgba(0,0,0,0.7)",
},
previewSite: {
fontSize: 14,
fontWeight: 600,
color: "rgba(0,0,0,0.7)",
paddingTop: 4,
},
tagSheetGrid: {
display: "grid",
gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
gap: 16,
},
tagCard: {
border: "1.5px solid rgba(0,0,0,0.85)",
borderRadius: 18,
background: "#fff",
aspectRatio: "1.9 / 1",
overflow: "hidden",
},
tagInner: {
height: "100%",
padding: "12px 12px 10px 12px",
display: "flex",
flexDirection: "column",
},
tagBrand: {
fontSize: 12,
lineHeight: 1,
fontWeight: 800,
letterSpacing: "0.12em",
marginBottom: 10,
},
tagMiddle: {
display: "grid",
gridTemplateColumns: "minmax(0, 1fr) 96px",
gap: 12,
flex: 1,
minHeight: 0,
},
tagTextColumn: {
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
minWidth: 0,
},
tagNameWrap: {
flex: 1,
},
tagName: {
fontSize: 28,
lineHeight: 1.02,
fontWeight: 800,
wordBreak: "break-word",
},
tagPrice: {
fontSize: 22,
lineHeight: 1,
fontWeight: 900,
marginBottom: 6,
minHeight: 22,
},
tagFooter: {
fontSize: 10,
lineHeight: 1.15,
color: "rgba(0,0,0,0.75)",
},
qrColumn: {
display: "flex",
flexDirection: "column",
justifyContent: "flex-end",
alignItems: "center",
},
qrBox: {
width: 96,
height: 96,
border: "1.5px solid rgba(0,0,0,0.80)",
borderRadius: 14,
display: "flex",
alignItems: "center",
justifyContent: "center",
background: "#fff",
overflow: "hidden",
padding: 6,
},
qrPlaceholder: {
fontSize: 16,
fontWeight: 700,
color: "rgba(0,0,0,0.5)",
},
scanText: {
marginTop: 6,
fontSize: 11,
lineHeight: 1,
fontWeight: 700,
textAlign: "center",
},
};