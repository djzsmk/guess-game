
//test from desktop

//test from laptop

//second test from laptop

//test from desktop

const guessLetter = document.querySelector(".guessed-letters");
const guessButton =document.querySelector(".guess");
const letterInput =document.querySelector("letter");
const challange =document.querySelector(".word-in-progress");
const chances =document.querySelector(".remaining");
const chancesSpan =document.querySelector("remaining.span");
const hint =document.querySelector(".message");
const redo =document.querySelector(".play-again");

const word = "magnolia";

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
    const guess = letterInput.value;
    console.log(guess)
    letterInput,value = "";
});

