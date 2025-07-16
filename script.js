const gruntMap = GRUNT_MAP;
const reverseMap = REVERSE_MAP;
let totalTranslations = 0;

function runTranslation() {
  const input = document.getElementById("input").value.trim().toLowerCase();
  const mode = document.getElementById("mode").value;
  const outputDiv = document.getElementById("output");

  if (!input) {
    outputDiv.innerText = "Please enter something!";
    return;
  }

  const words = input.split(/\s+/);
  const translated = words.map(word => {
    if (mode === "eng-to-grunt") {
      return gruntMap[word] || word;
    } else {
      return Object.entries(gruntMap).find(([, val]) => val === word)?.[0] || word;
    }
  });

  const result = translated.join(" ");
  outputDiv.innerText = result;
  totalTranslations++;
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("translateBtn");
  const copyBtn = document.getElementById("copyBtn");

  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 150);
    runTranslation();
  });

  copyBtn.addEventListener("click", () => {
    const text = document.getElementById("output").innerText;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.innerText = "Copied!";
      setTimeout(() => copyBtn.innerText = "Copy", 1200);
    });
  });
});
