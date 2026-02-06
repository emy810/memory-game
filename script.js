const cardDetails = [
  { id: 1, name: "green-apple", emoji: "🍏" },
  { id: 2, name: "grape", emoji: "🍇" },
  { id: 3, name: "hamburger", emoji: "🍔" },
  { id: 4, name: "avocado", emoji: "🥑" },
  { id: 5, name: "pizza", emoji: "🍕" },
  { id: 6, name: "sushi", emoji: "🍣" },
  { id: 7, name: "cake", emoji: "🍰" },
  { id: 8, name: "popcorn", emoji: "🍿" },
  { id: 9, name: "cherry", emoji: "🍒" },
  { id: 10, name: "donut", emoji: "🍩" },
];

const emojiArray = cardDetails.map((item) => item.emoji);

let numberOfCards = 8;
let revealCount = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

const cardsContainer = document.querySelector(".cards-container");
const revealCountEl = document.getElementById("reveal-count");
const timerEl = document.getElementById("timer");

function createCard(emoji) {
  const card = document.createElement("div");
  card.classList.add("flip-card");

  const emojiSpan = document.createElement("span");
  emojiSpan.innerHTML = emoji;
  emojiSpan.classList.add("emoji");

  card.append(emojiSpan);

  return { card, emojiSpan };
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}

function handleCardClick(card, emojiSpan) {
  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }

  const isAlreadyRevealed = card.classList.contains("flip-card-flipped");

  if (!isAlreadyRevealed) {
    revealCount++;
    revealCountEl.textContent = revealCount;
  }

  card.classList.toggle("flip");

  setTimeout(() => {
    card.classList.toggle("flip-card-flipped");
    emojiSpan.classList.toggle("emoji-flipped");
  }, 300);

  card.flipTimeout = setTimeout(() => {
    card.classList.remove("flip-card-flipped");
    emojiSpan.classList.remove("emoji-flipped");
    card.classList.remove("flip");
  }, 4000);
}

function createCards(numberOfCards) {
  const gameEmojiArray = [];

  for (let round = 0; round < 2; round++) {
    for (let idx = 0; idx < numberOfCards / 2; idx++) {
      gameEmojiArray.push(emojiArray[idx]);
    }
  }

  const shuffledGameEmojiArray = gameEmojiArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  for (let i = 0; i < shuffledGameEmojiArray.length; i++) {
    const { card, emojiSpan } = createCard(shuffledGameEmojiArray[i]);

    cardsContainer.append(card);

    card.addEventListener("click", () => handleCardClick(card, emojiSpan));
  }
}

createCards(numberOfCards);
