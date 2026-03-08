"use client";

import { useState } from "react";

type TagData = {
storeName: string;
productName: string;
price: string;
checkoutLink: string;
};

const EMPTY_FORM: TagData = {
storeName: "Design Any Space",
productName: "",
price: "",
checkoutLink: "",
};

function buildQrUrl(value: string) {
if (!value) return "";
return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
value
)}`;
}

function TagCard({ data }: { data: TagData }) {
const qrUrl = buildQrUrl(data.checkoutLink);

return (
<div
style={{
width: "3.5in",
height: "2in",
border: "1.5px solid #111",
borderRadius: 14,
background: "#fff",
padding: 12,
position: "relative",
display: "grid",
gridTemplateColumns: "1fr 80px",
gap: 10,
boxSizing: "border-box",
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
{data.storeName || "Design Any Space"}
</div>

<div
style={{
marginTop: 6,
fontSize: 16,
fontWeight: 900,
lineHeight: 1.1,
}}
>
{data.productName || "Item Name"}
</div>

<div
style={{
marginTop: 6,
fontSize: 22,
fontWeight: 900,
lineHeight: 1,
}}
>
{data.price || "$0"}
</div>
</div>

<div
style={{
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "flex-end",
gap: 6,
}}
>
<div
style={{
width: 70,
height: 70,
border: "1px solid rgba(0,0,0,0.2)",
borderRadius: 8,
overflow: "hidden",
display: "flex",
alignItems: "center",
justifyContent: "center",
background: "#fff",
}}
>
{qrUrl ? (
<img
src={qrUrl}
alt="QR"
style={{ width: "100%", height: "100%" }}
/>
) : (
<div style={{ fontSize: 9 }}>QR</div>
)}
</div>

<div style={{ fontSize: 8 }}>Scan</div>
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

function PrintableSheet({ data }: { data: TagData }) {
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
{Array.from({ length: 6 }).map((_, i) => (
<TagCard key={i} data={data} />
))}
</div>
);
}

export default function RequestPage() {
const [form, setForm] = useState<TagData>(EMPTY_FORM);

function updateField<K extends keyof TagData>(key: K, value: TagData[K]) {
setForm((prev) => ({ ...prev, [key]: value }));
}

function handlePrint() {
window.print();
}

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
.no-print {
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

<div style={{ maxWidth: 1200, margin: "0 auto" }}>
<div className="no-print" style={{ marginBottom: 24 }}>
<h1 style={{ marginBottom: 10 }}>Design Any Space</h1>
<p style={{ color: "#666", fontSize: 20, margin: 0 }}>
QR Tag Generator — Turn a checkout link into printable tags
</p>
</div>

<div
style={{
display: "grid",
gridTemplateColumns: "420px 1fr",
gap: 30,
}}
>
<section
className="no-print"
style={{
background: "#fff",
padding: 24,
borderRadius: 16,
border: "1px solid #e5e5e5",
}}
>
<h2 style={{ marginTop: 0 }}>Tag Details</h2>

<div style={{ display: "grid", gap: 14 }}>
<label>
Shop name
<input
value={form.storeName}
onChange={(e) => updateField("storeName", e.target.value)}
placeholder="Design Any Space"
style={inputStyle}
/>
</label>

<label>
Product name
<input
value={form.productName}
onChange={(e) => updateField("productName", e.target.value)}
placeholder="Vintage Chair"
style={inputStyle}
/>
</label>

<label>
Price
<input
value={form.price}
onChange={(e) => updateField("price", e.target.value)}
placeholder="$27"
style={inputStyle}
/>
</label>

<label>
Checkout link
<input
value={form.checkoutLink}
onChange={(e) => updateField("checkoutLink", e.target.value)}
placeholder="https://buy.stripe.com/..."
style={inputStyle}
/>
</label>
</div>

<div
style={{
marginTop: 20,
display: "flex",
gap: 10,
flexWrap: "wrap",
}}
>
<button onClick={handlePrint} style={buttonStyle}>
Print Tags
</button>

<button
onClick={() => window.print()}
style={{ ...buttonStyle, background: "#444" }}
>
Download PDF
</button>

<button
onClick={() => setForm(EMPTY_FORM)}
style={{
...buttonStyle,
background: "#fff",
color: "#111",
border: "1px solid #ddd",
}}
>
Reset
</button>
</div>
</section>

<section
style={{
background: "#fff",
padding: 24,
borderRadius: 16,
border: "1px solid #e5e5e5",
}}
>
<h2 className="no-print" style={{ marginTop: 0 }}>
Tag Sheet Preview
</h2>
<PrintableSheet data={form} />
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