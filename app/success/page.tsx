"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
const [message, setMessage] = useState("Completing unlock...");

useEffect(() => {
localStorage.setItem("pdfUnlocked", "true");
setMessage("Payment confirmed. Redirecting...");

const timer = setTimeout(() => {
window.location.href = "/";
}, 1500);

return () => clearTimeout(timer);
}, []);

return (
<main
style={{
minHeight: "100vh",
display: "flex",
alignItems: "center",
justifyContent: "center",
padding: 24,
background: "#ffffff",
}}
>
<div
style={{
maxWidth: 520,
width: "100%",
border: "1px solid rgba(0,0,0,0.1)",
borderRadius: 20,
padding: 32,
textAlign: "center",
boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
}}
>
<h1
style={{
fontSize: 28,
fontWeight: 700,
marginBottom: 12,
color: "#111111",
}}
>
Payment Successful
</h1>

<p
style={{
fontSize: 16,
lineHeight: 1.6,
color: "rgba(0,0,0,0.7)",
}}
>
{message}
</p>
</div>
</main>
);
}