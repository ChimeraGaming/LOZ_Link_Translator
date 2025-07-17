let totalTranslations = 0;

// Normalize REVERSE_MAP once for reverse translation
const normalizedReverseMap = {};
for (const key in REVERSE_MAP) {
  normalizedReverseMap[key.toLowerCase()] = REVERSE_MAP[key];
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
    console.log(`[Link Translator] Switched direction to: ${directionSelect.value}`);
  });

  translateButton?.addEventListener("click", () => {
    const direction = directionSelect.value;
    const input = inputText.value.trim();
    let result = "";

    if (direction === "english-to-grunt") {
      result = translateEnglishToGrunt(input);
    } else {
      result = translateGruntToEnglish(input);
    }

    outputText.textContent = result;
    totalTranslations++;
    document.getElementById("count-number").innerText = totalTranslations;

    // Easter egg: background change if input is exactly "alone"
    if (input.toLowerCase() === "alone") {
      document.body.style.backgroundImage = "url('https://i.ibb.co/CKVTNBW/alone-bg.png')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
    }
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
