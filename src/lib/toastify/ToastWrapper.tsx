"use client";

import { useColorScheme } from "@mui/material";
import { useSyncExternalStore } from "react";
import { ToastContainer } from "react-toastify";

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function subscribeToSystemTheme(onStoreChange: () => void) {
  const media = window.matchMedia(DARK_SCHEME_QUERY);

  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSystemThemeSnapshot(): "light" | "dark" {
  return window.matchMedia(DARK_SCHEME_QUERY).matches ? "dark" : "light";
}

export function ToastWrapper() {
  const { mode } = useColorScheme();
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    () => "dark",
  );
  const resolvedTheme = mode && mode !== "system" ? mode : systemTheme;

  return <ToastContainer theme={resolvedTheme} />;
}
