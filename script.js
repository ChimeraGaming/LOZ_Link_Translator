const gruntMap = GRUNT_MAP;
const reverseMap = REVERSE_MAP;

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
      // Fix: Check for matching value in gruntMap and return its key
      const match = Object.keys(gruntMap).find(key => gruntMap[key].toLowerCase() === word.toLowerCase());
      return match || word;
    }
  });

  outputDiv.innerText = translated.join(" ");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("translateBtn").addEventListener("click", () => {
    runTranslation();
  });

  document.getElementById("copyBtn").addEventListener("click", () => {
    const output = document.getElementById("output").innerText;
    navigator.clipboard.writeText(output).then(() => {
      alert("Copied!");
    });
  });
});
