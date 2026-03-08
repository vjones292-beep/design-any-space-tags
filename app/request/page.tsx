"use client";

import { useMemo, useState } from "react";

type ProductTag = {
productName: string;
price: string;
checkoutLink: string;
};

const EMPTY_TAG: ProductTag = {
productName: "",
price: "",
checkoutLink: "",
};

const makeEmptyTags = () =>
Array.from({ length: 6 }, () => ({ ...EMPTY_TAG }));

function buildQrUrl(link: string) {
if (!link) return "";
return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
link
)}`;
}

function TagCard({
storeName,
item,
}: {
storeName: string;
item: ProductTag;
}) {
const qr = buildQrUrl(item.checkoutLink);

return (
<div
style={{
width: "3.5in",
height: "2in",
border: "1.5px solid #111",
borderRadius: 12,
padding: 10,
boxSizing: "border-box",
display: "grid",
gridTemplateColumns: "1fr 80px",
gap: 8,
position: "relative",
background: "#fff",
}}
>
<div>
<div
style={{
fontSize: 9,
letterSpacing: "0.08em",
textTransform: "uppercase",
fontWeight: 700,
}}
>
{storeName || "Design Any Space"}
</div>

<div
style={{
marginTop: 5,
fontSize: 15,
fontWeight: 900,
lineHeight: 1.1,
minHeight: 30,
wordBreak: "break-word",
}}
>
{item.productName}
</div>

<div
style={{
marginTop: 5,
fontSize: 20,
fontWeight: 900,
minHeight: 22,
}}
>
{item.price}
</div>
</div>

<div
style={{
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "flex-end",
}}
>
<div
style={{
width: 68,
height: 68,
border: "1px solid rgba(0,0,0,0.2)",
borderRadius: 8,
overflow: "hidden",
display: "flex",
alignItems: "center",
justifyContent: "center",
background: "#fff",
}}
>
{qr ? (
<img
src={qr}
alt="QR Code"
style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
) : (
<span style={{ fontSize: 8, opacity: 0.55 }}>QR</span>
)}
</div>

<div
style={{
fontSize: 7,
marginTop: 4,
fontWeight: 700,
textAlign: "center",
}}
>
Scan to Buy
</div>
</div>

<div
style={{
position: "absolute",
bottom: 5,
left: 9,
fontSize: 6,
}}
>
QR Tag Tool by DesignAnySpace.com
</div>
</div>
);
}

function PrintableSheet({
storeName,
tags,
}: {
storeName: string;
tags: ProductTag[];
}) {
return (
<div
id="print-sheet"
style={{
display: "grid",
gridTemplateColumns: "repeat(2, 3.5in)",
gap: "0.22in",
justifyContent: "center",
}}
>
{tags.map((item, i) => (
<TagCard key={i} storeName={storeName} item={item} />
))}
</div>
);
}

export default function Page() {
const [storeName, setStoreName] = useState("Design Any Space");
const [tags, setTags] = useState<ProductTag[]>(makeEmptyTags());

function updateTag(index: number, key: keyof ProductTag, value: string) {
setTags((prev) =>
prev.map((tag, i) => (i === index ? { ...tag, [key]: value } : tag))
);
}

function resetForm() {
setStoreName("Design Any Space");
setTags(makeEmptyTags());
}

function printTags() {
window.print();
}

const filledCount = useMemo(
() =>
tags.filter(
(tag) => tag.productName || tag.price || tag.checkoutLink
).length,
[tags]
);

return (
<main
style={{
minHeight: "100vh",
background: "#f6f6f6",
padding: 22,
fontFamily: "Arial, sans-serif",
}}
>
<style jsx global>{`
@media print {
.controls {
display: none !important;
}

body {
background: white !important;
}

@page {
size: letter;
margin: 0.45in;
}
}
`}</style>

<div style={{ maxWidth: 1250, margin: "0 auto" }}>
<div className="controls" style={{ marginBottom: 14 }}>
<div
style={{
display: "inline-block",
padding: "6px 10px",
borderRadius: 999,
background: "#fff",
border: "1px solid #e5e5e5",
fontSize: 10,
fontWeight: 700,
marginBottom: 10,
}}
>
Design Any Space Tool
</div>

<h1
style={{
margin: 0,
fontSize: 24,
lineHeight: 1.1,
}}
>
QR Product Tag Generator
</h1>

<p
style={{
color: "#555",
fontSize: 14,
marginTop: 8,
marginBottom: 0,
maxWidth: 760,
lineHeight: 1.35,
}}
>
Create printable QR product tags for markets, pop-ups, vintage
booths, and retail displays.
</p>
</div>

<div
className="controls"
style={{
display: "grid",
gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
gap: 10,
marginBottom: 14,
}}
>
<div style={infoCardStyle}>
<div style={infoTitleStyle}>How it works</div>
<div style={infoTextStyle}>
Add up to 6 products, paste each checkout link, then print one
mixed tag sheet.
</div>
</div>

<div style={infoCardStyle}>
<div style={infoTitleStyle}>Best for</div>
<div style={infoTextStyle}>
Markets, vendor booths, antique shops, pop-ups, furniture pieces,
and boutique displays.
</div>
</div>

<div style={infoCardStyle}>
<div style={infoTitleStyle}>Filled tags</div>
<div style={{ ...infoTextStyle, fontWeight: 700 }}>
{filledCount} of 6 ready
</div>
</div>
</div>

<div
style={{
display: "grid",
gridTemplateColumns: "400px 1fr",
gap: 20,
alignItems: "start",
}}
>
<section
className="controls"
style={{
background: "#fff",
padding: 16,
borderRadius: 16,
border: "1px solid #e5e5e5",
}}
>
<h2 style={{ marginTop: 0, marginBottom: 14, fontSize: 18 }}>
Tag Details
</h2>

<div style={{ marginBottom: 14 }}>
<label>
Shop name
<input
value={storeName}
onChange={(e) => setStoreName(e.target.value)}
style={inputStyle}
/>
</label>
</div>

<div style={{ display: "grid", gap: 12 }}>
{tags.map((tag, index) => (
<div
key={index}
style={{
border: "1px solid #e5e5e5",
borderRadius: 10,
padding: 10,
background: "#fafafa",
}}
>
<div
style={{
fontWeight: 700,
marginBottom: 8,
fontSize: 14,
}}
>
Tag {index + 1}
</div>

<label style={{ display: "block", marginBottom: 8 }}>
Product name
<input
value={tag.productName}
onChange={(e) =>
updateTag(index, "productName", e.target.value)
}
style={inputStyle}
/>
</label>

<label style={{ display: "block", marginBottom: 8 }}>
Price
<input
value={tag.price}
onChange={(e) => updateTag(index, "price", e.target.value)}
style={inputStyle}
/>
</label>

<label style={{ display: "block" }}>
Checkout link
<input
value={tag.checkoutLink}
onChange={(e) =>
updateTag(index, "checkoutLink", e.target.value)
}
style={inputStyle}
/>
</label>
</div>
))}
</div>

<div
style={{
marginTop: 14,
display: "flex",
gap: 8,
flexWrap: "wrap",
}}
>
<button onClick={printTags} style={buttonStyle}>
Print Tag Sheet
</button>

<button
onClick={printTags}
style={{ ...buttonStyle, background: "#444" }}
>
Download Tag PDF
</button>

<button onClick={resetForm} style={resetButton}>
Reset Tags
</button>
</div>
</section>

<section
style={{
background: "#fff",
padding: 16,
borderRadius: 16,
border: "1px solid #e5e5e5",
}}
>
<div
className="controls"
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "end",
gap: 12,
marginBottom: 12,
flexWrap: "wrap",
}}
>
<div>
<h2 style={{ marginTop: 0, marginBottom: 5, fontSize: 18 }}>
Mixed Tag Sheet Preview
</h2>
<p
style={{
margin: 0,
color: "#666",
fontSize: 13,
}}
>
One printable sheet with up to 6 different product tags.
</p>
</div>

<a
href="https://designanyspace.com"
target="_blank"
rel="noreferrer"
style={{
textDecoration: "none",
color: "#111",
fontWeight: 700,
fontSize: 13,
}}
>
Visit DesignAnySpace.com
</a>
</div>

<PrintableSheet storeName={storeName} tags={tags} />
</section>
</div>
</div>
</main>
);
}

const inputStyle: React.CSSProperties = {
width: "100%",
padding: 9,
borderRadius: 10,
border: "1px solid #ddd",
marginTop: 6,
boxSizing: "border-box",
background: "#fff",
fontSize: 13,
};

const buttonStyle: React.CSSProperties = {
padding: "10px 14px",
borderRadius: 999,
border: "none",
background: "#111",
color: "#fff",
fontWeight: 700,
cursor: "pointer",
fontSize: 13,
};

const resetButton: React.CSSProperties = {
padding: "10px 14px",
borderRadius: 999,
border: "1px solid #ddd",
background: "#fff",
fontWeight: 700,
cursor: "pointer",
fontSize: 13,
};

const infoCardStyle: React.CSSProperties = {
background: "#fff",
border: "1px solid #e5e5e5",
borderRadius: 12,
padding: 12,
};

const infoTitleStyle: React.CSSProperties = {
fontSize: 11,
fontWeight: 700,
textTransform: "uppercase",
letterSpacing: "0.05em",
marginBottom: 6,
};

const infoTextStyle: React.CSSProperties = {
fontSize: 13,
color: "#555",
lineHeight: 1.4,
};