const lines = {
  opening1: "Brands, audiences, media, culture, ideas<br>they aren’t separate",
  opening2: "Meaning is what connects them",
  line3: "Meaning is the way in",
  line4: "Depthless makes the structure<br>visible, comparable, and navigable",
  line5: "Meaning connects everything"
};

const ambientLines = [
  lines.opening2,
  lines.line3,
  lines.line4,
  lines.line5
];

const textStage = document.getElementById("textStage");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const brandBlock = document.getElementById("brandBlock");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FADE = 2000;
const HOLD = 4500;
const FINAL = 6000;

function setMode(mode) {
  textStage.classList.remove("opening", "single");
  textStage.classList.add(mode);
}

function show(el, html) {
  el.innerHTML = html;
  requestAnimationFrame(() => el.classList.add("is-visible"));
}

function hide(el) {
  el.classList.remove("is-visible");
}

async function opening() {
  setMode("opening");

  line1.innerHTML = lines.opening1;
  line2.innerHTML = lines.opening2;

  line1.classList.remove("is-visible");
  line2.classList.remove("is-visible");

  await sleep(40);

  line1.classList.add("is-visible");

  await sleep(HOLD);

  line2.classList.add("is-visible");
  await sleep(HOLD);

  line1.classList.remove("is-visible");
  line2.classList.remove("is-visible");
  await sleep(FADE);

  setMode("single");

  show(line1, lines.line3);
  await sleep(HOLD);

  brandBlock.classList.add("is-visible");

  hide(line1);
  await sleep(FADE);

  show(line1, lines.line4);
  await sleep(HOLD);

  hide(line1);
  await sleep(FADE);

  show(line1, lines.line5);
  await sleep(FINAL);
}

function randomLine(prev) {
  let next;
  do {
    next = ambientLines[Math.floor(Math.random() * ambientLines.length)];
  } while (next === prev);
  return next;
}

async function ambient() {
  let current = lines.line5;

  while (true) {
    const next = randomLine(current);
    hide(line1);
    await sleep(FADE);
    show(line1, next);
    await sleep(HOLD);
    current = next;
  }
}

(async () => {
  await sleep(200);
  while (true) {
    await opening();
    await sleep(2000);
  }
})();
