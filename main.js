const TEXTS = [
  "Most of us wonder if there is a God and if He really is the God of the Bible. In the Bible God says I will make your name great and today the name of Abraham/Abram is known worldwide. This promise has come true. The earliest copy of Genesis found in the Dead Sea Scrolls is dated 200-100 B.C. which means the promise has been in writing since at least that time. At that time the name of Abraham was not well-known so the promise came true only after it was written down, not before.",
  "The Jews who descended from Abraham were never really the nation we associate with greatness.  They did not conquer and build a great empire like the Romans did or build large monuments like the Egyptians did with the pyramids. Their fame comes from the Law and Book which they wrote; from some remarkable individuals that were Jewish; and that they have survived as a somewhat different people group for thousands of years.  Their greatness is not because of anything they did, but rather what was done to and through them. ",
  "Surprisingly Abraham really did nothing important in his life.  He was not a great writer, king, inventor or military leader.  He did nothing except camp out where he was told to go and father a few children.  His name is great only because the children became nation(s) that kept the record of his life – and then individuals and nations that came from him became great.  This is exactly how it was promised in Genesis 12 (I will make you into a great nation … I will make your name great).  No one else in all history is so well-known only because of descendants rather than from great achievements in his own life.",
  "The Khao San Road was a famous traveller spot even before Leonardo di Caprio's character in the film The Beach stayed there. But it's noisy, not very pretty and not very Thai. For something more authentic, Phra Kanong offers an alternative place to stay, with its fantastic street markets where everyday Bangkok people eat, work and live. It's not as convenient for the main tourist sites, but it has a Skytrain station so you can be at the Grand Palace in 20 minutes.",
  "Bangkok's traffic can be a nightmare. Sure, you can easily take a taxi – if you want to spend hours stuck in traffic jams – but there are two much better ways to get around the city. To explore the temples and historical sites, catch an express boat river taxi or a longtail boat along the Chao Phraya river and the canals. For the modern part of the city, the Skytrain is a fast, cheap way to travel from the river to the shopping malls and nightlife of Sukhumvit, and the famous Chatuchak street market.",
];
const TIMER = 30;

let CURRENT_TEXT;
let CURRENT_POSITION = 0;
let MISTAKES = [];
let errors = 0;
let rights = 0;
let leftSeconds;
let isFinished = false;

init();

function init() {
  initData();
  setText(CURRENT_TEXT);
  setPosition(CURRENT_POSITION);
  setErrorsCount(errors);
  setRightsCount(rights);
}

function initData() {
  CURRENT_TEXT = TEXTS[Math.floor(Math.random() * TEXTS.length)];
  errors = 0;
  rights = 0;
  leftSeconds = TIMER;
  MISTAKES = [];
  document.getElementById("timer").innerHTML = leftSeconds;
}

function setText(text) {
  const playground = document.getElementById("playground");
  playground.innerText = text;
}

function startTimer() {
  const intervalId = setInterval(() => {
    document.getElementById("timer").innerHTML = --leftSeconds;
    if (leftSeconds === 0) {
      showTheEnd();
      isFinished = true;

      clearInterval(intervalId);
    }
  }, 1000);
}

function setPosition(index) {
  const playground = document.getElementById("playground");
  const text = playground.innerText;
  playground.innerHTML =
    text.slice(0, index) +
    `<span class="current">${text.slice(index, index + 1)}</span>` +
    text.slice(index + 1);
}

function showTheEnd() {
  alert(`O'yin tugadi!
        To'g'ri: ${rights}
        Noto'g'ri: ${errors}
        `);
}

function resetMistakesAndPosition(mistakes) {
  let innerHtml = "";
  let lastMistakenIndex = -1;
  const playground = document.getElementById("playground");
  const text = playground.innerText;
  if (mistakes.length) {
    innerHtml += text.slice(0, mistakes[0]);
    for (let i = 0; i < mistakes.length - 1; i++) {
      const index = mistakes[i];
      innerHtml +=
        `<span class="mistake">${text.slice(index, index + 1)}</span>` +
        text.slice(index + 1, mistakes[i + 1]);
    }
    lastMistakenIndex = mistakes[mistakes.length - 1];
    innerHtml += `<span class="mistake">${text.slice(
      lastMistakenIndex,
      lastMistakenIndex + 1
    )}</span>`;
  }

  innerHtml +=
    text.slice(lastMistakenIndex + 1, CURRENT_POSITION) +
    `<span class="current">${text.slice(
      CURRENT_POSITION,
      CURRENT_POSITION + 1
    )}</span>` +
    text.slice(CURRENT_POSITION + 1);
  playground.innerHTML = innerHtml;
  setErrorsCount(errors);
  setRightsCount(rights);
}

function setErrorsCount(count) {
  document.getElementById("errorsCount").innerText = count;
}

function setRightsCount(count) {
  document.getElementById("rightsCount").innerText = count;
}

document.addEventListener("keyup", (event) => {
  listenInpt(event);
});

function listenInpt(e) {
  if (e.key === "Shift" || e.key === "F5") {
    return;
  }

  if (isFinished) {
    showTheEnd();
    return;
  }

  if (CURRENT_POSITION === 0) {
    startTimer();
  }

  /**
   * 32 - space
   * 8 - Backspace
   */
  const keyCode = e.keyCode;
  if (keyCode === 8) {
    CURRENT_POSITION--;
    if (MISTAKES[MISTAKES.length - 1] === CURRENT_POSITION) {
      MISTAKES.pop();
      errors--;
    } else {
      rights--;
    }
  } else {
    if (CURRENT_POSITION < CURRENT_TEXT.length) {
      if (e.key === CURRENT_TEXT[CURRENT_POSITION]) {
        rights++;
        leftSeconds++;
      } else {
        errors++;
        MISTAKES.push(CURRENT_POSITION);
      }
      CURRENT_POSITION++;
    }
  }
  resetMistakesAndPosition(MISTAKES);

  if (CURRENT_POSITION === CURRENT_TEXT.length) {
    showTheEnd();
    isFinished = true;
    return;
  }
}
