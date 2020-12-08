const words = ["PAROLA", "CANE", "PROVA", "ANGELICA"];

const attempSpan = document.querySelector(".attemps");
const lettersSpan = document.querySelector(".letters");

let attemps = 5;
let errors;
let wordToGuess = "";
let usedLetters = "";
let displayWord = "";
let position = 0;

attempSpan.innerHTML = `${attemps}`;
lettersSpan.innerHTML = `${usedLetters}`;

window.onload = initGame();

function initGame() {
  //RESET VALUES
  selectWord();
  errors = 0;
  attemps = 5;

  // ANIMATIONS
  const bg = document.querySelector(".background");
  const title = document.querySelector("h1");

  bg.animate([{ bottom: "-100%" }, { bottom: "0" }], 700);
  title.animate(
    [{ transform: "translateY(-700px)" }, { transform: "translateY(0)" }],
    700
  );
  document.game.finalWord.animate(
    [{ transform: "translateY(-700px)" }, { transform: "translateY(0)" }],
    700
  );
}

function selectWord() {
  let wordSelector = Math.round(Math.random() * words.length - 1); //generate a random number between 1 and words lenght
  wordToGuess = words[wordSelector]; //take one word in the array
  let maskeredWord = maskWord(wordToGuess); //mask the word with "_"
  document.game.finalWord.value = maskeredWord; //display maskered word
  displayWord = maskeredWord;
  console.log(wordToGuess + ", " + displayWord);
}

function maskWord(word) {
  let mask = "";
  for (let i = 0; i < word.length; i++) mask += "-";
  return mask;
}