import "./findPet.js";

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
