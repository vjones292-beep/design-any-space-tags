"use client";

import React, { useMemo, useState } from "react";

const PATTERN_OPTIONS = [
"/patterns/cottage-pattern.jpg",
"/patterns/dandelion-pattern.jpg",
"/patterns/linen-pattern.jpg",
"/patterns/marble-pattern.jpg",
"/patterns/navy-pattern.jpg",
"/patterns/paper-pattern.jpg",
"/patterns/sage-pattern.jpg",
"/patterns/wood-pattern.jpg",
];

function buildQrUrl(value: string) {
if (!value.trim()) return "";
return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
value
)}`;
}

function formatPrice(price: string) {
const trimmed = price.trim();
if (!trimmed) return "";
return trimmed.startsWith("$") ? trimmed : `$${trimmed}`;
}

function getPatternTone(pattern: string) {
if (
pattern.includes("navy-pattern") ||
pattern.includes("wood-pattern") ||
pattern.includes("sage-pattern")
) {
return "dark";
}
return "light";
}

type TagCardProps = {
businessName: string;
productName: string;
price: string;
checkoutLink: string;
pattern: string;
};

function TagCard({
businessName,
productName,
price,
checkoutLink,
pattern,
}: TagCardProps) {
const qrUrl = useMemo(() => buildQrUrl(checkoutLink), [checkoutLink]);
const displayPrice = formatPrice(price);
const tone = getPatternTone(pattern);

return (
<div className={`tag-card ${tone === "dark" ? "dark-pattern" : "light-pattern"}`}>
<div
className="tag-pattern"
style={{
backgroundImage: `url("${pattern}")`,
}}
/>

<div className="tag-overlay">
<div className="tag-top">
<div className="business-name-text">
{businessName.trim() || "DESIGN ANY SPACE"}
</div>
</div>

<div className="tag-middle">
{qrUrl ? (
<img
src={qrUrl}
alt="QR Code"
className="qr-image"
crossOrigin="anonymous"
/>
) : (
<div className="qr-placeholder">QR</div>
)}

<div className="scan-text">SCAN TO PAY</div>
</div>

<div className="tag-bottom">
<div className="product-name-text">
{productName.trim() || "product name"}
</div>
<div className="price-text">{displayPrice || "$0"}</div>
</div>
</div>
</div>
);
}

export default function GeneratorPage() {
const [businessName, setBusinessName] = useState("");
const [productName, setProductName] = useState("");
const [price, setPrice] = useState("");
const [checkoutLink, setCheckoutLink] = useState("");
const [selectedPattern, setSelectedPattern] = useState(PATTERN_OPTIONS[0]);

const handlePrint = () => {
window.print();
};

return (
<>
<div className="page-wrap no-print">
<div className="header-block">
<h1 className="page-title">Design Any Space QR Tag Generator</h1>
<p className="page-subtitle">
Create clean patterned QR tags and print 6 per page.
</p>
</div>

<div className="main-grid">
<div className="form-panel">
<h2 className="panel-title">Tag Details</h2>

<label className="field-label">Business Name</label>
<input
className="text-input"
value={businessName}
onChange={(e) => setBusinessName(e.target.value)}
placeholder=""
/>

<label className="field-label">Product Name</label>
<input
className="text-input"
value={productName}
onChange={(e) => setProductName(e.target.value)}
placeholder=""
/>

<label className="field-label">Price</label>
<input
className="text-input"
value={price}
onChange={(e) => setPrice(e.target.value)}
placeholder=""
/>

<label className="field-label">Checkout Link</label>
<input
className="text-input"
value={checkoutLink}
onChange={(e) => setCheckoutLink(e.target.value)}
placeholder=""
/>

<label className="field-label">Pattern</label>
<select
className="text-input"
value={selectedPattern}
onChange={(e) => setSelectedPattern(e.target.value)}
>
{PATTERN_OPTIONS.map((patternPath, index) => (
<option key={patternPath} value={patternPath}>
Pattern {index + 1}
</option>
))}
</select>

<div className="pattern-preview-row">
{PATTERN_OPTIONS.map((patternPath, index) => (
<button
key={patternPath}
type="button"
className={`pattern-thumb-button ${
selectedPattern === patternPath ? "active-thumb" : ""
}`}
onClick={() => setSelectedPattern(patternPath)}
aria-label={`Choose pattern ${index + 1}`}
>
<div
className="pattern-thumb"
style={{ backgroundImage: `url("${patternPath}")` }}
/>
</button>
))}
</div>

<button className="print-button" onClick={handlePrint}>
Print / Save PDF
</button>
</div>

<div className="preview-panel">
<h2 className="panel-title">6 Tag Preview</h2>

<div className="screen-sheet">
{Array.from({ length: 6 }).map((_, index) => (
<div className="screen-tag-wrap" key={index}>
<TagCard
businessName={businessName}
productName={productName}
price={price}
checkoutLink={checkoutLink}
pattern={selectedPattern}
/>
</div>
))}
</div>
</div>
</div>
</div>

<div className="print-sheet">
{Array.from({ length: 6 }).map((_, index) => (
<div className="print-tag-wrap" key={index}>
<TagCard
businessName={businessName}
productName={productName}
price={price}
checkoutLink={checkoutLink}
pattern={selectedPattern}
/>
</div>
))}
</div>

<style jsx global>{`
* {
box-sizing: border-box;
}

