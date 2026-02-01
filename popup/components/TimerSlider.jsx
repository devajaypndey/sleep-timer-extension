import * as Slider from "@radix-ui/react-slider";

export default function TimerSlider({ value, setValue }) {
  return (
    <>
      <p>Timer: {value} min</p>

      <Slider.Root
        value={[value]}
        min={1}
        max={120}
        step={1}
        onValueChange={(v) => setValue(v[0])}
        style={{ marginTop: 8 }}
      >
        <Slider.Track style={{ height: 4, background: "#ddd" }}>
          <Slider.Range style={{ background: "#000", height: "100%" }} />
        </Slider.Track>
        <Slider.Thumb style={{ width: 14, height: 14, background: "#000" }} />
      </Slider.Root>
    </>
  );
}
