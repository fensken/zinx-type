import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import Header from "@/components/global/header";
import Footer from "@/components/global/footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zinx Type - Free Online Typing Test & Practice",
  description:
    "Improve your typing speed and accuracy with Zinx Type. Free online typing test with multiple modes, quotes, and real-time WPM tracking. Practice typing and boost your productivity.",
  keywords: [
    "typing test",
    "typing practice",
    "WPM test",
    "words per minute",
    "typing speed",
    "keyboard practice",
    "touch typing",
    "typing game",
    "free typing test",
    "online typing",
  ],
  authors: [{ name: "Zinx Type" }],
  creator: "Zinx Type",
  publisher: "Zinx Type",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zinxtype.com",
    siteName: "Zinx Type",
    title: "Zinx Type - Free Online Typing Test & Practice",
    description:
      "Improve your typing speed and accuracy with Zinx Type. Free online typing test with multiple modes, quotes, and real-time WPM tracking.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinx Type - Free Online Typing Test & Practice",
    description:
      "Improve your typing speed and accuracy with Zinx Type. Free online typing test with multiple modes and real-time WPM tracking.",
  },
  alternates: {
    canonical: "https://zinxtype.com",
  },
  category: "Technology",
};

// Script to prevent theme flash - runs before React hydration
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('zinx-theme');
      if (stored) {
        var parsed = JSON.parse(stored);
        var theme = parsed.state && parsed.state.theme;
        if (theme) {
          var root = document.documentElement;
          root.classList.remove('light', 'dark');
          if (theme === 'light') {
            root.classList.add('light');
          } else {
            root.classList.add('dark');
            if (theme !== 'dark') {
              root.classList.add('theme-' + theme);
            }
          }
        }
      }
    } catch (e) {}
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
      className={`${jetbrainsMono.variable} ${geistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistMono.variable} antialiased relative min-h-dvh`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="zinx-theme"
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
