let gruntMap = {};
let reverseMap = {};

// GitHub Pages: relative path JSON loads
fetch("./grunt_map.json")
  .then(res => res.json())
  .then(data => {
    gruntMap = data;
    console.log("Grunt map loaded");
  })
  .catch(err => console.error("Failed to load grunt_map.json", err));

fetch("./reverse_map.json")
  .then(res => res.json())
  .then(data => {
    reverseMap = data;
    console.log("Reverse map loaded");
  })
  .catch(err => console.error("Failed to load reverse_map.json", err));

function translate() {
  const input = document.getElementById("input").value.trim().toLowerCase();
  const mode = document.getElementById("mode").value;
  const outputDiv = document.getElementById("output");

  if (!input) {
    outputDiv.innerText = "Please enter something!";
    return;
  }

  if (mode === "eng-to-grunt") {
    const words = input.split(/\s+/);
    const result = words.map(w => gruntMap[w] || "[??]").join(" ");
    outputDiv.innerText = result;
  } else {
    const grunts = input.split(/\s+/);
    const result = grunts.map(g => reverseMap[g] || "[??]").join(" ");
    outputDiv.innerText = result;
  }
}
