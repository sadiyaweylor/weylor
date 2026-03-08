import "./globals.css";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Footer from "@/components/footer/Footer";
import LenisProvider from "@/components/LenisProvider";

export const metadata = {
  title: "Weylor — Sustainable Modern Fashion",
  description:
    "Weylor creates premium sustainable clothing designed for modern multi-occasion and everyday life.",

  keywords: ["Weylor", "sustainable fashion", "eco clothing"],
  authors: [{ name: "Weylor" }],

  metadataBase: new URL("https://weylor.world"),

  openGraph: {
    title: "Weylor — Premium Sustainable Fashion",
    description:
      "Premium sustainable clothing designed for modern everyday life.",
    url: "https://weylor.world",
    siteName: "Weylor",
    images: [
      {
        url: "/og-weylor.jpg",
        width: 1200,
        height: 630,
        alt: "Weylor Sustainable Fashion",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Weylor — Sustainable Modern Fashion",
    description:
      "Premium sustainable clothing designed for modern everyday life.",
    images: ["/og-weylor.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
  index: true,
  follow: true,
},
};

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">

        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>

          <Footer />
        </ThemeProvider>

      </body>
    </html>
  );
}