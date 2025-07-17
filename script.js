// Total translations counter (for future use)
let totalTranslations = 0;

document.addEventListener("DOMContentLoaded", () => {
  const directionSelect = document.getElementById("directionSelect");
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const translateButton = document.getElementById("translateButton");
  const copyButton = document.getElementById("copyButton");

  // Log when translation direction is changed
  directionSelect.addEventListener("change", () => {
    console.log(`[Link Translator] Switched direction to: ${directionSelect.value}`);
  });

  translateButton.addEventListener("click", () => {
    const direction = directionSelect.value;
    const input = inputText.value.trim();
    let result = "";

    if (direction === "english-to-grunt") {
      console.log(`[Link Translator] Translating English → Grunt: "${input}"`);
      result = translateEnglishToGrunt(input);
    } else {
      console.log(`[Link Translator] Translating Grunt → English: "${input}"`);
      result = translateGruntToEnglish(input);
    }

    outputText.textContent = result;
    totalTranslations++;
    console.log(`[Link Translator] Total translations so far: ${totalTranslations}`);
  });

  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(outputText.textContent).then(() => {
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1500);
    });
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
      matches.push(buffer); // fallback for unmatched
    }
  }

  return matches.join(" ");
}
