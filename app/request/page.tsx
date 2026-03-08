"use client";

import { useState } from "react";

export default function RequestPage() {
const [store, setStore] = useState("Design Any Space");
const [product, setProduct] = useState("");
const [price, setPrice] = useState("");
const [link, setLink] = useState("");

const qr = link
? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
link
)}`
: "";

return (
<main style={{ padding: 40, fontFamily: "Arial" }}>
<h1>Design Any Space — QR Tag Generator</h1>

<div style={{ display: "flex", gap: 40 }}>
<div style={{ width: 400 }}>
<h3>Tag Details</h3>

<input
placeholder="Shop name"
value={store}
onChange={(e) => setStore(e.target.value)}
style={{ width: "100%", marginBottom: 10 }}
/>

<input
placeholder="Product name"
value={product}
onChange={(e) => setProduct(e.target.value)}
style={{ width: "100%", marginBottom: 10 }}
/>

<input
placeholder="Price"
value={price}
onChange={(e) => setPrice(e.target.value)}
style={{ width: "100%", marginBottom: 10 }}
/>

<input
placeholder="Stripe checkout link"
value={link}
onChange={(e) => setLink(e.target.value)}
style={{ width: "100%", marginBottom: 10 }}
/>
</div>

<div>
<h3>Tag Preview</h3>

<div
style={{
width: 300,
border: "1px solid #ddd",
padding: 20,
borderRadius: 10,
}}
>
<div style={{ fontSize: 12 }}>{store}</div>
<h2>{product || "Item Name"}</h2>
<h3>{price}</h3>

{qr && (
<img
src={qr}
alt="QR"
style={{ width: 120, marginTop: 10 }}
/>
)}

<div style={{ fontSize: 10, marginTop: 10 }}>
created by: designanyspace.com
</div>
</div>
</div>
</div>
</main>
);
}