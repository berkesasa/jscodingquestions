import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QuestionProgressProvider } from "@/contexts/QuestionProgressContext";
import { QuestionsProvider } from "@/contexts/QuestionsContext";
import { GoogleAnalytics } from '@next/third-parties/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://jscodingquestions.com'),
  alternates: {
    canonical: 'https://jscodingquestions.com',
  },
  title: "JavaScript Coding Questions - Prepare for Interviews",
  description: "Master JavaScript with our comprehensive collection of coding questions, exercises, and interview challenges.",
  icons: {
    icon: `${BASE_PATH}/favicon.svg`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jscodingquestions.com',
    siteName: 'JS Coding Questions',
    title: "JavaScript Coding Questions - Prepare for Interviews",
    description: "Master JavaScript with our comprehensive collection of coding questions, exercises, and interview challenges.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "JavaScript Coding Questions - Prepare for Interviews",
    description: "Master JavaScript with our comprehensive collection of coding questions, exercises, and interview challenges.",
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4209752884344833"
          crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-4209752884344833" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
        suppressHydrationWarning={true}
      >
        <QuestionsProvider>
          <QuestionProgressProvider>
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
              {children}
            </main>

            <Footer />
          </QuestionProgressProvider>
        </QuestionsProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
