"use client";

import { useMemo, useState } from "react";

const BASE = "http://localhost:3000";

type TagPreview = {
title: string;
subtitle?: string;
url: string;
note?: string;
};

export default function Home() {
const [itemName, setItemName] = useState("");
const [itemId, setItemId] = useState("");
const [price, setPrice] = useState("");
const [currency, setCurrency] = useState("USD");
const [imageUrl, setImageUrl] = useState("");
const [landing, setLanding] = useState("/request");
const [createdBy, setCreatedBy] = useState("designanyspace.com");
const [showPrice, setShowPrice] = useState(true);

const fullUrl = useMemo(() => {
const params = new URLSearchParams();
if (itemName.trim()) params.set("name", itemName.trim());
if (itemId.trim()) params.set("id", itemId.trim());
if (price.trim()) params.set("price", price.trim());
if (currency.trim()) params.set("cur", currency.trim());
if (imageUrl.trim()) params.set("img", imageUrl.trim());

const path = landing.startsWith("/") ? landing : `/${landing}`;
const qs = params.toString();
return `${BASE}${path}${qs ? `?${qs}` : ""}`;
}, [itemName, itemId, price, currency, imageUrl, landing]);

const preview: TagPreview = useMemo(() => {
const title = itemName.trim() || "Item Name";
const subtitle = showPrice && price.trim() ? `${currency} ${price.trim()}` : undefined;
return {
title,
subtitle,
url: fullUrl,
note: `created by: ${createdBy}`,
};
}, [itemName, price, currency, fullUrl, createdBy, showPrice]);

return (
<main style={{ fontFamily: "system-ui", padding: 28, maxWidth: 980, margin: "0 auto" }}>
<h1 style={{ fontSize: 34, marginBottom: 6 }}>Design Any Space — Tag Generator</h1>
<p style={{ opacity: 0.75, marginTop: 0 }}>
Fill this out → copy the link → turn it into a QR code (we’ll do the QR step next).
</p>

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 18 }}>
<section style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14, padding: 18 }}>
<h2 style={{ fontSize: 18, marginTop: 0 }}>Tag Details</h2>

<Field label="Item name" value={itemName} onChange={setItemName} placeholder="e.g., Vintage Bistro Chair" />
<Field label="Item ID (optional)" value={itemId} onChange={setItemId} placeholder="e.g., MV-CHAIR-12" />

<div style={{ display: "grid", gridTemplateColumns: "1fr 110px", gap: 10 }}>
<Field label="Price" value={price} onChange={setPrice} placeholder="e.g., 95" />
<div>
<label style={labelStyle}>Currency</label>
<select
value={currency}
onChange={(e) => setCurrency(e.target.value)}
style={inputStyle}
>
<option value="USD">USD</option>
<option value="CAD">CAD</option>
<option value="EUR">EUR</option>
<option value="GBP">GBP</option>
</select>
</div>
</div>

<div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
<input
id="showPrice"
type="checkbox"
checked={showPrice}
onChange={(e) => setShowPrice(e.target.checked)}
/>
<label htmlFor="showPrice" style={{ userSelect: "none" }}>
Show price on tag preview (optional)
</label>
</div>

<Field
label="Image URL (optional)"
value={imageUrl}
onChange={setImageUrl}
placeholder="Paste an image URL if you have one"
/>

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
<Field
label="Landing page path"
value={landing}
onChange={setLanding}
placeholder="/request"
/>
<Field
label="Created by (small text)"
value={createdBy}
onChange={setCreatedBy}
placeholder="designanyspace.com"
/>
</div>

<div style={{ marginTop: 14 }}>
<label style={labelStyle}>Your link (copy this)</label>
<div style={{ display: "flex", gap: 8 }}>
<input value={fullUrl} readOnly style={{ ...inputStyle, flex: 1 }} />
<button
onClick={async () => {
await navigator.clipboard.writeText(fullUrl);
alert("Copied!");
}}
style={btnStyle}
>
Copy
</button>
</div>
</div>
</section>

<section style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14, padding: 18 }}>
<h2 style={{ fontSize: 18, marginTop: 0 }}>Tag Preview (simple)</h2>

<div
style={{
border: "1px dashed rgba(0,0,0,0.25)",
borderRadius: 18,
padding: 18,
minHeight: 260,
display: "grid",
gap: 10,
}}
>
<div style={{ fontSize: 22, fontWeight: 700 }}>{preview.title}</div>
{preview.subtitle ? <div style={{ fontSize: 16, fontWeight: 600 }}>{preview.subtitle}</div> : null}

<div style={{ marginTop: 6, fontSize: 13, opacity: 0.75, wordBreak: "break-all" }}>
{preview.url}
</div>

<div style={{ marginTop: "auto", fontSize: 12, opacity: 0.7 }}>
{preview.note}
</div>
</div>

<p style={{ marginTop: 14, opacity: 0.75 }}>
Next: we’ll build the <b>/request</b> page so when someone scans the QR, it opens your form.
</p>
</section>
</div>
</main>
);
}

function Field({
label,
value,
onChange,
placeholder,
}: {
label: string;
value: string;
onChange: (v: string) => void;
placeholder?: string;
}) {
return (
<div style={{ marginTop: 10 }}>
<label style={labelStyle}>{label}</label>
<input
value={value}
onChange={(e) => onChange(e.target.value)}
placeholder={placeholder}
style={inputStyle}
/>
</div>
);
}

const labelStyle: React.CSSProperties = {
display: "block",
fontSize: 13,
opacity: 0.8,
marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
width: "100%",
padding: "10px 12px",
borderRadius: 10,
border: "1px solid rgba(0,0,0,0.18)",
outline: "none",
};

const btnStyle: React.CSSProperties = {
padding: "10px 14px",
borderRadius: 10,
border: "1px solid rgba(0,0,0,0.18)",
background: "black",
color: "white",
cursor: "pointer",
};