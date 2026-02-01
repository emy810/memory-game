const cardDetails = [
  {
    id: 1,
    url: "url('./images/')",
  },
];

const flipCard = document.querySelector(".flip-card");

flipCard.addEventListener("click", () => {
  flipCard.classList.toggle("flip");

  setTimeout(() => {
    flipCard.classList.toggle("flip-card-flipped");
  }, 300);
});
