/* eslint-disable no-undef */
import { useState } from "react";
import TimerSlider from "./components/TimerSlider";
import Presets from "./components/Presets";
import MuteSwitch from "./components/MuteSwitch";

export default function App() {
  const [minutes, setMinutes] = useState(10);
  const [mute, setMute] = useState(true);

  const start = () => {
    chrome.runtime.sendMessage({
      type: "START_TIMER",
      minutes,
      mute
    });
  };

  const stop = () => {
    chrome.runtime.sendMessage({ type: "STOP_TIMER" });
  };

  return (
    <div style={{ width: 240, padding: 12 }}>
      <h3>Sleep Timer</h3>

      <TimerSlider value={minutes} setValue={setMinutes} />
      <Presets setValue={setMinutes} />
      <MuteSwitch mute={mute} setMute={setMute} />

      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
