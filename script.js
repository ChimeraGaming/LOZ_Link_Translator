// script.js

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
      return GRUNT_MAP[word] || word;
    } else {
      return REVERSE_MAP[word] || word;
    }
  });

  outputDiv.innerText = translated.join(" ");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("translateBtn");
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 150);
    runTranslation();
  });
});
