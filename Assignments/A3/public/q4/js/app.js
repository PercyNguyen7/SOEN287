// const express = require("express");
// const path = require("path");
// const app = express();
// const PORT = 3200 || process.env.port;

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "..")); // set the current views directory as ./q4

// app.use(express.static(path.join(__dirname, "..")));

// app.get("/", (req, res) => {
//   res.render("home");
// });

// app.get("/home", (req, res) => {
//   res.redirect("/"); // Redirect to the root route
// });
// // using /:page wild card
// app.get("/:page", (req, res) => {
//   const page = req.params.page;
//   res.render(page); // Automatically renders 'views/<page>.ejs'
// });

// app.listen(PORT, (err) => {
//   if (err) console.error("error is:" + err);
//   console.log(`Server is running on localhost:${PORT}`);
// });
import { updateUI, listenLogout } from "./account.js";

if (window.location.pathname == "/browsePets") {
  import("./findPet.js")
    .then((module) => {
      console.log("Module loaded:", module);
      module.initializeFindPetPage();
    })
    .catch((error) => {
      console.error("Error loading module:", error);
    });
}

if (window.location.pathname == "/givePet") {
  // import("./findPet.js")
  //   .then((module) => {
  //     console.log("Module loaded:", module);
  //     module.initializeFindPetPage();
  //   })
  //   .catch((error) => {
  //     console.error("Error loading module:", error);
  //   });
}

if (window.location.pathname == "/sign-up") {
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
