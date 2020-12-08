const words = ["PAROLA", "CANE", "PROVA", "ANGELICA"];

const attempSpan = document.querySelector(".attemps");
const lettersSpan = document.querySelector(".letters");

let attemps;
let errors;
let wordToGuess = "";
let usedLetters = "";
let displayWord = "";

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
