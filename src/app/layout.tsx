import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "BaseCamp",
  description: "BaseCamp is a retro-futurist design system built for creative tools, personal dashboards, and focused workspaces. Block aesthetics meet modern engineering.",
};

const themeInitScript = `
(function() {
  var t = localStorage.getItem('theme');
  if (t === 'light' || t === 'dark') {
    document.documentElement.dataset.theme = t;
  }
  var color = (t === 'light') ? '#fafafa' : '#0a0a0b';
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', color);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0a0a0b" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
