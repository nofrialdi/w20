import "./globals.css";
import { Inter } from "next/font/google";
import Student from "./Student/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "List Students",
  description: "Student Apps",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Student />
      </body>
    </html>
  );
}
