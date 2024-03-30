
//test from desktop

//test from laptop

//second test from laptop

//test from desktop

const guessLetter = document.querySelector(".guessed-letters");
const guessButton =document.querySelector(".guess");
const letterInput =document.querySelector(".letter");
const challange =document.querySelector(".word-in-progress");
const chances =document.querySelector(".remaining");
const chancesSpan =document.querySelector(".remaining span");
const hint =document.querySelector(".message");
const redo =document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = []
let remainingGuesses = 8
const getWord = async function () {
    const results = await fetch( 
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
        );
    const words = await results.text();
    //console.log(data);
    const wordArray = words.split("\n")
    const randomIndex = Math.floor(Math.random()*wordArray.length)
    word = wordArray[randomIndex].trim()
    placeholder(word)
}
getWord()
//console.log(wordArray)


const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●")
    }
    challange.innerText = placeholderLetters.join("");
};

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
        numGuesses(guess)
        usedLetters()
        updateChallange(guessedLetters)
        
    };
};

const usedLetters = function () {
    guessLetter.innerHTML = "";
    for(const letter of guessedLetters) {
        const li = document.createElement("li")
        li.innerText = letter;
        guessLetter.append(li);
    }
};

const updateChallange = function (guessedLetters){
    const wordUpper = word.toUpperCase ();
    const wordArray = wordUpper.split("")
    const answer = []
    for(const letter of wordArray) {
        if(guessedLetters.includes(letter)) {
        answer.push(letter.toUpperCase())
        } else{
            answer.push ("●")
        }
    }
    challange.innerText = answer.join("")
    checkWin()
}

const numGuesses = function(guess) {
    const upperWord = word.toUpperCase ()
    if (!upperWord.includes(guess)) {
        hint.innerText= `Sorry, the word has no ${guess}.`
        remainingGuesses -= 1
    }else{
        hint.innerText= `Awesome! The word does have the letter ${guess}.`
        
    }

    if (remainingGuesses === 0) {
        hint.classList.add("highlight")
        hint.innerText = `Game over! The word was ${word}.`
        startOver()
    }else if (remainingGuesses === 1) {
        chancesSpan.innerText = `${remainingGuesses} guess`
        } else {
        chancesSpan.innerText = `${remainingGuesses} guesses`
    }
};

const checkWin = function () {
    if(word.toUpperCase () === challange.innerText) {
        hint.classList.add("win")
        hint.classList.add("highlight")
        hint.innerHTML= "You guessed correctly! Congrats!"
        startOver()
    }
}

const startOver = function () {
    guessButton.classList.add("hide")
    chances.classList.add("hide")
    guessLetter.classList.add("hide")
    redo.classList.remove("hide")
}

redo.addEventListener ("click", function(e) {
    hint.classList.remove("win")
    hint.innerText = ""
    guessLetter.innerHTML = ""
    remainingGuesses = 8
    guessedLetters = []
    chancesSpan.innerText = `${remainingGuesses} guesses`
    guessButton.classList.remove("hide")
    getWord()
    redo.classList.add("hide")
    chances.classList.remove("hide")
    guessLetter.classList.remove("hide")
})