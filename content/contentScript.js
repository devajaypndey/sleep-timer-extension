const videos = document.querySelectorAll("video");

videos.forEach(video => {
  video.pause();
});

// overlay
const overlay = document.createElement("div");
overlay.innerHTML = `
  <div style="text-align:center">
    <h1 style="margin-bottom:12px">Time is up</h1>
    <p style="font-size:1.1rem; opacity:0.85">
      Take a short break before continuing
    </p>
  </div>
`;

Object.assign(overlay.style, {
  position: "fixed",
  inset: "0",
  background: "rgba(0,0,0,0.85)",
  color: "white",
  fontSize: "2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "999999"
});

document.body.appendChild(overlay);
