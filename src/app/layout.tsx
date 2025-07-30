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
  title: "Zippy",
  description: "The fastest way to make long links short.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
