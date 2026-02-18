import { Anton, Outfit } from "next/font/google"; // Imported new fonts
import Script from "next/script";
import "./globals.css";
import Snowfall from "@/components/ui/Snowfall";
import HeroVideoPreload from "@/components/HeroVideoPreload";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "VITopia '26 | VIT-AP University - Amaravati",
  description: "VIT AP International Cultural and Sports Fest 2026",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anton.variable} ${outfit.variable} antialiased bg-background text-foreground`}>
        <HeroVideoPreload />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0C7N1P621P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0C7N1P621P');
          `}
        </Script>
        {children}

        {/* Snowfall Animation - seasonal enhancement */}
        <Snowfall />
      </body>
    </html>
  );
}
