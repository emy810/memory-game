const cardDetails = [
  { id: 1, name: "green-apple", emoji: "🍏" },
  { id: 2, name: "grape", emoji: "🍇" },
  { id: 3, name: "hamburger", emoji: "🍔" },
  { id: 4, name: "avocado", emoji: "🥑" },
  { id: 5, name: "pizza", emoji: "🍕" },
  { id: 6, name: "sushi", emoji: "🍣" },
  { id: 7, name: "sushi", emoji: "🍰" },
  { id: 8, name: "popcorn", emoji: "🍿" },
  { id: 9, name: "cherry", emoji: "🍒" },
  { id: 10, name: "donut", emoji: "🍩" },
];

const emojiArray = cardDetails.map((item) => item.emoji);
console.log(emojiArray);

let numberOfCards = 8;
let revealCount = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

const cardsContainer = document.querySelector(".cards-container");
const revealCountEl = document.getElementById("reveal-count");
const timerEl = document.getElementById("timer");

function createCards(numberOfCards) {
  const gameEmojiArray = [];

  for (let i = 0; i < 2; i++) {
    for (let i = 0; i < numberOfCards / 2; i++) {
      gameEmojiArray.push(emojiArray[i]);
    }
  }

  console.log(gameEmojiArray);

  const shuffledGameEmojiArray = gameEmojiArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  console.log("game emoji array shuffled" + shuffledGameEmojiArray);

  for (let i = 0; i < shuffledGameEmojiArray.length; i++) {
    let newFlipCard = document.createElement("div");
    newFlipCard.classList.add("flip-card");
    let emojiSpan = document.createElement("span");
    emojiSpan.innerHTML = shuffledGameEmojiArray[i];
    emojiSpan.classList.add("emoji");
    newFlipCard.append(emojiSpan);

    cardsContainer.append(newFlipCard);

    newFlipCard.addEventListener("click", () => {
      // Start timer on the first reveal
      if (!gameStarted) {
        gameStarted = true;
        timerInterval = setInterval(() => {
          timer++;
          const minutes = Math.floor(timer / 60);
          const seconds = timer % 60;

          timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        }, 1000);
      }

const isAlreadyRevealed = newFlipCard.classList.contains("flip-card-flipped");

  if (!isAlreadyRevealed) {
    revealCount++;
    revealCountEl.textContent = revealCount;
  }


      //newFlipCard(cardDetails, emojjiSpan);
  if (lockBoard || newFlipCard === firstCard) return;
      
     newFlipCard.classList.toggle("flip");

      setTimeout(() => {
        newFlipCard.classList.toggle("flip-card-flipped");
        emojiSpan.classList.toggle("emoji-flipped");
      }, 300);

       if (!firstCard) {
        firstCard = newFlipCard;
        return;
      }

      secondCard = newFlipCard;
      checkMatch();
    });
  }
}

createCards(numberOfCards);

function checkMatch() {
  const firstEmoji = firstCard.querySelector(".emoji").textContent;
  const secondEmoji = secondCard.querySelector(".emoji").textContent;

  if (firstEmoji === secondEmoji) {

   firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    //firstCard.querySelector(".emoji").classList.add("emoji-flipped");
     //secondCard.querySelector(".emoji").classList.add("emoji-flipped");
   
     matchedPairs++;
    resetTurn();
    checkWin();
  } else {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip-card-flipped", "flip");
      firstCard.querySelector(".emoji").classList.remove("emoji-flipped");

      secondCard.classList.remove("flip-card-flipped", "flip");
      secondCard.querySelector(".emoji").classList.remove("emoji-flipped");

      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}