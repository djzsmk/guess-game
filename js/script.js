
//test from desktop

//test from laptop

//second test from laptop

//test from desktop

const guessLetter = document.querySelector(".guessed-letters");
const guessButton =document.querySelector(".guess");
const letterInput =document.querySelector(".letter");
const challange =document.querySelector(".word-in-progress");
const chances =document.querySelector(".remaining");
const chancesSpan =document.querySelector("remaining.span");
const hint =document.querySelector(".message");
const redo =document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = []

const progress = function (word) {
    const progressLetters = [];
    for (const letter of word) {
        console.log(letter);
        progressLetters.push("●")
    }
    challange.innerText = progressLetters.join("");
};

progress(word);

guessButton.addEventListener ("click" , function (e) {
    e.preventDefault();
    hint.innerText = "";
    const guess = letterInput.value;
    //console.log(guess)
    const goodGuess = playerInput(guess)
    
    if(goodGuess) {
        makeGuess(guess)
    }
    letterInput.value = "";
});

const playerInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        hint.innerText = "Please enter a letter."
    } else if (input.length > 1 ) {
        hint.innerText = "One letter at a time please."
    } else if (!input.match(acceptedLetter)) {
        hint.innerText = "Letters A to Z only."
    } else {
        return input
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        hint.innerText = "That letter has already been guessed."
    } else {
        guessedLetters.push(guess)
        console.log(guessedLetters)
    };
}