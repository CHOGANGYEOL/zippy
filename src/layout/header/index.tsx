"use client";
import {
  AppBar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material";

export function Header() {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography>Zippy</Typography>
        <FormControl>
          <InputLabel id="mode-select-label">Mode</InputLabel>
          <Select
            labelId="mode-select-label"
            id="mode-select"
            value={mode}
            onChange={(event) => setMode(event.target.value as typeof mode)}
            label="Theme"
            size="small"
          >
            <MenuItem value="system">System</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
}
