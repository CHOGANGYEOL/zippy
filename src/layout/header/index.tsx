"use client";
import { DarkMode, LightMode, Settings } from "@mui/icons-material";
import {
  AppBar,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  useColorScheme,
} from "@mui/material";

export function Header() {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div id="logo" />
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_event, value) => setMode(value as typeof mode)}
          size="small"
        >
          <ToggleButton value="system" aria-label="system">
            <Settings />
          </ToggleButton>
          <ToggleButton value="light" aria-label="light">
            <LightMode />
          </ToggleButton>
          <ToggleButton value="dark" aria-label="dark">
            <DarkMode />
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
