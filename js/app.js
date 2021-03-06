/**
 * Object contains all words and relative suggestion
 */
const words = [
  { word: "WORD", suggest: "You must guess the ..." },
  { word: "DOG", suggest: "The human best friend" },
  { word: "SUBMARINE", suggest: "Warship used underwater" },
  { word: "ARACHNOPHOBIA", suggest: "Fear of spiders" },
  { word: "HOME", suggest: "The place where you're living" },
  { word: "AEROPLANE", suggest: "Flying vehicle with fixed wings" },
];

let alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(" ");

const attempSpan = document.querySelector(".attemps");
const lettersSpan = document.querySelector(".letters");

let attemps;
let errors;
let wordToGuess;
let usedLetters;
let displayWord;
let position;
let wordSelector = Math.round(Math.random() * words.length - 1); //generate a random number between 1 and words lenght

/**
 * Inizialize game by reset all variables
 */
(function () {
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
  initKeyboard();
})();

/**
 * Generate a random number between 1 and words[].lenght
 * than take one word, mask it with '-' and display it
 */
function selectWord() {
  wordToGuess = words[wordSelector].word; //take one word in the array
  let maskeredWord = maskWord(wordToGuess); //mask the word with "_"
  document.game.finalWord.value = maskeredWord; //display maskered word
  displayWord = maskeredWord;
  console.log(wordToGuess + ", " + displayWord);
}

function initKeyboard() {
  for (let i = 0; i < alphabet.length; i++) {
    let div = document.createElement("div");
    document.querySelector(".container").appendChild(div);
    div.innerText = alphabet[i];
    div.addEventListener("click", function () {
      userSelect(alphabet[i]);
    });
  }
}

/**
 * This function make the mask of the selected word
 * @param {string} word the word randomly chosen
 */
function maskWord(word) {
  let mask = "";
  for (let i = 0; i < word.length; i++) mask += "-";
  return mask;
}

/**
 * This function take the letter chosen by the user
 * and elaborate it make the game works
 *
 * @param {string} letter the letter chosen by user
 */
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

    checkErrors();
  }
}

/**
 * This function check the errors
 * and suggest the user
 */
function checkErrors() {
  if (attemps <= 3)
    document.querySelector(
      ".suggest"
    ).innerHTML = `<b>SUGGEST:</b> ${words[wordSelector].suggest}`;
  if (errors == 5) {
    alert("Hai perso!\nLa parola era: " + wordToGuess);
    newGame();
  }
}

/**
 * This function is load after game is finished,
 * and ask the user if he/she want play again
 */
function newGame() {
  let choose = prompt("Vuoi fare un'altra partita? Y/N", "");
  if (choose.toLowerCase() === "y") window.location.reload();
  else alert("Ok! Grazie per aver giocato!");
}
