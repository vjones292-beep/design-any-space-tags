"use client";

import { useMemo, useState } from "react";
import QRCode from "react-qr-code";

type TagItem = {
productName: string;
price: string;
checkoutLink: string;
};

const EMPTY_TAGS: TagItem[] = Array.from({ length: 6 }, () => ({
productName: "",
price: "",
checkoutLink: "",
}));

export default function HomePage() {
const [shopName, setShopName] = useState("Design Any Space");
const [tags, setTags] = useState<TagItem[]>(EMPTY_TAGS);

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
setTags(EMPTY_TAGS);
};

const printSheet = () => {
window.print();
};

return (
<main className="min-h-screen bg-white text-black">
<div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
<header className="mb-6 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
<div className="mb-2 inline-flex rounded-full border border-black/10 px-3 py-1 text-xs font-medium tracking-wide">
Design Any Space
</div>

<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
<div>
<h1 className="text-3xl font-bold tracking-tight">
QR Product Tag Generator
</h1>
<p className="mt-2 max-w-2xl text-sm text-black/70">
Create one clean printable sheet with up to 6 different product
tags for markets, pop-ups, vintage booths, and retail displays.
</p>
</div>

<div className="flex flex-wrap gap-2 print:hidden">
<button
onClick={clearAll}
className="rounded-xl border border-black px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
>
Clear All
</button>
<button
onClick={printSheet}
className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
>
Print Tags
</button>
</div>
</div>
</header>

<section className="mb-6 grid gap-3 sm:grid-cols-3 print:hidden">
<div className="rounded-2xl border border-black/10 p-4 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-black/55">
How it works
</p>
<p className="mt-2 text-sm">
Add product details, paste each checkout link, then print one
mixed tag sheet.
</p>
</div>

<div className="rounded-2xl border border-black/10 p-4 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-black/55">
Best for
</p>
<p className="mt-2 text-sm">
Vendor booths, antique shops, furniture pieces, boutique displays,
and pop-up events.
</p>
</div>

<div className="rounded-2xl border border-black/10 p-4 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-black/55">
Filled tags
</p>
<p className="mt-2 text-2xl font-bold">
{readyCount} of 6 ready
</p>
</div>
</section>

<div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
<aside className="print:hidden">
<div className="rounded-2xl border border-black/10 p-4 shadow-sm">
<h2 className="text-2xl font-bold">Tag Details</h2>

<div className="mt-4">
<label className="mb-2 block text-sm font-medium">
Shop name
</label>
<input
type="text"
value={shopName}
onChange={(e) => setShopName(e.target.value)}
className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none transition focus:border-black"
placeholder="Enter shop name"
/>
</div>

<div className="mt-5 space-y-4">
{tags.map((tag, index) => (
<div
key={index}
className="rounded-2xl border border-black/10 p-4"
>
<h3 className="text-base font-semibold">Tag {index + 1}</h3>

<div className="mt-3 space-y-3">
<div>
<label className="mb-1 block text-sm font-medium">
Product name
</label>
<input
type="text"
value={tag.productName}
onChange={(e) =>
updateTag(index, "productName", e.target.value)
}
className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none transition focus:border-black"
placeholder=""
/>
</div>

<div>
<label className="mb-1 block text-sm font-medium">
Price
</label>
<input
type="text"
value={tag.price}
onChange={(e) =>
updateTag(index, "price", e.target.value)
}
className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none transition focus:border-black"
placeholder=""
/>
</div>

<div>
<label className="mb-1 block text-sm font-medium">
Checkout link
</label>
<input
type="url"
value={tag.checkoutLink}
onChange={(e) =>
updateTag(index, "checkoutLink", e.target.value)
}
className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none transition focus:border-black"
placeholder=""
/>
</div>
</div>
</div>
))}
</div>
</div>
</aside>

<section>
<div className="rounded-2xl border border-black/10 p-4 shadow-sm print:border-0 print:p-0 print:shadow-none">
<div className="mb-4 flex items-start justify-between print:mb-2">
<div>
<h2 className="text-2xl font-bold print:text-xl">
Mixed Tag Sheet Preview
</h2>
<p className="mt-1 text-sm text-black/70 print:hidden">
One printable sheet with up to 6 different product tags.
</p>
</div>

<p className="hidden text-sm font-medium text-black/70 md:block print:hidden">
designanyspace.com
</p>
</div>

<div className="tag-sheet-grid">
{tags.map((tag, index) => {
const hasLink = tag.checkoutLink.trim().length > 0;
const hasName = tag.productName.trim().length > 0;
const showTag = hasLink || hasName || tag.price.trim().length > 0;

return (
<article key={index} className="tag-card">
<div className="tag-card-inner">
<div className="tag-top">
<p className="tag-brand">
{(shopName || "Design Any Space").toUpperCase()}
</p>
</div>

<div className="tag-middle">
<div className="tag-text">
<div className="tag-name-wrap">
<p className="tag-name">
{tag.productName.trim() || "Product Name"}
</p>
</div>

<div className="tag-bottom-left">
<p className="tag-price">
{tag.price.trim() || ""}
</p>
<p className="tag-footer">
created by: designanyspace.com
</p>
</div>
</div>

<div className="tag-qr-wrap">
<div className="tag-qr-box">
{hasLink ? (
<QRCode
value={tag.checkoutLink}
size={84}
bgColor="#FFFFFF"
fgColor="#000000"
/>
) : (
<div className="tag-qr-placeholder">QR</div>
)}
</div>
<p className="tag-scan-text">Scan to Buy</p>
</div>
</div>
</div>

{!showTag && (
<div className="sr-only">Empty tag slot {index + 1}</div>
)}
</article>
);
})}
</div>
</div>
</section>
</div>
</div>

<style jsx global>{`
html,
body {
background: #ffffff;
color: #000000;
}

.tag-sheet-grid {
display: grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
gap: 16px;
}

.tag-card {
border: 1.5px solid rgba(0, 0, 0, 0.9);
border-radius: 18px;
background: #ffffff;
aspect-ratio: 1.9 / 1;
overflow: hidden;
}

.tag-card-inner {
display: flex;
flex-direction: column;
height: 100%;
padding: 12px 12px 10px 12px;
}

.tag-top {
display: flex;
justify-content: space-between;
align-items: flex-start;
margin-bottom: 8px;
}

.tag-brand {
font-size: 12px;
line-height: 1;
font-weight: 800;
letter-spacing: 0.12em;
margin: 0;
}

.tag-middle {
display: grid;
grid-template-columns: minmax(0, 1fr) 96px;
gap: 12px;
flex: 1;
min-height: 0;
}

.tag-text {
display: flex;
flex-direction: column;
justify-content: space-between;
min-width: 0;
}

.tag-name-wrap {
flex: 1;
display: flex;
align-items: flex-start;
min-height: 0;
}

.tag-name {
margin: 0;
font-size: 18px;
line-height: 1.05;
font-weight: 800;
word-break: break-word;
}

.tag-bottom-left {
margin-top: 8px;
}

.tag-price {
margin: 0 0 6px 0;
font-size: 20px;
line-height: 1;
font-weight: 900;
}

.tag-footer {
margin: 0;
font-size: 9px;
line-height: 1.1;
color: rgba(0, 0, 0, 0.75);
}

.tag-qr-wrap {
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
}

.tag-qr-box {
width: 96px;
height: 96px;
border: 1.5px solid rgba(0, 0, 0, 0.8);
border-radius: 14px;
display: flex;
align-items: center;
justify-content: center;
background: #ffffff;
overflow: hidden;
padding: 6px;
}

.tag-qr-placeholder {
font-size: 16px;
font-weight: 700;
color: rgba(0, 0, 0, 0.5);
}

.tag-scan-text {
margin: 6px 0 0 0;
font-size: 11px;
font-weight: 700;
line-height: 1;
text-align: center;
}

@media (max-width: 1100px) {
.tag-sheet-grid {
grid-template-columns: 1fr;
}
}

@media (max-width: 640px) {
.tag-card {
aspect-ratio: 1.65 / 1;
}

.tag-middle {
grid-template-columns: minmax(0, 1fr) 88px;
gap: 10px;
}

.tag-qr-box {
width: 88px;
height: 88px;
}

.tag-name {
font-size: 16px;
}

.tag-price {
font-size: 18px;
}

.tag-brand {
font-size: 11px;
}
}

@media print {
@page {
size: letter portrait;
margin: 0.35in;
}

html,
body {
background: #ffffff !important;
}

body * {
visibility: hidden;
}

.tag-sheet-grid,
.tag-sheet-grid * {
visibility: visible;
}

.tag-sheet-grid {
position: absolute;
left: 0;
top: 0;
width: 100%;
display: grid !important;
grid-template-columns: 1fr 1fr !important;
gap: 10px !important;
}

.tag-card {
break-inside: avoid;
page-break-inside: avoid;
aspect-ratio: 1.9 / 1;
border: 1.5px solid #000;
border-radius: 16px;
}

.tag-card-inner {
padding: 10px 10px 8px 10px;
}

.tag-name {
font-size: 17px;
}

.tag-price {
font-size: 20px;
}

.tag-footer {
font-size: 8.5px;
}

.tag-brand {
font-size: 11px;
}

.tag-qr-box {
width: 88px;
height: 88px;
}

.tag-scan-text {
font-size: 10px;
}
}
`}</style>
</main>
);
}