let mapsLoaded = false;
let gruntMap = {};
let reverseMap = {};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof GRUNT_MAP === 'undefined' || typeof REVERSE_MAP === 'undefined') {
    console.error("Dictionaries not loaded.");
    alert("Failed to load grunt dictionaries. Please refresh or try again later.");
    return;
  }

  gruntMap = GRUNT_MAP;
  reverseMap = REVERSE_MAP;
  mapsLoaded = true;
  console.log("Maps loaded.");

  document.getElementById("translateBtn").addEventListener("click", runTranslation);
});

function runTranslation() {
  const input = document.getElementById("input").value.trim().toLowerCase();
  const mode = document.getElementById("mode").value;
  const outputDiv = document.getElementById("output");

  if (!mapsLoaded) {
    outputDiv.innerText = "Grunt dictionaries are still loading. Please try again.";
    return;
  }

  if (!input) {
    outputDiv.innerText = "Please enter something!";
    return;
  }

  const words = input.split(/\s+/);

  const translated = words.map(word => {
    if (mode === "eng-to-grunt") {
      return gruntMap[word] || word;
    } else {
      return reverseMap[word] || word;
    }
  });

  outputDiv.innerText = translated.join(" ");
}
