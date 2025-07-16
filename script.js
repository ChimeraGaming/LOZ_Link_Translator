let gruntMap = {};
let reverseMap = {};
let mapsLoaded = false;

// Load both JSON maps
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
  .catch((err) => {
    console.error("Error loading JSON files:", err);
    alert("Failed to load grunt dictionaries. Please refresh or try again later.");
  });

function runTranslation() {
  const input = document.getElementById("input").value.trim().toLowerCase();
  const mode = document.getElementById("mode").value;
  const outputDiv = document.getElementById("output");

  if (!mapsLoaded) {
    outputDiv.value = "Grunt dictionaries are still loading. Please try again in a few seconds.";
    return;
  }

  if (!input) {
    outputDiv.value = "Please enter something!";
    return;
  }

  let result = "";

  if (mode === "eng-to-grunt") {
    const words = input.split(/\s+/);
    result = words.map(w => gruntMap[w] || "[??]").join(" ");
  } else {
    const grunts = input.split(/\s+/);
    result = grunts.map(g => reverseMap[g] || "[??]").join(" ");
  }

  outputDiv.value = result;
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("translateBtn");

  button.addEventListener("click", () => {
    button.classList.add("pressed");
    runTranslation();
    setTimeout(() => button.classList.remove("pressed"), 150);
  });
});
