import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Vouch — Verified Reference Intelligence',
  description: 'Turn references from a checkbox into a predictive proof layer. Verified, portable, and fraud-resistant.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-white text-[#111] antialiased`}>
        {children}
      </body>
    </html>
  );
}
