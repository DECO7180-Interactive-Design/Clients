const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");

button1.addEventListener("click", (event) => {
  event.preventDefault();
  alert("No competition today!");
});

button2.addEventListener("click", (event) => {
  event.preventDefault();
  alert("No competition today!");
});
