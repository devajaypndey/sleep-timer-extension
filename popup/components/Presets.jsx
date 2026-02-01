export default function Presets({ setValue }) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      {[10, 25, 45].map(m => (
        <button key={m} onClick={() => setValue(m)} style={{border: "none", borderRadius: "6px", background: "#F7F6D3", textAlign: "center", padding: "4px"}}>
          {m}m
        </button>
      ))}
    </div>
  );
}
