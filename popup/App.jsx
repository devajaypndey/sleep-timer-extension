/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  TextField,
  ThemeProvider,
  createTheme,
  LinearProgress
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

import TimerSlider from "./components/TimerSlider";
import Presets from "./components/Presets";
import MuteSwitch from "./components/MuteSwitch";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#A7E399"
    },
    background: {
      default: "#0f1115",
      paper: "#161a20"
    }
  },
  shape: {
    borderRadius: 14
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif"
  }
});

export default function App() {
  const [minutes, setMinutes] = useState(10);
  const [mute, setMute] = useState(true);

  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  /* ---------- START TIMER ---------- */
  const start = () => {
    chrome.runtime.sendMessage({
      type: "START_TIMER",
      minutes,
      mute
    });

    setSecondsLeft(minutes * 60);
    setRunning(true);
  };

  /* ---------- STOP TIMER ---------- */
  const stop = () => {
    chrome.runtime.sendMessage({ type: "STOP_TIMER" });
    setRunning(false);
    setSecondsLeft(0);
  };

  /* ---------- COUNTDOWN LOGIC ---------- */
  useEffect(() => {
    if (!running || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, secondsLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress =
    secondsLeft > 0 ? (secondsLeft / (minutes * 60)) * 100 : 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Card
        elevation={0}
        sx={{
          width: 300,
          bgcolor: "background.paper",
          border: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <CardContent>
          {/* ---------- HEADER ---------- */}
          <Stack direction="row" spacing={1.2} alignItems="center" mb={1}>
            <AccessTimeIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Sleep Timer
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={2}
          >
            Auto pause or mute videos
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* ---------- TIMER DISPLAY ---------- */}
          {running && (
            <Box mb={2}>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                color="primary"
              >
                {formatTime(secondsLeft)}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 4
                }}
              />
            </Box>
          )}

          {/* ---------- TIMER CONTROLS ---------- */}
          {!running && (
            <>
              <TimerSlider
                value={minutes}
                setValue={setMinutes}
              />

              <Presets setValue={setMinutes} />

              <TextField
                fullWidth
                size="small"
                type="number"
                label="Custom minutes"
                value={minutes}
                onChange={(e) =>
                  setMinutes(Math.max(1, Number(e.target.value)))
                }
                sx={{ mt: 1.5 }}
              />
            </>
          )}

          {/* ---------- MUTE SWITCH ---------- */}
          <Box mt={2}>
            <MuteSwitch mute={mute} setMute={setMute} />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* ---------- ACTION BUTTONS ---------- */}
          <Stack direction="row" spacing={1.2}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<PlayArrowIcon />}
              disabled={running}
              onClick={start}
              sx={{
                bgcolor: "#A7E399",
                color: "#0f1115",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#93d88a"
                }
              }}
            >
              Start
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<StopIcon />}
              disabled={!running}
              onClick={stop}
            >
              Stop
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
