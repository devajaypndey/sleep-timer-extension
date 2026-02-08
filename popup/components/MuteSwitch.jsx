import * as Switch from "@radix-ui/react-switch";

export default function MuteSwitch({ mute, setMute }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>Mute instead of pause</span>

      <Switch.Root checked={mute} onCheckedChange={setMute}>
        <Switch.Thumb />
      </Switch.Root>
    </div>
  );
}
