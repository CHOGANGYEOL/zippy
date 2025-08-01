import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { Header } from "@/layout";
import { ToastWrapper } from "@/lib/toastify";
import theme from "@/theme";
import {
  Box,
  CssBaseline,
  InitColorSchemeScript,
  ThemeProvider,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zippy - Shorten URLs Fast",
  description: "The fastest way to make long links short.",
  metadataBase: new URL(process.env.BASE_URL),
  openGraph: {
    title: "Zippy - Shorten URLs Fast",
    description: "The fastest way to make long links short.",
    url: process.env.BASE_URL,
    type: "website",
    // images: [
    //   {
    //     url: "https://zippy-omega.vercel.app/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Zippy Preview Image",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zippy - Shorten URLs Fast",
    description: "The fastest way to make long links short.",
    // images: ["https://zippy-omega.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logo/apple-touch-icon.png"
        />

        <link rel="manifest" href="/manifest.webmanifest" />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#121212" />
      </head>
      <body>
        <ServiceWorkerRegister />
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Box sx={{ mt: 8 }}>{children}</Box>
            <ToastWrapper />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
