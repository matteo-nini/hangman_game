const words = ["PAROLA", "CANE", "PROVA", "ANGELICA"];

const attempSpan = document.querySelector(".attemps");
const lettersSpan = document.querySelector(".letters");

let attemps;
let errors;
let wordToGuess;
let usedLetters;
let displayWord;
let position;

window.onload = initGame();

function initGame() {
  //RESET VALUES
  errors = 0;
  attemps = 5;
  wordToGuess = "";
  displayWord = "";
  usedLetters = "";
  position = 0;
  attempSpan.innerHTML = `${attemps}`;
  lettersSpan.innerHTML = `${usedLetters}`;
  selectWord();
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

function userSelect(letter) {
  //Check if the user just click the letter
  if (usedLetters.indexOf(letter) != -1) {
    return;
  } else {
    //add the selected letter in the selected list
    usedLetters += letter;
    lettersSpan.innerHTML = `${usedLetters}` + ", ";
  }

  //if the word to guess contains the letter
  if (wordToGuess.indexOf(letter, position) != -1) {
    let temporaryMask = displayWord; //create a temporary mask and assign it the word (maskered)

    while (wordToGuess.indexOf(letter, position) != -1) {
      position = wordToGuess.indexOf(letter, position); //than take the position of the letter
      let end = position + 1; //and the position right next it

      //create the mask from 0 to the letter position
      let startTxt = temporaryMask.substring(0, position);
      let endTxt = temporaryMask.substring(end, temporaryMask.length);
      temporaryMask = startTxt + letter + endTxt;
      position = end;
    }

    //re-assign the maskered word with the no-maskered letters
    displayWord = temporaryMask;
    document.game.finalWord.value = displayWord;

    //If the word does not contains no more mask you win
    if (displayWord.indexOf("-") == -1) {
      alert("Hai vinto");
      newGame();
    }

    //if the word to guess does not contains the letter
  } else {
    errors++;
    attemps--;
    attempSpan.innerHTML = `${attemps}`;

    //check the errors (or the attemps)
    if (attemps == 0 || errors == 5) {
      alert("Hai perso!\nLa parola era: " + wordToGuess);
      newGame();
    }
  }
}

//new game function
function newGame() {
  let choose = prompt("Vuoi fare un'altra partita? Y/N", "");
  if (choose == "Y") window.location.reload();
  else alert("Ok! Grazie per aver giocato!");
}
