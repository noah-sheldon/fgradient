import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'fgradient - Create Beautiful Gradient Backgrounds',
  description: 'Upload images and apply customizable gradient backgrounds with precise control over colors, direction, and dimensions.',
  keywords: 'fgradient, image editor, gradient, background, photo editor, design tool',
  authors: [{ name: 'fgradient' }],
  viewport: 'width=device-width, initial-scale=1',
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