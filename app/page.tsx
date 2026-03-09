"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Page() {

const [store,setStore] = useState("Design Any Space")

const [tags,setTags] = useState(
Array.from({length:6},()=>({
product:"",
price:"",
link:""
}))
)

function updateTag(index:number,field:string,value:string){

const newTags=[...tags]

newTags[index]={...newTags[index],[field]:value}

setTags(newTags)

}

function clearAll(){

setTags(Array.from({length:6},()=>({
product:"",
price:"",
link:""
})))

}

function printTags(){
window.print()
}

async function downloadPDF(){

const sheet=document.querySelector(".sheet") as HTMLElement

const canvas=await html2canvas(sheet)

const img=canvas.toDataURL("image/png")

const pdf=new jsPDF("portrait","px","letter")

pdf.addImage(img,"PNG",20,20)

pdf.save("designanyspace-tags.pdf")

}

return(

<div style={{padding:40,fontFamily:"Arial"}}>

<h1 style={{fontSize:40,fontWeight:800}}>QR Product Tag Generator</h1>

<p>Create printable QR product tags for markets, pop-ups, vintage booths, and retail displays.</p>

<div style={{marginTop:20,display:"flex",gap:10}}>

<button onClick={clearAll}>Clear All</button>

<button onClick={downloadPDF}>Download PDF</button>

<button onClick={printTags}>Print Tags</button>

</div>

<hr style={{margin:"30px 0"}}/>

<h2>Tag Details</h2>

<label>Store name:</label>

<input
value={store}
onChange={e=>setStore(e.target.value)}
style={{display:"block",marginBottom:20,width:300}}
/>

{tags.map((tag,i)=>(
<div key={i} style={{marginBottom:20}}>

<h3>Tag {i+1}</h3>

<label>Product name:</label>

<input
value={tag.product}
onChange={e=>updateTag(i,"product",e.target.value)}
style={{display:"block"}}
/>

<label>Price:</label>

<input
value={tag.price}
onChange={e=>updateTag(i,"price",e.target.value)}
style={{display:"block"}}
/>

<label>Checkout link:</label>

<input
value={tag.link}
onChange={e=>updateTag(i,"link",e.target.value)}
style={{display:"block",width:400}}
/>

</div>
))}

<hr style={{margin:"30px 0"}}/>

<h2>Mixed Tag Sheet Preview</h2>

<div className="sheet" style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:20
}}>

{tags.map((tag,i)=>{

const price=tag.price ? "$"+tag.price.replace(/[^0-9.]/g,"") : ""

return(

<div key={i} style={{
border:"2px solid black",
borderRadius:16,
padding:20,
height:180,
display:"flex",
flexDirection:"column",
justifyContent:"space-between"
}}>

<div>

<div style={{
fontSize:26,
fontWeight:900
}}>

{store.toUpperCase()}

</div>

<div style={{
fontSize:18,
fontWeight:700
}}>

{tag.product || "PRODUCT NAME"}

</div>

</div>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"flex-end"
}}>

<div>

<div style={{
fontSize:22,
fontWeight:800
}}>

{price}

</div>

<div style={{fontSize:12}}>
designanyspace.com
</div>

</div>

<div style={{textAlign:"center"}}>

<div style={{
fontSize:12,
fontWeight:700,
marginBottom:5
}}>
Scan to pay:
</div>

<div style={{
border:"1px solid black",
padding:5
}}>

{tag.link ? (
<QRCode value={tag.link} size={70}/>
):(
<div style={{width:70,height:70,display:"flex",alignItems:"center",justifyContent:"center"}}>
QR
</div>
)}

</div>

</div>

</div>

</div>

)

})}

</div>

</div>

)

}