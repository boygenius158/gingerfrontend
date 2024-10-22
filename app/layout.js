

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "./providers";
import { EdgeStoreProvider } from "./lib/edgestore";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SocketProvider } from "./lib/SocketContext";

// import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ginger",
  description: "Ginger",
};

export default function RootLayout({ children }) {
  // const router = useRouter()

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <SocketProvider>
           
            <div className="bg-black h-screen">
              <Navbar className="bg-black h-screen"></Navbar>
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </div>
           
          </SocketProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
