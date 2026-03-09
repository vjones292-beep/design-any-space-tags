import "./globals.css";

export const metadata = {
title: "Design Any Space | QR Product Tag Generator",
description: "Create printable QR product tags.",
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="en">
<body>{children}</body>
</html>
);
}