import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://fgradient.com'),
  title: 'fgradient - Free Online Gradient Background Generator & Image Editor',
  description: 'Create stunning gradient backgrounds for your images online. Free image editor with customizable gradients, rounded corners, and precise dimension controls. No signup required.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  keywords: [
    'gradient background generator',
    'free image editor',
    'online gradient maker',
    'gradient overlay',
    'image background editor',
    'gradient design tool',
    'photo editor',
    'background generator',
    'gradient creator',
    'image effects',
    'visual design',
    'graphic design tool',
    'web design',
    'social media graphics',
    'instagram backgrounds',
    'twitter headers',
    'linkedin banners',
    'gradient effects',
    'image filters',
    'online photo editor'
  ],
  authors: [{ name: 'fgradient team', url: 'https://fgradient.com' }],
  creator: 'fgradient',
  publisher: 'fgradient',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fgradient.com',
    siteName: 'fgradient',
    title: 'fgradient - Free Online Gradient Background Generator',
    description: 'Create stunning gradient backgrounds for your images online. Free, fast, and easy to use.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'fgradient - Gradient Background Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fgradient - Free Online Gradient Background Generator',
    description: 'Create stunning gradient backgrounds for your images online. Free, fast, and easy to use.',
    images: ['/og-image.png'],
    creator: '@fgradient',
  },
  alternates: {
    canonical: 'https://fgradient.com',
  },
  category: 'Design Tools',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}