use client";

import { useState } from "react";

export default function Home() {
const [shopName, setShopName] = useState("Design Any Space");
const [productName, setProductName] = useState("");
const [price, setPrice] = useState("");
const [checkoutLink, setCheckoutLink] = useState("");

return (
<main
style={{
minHeight: "100vh",
background: "#ffffff",
color: "#111111",
fontFamily: "Arial, Helvetica, sans-serif",
padding: "24px",
}}
>
<div
style={{
maxWidth: "1100px",
margin: "0 auto",
}}
>
<div
style={{
border: "1px solid #ddd",
borderRadius: "18px",
padding: "20px",
marginBottom: "20px",
}}
>
<div
style={{
display: "inline-block",
border: "1px solid #ddd",
borderRadius: "999px",
padding: "6px 12px",
fontSize: "12px",
marginBottom: "10px",
}}
>
Design Any Space
</div>

<h1
style={{
margin: 0,
fontSize: "36px",
lineHeight: 1.1,
}}
>
QR Product Tag Generator
</h1>

<p
style={{
color: "#555",
fontSize: "16px",
lineHeight: 1.5,
maxWidth: "760px",
}}
>
Create printable product tags for your items. This is the safe reset
version so we can get the app live again first.
</p>
</div>

<div
style={{
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: "20px",
}}
>
<div
style={{
border: "1px solid #ddd",
borderRadius: "18px",
padding: "20px",
}}
>
<h2 style={{ marginTop: 0 }}>Tag Details</h2>

<label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>
Shop name
</label>
<input
value={shopName}
onChange={(e) => setShopName(e.target.value)}
style={inputStyle}
/>

<label
style={{
display: "block",
marginTop: "14px",
marginBottom: "6px",
fontWeight: 600,
}}
>
Product name
</label>
<input
value={productName}
onChange={(e) => setProductName(e.target.value)}
style={inputStyle}
/>

<label
style={{
display: "block",
marginTop: "14px",
marginBottom: "6px",
fontWeight: 600,
}}
>
Price
</label>
<input
value={price}
onChange={(e) => setPrice(e.target.value)}
style={inputStyle}
/>

<label
style={{
display: "block",
marginTop: "14px",
marginBottom: "6px",
fontWeight: 600,
}}
>
Checkout link
</label>
<input
value={checkoutLink}
onChange={(e) => setCheckoutLink(e.target.value)}
style={inputStyle}
/>
</div>

<div
style={{
border: "1px solid #ddd",
borderRadius: "18px",
padding: "20px",
}}
>
<h2 style={{ marginTop: 0 }}>Preview</h2>

<div
style={{
border: "2px solid #111",
borderRadius: "18px",
padding: "14px",
minHeight: "220px",
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
}}
>
<div
style={{
fontSize: "12px",
fontWeight: 700,
letterSpacing: "0.12em",
}}
>
{(shopName || "Design Any Space").toUpperCase()}
</div>

<div>
<div
style={{
fontSize: "30px",
fontWeight: 800,
lineHeight: 1.05,
marginBottom: "12px",
}}
>
{productName || "Product Name"}
</div>

<div
style={{
fontSize: "22px",
fontWeight: 800,
marginBottom: "12px",
}}
>
{price || ""}
</div>

<div
style={{
border: "1px solid #111",
borderRadius: "12px",
width: "110px",
height: "110px",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontWeight: 700,
}}
>
QR
</div>

<div
style={{
marginTop: "8px",
fontSize: "12px",
color: "#555",
}}
>
{checkoutLink || "Checkout link will go here"}
</div>
</div>

<div
style={{
fontSize: "10px",
color: "#666",
marginTop: "12px",
}}
>
created by: designanyspace.com
</div>
</div>
</div>
</div>
</div>
</main>
);
}

const inputStyle = {
width: "100%",
height: "44px",
border: "1px solid #ccc",
borderRadius: "12px",
padding: "0 12px",
fontSize: "14px",
};