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
borderRadius: 14,
padding: 12,
boxSizing: "border-box",
display: "grid",
gridTemplateColumns: "1fr 86px",
gap: 10,
position: "relative",
background: "#fff",
}}
>
<div>
<div
style={{
fontSize: 10,
letterSpacing: "0.08em",
textTransform: "uppercase",
fontWeight: 700,
}}
>
{storeName || "Design Any Space"}
</div>

<div
style={{
marginTop: 6,
fontSize: 16,
fontWeight: 900,
lineHeight: 1.1,
minHeight: 34,
wordBreak: "break-word",
}}
>
{item.productName || "Item Name"}
</div>

<div
style={{
marginTop: 6,
fontSize: 22,
fontWeight: 900,
minHeight: 24,
}}
>
{item.price || "$0"}
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
width: 74,
height: 74,
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
fontSize: 8,
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
bottom: 6,
left: 10,
fontSize: 7,
}}
>
created by: designanyspace.com
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
gap: "0.25in",
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
padding: 40,
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
margin: 0.5in;
}
}
`}</style>

<div style={{ maxWidth: 1320, margin: "0 auto" }}>
<div className="controls" style={{ marginBottom: 22 }}>
<div
style={{
display: "inline-block",
padding: "8px 12px",
borderRadius: 999,
background: "#fff",
border: "1px solid #e5e5e5",
fontSize: 12,
fontWeight: 700,
marginBottom: 14,
}}
>
Design Any Space Tool
</div>

<h1
style={{
margin: 0,
fontSize: 48,
lineHeight: 1.05,
}}
>
QR Product Tag Generator
</h1>

<p
style={{
color: "#555",
fontSize: 20,
marginTop: 14,
marginBottom: 0,
maxWidth: 900,
lineHeight: 1.4,
}}
>
Create printable QR product tags for markets, pop-ups, vintage
booths, and in-store displays.
</p>
</div>

<div
className="controls"
style={{
display: "grid",
gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
gap: 14,
marginBottom: 22,
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
and boutique product displays.
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
gridTemplateColumns: "460px 1fr",
gap: 30,
alignItems: "start",
}}
>
<section
className="controls"
style={{
background: "#fff",
padding: 24,
borderRadius: 18,
border: "1px solid #e5e5e5",
}}
>
<h2 style={{ marginTop: 0, marginBottom: 18 }}>Tag Details</h2>

<div style={{ marginBottom: 20 }}>
<label>
Shop name
<input
value={storeName}
onChange={(e) => setStoreName(e.target.value)}
style={inputStyle}
/>
</label>
</div>

<div style={{ display: "grid", gap: 18 }}>
{tags.map((tag, index) => (
<div
key={index}
style={{
border: "1px solid #e5e5e5",
borderRadius: 12,
padding: 14,
background: "#fafafa",
}}
>
<div style={{ fontWeight: 700, marginBottom: 10 }}>
Tag {index + 1}
</div>

<label style={{ display: "block", marginBottom: 10 }}>
Product name
<input
value={tag.productName}
onChange={(e) =>
updateTag(index, "productName", e.target.value)
}
style={inputStyle}
/>
</label>

<label style={{ display: "block", marginBottom: 10 }}>
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
marginTop: 20,
display: "flex",
gap: 10,
flexWrap: "wrap",
}}
>
<button onClick={printTags} style={buttonStyle}>
Print Tags
</button>

<button
onClick={printTags}
style={{ ...buttonStyle, background: "#444" }}
>
Download PDF
</button>

<button onClick={resetForm} style={resetButton}>
Reset
</button>
</div>

<div
style={{
marginTop: 18,
padding: 14,
borderRadius: 12,
background: "#f8f8f8",
border: "1px solid #ececec",
}}
>
<div style={{ fontWeight: 700, marginBottom: 6 }}>
Want more than one sheet?
</div>
<div style={{ fontSize: 14, color: "#555", lineHeight: 1.5 }}>
This version is perfect for quick mixed-product print runs. A
future Pro version can support larger bulk exports and more
advanced vendor workflows.
</div>
</div>
</section>

<section
style={{
background: "#fff",
padding: 24,
borderRadius: 18,
border: "1px solid #e5e5e5",
}}
>
<div
className="controls"
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "end",
gap: 16,
marginBottom: 16,
flexWrap: "wrap",
}}
>
<div>
<h2 style={{ marginTop: 0, marginBottom: 8 }}>
Mixed Tag Sheet Preview
</h2>
<p
style={{
margin: 0,
color: "#666",
fontSize: 15,
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
fontSize: 14,
}}
>
Visit DesignAnySpace.com
</a>
</div>

<PrintableSheet storeName={storeName} tags={tags} />

<div
className="controls"
style={{
marginTop: 20,
padding: 16,
borderRadius: 14,
background: "#fafafa",
border: "1px solid #ececec",
}}
>
<div style={{ fontWeight: 700, marginBottom: 6 }}>
Design Any Space Pro
</div>
<div style={{ fontSize: 14, color: "#555", lineHeight: 1.5 }}>
Coming soon: larger batch exports, more sheets, cleaner bulk
workflows, and additional vendor tools.
</div>
</div>
</section>
</div>
</div>
</main>
);
}

const inputStyle: React.CSSProperties = {
width: "100%",
padding: 12,
borderRadius: 10,
border: "1px solid #ddd",
marginTop: 6,
boxSizing: "border-box",
background: "#fff",
};

const buttonStyle: React.CSSProperties = {
padding: "12px 18px",
borderRadius: 999,
border: "none",
background: "#111",
color: "#fff",
fontWeight: 700,
cursor: "pointer",
};

const resetButton: React.CSSProperties = {
padding: "12px 18px",
borderRadius: 999,
border: "1px solid #ddd",
background: "#fff",
fontWeight: 700,
cursor: "pointer",
};

const infoCardStyle: React.CSSProperties = {
background: "#fff",
border: "1px solid #e5e5e5",
borderRadius: 14,
padding: 16,
};

const infoTitleStyle: React.CSSProperties = {
fontSize: 13,
fontWeight: 700,
textTransform: "uppercase",
letterSpacing: "0.05em",
marginBottom: 8,
};

const infoTextStyle: React.CSSProperties = {
fontSize: 14,
color: "#555",
lineHeight: 1.5,
};