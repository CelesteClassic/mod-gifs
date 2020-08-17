let database;
let xhr = new XMLHttpRequest();
xhr.open("GET", "database.json");
xhr.send();
xhr.onload = () => {
  database = JSON.parse(xhr.responseText);
}

function getGifs(searchTags) {
  return database.filter(gif => {
    for (let tag of searchTags)
      if (!gif.tags.includes(tag))
        return false;
    return true;
  });
}

// Tags that will show up as examples
var allTags = ["any", "hundo", "trueskip", "everred", "noot", "sparkleste"];
var everredTags = ["any", "hundo", "trueskip", "gemskip"];
var nootTags = ["any", "hundo"];
var adelieTags = ["any", "hundo", "gemskip"];
var sparklesteTags = ["any", "hundo"];

var tagsField = document.getElementById("tags");
var modSelect = document.getElementById("modName");
let textbox = document.getElementById('search')
let submitButton = document.getElementById('submit');

textbox.addEventListener("keyup", (e) => {
  if (e.keyCode === 13)
    submitButton.click();
});

// Function that changes the example tags based on the selected dropdown option
function changeTags() {
  var modName = modSelect.options[modSelect.selectedIndex].value;
  switch (modName) {
    case "all":
      tagsField.innerHTML = allTags.join(', ');
      break;
    case "everred":
      tagsField.innerHTML = everredTags.join(', ');
      break;
    case "adelie":
      tagsField.innerHTML = adelieTags.join(', ');
      break;
    case "noot":
      tagsField.innerHTML = nootTags.join(', ');
      break;
    case "sparkleste":
      tagsField.innerHTML = sparklesteTags.join(', ');
      break;
  }
}
// Funtion to be triggered when the dropdown value changes
modSelect.addEventListener("change", changeTags);

submitButton.addEventListener('click', () => {
  var modName = modSelect.options[modSelect.selectedIndex].value;
  if (modName == "all") {
    querry = textbox.value;
  }
  else {
    querry = textbox.value + ' ' + modName;
  }
  let searchTags = new Set(querry.split(/\s+/).filter(x => x != ''));
  if (searchTags.size == 0)
    return;

  let content = document.getElementById('content');
  while (content.firstChild) {
    content.firstChild.remove();
  }

  let gifResults = getGifs(searchTags);
  for (let gif of gifResults) {
    let img = document.createElement("img");
    img.src = gif.url;
    img.title = 'Tags: ' + gif.tags.join(", ");

    content.appendChild(img);
  }
});

window.onload = changeTags();
