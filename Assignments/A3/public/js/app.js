import { updateUI, listenLogout } from "./account.js";

if (window.location.pathname == "/") {
  const cookies = document.cookie;
}

if (window.location.pathname == "/browse") {
  import("./findPet.js")
    .then((module) => {
      // console.log("Module loaded:", module);
      // module.fetchPetData();
      module.initializeFindPetPage();
    })
    .catch((error) => {
      console.error("Error loading module:", error);
    });
}

if (window.location.pathname === "/givePet") {
  import("./givePet.js")
    .then((module) => {
      console.log("Module loaded:", module);
      module.intializeGivePetPage();
    })
    .catch((error) => {
      console.error("Error loading module:", error);
    });
}

if (window.location.pathname === "/sign-up") {
  import("./account.js")
    .then((module) => {
      console.log("Module loaded:", module);
      module.initializeSignUp();
    })
    .catch((error) => {
      console.error("Error loading module:", error);
    });
}

if (window.location.pathname == "/sign-in") {
  import("./account.js")
    .then((module) => {
      console.log("Module loaded:", module);
      module.initializeSignIn();
    })
    .catch((error) => {
      console.error("Error loading module:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  updateTime();
  updateUI();
  listenLogout();
});

function updateTime() {
  const timePara = document.querySelector(".time");
  if (!timePara) {
    return;
  }
  const date = new Date();
  const dateString = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(date);
  timePara.innerHTML = dateString;
  setInterval(updateTime, 1000);
}
