import "./globals.css";
import { Jost } from 'next/font/google'

const jost_init = Jost({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-jost',
});

export const metadata = {
  title: "Simple Todo",
  description: "Your Daily Task Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost_init.variable}>{children}</body>
    </html>
  );
}
