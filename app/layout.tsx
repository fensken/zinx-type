import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Fira_Code,
  Source_Code_Pro,
  IBM_Plex_Mono,
  Roboto_Mono,
  Ubuntu_Mono,
  Inconsolata,
  Space_Mono,
  DM_Mono,
  Courier_Prime,
  Overpass_Mono,
  Red_Hat_Mono,
  Azeret_Mono,
  Martian_Mono,
  Sono,
  Share_Tech_Mono,
  Anonymous_Pro,
  PT_Mono,
  Major_Mono_Display,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import Header from "@/components/global/header";
import Footer from "@/components/global/footer";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ubuntu-mono",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
});

const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  variable: "--font-overpass-mono",
});

const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
  variable: "--font-red-hat-mono",
});

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret-mono",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian-mono",
});

const sono = Sono({
  subsets: ["latin"],
  variable: "--font-sono",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech",
});

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-anonymous-pro",
});

const ptMono = PT_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pt-mono",
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-major-mono",
});

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  jetbrainsMono.variable,
  firaCode.variable,
  sourceCodePro.variable,
  ibmPlexMono.variable,
  robotoMono.variable,
  ubuntuMono.variable,
  inconsolata.variable,
  spaceMono.variable,
  dmMono.variable,
  courierPrime.variable,
  overpassMono.variable,
  redHatMono.variable,
  azeretMono.variable,
  martianMono.variable,
  sono.variable,
  shareTechMono.variable,
  anonymousPro.variable,
  ptMono.variable,
  majorMono.variable,
].join(" ");

export const metadata: Metadata = {
  metadataBase: new URL("https://zinx-type.vercel.app/"),
  title: "Zinx Type | Test & Boost Your Typing Speed",
  description:
    "Improve your typing speed and accuracy with Zinx Type. A minimal typing test with multiple modes, quotes, and real-time WPM tracking. Practice typing and boost your productivity.",
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
    url: "https://zinx-type.vercel.app/",
    siteName: "Zinx Type",
    title: "Zinx Type | Test & Boost Your Typing Speed",
    description:
      "Improve your typing speed and accuracy with Zinx Type. Free online typing test with multiple modes, quotes, and real-time WPM tracking.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Zinx Type | Test & Boost Your Typing Speed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinx Type | Test & Boost Your Typing Speed",
    description:
      "Improve your typing speed and accuracy with Zinx Type. Free online typing test with multiple modes and real-time WPM tracking.",
    images: ["https://zinx-type.vercel.app/logo.png"],
  },
  alternates: {
    canonical: "https://zinx-type.vercel.app/",
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
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased relative min-h-dvh">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="zinx-base-theme"
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
