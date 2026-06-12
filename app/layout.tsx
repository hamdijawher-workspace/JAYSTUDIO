import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAY STUDIO | Creative Production",
  description:
    "Premium films, photography, campaigns and experiences for brands, hospitality and people."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
