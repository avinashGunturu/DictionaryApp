const main = document.querySelector(".main_container");
const btn = document.querySelector(".btn");
const form = document.querySelector(".sub");
const input = document.querySelector(".input");
const notFound = document.querySelector(".Not_found");
const meaning = document.querySelector(".text-meaning");
const audioMeaning = document.querySelector(".audio-meaning");

let apiKey = "fd3b4f48-e58c-45c6-bb95-1f831b00a7c0";

btn.addEventListener("click", (e) => {
  main.classList.toggle("active");
  input.focus();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  audioMeaning.innerHTML = "";
  notFound.innerHTML = "";
  meaning.innerHTML = "";
  const word = input.value;
  input.value = "";

  getData(word);
});

async function getData(word) {
  const res = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`
  );
  const data = await res.json();
  if (!data.length) {
    notFound.innerHTML = "<h2>No result found</h2>";
    return;
  }
  if (typeof data[0] === "string") {
    let heading = document.createElement("h3");
    heading.innerText = "Did you mean ?";
    notFound.appendChild(heading);
    data.forEach((element) => {
      let suggestion = document.createElement("span");
      suggestion.classList.add("suggestion");
      suggestion.innerText = element;
      notFound.appendChild(suggestion);
    });
    return;
  }

  let defination = data[0].shortdef[0];
  meaning.innerText = defination;

  let soundName = data[0].hwi.prs[0].sound.audio;
  if (soundName) {
    renderSound(soundName);
  }
}

function renderSound(soundName) {
  let subFolder = soundName.charAt(0);
  let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${apiKey}`;

  let aud = document.createElement("audio");
  aud.src = soundSrc;
  aud.controls = true;
  audioMeaning.appendChild(aud);
}
