"use strict";

const formPetCatRadio = document.getElementById("find-cat-radio");
const formPetDogRadio = document.getElementById("find-dog-radio");
if (formPetCatRadio) {
  formPetCatRadio.addEventListener("change", function (event) {
    const dogBreedSelect = document.getElementById("find-dog-breed-select");
    const catBreedSelect = document.getElementById("find-cat-breed-select");
    dogBreedSelect.style.opacity = "0.5";
    dogBreedSelect.style.pointerEvents = "none";
    if (catBreedSelect.style.opacity === "0.5") {
      catBreedSelect.style.opacity = "1";
      catBreedSelect.style.pointerEvents = "auto";
    }
  });
}
if (formPetDogRadio) {
  formPetDogRadio.addEventListener("change", function (event) {
    const dogBreedSelect = document.getElementById("find-dog-breed-select");
    const catBreedSelect = document.getElementById("find-cat-breed-select");
    catBreedSelect.style.opacity = "0.5";
    catBreedSelect.style.pointerEvents = "none";
    if (dogBreedSelect.style.opacity === "0.5") {
      dogBreedSelect.style.opacity = "1";
      dogBreedSelect.style.pointerEvents = "auto";
    }
  });

  const findPetForm = document.getElementById("findPetForm");

  findPetForm.addEventListener("submit", function (event) {
    let arrayPetInfo = [];
    if (!verifyAgeRange()) {
      alert("Min age value must be lower than max age value");
      event.preventDefault();
    } else {
    }
  });
}

function verifyAgeRange() {
  const minAge = document.querySelector("#find-min-age");
  let minAgeValue = minAge.value;
  const maxAge = document.querySelector("#find-max-age");
  let maxAgeValue = maxAge.value;
  if (minAgeValue > maxAgeValue) {
    return false;
  }
  return true;
}
