"use client";

import { useMemo, useState } from "react";
import QRCode from "react-qr-code";

type TagItem = {
id: number;
productName: string;
price: string;
checkoutLink: string;
};

const patterns = [
"/patterns/navy-botanical.jpg",
"/patterns/sage-regency.jpg",
"/patterns/cottage-wildflower.jpg",
"/patterns/dandelion-meadow.jpg",
"/patterns/chevron-wood.jpg",
"/patterns/antique-ledger.jpg",
"/patterns/linen-natural.jpg",
"/patterns/carrara-marble.jpg",
];

const patternNames = [
"Navy Botanical",
"Sage Regency",
"Cottage Wildflower",
"Dandelion Meadow",
"Chevron Wood",
"Antique Ledger",
"Linen Natural",
"Carrara Marble",
];

export default function PremiumQrTagGenerator() {
const [businessName, setBusinessName] = useState("BUSINESS NAME");
const [selectedPattern, setSelectedPattern] = useState(0);

const [tags, setTags] = useState<TagItem[]>(
Array.from({ length: 6 }, (_, i) => ({
id: i + 1,
productName: "Product Name",
price: "0.00",
checkoutLink: "",
}))
);

const safeBusinessName = useMemo(
() => (businessName.trim() ? businessName : "BUSINESS NAME"),
[businessName]
);

const updateTag = (id: number, field: keyof TagItem, value: string) => {
setTags((prev) =>
prev.map((tag) => (tag.id === id ? { ...tag, [field]: value } : tag))
);
};

const clearAll = () => {
setBusinessName("");
setTags(
Array.from({ length: 6 }, (_, i) => ({
id: i + 1,
productName: "",
price: "",
checkoutLink: "",
}))
);
};

return (
<div style={styles.page}>
<div style={styles.headerWrap}>
<div style={styles.brand}>DESIGN ANY SPACE</div>
<h1 style={styles.title}>QR Tag Generator</h1>
<p style={styles.subtitle}>
Create a clean printable tag sheet with 6 QR checkout tags per page.
</p>
</div>

<div style={styles.mainGrid}>
<div style={styles.leftPanel}>
<div style={styles.card}>
<label style={styles.label}>Business Name</label>
<input
value={businessName}
onChange={(e) => setBusinessName(e.target.value)}
placeholder="Business name"
style={styles.input}
/>
</div>

<div style={styles.card}>
<div style={styles.sectionHeader}>
<h2 style={styles.sectionTitle}>Choose Background</h2>
</div>

<div style={styles.patternGrid}>
{patterns.map((pattern, index) => (
<button
key={pattern}
type="button"
onClick={() => setSelectedPattern(index)}
style={{
...styles.patternButton,
...(selectedPattern === index ? styles.patternButtonActive : {}),
}}
>
<div
style={{
...styles.patternThumb,
backgroundImage: `url(${pattern})`,
}}
/>
<div style={styles.patternName}>{patternNames[index]}</div>
</button>
))}
</div>
</div>

<div style={styles.card}>
<div style={styles.sectionHeader}>
<h2 style={styles.sectionTitle}>Tag Details</h2>
<button type="button" onClick={clearAll} style={styles.clearBtn}>
Clear All
</button>
</div>

<div style={styles.tagFormList}>
{tags.map((tag) => (
<div key={tag.id} style={styles.tagFormCard}>
<div style={styles.tagFormTitle}>Tag {tag.id}</div>

<label style={styles.smallLabel}>Product Name</label>
<input
value={tag.productName}
onChange={(e) => updateTag(tag.id, "productName", e.target.value)}
placeholder="Product name"
style={styles.input}
/>

<label style={styles.smallLabel}>Price</label>
<input
value={tag.price}
onChange={(e) => updateTag(tag.id, "price", e.target.value)}
placeholder="35.00"
style={styles.input}
/>

<label style={styles.smallLabel}>Checkout Link</label>
<input
value={tag.checkoutLink}
onChange={(e) => updateTag(tag.id, "checkoutLink", e.target.value)}
placeholder="https://"
style={styles.input}
/>
</div>
))}
</div>
</div>
</div>

<div style={styles.rightPanel}>
<div style={styles.previewHeaderRow}>
<h2 style={styles.previewTitle}>Live Preview</h2>
<div style={styles.previewNote}>6 tags per printable page</div>
</div>

<div style={styles.previewGrid}>
{tags.map((tag) => (
<div
key={tag.id}
style={{
...styles.previewTag,
backgroundImage: `url(${patterns[selectedPattern]})`,
backgroundSize: "cover",
backgroundPosition: "center",
}}
>
<div style={styles.tagOverlay}>
<div style={styles.tagTop}>{safeBusinessName}</div>

<div style={styles.qrWrap}>
{tag.checkoutLink.trim() ? (
<QRCode
value={tag.checkoutLink}
size={120}
bgColor="#ffffff"
fgColor="#111111"
/>
) : (
<div style={styles.qrPlaceholder}>QR appears here</div>
)}
</div>

<div style={styles.scanText}>scan to pay</div>

<div style={styles.tagBottom}>
<div style={styles.productText}>
{tag.productName.trim() || "Product Name"}
</div>
<div style={styles.priceText}>
~{tag.price.trim() || "0.00"}
</div>
</div>
</div>
</div>
))}
</div>
</div>
</div>
</div>
);
}

