import { ThemeProvider } from '@/components/ui/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { Header } from '@/components/header';

const font = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Yu-Gi-Oh Deck Manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="mt-[--header-height]">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
