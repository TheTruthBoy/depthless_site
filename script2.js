const lines = [
    "Why does the same idea mean something completely different to different people?",
    "How can we tell whether an idea will be adopted, resisted or ignored?",
    "And what can that tell us about how to drive growth or change?",
    "If your system could answer these questions, what would change?",
    "The ability to see and shape how ideas will be received before they’re expressed",
    "See and shape how ideas will be received<br>and act where opportunity is strongest"
  ];
  
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const FADE = 800;
  const HOLD = 2000;
  const FINAL_HOLD = 3000;
  const PAUSE = 400;
  const videoFrame = document.querySelector(".video-frame");
  const video = document.getElementById("demoVideo");
  
  function prepareLine(text) {
    line1.innerHTML = text;
    line1.style.opacity = "0";
    line2.innerHTML = "";
    line2.style.opacity = "0";
  }
  
  async function fadeIn(el) {
    const anim = el.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: FADE, easing: "ease", fill: "forwards" }
    );
  
    await anim.finished;
    el.style.opacity = "1";
  }
  
  async function fadeOut(el) {
    const currentOpacity = getComputedStyle(el).opacity;
  
    const anim = el.animate(
      [{ opacity: currentOpacity }, { opacity: 0 }],
      { duration: FADE, easing: "ease", fill: "forwards" }
    );
  
    await anim.finished;
    el.style.opacity = "0";
  }
  
  async function showLine(text, holdTime = HOLD) {
    prepareLine(text);
    await fadeIn(line1);
    await sleep(holdTime);
    await fadeOut(line1);
    await sleep(PAUSE);
  }
  
  async function run() {
    for (let i = 0; i < lines.length; i++) {
      const isFinal = i === lines.length - 1;
  
      prepareLine(lines[i]);
      await fadeIn(line1);
      await sleep(isFinal ? FINAL_HOLD : HOLD);
  
      if (!isFinal) {
        await fadeOut(line1);
        await sleep(PAUSE);
      }
    }
  
    await sleep(800);
    videoFrame.classList.add("is-visible");
    video.play();
  }
  
  run();