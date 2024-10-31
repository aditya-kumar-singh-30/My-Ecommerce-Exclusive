
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import ClientProvider from "@/Redux/Provider";
import { motion } from "framer-motion";
import MobileNav from "./mobilenav/MobileNav";
import Footer from "./Footer/Footer";


const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Exclusive",
  description: "Created by Aditya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextTopLoader height={5} showSpinner={true} color="#973131"/>
      <ClientProvider>
       <MobileNav/>
        {children}
        <Footer/>
   
        </ClientProvider>
        
        </body>
    </html>
  );
}
