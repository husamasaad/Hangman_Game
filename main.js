// Generate Letters

const letters = 'abcdefghijklmnopqrstuvwxyz';

let lettersArray = Array.from(letters);


let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
  let span = document.createElement('span');
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  span.className = 'letter-box';
  lettersContainer.appendChild(span)
})


// Object of words and categories
import words from './words.json' assert{type: 'json'}


//  get random Value

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValuenumber = Math.floor(Math.random() * randomPropValue.length);

let randomValue = randomPropValue[randomValuenumber];

// Set Category Info

document.querySelector(".game-info .category span").innerHTML = randomPropName


// Letters guess element

let LettersGuessContainer = document.querySelector(".letters-guess");

// convert Chosen word to Array

let lettersAndSpace = Array.from(randomValue);

// Create Spans Depend on word
lettersAndSpace.forEach(letter => {
  let emptySpan = document.createElement("span");

  if (letter === ' ') {
    emptySpan.className = "with-space"
  }

  LettersGuessContainer.appendChild(emptySpan)
})

// Select Guess Spans
let guessSpans = document.querySelectorAll('.letters-guess span');

// 
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

//  Handle Clicking On Letters
document.addEventListener("click", (e) => {

  // Set The Chose Status
  let theStatus = false;
  if (e.target.className === 'letter-box') {

    e.target.classList.add("clicked")

    let theClickedLetter = e.target.innerHTML.toLowerCase(); 
    let theChosenWord = Array.from(randomValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {

      if (theClickedLetter == wordLetter) {

        // Set Status to correct
        theStatus = true;
        // Loop on All Guess Span
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex == spanIndex) {
            span.innerHTML = wordLetter;
          }
        })
      }

    });

    if (theStatus !== true ) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);


      if (wrongAttempts === 8) {
        document.getElementById("fail").play();
        endGame();
        lettersContainer.classList.add("finished");
      }
    };

    let guessedWord = Array.from(guessSpans).map((span, i) => {
      if (span.className === "with-space") {
        return " "
      }
      return guessSpans[i].innerHTML
    }).join('')
    console.log(guessedWord)

    if (guessedWord === randomValue.toLowerCase()) {
      document.getElementById("success").play();
      winGame();
      lettersContainer.classList.add("finished");
    }


  }
})

// End Game Functions 

function endGame() {
  let div = document.createElement("dvi");
  let divText = document.createTextNode(`Game Over, The word is "${randomValue}" `);
  let p2Text = grade(); 
  let btn = document.createElement("button");
  let btnText = document.createTextNode(`Play Again`);
  let p = document.createElement("p");
  let p2 = document.createElement("p");
  btn.appendChild(btnText)
  p.appendChild(divText);
  p2.appendChild(p2Text);
  div.appendChild(p);
  div.appendChild(p2);
  div.appendChild(btn)
  btn.className = "play-again"
  div.className = 'popup';

  btn.addEventListener("click", (e) => {
    window.location.reload()
  })
  
  document.body.appendChild(div);
}
function winGame() {
  let div = document.createElement("dvi");
  let divText = document.createTextNode(`You Won!, The word is "${randomValue}" `);
  let p2Text = grade(); 
  let btn = document.createElement("button");
  let btnText = document.createTextNode(`Play Again`);
  let p = document.createElement("p");
  let p2 = document.createElement("p");
  btn.appendChild(btnText)
  p.appendChild(divText);
  p2.appendChild(p2Text);
  div.appendChild(p);
  div.appendChild(p2);
  div.appendChild(btn)
  btn.className = "play-again"
  div.className = 'popup';

  btn.addEventListener("click", (e) => {
    window.location.reload()
  })
  
  document.body.appendChild(div);
}


function grade() {
  switch(wrongAttempts) {
    case 0:
      return document.createTextNode(`${wrongAttempts} Mistakes : Perfect score`);
    case 1:
    case 2:
    case 3:
      return document.createTextNode(`${wrongAttempts} Mistakes : Good Job`);
    case 4:
    case 5:
      return document.createTextNode(`${wrongAttempts} Mistakes : Not bad`);
    case 6:
    case 7:
      return document.createTextNode(`${wrongAttempts} Mistakes : you can do better`);
    case 8:
      return document.createTextNode(`Better Luck next time`);
  }
}
