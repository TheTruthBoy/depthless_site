const lines = {
  opening1: "Brands, audiences, media, culture, ideas<br>they aren’t separate",
  opening2: "Meaning is what connects them",
  line4: "Depthless makes the structure<br>visible, comparable, and navigable",
  line5: "Meaning connects everything"
};

const textStage = document.getElementById("textStage");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const brandBlock = document.getElementById("brandBlock");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const FADE = 2000;
const HOLD = 4500;
const FINAL = 6000;

function setMode(mode) {
  textStage.classList.remove("opening", "single");
  textStage.classList.add(mode);
}

function prepare(el, html = "") {
  el.innerHTML = html;
  el.style.opacity = "0";
}

async function fadeIn(el, html = null) {
  if (html !== null) {
    el.innerHTML = html;
  }

  el.style.opacity = "0";
  el.getBoundingClientRect();

  const anim = el.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    {
      duration: FADE,
      easing: "ease",
      fill: "forwards"
    }
  );

  await anim.finished;
  el.style.opacity = "1";
}

async function fadeOut(el) {
  const currentOpacity = getComputedStyle(el).opacity;

  const anim = el.animate(
    [{ opacity: currentOpacity }, { opacity: 0 }],
    {
      duration: FADE,
      easing: "ease",
      fill: "forwards"
    }
  );

  await anim.finished;
  el.style.opacity = "0";
}

async function opening() {
  setMode("opening");

  // Put both lines in place from the start so no layout jump
  prepare(line1, lines.opening1);
  prepare(line2, lines.opening2);

  await fadeIn(line1);
  await sleep(HOLD);

  await fadeIn(line2);
  await sleep(HOLD);

  await Promise.all([
    fadeOut(line1),
    fadeOut(line2)
  ]);

  setMode("single");

  brandBlock.classList.add("is-visible");

  await fadeIn(line1, lines.line4);
  await sleep(HOLD);

  await fadeOut(line1);

  await fadeIn(line1, lines.line5);
  await sleep(FINAL);

  await fadeOut(line1);
}

(async () => {
  while (true) {
    await opening();
    await sleep(2000);
  }
})();
