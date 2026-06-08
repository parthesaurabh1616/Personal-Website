import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Assistant } from '@/components/assistant/Assistant';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

const SITE_URL = 'https://www.saurabhparthe.in';
const TITLE = 'Saurabh Parthe — Distributed Systems & AI Infrastructure Engineer';
const DESCRIPTION =
  'Building scalable intelligent systems with Golang, Python, Kubernetes, Kafka, and Machine Learning. Distributed systems, AI infrastructure, and real-time data engineering.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · Saurabh Parthe',
  },
  description: DESCRIPTION,
  applicationName: 'Saurabh Parthe Portfolio',
  authors: [{ name: 'Saurabh Parthe', url: SITE_URL }],
  creator: 'Saurabh Parthe',
  keywords: [
    'Saurabh Parthe',
    'Distributed Systems',
    'AI Infrastructure',
    'Golang',
    'Python',
    'Kubernetes',
    'Kafka',
    'Machine Learning',
    'Event-Driven Architecture',
    'System Design',
    'Backend Engineering',
    'Microservices',
    'Cloud Native',
    'Real-Time Processing',
    'Prompt Engineering',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Saurabh Parthe',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Assistant />
      </body>
    </html>
  );
}
