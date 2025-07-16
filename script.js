let gruntMap = {};
let reverseMap = {};
let mapsLoaded = false;

// Load both JSON maps
Promise.all([
  fetch("./grunt_map.json").then(res => res.json()),
  fetch("./reverse_map.json").then(res => res.json())
]).then(([gruntData, reverseData]) => {
  gruntMap = gruntData;
  reverseMap = reverseData;
  mapsLoaded = true;
  console.log("Maps loaded.");
}).catch(err => {
  console.error("Error loading JSON files:", err);
  alert("Failed to load grunt dictionaries. Please refresh or try again later.");
});

// Translation logic
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

  if (mode === "eng-to-grunt") {
    const words = input.split(/\s+/);
    const result = words.map(w => gruntMap[w] || w).join(" ");
    outputDiv.innerText = result;
  } else {
    const grunts = input.split(/\s+/);
    const result = grunts.map(g => reverseMap[g] || g).join(" ");
    outputDiv.innerText = result;
  }
}

// Attach event listener when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("translateBtn");
  button.addEventListener("click", runTranslation);
});
