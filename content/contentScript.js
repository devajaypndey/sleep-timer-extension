const videos = document.querySelectorAll("video");

videos.forEach(video => {
  video.pause();
  video.muted = true;
});

// overlay
const overlay = document.createElement("div");
overlay.innerText = "Time’s up. Take a break 😴";

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
