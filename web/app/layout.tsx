import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next App",
  description: "Next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <UserProvider>
        <body className={`antialiased`}>{children}</body>
      </UserProvider>
    </html>
  );
}
