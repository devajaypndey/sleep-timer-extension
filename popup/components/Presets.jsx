export default function Presets({ setValue }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[10, 25, 45].map(m => (
        <button key={m} onClick={() => setValue(m)}>
          {m}m
        </button>
      ))}
    </div>
  );
}
