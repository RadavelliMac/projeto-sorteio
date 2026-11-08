const dizimistasData = <%- JSON.stringify(dizimistas) %>;

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const btnSpin = document.getElementById("btnSpin");
const winnerNameDisplay = document.getElementById("winnerName");

const PALETTE = [
  "#3498db",
  "#e67e22",
  "#9b59b6",
  "#f1c40f",
  "#1abc9c",
  "#e74c3c",
  "#34495e",
  "#2ecc71",
];

const slices = dizimistasData.length;
let isSpinning = false;

function drawWheel() {
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width / 2;
  const sliceAngle = (2 * Math.PI) / slices;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < slices; i++) {
    const startAngle = i * sliceAngle;
    const endAngle = startAngle + sliceAngle;

    ctx.fillStyle = PALETTE[i % PALETTE.length];

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";

    const fontSize = slices > 20 ? 10 : slices > 10 ? 14 : 18;
    ctx.font = `bold ${fontSize}px sans-serif`;

    const fullName = `${dizimistasData[i].dizimista_id} - ${dizimistasData[i].dizimista_nome}`;
    ctx.fillText(fullName.trim(), radius - 15, 6);
    ctx.restore();
  }
}

btnSpin.addEventListener("click", () => {
  if (isSpinning || slices < 2) return;

  isSpinning = true;
  btnSpin.disabled = true;
  winnerNameDisplay.textContent = "Girando";

  const extraDegrees = Math.floor(Math.random() * 360);
  const totalRotationDegrees = 360 * 5 + extraDegrees;
  const duration = 4000;
  const startTimestamp = performance.now();

  function animateWheel(now) {
    const elapsed = now - startTimestamp;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const rotation = easeOut * totalRotationDegrees;

    canvas.style.transform = `rotate(${rotation}deg)`;

    if (progress < 1) {
      requestAnimationFrame(animateWheel);
    } else {
      isSpinning = false;
      btnSpin.disabled = false;

      const finalAngle = rotation % 360;
      calculateWinner(finalAngle);
    }
  }

  requestAnimationFrame(animateWheel);
});

async function calculateWinner(finalAngle) {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const degreesPerSlice = 360 / slices;
  const normalizedDegree = (360 - (finalAngle % 360) + 270) % 360;
  const winningIndex = Math.floor(normalizedDegree / degreesPerSlice);
  const winner = dizimistasData[winningIndex];
  winnerNameDisplay.textContent = `${winner.dizimista_id} - ${winner.dizimista_nome}`;
}

drawWheel();
