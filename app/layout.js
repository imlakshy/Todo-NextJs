import { jost } from "./font";
import "./globals.css";
import { Jost } from "next/font/google";

export const metadata = {
  title: "Simple Todo",
  description: "Your Daily Task Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className}>{children}</body>
    </html>
  );
}
