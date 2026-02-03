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

let numberOfCards = 10;
let revealCount = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

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
    if (isAlreadyRevealed) {
      revealCount++;
      revealCountEl.textContent = revealCount; 
    }
      
   //newFlipCard(cardDetails, emojjiSpan);

newFlipCard.classList.toggle("flip");

      setTimeout(() => { 
      newFlipCard.classList.toggle("flip-card-flipped");
        emojiSpan.classList.toggle("emoji-flipped");

  }, 300);

      newFlipCard.flipTimeout = setTimeout(() => {
        newFlipCard.classList.remove("flip-card-flipped");
        emojiSpan.classList.remove("emoji-flipped");
        newFlipCard.classList.remove("flip");
      }, 4000);
    });
  }
}

createCards(numberOfCards);
