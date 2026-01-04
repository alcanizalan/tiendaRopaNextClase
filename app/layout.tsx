import "./globals.css";
import {Inter} from "next/font/google";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL} from "@/lib/constants";
import {ThemeProvider} from "next-themes";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"]
});

export const metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
}


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider 
        attribute={'class'}
        defaultTheme="light"
        themes={['light', 'dark', 'system', 'doom']}
        enableSystem={true}
        disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
