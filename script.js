



const birthday = {
  name: "Janice",

  // Replace these sample paths with your own photos.
  // Example: "images/photo1.jpg"
  photos: [
    {
      src: "Birthday Greeting/image/photo 1.jpg",
      caption: "Slay ♡"
    },
    {
      src: "Birthday Greeting/image/photo 2.jpg",
      caption: "kyot✨"
    },
    {
      src: "Birthday Greeting/image/photo 3.jpg",
      caption: "isshh"
    },
    {
      src: "Birthday Greeting/image/photo 4.jpg",
      caption: "Kita ko lang hehe"
    },
    {
      src: "Birthday Greeting/image/photo 5.jpg",
      caption: "cutiee❤️"
    },
    {
      src: "Birthday Greeting/image/photo 6.gif",
      caption: "SHS moments😎"
    },
  ],

  giftMessage:
    "Your gift is a reminder that you are appreciated, loved, and worthy of beautiful things. May your year be full of wonderful surprises!"
};

/* Set the recipient's name */

document.title = `Happy Birthday, ${birthday.name}!`;

document.getElementById("coverName").textContent =
  birthday.name + "!";

document.getElementById("coverNameText").textContent =
  birthday.name;

document.getElementById("greetingName").textContent =
  birthday.name + "!";

document.getElementById("letterName").textContent =
  birthday.name;

document.getElementById("giftMessage").textContent =
  birthday.giftMessage;

/* Gift opening and greeting transition */

const openGift = document.getElementById("openGift");
const cover = document.getElementById("cover");
const mainContent = document.getElementById("mainContent");

let giftOpened = false;

openGift.addEventListener("click", () => {
  if (giftOpened) return;
  giftOpened = true;

  openGift.classList.add("opening");
  launchConfetti(180);

  setTimeout(() => {
    cover.classList.add("hidden");
    mainContent.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
    launchConfetti(100);
  }, 650);
});

/* Interactive envelope */

const envelope = document.getElementById("envelope");
const envelopeButton = document.getElementById("envelopeButton");
const envelopeHint = document.getElementById("envelopeHint");

envelopeButton.addEventListener("click", () => {
  const isOpen = envelope.classList.toggle("open");

  envelopeButton.setAttribute("aria-expanded", isOpen);
  envelopeButton.setAttribute(
    "aria-label",
    isOpen ? "Close the birthday letter" : "Open the birthday letter"
  );

  envelopeHint.textContent = isOpen
    ? "A little message, just for you ♡"
    : "Tap the heart to open your letter ♡";

  if (isOpen) {
    launchConfetti(30);
  }
});

/* Interactive cake candles */

const candles = [...document.querySelectorAll(".candle")];
const wishMessage = document.getElementById("wishMessage");
const candleCount = document.getElementById("candleCount");

const wishMessages = [
  "One wish for happiness! ✨",
  "May love always find you. ❤️",
  "May your dreams come true! 🌟",
  "May every day bring you joy! 🌹",
  "Wish granted! Have the happiest birthday! 🎂"
];

candles.forEach((candle) => {
  candle.addEventListener("click", () => {
    if (candle.classList.contains("out")) return;

    candle.classList.add("out");

    const remaining = candles.filter(
      item => !item.classList.contains("out")
    ).length;

    const blownOut = candles.length - remaining;

    wishMessage.textContent = remaining === 0
      ? "All candles are out! May your birthday wish come true! ✨❤️"
      : wishMessages[blownOut - 1];

    candleCount.textContent = remaining === 0
      ? "All wishes sent into the universe ♡"
      : `${remaining} candle${remaining === 1 ? "" : "s"} still glowing`;

    launchConfetti(remaining === 0 ? 100 : 20);
  });
});

/* Browse the photo gallery */

let photoIndex = 0;

const galleryImage = document.getElementById("galleryImage");
const galleryCaption = document.getElementById("galleryCaption");
const galleryCount = document.getElementById("galleryCount");

function showPhoto(index) {
  const total = birthday.photos.length;
  photoIndex = (index + total) % total;

  const photo = birthday.photos[photoIndex];

  galleryImage.classList.add("changing");

  const newImage = new Image();

  newImage.onload = () => {
    galleryImage.src = photo.src;
    galleryImage.alt = photo.caption;
    galleryCaption.textContent = photo.caption;
    galleryCount.textContent = `${photoIndex + 1} / ${total}`;

    requestAnimationFrame(() => {
      galleryImage.classList.remove("changing");
    });
  };

  newImage.onerror = () => {
    galleryCaption.textContent =
      "Please check the photo path in your code.";
    galleryImage.classList.remove("changing");
  };

  newImage.src = photo.src;
}

document.getElementById("prevPhoto").addEventListener("click", () => {
  showPhoto(photoIndex - 1);
});

document.getElementById("nextPhoto").addEventListener("click", () => {
  showPhoto(photoIndex + 1);
});

/* Reveal the digital surprise */

const revealGift = document.getElementById("revealGift");
const surpriseContent = document.getElementById("surpriseContent");

revealGift.addEventListener("click", () => {
  surpriseContent.classList.toggle("hidden");

  const isVisible = !surpriseContent.classList.contains("hidden");

  revealGift.textContent = isVisible
    ? "♡ Hide Your Surprise"
    : "🎁 Reveal Your Gift";

  if (isVisible) {
    launchConfetti(120);
    surpriseContent.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

});

/* Toggle the quote box when the picture is clicked */
const picture = document.getElementById("picture");
const quoteBox = document.getElementById("quoteBox");

picture.addEventListener("click", function() {
    quoteBox.classList.toggle("show");
});


/* Lightweight canvas confetti — no external library needed */

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];
let animationRunning = false;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti(amount = 80) {
  const colors = [
    "#ff263f", "#ff8fa3", "#ffd5a5",
    "#ffffff", "#b8172d", "#f7c5cd"
  ];

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * (0.25 + Math.random() * 0.35),
      vx: (Math.random() - 0.5) * 7,
      vy: -Math.random() * 7 - 2,
      gravity: 0.13 + Math.random() * 0.08,
      size: 3 + Math.random() * 5,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 9,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 100 + Math.random() * 70
    });
  }

  if (!animationRunning) {
    animationRunning = true;
    requestAnimationFrame(drawConfetti);
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles = particles.filter(p => p.life > 0);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.rotation += p.spin;
    p.life--;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.globalAlpha = Math.min(1, p.life / 25);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
    ctx.restore();
  }

  if (particles.length > 0) {
    requestAnimationFrame(drawConfetti);
  } else {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    animationRunning = false;
  }
}

/* Initialize the first gallery photo */

showPhoto(0);
