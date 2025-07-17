let easterEggsFound = 0;
const foundEggs = new Set();

const EASTER_EGGS = [
  {
    id: "dangerous",
    triggers: [
      "dangerous to go alone",
      "it's dangerous to go alone",
      "its dangerous to go alone",
      "It’s dangerous to go alone",
      "It's dangerous to go alone!",
      "it's dangerous to go alone!",
      "dangerous to go alone!"
    ],
    action: () => {
      alert("Take this.");
      document.body.style.backgroundImage =
        "url('https://i.ibb.co/TMPFpcrG/image.png')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    },
    overrideText: "Take this 🗡️"
  },
  {
    id: "hey-listen",
    triggers: [
      "hey listen",
      "Hey Listen",
      "HEY LISTEN",
      "Hey, listen",
      "hey, listen!",
      "hey, listen",
      "hey! listen!"
    ],
    action: () => {
      alert("HEY! LISTEN!");
    },
    overrideText: "✨ You can't ignore me forever! ✨"
  }
];

function normalizeInput(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/gi, "")
    .trim();
}

document.addEventListener("DOMContentLoaded", () => {
  const directionSelect = document.getElementById("directionSelect");
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const translateButton = document.getElementById("translateButton");
  const copyButton = document.getElementById("copyButton");
  const darkToggle = document.getElementById("toggleDarkMode");
  const darkIcon = document.getElementById("darkModeIcon");

  directionSelect?.addEventListener("change", () => {
    console.log(
      `[Link Translator] Switched direction to: ${directionSelect.value}`
    );
  });

  translateButton?.addEventListener("click", () => {
    const direction = directionSelect.value;
    const input = inputText.value.trim();
    const normalized = normalizeInput(input);

    let override = null;
    EASTER_EGGS.forEach(({ triggers, action, overrideText, id }) => {
      if (triggers.some((trigger) => normalized.includes(normalizeInput(trigger)))) {
        if (!foundEggs.has(id)) {
          foundEggs.add(id);
          easterEggsFound++;
        }
        action();
        override = overrideText;
      }
    });

    const result = override
      ? override
      : direction === "english-to-grunt"
        ? translateEnglishToGrunt(input)
        : translateGruntToEnglish(input);

    outputText.textContent = result;
    document.getElementById("count-number").innerText = `Easter Eggs Found: ${easterEggsFound}/2`;
  });

  copyButton?.addEventListener("click", () => {
    navigator.clipboard.writeText(outputText.textContent).then(() => {
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1500);
    });
  });

  darkToggle?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    darkIcon.src = isDark ? "sun.png" : "moon.png";
  });
});

function translateEnglishToGrunt(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => GRUNT_MAP[word] || word)
    .join("-");
}

function translateGruntToEnglish(text) {
  const words = text.trim().toLowerCase().split(/[\s\-]+/);
  const matches = [];
  let buffer = "";

  const normalizedReverseMap = {};
  for (const key in REVERSE_MAP) {
    normalizedReverseMap[key.toLowerCase()] = REVERSE_MAP[key];
  }

  for (let i = 0; i < words.length; i++) {
    buffer += (buffer ? "-" : "") + words[i];

    if (normalizedReverseMap[buffer]) {
      matches.push(normalizedReverseMap[buffer]);
      buffer = "";
    } else if (i === words.length - 1 && buffer) {
      matches.push(buffer);
    }
  }

  return matches.join(" ");
}