const styles: Record<string, React.CSSProperties> = {
page: {
minHeight: "100vh",
background: "#f7f7f5",
padding: "32px 24px 60px",
fontFamily:
'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
color: "#111111",
},
headerWrap: {
maxWidth: "1400px",
margin: "0 auto 28px auto",
},
brand: {
fontSize: 13,
letterSpacing: "0.25em",
fontWeight: 600,
marginBottom: 10,
},
title: {
fontSize: 56,
lineHeight: 1,
margin: 0,
fontWeight: 700,
},
subtitle: {
fontSize: 18,
color: "#333333",
marginTop: 12,
marginBottom: 0,
maxWidth: 650,
},
mainGrid: {
maxWidth: "1400px",
margin: "0 auto",
display: "grid",
gridTemplateColumns: "420px 1fr",
gap: 28,
alignItems: "start",
},
leftPanel: {
display: "flex",
flexDirection: "column",
gap: 20,
},
rightPanel: {
display: "flex",
flexDirection: "column",
gap: 16,
},
card: {
background: "#ffffff",
borderRadius: 24,
padding: 22,
boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 12px 30px rgba(0,0,0,0.05)",
border: "1px solid rgba(0,0,0,0.06)",
},
label: {
display: "block",
fontSize: 15,
fontWeight: 600,
marginBottom: 10,
},
smallLabel: {
display: "block",
fontSize: 14,
fontWeight: 600,
marginBottom: 8,
marginTop: 14,
},
input: {
width: "100%",
height: 56,
borderRadius: 16,
border: "1px solid #d8d8d4",
padding: "0 18px",
fontSize: 16,
outline: "none",
background: "#ffffff",
boxSizing: "border-box",
},
sectionHeader: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: 18,
},
sectionTitle: {
fontSize: 20,
margin: 0,
fontWeight: 700,
},
clearBtn: {
border: "1px solid #d5d5d0",
background: "#ffffff",
borderRadius: 999,
padding: "10px 16px",
fontSize: 15,
fontWeight: 600,
cursor: "pointer",
},
patternGrid: {
display: "grid",
gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
gap: 12,
},
patternButton: {
border: "1px solid #d8d8d4",
background: "#ffffff",
borderRadius: 18,
padding: 8,
textAlign: "left",
cursor: "pointer",
},
patternButtonActive: {
border: "2px solid #111111",
},
patternThumb: {
width: "100%",
aspectRatio: "1 / 1",
borderRadius: 12,
backgroundSize: "cover",
backgroundPosition: "center",
backgroundColor: "#ecebe7",
},
patternName: {
fontSize: 13,
fontWeight: 600,
marginTop: 8,
lineHeight: 1.25,
},
tagFormList: {
display: "flex",
flexDirection: "column",
gap: 18,
maxHeight: "900px",
overflowY: "auto",
paddingRight: 4,
},
tagFormCard: {
border: "1px solid #ecebe7",
borderRadius: 20,
padding: 18,
background: "#fcfcfb",
},
tagFormTitle: {
fontSize: 18,
fontWeight: 700,
marginBottom: 8,
},
previewHeaderRow: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
},
previewTitle: {
fontSize: 22,
fontWeight: 700,
margin: 0,
},
previewNote: {
fontSize: 15,
color: "#444444",
fontWeight: 600,
},
previewGrid: {
display: "grid",
gridTemplateColumns: "repeat(2, minmax(260px, 1fr))",
gap: 20,
},
previewTag: {
borderRadius: 28,
border: "2px solid #1c1c1c",
minHeight: 350,
overflow: "hidden",
boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
backgroundColor: "#ffffff",
},
tagOverlay: {
minHeight: 350,
background: "rgba(255,255,255,0.12)",
backdropFilter: "blur(0px)",
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
},
tagTop: {
fontSize: 15,
fontWeight: 700,
letterSpacing: "0.12em",
padding: "14px 18px",
borderBottom: "2px solid #1c1c1c",
background: "rgba(255,255,255,0.78)",
},
qrWrap: {
width: 170,
height: 170,
margin: "26px auto 10px auto",
background: "#ffffff",
borderRadius: 18,
display: "flex",
alignItems: "center",
justifyContent: "center",
border: "2px dashed rgba(0,0,0,0.2)",
boxSizing: "border-box",
padding: 14,
},
qrPlaceholder: {
fontSize: 14,
color: "#555555",
fontWeight: 600,
textAlign: "center",
},
scanText: {
textAlign: "center",
fontSize: 16,
fontWeight: 700,
textTransform: "lowercase",
marginBottom: 16,
background: "rgba(255,255,255,0.74)",
width: "fit-content",
marginLeft: "auto",
marginRight: "auto",
padding: "4px 10px",
borderRadius: 999,
},
tagBottom: {
borderTop: "2px solid #1c1c1c",
background: "rgba(255,255,255,0.82)",
padding: "14px 18px 16px",
},
productText: {
fontSize: 18,
fontWeight: 700,
lineHeight: 1.2,
marginBottom: 4,
},
priceText: {
fontSize: 18,
fontWeight: 700,
lineHeight: 1.2,
},
};