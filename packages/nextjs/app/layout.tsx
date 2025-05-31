import './globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { TokenProvider } from '@/components/providers/token-provider'
import { headers } from "next/headers";
import Providers from '@/components/providers/provider'
import { Toaster } from '@/components/ui/toaster'
import SubProviders from "./Providers";
import { Menu } from '@/components/ui/menu'
import { PrivyClientProvider } from "@/components/providers/privy-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MonaSwipe - Crypto Trading Made Simple",
  description: "Swipe right on your next crypto investment",
  metadataBase: new URL("https://monadswipe.example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the pathname
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "/";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PrivyClientProvider>
            <Providers>
              <TokenProvider>
                <SubProviders>
                  <div className="flex flex-col min-h-screen">
                    <main className="relative flex flex-col flex-1">{children}</main>
                  </div>
                  <Toaster />
                  <Menu />
                </SubProviders>
              </TokenProvider>
            </Providers>
          </PrivyClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
