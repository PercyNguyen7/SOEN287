// import findPet.js logic and execute it
import "./findPet.js";
import "./givePet.js";
setInterval(updateTime, 1000);
updateTime();
function updateTime() {
  const timePara = document.querySelector(".time");
  const date = new Date();
  const dateString = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(date);
  timePara.innerHTML = dateString;
}
