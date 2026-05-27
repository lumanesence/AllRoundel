const ring = document.getElementById("ring");
const bar = document.getElementById("bar");
const label = document.getElementById("label");
const ringColorInput = document.getElementById("ringColor");
const barColorInput = document.getElementById("barColor");
const textColorInput = document.getElementById("textColor");
const textInput = document.getElementById("textInput");

//Live updates
ringColorInput.addEventListener("input", e => {
  ring.setAttribute("stroke", e.target.value);
});
barColorInput.addEventListener("input", e => {
  bar.setAttribute("fill", e.target.value);
});
textColorInput.addEventListener("input", e => {
  label.setAttribute("fill", e.target.value);
});
textInput.addEventListener("input", e => {
  label.textContent = e.target.value.toUpperCase();
});

//Presets
function applyPreset(ringColor, barColor, textColor, text) {
  ring.setAttribute("stroke", ringColor);
  bar.setAttribute("fill", barColor);
  label.setAttribute("fill", textColor);
  label.textContent = text;
  ringColorInput.value = ringColor;
  barColorInput.value = barColor;
  textColorInput.value = textColor;
  textInput.value = text;
}

document.getElementById("underground").onclick = () => {
  applyPreset("#DA291C", "#003688", "#ffffff", "UNDERGROUND");
};

//Get SVG download working
document.getElementById("download").onclick = () => {
  const svg = document.getElementById("roundel");
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);
  source = '<?xml version="1.0" encoding="UTF-8"?>\n' + source;
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "roundel.svg";
  a.click();
  URL.revokeObjectURL(url);
};

//Fixed PNG download working
document.getElementById("downloadPng").onclick = () => {
  const svg = document.getElementById("roundel");
  const clonedSvg = svg.cloneNode(true);
  clonedSvg.setAttribute("width", "400");
  clonedSvg.setAttribute("height", "400");
  
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clonedSvg);
  const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
  
  const img = new Image();
  img.onload = () => {
    setTimeout(() => {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 400, 400);
      ctx.drawImage(img, 0, 0, 400, 400);
      
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "roundel.png";
      a.click();
    }, 50);
  };
  img.src = svgUrl;
};
