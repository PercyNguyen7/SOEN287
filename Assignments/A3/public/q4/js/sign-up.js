const fs = require("node:fs");

function listenSubmitForm(name, req) {
  const form = document.querySelector("#sign-up-form");
  form.addEventListener("submit", () => {
    fs.writeFile("../test.txt", "it works hooray", (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });
  });
}
export function initializeSignUpPage() {
  listenSubmitForm();
}
