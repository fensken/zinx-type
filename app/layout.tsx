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
  Victor_Mono,
  Recursive,
  Noto_Sans_Mono,
  Ubuntu_Sans_Mono,
  Oxygen_Mono,
  Cutive_Mono,
  B612_Mono,
  Xanh_Mono,
  Syne_Mono,
  Nova_Mono,
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

// New fonts
const victorMono = Victor_Mono({
  subsets: ["latin"],
  variable: "--font-victor-mono",
});

const recursiveMono = Recursive({
  subsets: ["latin"],
  variable: "--font-recursive-mono",
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-sans-mono",
});

const ubuntuSansMono = Ubuntu_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-sans-mono",
});

const oxygenMono = Oxygen_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-oxygen-mono",
});

const cutiveMono = Cutive_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cutive-mono",
});

const b612Mono = B612_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-b612-mono",
});

const xanhMono = Xanh_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-xanh-mono",
});

const syneMono = Syne_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-syne-mono",
});

const novaMono = Nova_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nova-mono",
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
  victorMono.variable,
  recursiveMono.variable,
  notoSansMono.variable,
  ubuntuSansMono.variable,
  oxygenMono.variable,
  cutiveMono.variable,
  b612Mono.variable,
  xanhMono.variable,
  syneMono.variable,
  novaMono.variable,
].join(" ");

export const metadata: Metadata = {
  metadataBase: new URL("https://zinx-type.vercel.app/"),
  title: "Zinx Type | Free Typing Test - Check Your Typing Speed & WPM",
  description:
    "Free online typing test to measure your typing speed and accuracy. Test your WPM with multiple modes: timed tests, word counts, quotes, and code snippets. A modern Monkeytype alternative with customizable themes, sounds, and fonts. Practice touch typing and improve your keyboard skills.",
  keywords: [
    "typing test",
    "typing practice",
    "typing speed test",
    "WPM test",
    "words per minute",
    "typing speed",
    "keyboard practice",
    "touch typing",
    "typing game",
    "free typing test",
    "online typing test",
    "monkeytype",
    "monkeytype alternative",
    "typing trainer",
    "typing tutor",
    "speed typing",
    "keyboard typing test",
    "wpm typing test",
    "typing accuracy",
    "learn to type",
    "improve typing speed",
    "code typing practice",
    "programmer typing test",
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
    title: "Zinx Type | Free Typing Test - Check Your Typing Speed & WPM",
    description:
      "Free online typing test to measure your WPM and accuracy. Multiple test modes, customizable themes, and real-time stats. A modern Monkeytype alternative for improving your typing speed.",
    images: [
      {
        url: "https://zinx-type.vercel.app/og.png",
        alt: "Zinx Type - Free Online Typing Speed Test",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinx Type | Free Typing Test - Check Your Typing Speed & WPM",
    description:
      "Free online typing test to measure your WPM and accuracy. Multiple test modes, customizable themes, and real-time stats. A modern Monkeytype alternative.",
    images: ["https://zinx-type.vercel.app/og.png"],
  },
  alternates: {
    canonical: "https://zinx-type.vercel.app/",
  },
  category: "Technology",
};

// Script to prevent theme and settings flash - runs before React hydration
const preHydrationScript = `
  (function() {
    var root = document.documentElement;
    // Themes with grainy background
    var grainyThemes = ['claude', 'vercel', 'espresso', 'latte', 'mocha', 'cappuccino', 'macchiato', 'affogato', 'cold-brew', 'matcha'];
    try {
      // Theme
      var themeStored = localStorage.getItem('zinx-theme');
      if (themeStored) {
        var themeParsed = JSON.parse(themeStored);
        var theme = themeParsed.state && themeParsed.state.theme;
        if (theme) {
          root.classList.remove('light', 'dark');
          if (theme === 'light') {
            root.classList.add('light');
          } else {
            root.classList.add('dark');
            if (theme !== 'dark') {
              root.classList.add('theme-' + theme);
            }
          }
          // Add grainy class for coffee aesthetic themes
          if (grainyThemes.indexOf(theme) !== -1) {
            root.classList.add('grainy-bg');
          }
        }
      }
    } catch (e) {}

    try {
      // Settings - store as data attributes for CSS-based initial state
      var settingsStored = localStorage.getItem('zinx-settings');
      if (settingsStored) {
        var settingsParsed = JSON.parse(settingsStored);
        var state = settingsParsed.state;
        if (state) {
          if (state.mode) root.dataset.mode = state.mode;
          if (state.wordCount) root.dataset.wordCount = state.wordCount;
          if (state.timeLimit) root.dataset.timeLimit = state.timeLimit;
          if (state.difficulty) root.dataset.difficulty = state.difficulty;
          if (state.includeNumbers) root.dataset.includeNumbers = 'true';
          if (state.includePunctuation) root.dataset.includePunctuation = 'true';
          if (state.includeSpecialCharacters) root.dataset.includeSpecialCharacters = 'true';
          if (state.codeLanguage) root.dataset.codeLanguage = state.codeLanguage;
        }
      }
    } catch (e) {}

    try {
      // Font - store as data attribute
      var fontStored = localStorage.getItem('zinx-font');
      if (fontStored) {
        var fontParsed = JSON.parse(fontStored);
        var font = fontParsed.state && fontParsed.state.font;
        if (font) {
          root.dataset.font = font;
        }
      }
    } catch (e) {}

    // Mark as pre-hydrated so components know settings are available
    root.dataset.hydrated = 'pending';
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
        <script dangerouslySetInnerHTML={{ __html: preHydrationScript }} />
      </head>
      <body className="antialiased min-h-dvh flex flex-col supports-[height:100dvh]:min-h-dvh">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="zinx-base-theme"
        >
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
