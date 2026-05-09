import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const syne = Syne({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'CULTURELOGIX - Modern HR & Talent Solutions',
  description: 'CULTURELOGIX is dedicated to sourcing the right fit for your organization by aligning talent with culture. We specialize in recruitment, outsourcing, and HR consultancy services tailored to meet the evolving needs of modern businesses.',
  keywords: 'HR, Recruitment, Talent Solutions, Job Board, Jobs Africa, Outsourcing, Career',
  authors: [{ name: 'CULTURELOGIX' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable}`}>
        <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />
        {/* We will add a ThemeProvider here later for dark/light mode */}
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
