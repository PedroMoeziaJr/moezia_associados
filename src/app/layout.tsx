import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moézia Associados | Advocacia e Assessoria Jurídica",
  description:
    "Escritório de advocacia especializado em Direito Digital, LGPD, Direito Civil e Direito Militar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