html,
body {
margin: 0;
padding: 0;
font-family: Arial, Helvetica, sans-serif;
background: #f6f6f4;
color: #111;
}

button,
input,
select {
font: inherit;
}

.page-wrap {
max-width: 1400px;
margin: 0 auto;
padding: 28px 20px 40px;
}

.header-block {
margin-bottom: 22px;
}

.page-title {
margin: 0 0 6px;
font-size: 34px;
line-height: 1.1;
font-weight: 700;
}

.page-subtitle {
margin: 0;
color: #666;
font-size: 15px;
}

.main-grid {
display: grid;
grid-template-columns: 360px 1fr;
gap: 24px;
align-items: start;
}

.form-panel,
.preview-panel {
background: #ffffff;
border-radius: 22px;
padding: 20px;
box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.panel-title {
margin: 0 0 18px;
font-size: 20px;
font-weight: 700;
}

.field-label {
display: block;
margin: 14px 0 8px;
font-size: 14px;
font-weight: 600;
}

.text-input {
width: 100%;
min-height: 48px;
border: 1px solid #d6d6d1;
border-radius: 14px;
padding: 12px 14px;
background: transparent;
outline: none;
box-shadow: none;
}

.text-input:focus {
border-color: #111;
}

.pattern-preview-row {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 10px;
margin-top: 14px;
}

.pattern-thumb-button {
border: 2px solid transparent;
background: transparent;
padding: 0;
border-radius: 14px;
overflow: hidden;
cursor: pointer;
}

.active-thumb {
border-color: #111;
}

.pattern-thumb {
width: 100%;
aspect-ratio: 1 / 1;
border-radius: 12px;
background-repeat: no-repeat;
background-position: center;
background-size: cover;
}

.print-button {
width: 100%;
margin-top: 18px;
min-height: 50px;
border: none;
border-radius: 14px;
background: #111;
color: #fff;
font-weight: 700;
cursor: pointer;
}

.screen-sheet {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 18px;
justify-items: center;
align-items: start;
min-height: 840px;
padding: 10px;
background: linear-gradient(180deg, #fafaf8 0%, #f1f1ec 100%);
border-radius: 18px;
}

.screen-tag-wrap,
.print-tag-wrap {
display: flex;
justify-content: center;
align-items: center;
}

.tag-card {
width: 2.5in;
height: 4in;
position: relative;
overflow: hidden;
border-radius: 0;
box-shadow: none;
background: #f3f1ea;
}

.tag-pattern {
position: absolute;
inset: 0;
background-repeat: no-repeat;
background-position: center center;
background-size: cover;
transform: scale(1.06);
transform-origin: center;
}

.tag-card.light-pattern .tag-pattern {
filter: brightness(1.03) contrast(0.98) saturate(0.96);
}

.tag-card.dark-pattern .tag-pattern {
filter: brightness(1.24) contrast(0.9) saturate(0.92);
}

.tag-overlay {
position: absolute;
inset: 0;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 14px 12px 16px;
}

.tag-card.light-pattern .tag-overlay {
background: linear-gradient(
180deg,
rgba(255, 255, 255, 0.12) 0%,
rgba(255, 255, 255, 0.08) 36%,
rgba(255, 255, 255, 0.14) 100%
);
}

.tag-card.dark-pattern .tag-overlay {
background: linear-gradient(
180deg,
rgba(255, 255, 255, 0.26) 0%,
rgba(255, 255, 255, 0.16) 34%,
rgba(255, 255, 255, 0.22) 100%
);
}

.tag-top {
display: flex;
justify-content: center;
align-items: flex-start;
padding: 0 8px;
min-height: 52px;
}

.business-name-text {
width: 100%;
max-width: 100%;
font-size: 15px;
font-weight: 700;
line-height: 1.15;
letter-spacing: 1px;
text-transform: uppercase;
color: #111;
text-align: center;
word-break: break-word;
overflow-wrap: anywhere;
text-wrap: balance;
text-shadow: 0 1px 2px rgba(255, 255, 255, 0.45);
}

.tag-middle {
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
}

.qr-image {
width: 94px;
height: 94px;
object-fit: contain;
display: block;
background: rgba(255, 255, 255, 0.82);
padding: 4px;
border-radius: 6px;
filter: contrast(1.45) brightness(1.05);
box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14);
}

.qr-placeholder {
width: 94px;
height: 94px;
display: flex;
align-items: center;
justify-content: center;
background: rgba(255, 255, 255, 0.55);
border-radius: 6px;
color: #444;
font-size: 18px;
font-weight: 700;
}

.scan-text {
font-size: 10px;
font-weight: 800;
letter-spacing: 1.7px;
color: #111;
text-align: center;
text-shadow: 0 1px 2px rgba(255, 255, 255, 0.45);
}

.tag-bottom {
display: flex;
flex-direction: column;
align-items: center;
gap: 3px;
padding: 0 10px;
}

.product-name-text {
font-size: 16px;
font-weight: 600;
line-height: 1.12;
color: #111;
text-align: center;
word-break: break-word;
overflow-wrap: anywhere;
text-shadow: 0 1px 2px rgba(255, 255, 255, 0.45);
}

.price-text {
font-size: 22px;
font-weight: 700;
line-height: 1.05;
color: #111;
text-align: center;
text-shadow: 0 1px 2px rgba(255, 255, 255, 0.45);
}

.print-sheet {
display: none;
}

@page {
size: letter portrait;
margin: 0.35in;
}

@media (max-width: 1180px) {
.main-grid {
grid-template-columns: 1fr;
}

.screen-sheet {
min-height: auto;
}
}

@media (max-width: 780px) {
.screen-sheet {
grid-template-columns: 1fr;
}
}

@media print {
html,
body {
background: #fff;
}

.no-print {
display: none !important;
}

.print-sheet {
display: grid !important;
grid-template-columns: repeat(2, 1fr);
gap: 0.2in;
width: 100%;
margin: 0;
padding: 0;
}

.print-tag-wrap {
break-inside: avoid;
page-break-inside: avoid;
}

.tag-card {
width: 2.5in !important;
height: 4in !important;
border-radius: 0 !important;
box-shadow: none !important;
-webkit-print-color-adjust: exact;
print-color-adjust: exact;
}

.tag-pattern,
.tag-overlay,
.qr-image,
.qr-placeholder {
-webkit-print-color-adjust: exact;
print-color-adjust: exact;
}
}
`}</style>
</>
);
}