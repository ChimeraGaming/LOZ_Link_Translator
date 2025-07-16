let gruntMap = {};
let reverseMap = {};
let mapsLoaded = false;

Promise.all([
  fetch("./grunt_map.json").then(res => res.json()),
  fetch("./reverse_map.json").then(res => res.json())
])
.then(([gruntData, reverseData]) => {
  gruntMap = gruntData;
  reverseMap = reverseData;
  mapsLoaded = true;
  console.log("Maps loaded.");
})
.catch(err => {
  console.error("Error loading JSON files:", err);
  alert("Failed to load grunt dictionaries. Please refresh or try again later.");
});

function runTranslation() {
  const input = document.getElementById("input").value.trim().toLowerCase();
  const mode = document.getElementById("mode").value;
  const outputDiv = document.getElementById("output");

  if (!mapsLoaded) {
    outputDiv.innerText = "Grunt dictionaries are still loading. Please try again in a few seconds.";
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

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("translateBtn").addEventListener("click", runTranslation);
});
