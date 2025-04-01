// IMG SEQ
const canvas = document.getElementById("scroll-gol");
const context = canvas.getContext("2d");

// Check screen width and set canvas properties accordingly
const isMobile = window.innerWidth < 640; // Tailwind's sm breakpoint (~640px)

canvas.width = isMobile ? 517 : 1636;
canvas.height = 920;

const frameCount = 35;
const currentFrame = (index) =>
  isMobile
    ? `img/mobile/salas_${(index + 1).toString().padStart(2, "0")}.webp`
    : `img/desktop/salas_${(index + 1).toString().padStart(2, "0")}.webp`;

const images = [];
const salasScroll = { frame: 0 };

// Preload images
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(salasScroll, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: ".canvas-container",
    start: "top top",
    end: "+=2000",
    markers: false,
    pin: true,
    scrub: 0.5,
  },
  onUpdate: render,
});

images[0].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[Math.round(salasScroll.frame)], 0, 0);
}

// Optional: Update canvas dynamically when resizing window
window.addEventListener("resize", () => {
  const isMobile = window.innerWidth < 640;
  canvas.width = isMobile ? 517 : 1636;
});

// IMG DIVIDER
gsap.to(".marquee-track.r img", {
  scrollTrigger: {
    trigger: ".marquee-track.r img",
    end: "bottom top",
    scrub: 1,
  },
  xPercent: -125,
  duration: 1,
  ease: "linear",
});

gsap.to(".marquee-track.l img", {
  scrollTrigger: {
    trigger: ".marquee-track.l img",
    start: "top bottom",
    end: "400% top",
    scrub: 1,
  },
  xPercent: 125,
  duration: 1,
  ease: "linear",
});

// FRAME GOL
gsap.registerPlugin(ScrollTrigger);

const scrollPanels = gsap.utils.toArray(".horizontal-panel");

gsap.to(scrollPanels, {
  xPercent: 105 * (scrollPanels.length - 1), // Moves panels left, stopping at Panel D
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll",
    pin: true,
    scrub: 1,
    end: () => "+=" + window.innerWidth * (scrollPanels.length - 1), // Stops at Panel D
  },
});
