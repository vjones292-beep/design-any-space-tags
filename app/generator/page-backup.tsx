"use client";

import { useState } from "react";
import QRCode from "react-qr-code";

type PatternItem = {
name: string;
file: string;
position: string;
};

type TagItem = {
id: number;
productName: string;
price: string;
checkoutLink: string;
};

const patterns: PatternItem[] = [
{ name: "Navy Botanical", file: "/patterns/navy-botanical.jpg", position: "0% 0%" },
{ name: "Sage Regency", file: "/patterns/navy-botanical.jpg", position: "25% 0%" },
{ name: "Cottage Wildflower", file: "/patterns/navy-botanical.jpg", position: "50% 0%" },
{ name: "Dandelion Meadow", file: "/patterns/navy-botanical.jpg", position: "75% 0%" },
{ name: "Chevron Wood", file: "/patterns/navy-botanical.jpg", position: "0% 50%" },
{ name: "Antique Ledger", file: "/patterns/navy-botanical.jpg", position: "25% 50%" },
{ name: "Linen Natural", file: "/patterns/navy-botanical.jpg", position: "50% 50%" },
{ name: "Carrara Marble", file: "/patterns/navy-botanical.jpg", position: "75% 50%" },
];

export default function Page() {
const [businessName, setBusinessName] = useState("");
const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);

const [tags, setTags] = useState<TagItem[]>(
Array.from({ length: 6 }, (_, i) => ({
id: i + 1,
productName: "",
price: "",
checkoutLink: "",
}))
);

const selectedPattern = patterns[selectedPatternIndex];

const updateTag = (id: number, field: keyof TagItem, value: string) => {
setTags((prev) =>
prev.map((tag) => (tag.id === id ? { ...tag, [field]: value } : tag))
);
};

const downloadPrintableTags = () => {
window.print();
};

return (
<div style={styles.page}>
<div style={styles.header} className="no-print">
<h1 style={styles.title}>QR Tag Generator</h1>

<button onClick={downloadPrintableTags} style={styles.downloadButton}>
Download Printable Tags
</button>
</div>

<div style={styles.layout}>
<div style={styles.leftColumn} className="no-print">
<div style={styles.panel}>
<label style={styles.label}>Business Name</label>
<input
style={styles.input}
value={businessName}
onChange={(e) => setBusinessName(e.target.value)}
placeholder="Business Name"
/>
</div>

<div style={styles.panel}>
<h2 style={styles.sectionTitle}>Choose Background</h2>

<div style={styles.patternGrid}>
{patterns.map((pattern, index) => (
<button
key={pattern.name}
onClick={() => setSelectedPatternIndex(index)}
style={{
...styles.patternCard,
...(selectedPatternIndex === index
? styles.patternCardActive
: {}),
}}
>
<div
style={{
...styles.patternThumb,
backgroundImage: `url(${pattern.file})`,
backgroundPosition: pattern.position,
}}
/>
<div style={styles.patternName}>{pattern.name}</div>
</button>
))}
</div>
</div>
</div>

<div style={styles.rightColumn}>
<div style={styles.previewGrid}>
{tags.map((tag) => (
<div
key={tag.id}
style={{
...styles.tag,
backgroundImage: `url(${selectedPattern.file})`,
backgroundPosition: selectedPattern.position,
}}
>
<div style={styles.tagTop}>{businessName}</div>

<div style={styles.qrSection}>
<div style={styles.qrWrap}>
{tag.checkoutLink ? (
<QRCode value={tag.checkoutLink} size={116} />
) : (
<div style={styles.qrPlaceholder}>QR appears here</div>
)}
</div>
</div>

<div style={styles.scanText}>scan to pay</div>

<div style={styles.tagBottom}>
<div style={styles.productNameText}>{tag.productName}</div>
<div style={styles.priceText}>
{tag.price ? `$${tag.price}` : ""}
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

page:{
minHeight:"100vh",
background:"#f6f5f2",
padding:"32px",
fontFamily:"system-ui"
},

header:{
maxWidth:1400,
margin:"0 auto 24px"
},

title:{
fontSize:40,
fontWeight:800
},

downloadButton:{
padding:"10px 16px",
background:"#111",
color:"#fff",
border:"none",
borderRadius:8,
cursor:"pointer"
},

layout:{
maxWidth:1400,
margin:"0 auto",
display:"grid",
gridTemplateColumns:"380px 1fr",
gap:30
},

leftColumn:{
display:"flex",
flexDirection:"column",
gap:20
},

rightColumn:{
display:"flex",
flexDirection:"column"
},

panel:{
background:"#fff",
padding:20,
borderRadius:16,
border:"1px solid #eee"
},

label:{
fontWeight:700,
marginBottom:8,
display:"block"
},

input:{
width:"100%",
padding:"12px",
borderRadius:10,
border:"1px solid #ddd"
},

sectionTitle:{
fontSize:18,
fontWeight:800
},

patternGrid:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:12,
marginTop:12
},

patternCard:{
border:"1px solid #ddd",
borderRadius:14,
padding:8,
cursor:"pointer",
background:"#fff"
},

patternCardActive:{
border:"2px solid #111"
},

patternThumb:{
width:"100%",
aspectRatio:"1/1",
borderRadius:10,
backgroundSize:"400%",
backgroundRepeat:"no-repeat"
},

patternName:{
fontSize:12,
fontWeight:700,
marginTop:6
},

previewGrid:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:20
},

tag:{
borderRadius:24,
border:"2px solid #111",
overflow:"hidden",
backgroundSize:"400%",
backgroundRepeat:"no-repeat",
minHeight:300,
display:"flex",
flexDirection:"column"
},

tagTop:{
padding:"10px",
borderBottom:"2px solid #111",
background:"rgba(255,255,255,0.8)",
fontWeight:700
},

qrSection:{
flex:1,
display:"flex",
alignItems:"center",
justifyContent:"center"
},

qrWrap:{
width:140,
height:140,
background:"#fff",
borderRadius:18,
display:"flex",
alignItems:"center",
justifyContent:"center"
},

qrPlaceholder:{
fontWeight:700,
color:"#777"
},

scanText:{
textAlign:"center",
fontWeight:800,
marginBottom:10
},

tagBottom:{
borderTop:"2px solid #111",
background:"rgba(255,255,255,0.9)",
padding:10
},

productNameText:{
fontWeight:800
},

priceText:{
fontWeight:800
}

};