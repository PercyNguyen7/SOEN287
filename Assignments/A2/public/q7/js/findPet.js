"use strict";
import { pets } from "./pets.js";
const formPetCatRadio = document.getElementById("form-find-cat-radio");
const formPetDogRadio = document.getElementById("form-find-dog-radio");

if (formPetCatRadio) {
  formPetCatRadio.addEventListener("change", function (event) {
    const dogBreedSelect = document.getElementById(
      "form-find-dog-breed-select"
    );
    const catBreedSelect = document.getElementById(
      "form-find-cat-breed-select"
    );
    dogBreedSelect.style.opacity = "0.5";
    dogBreedSelect.style.pointerEvents = "none";
    if (catBreedSelect.style.opacity === "0.5") {
      catBreedSelect.style.opacity = "1";
      catBreedSelect.style.pointerEvents = "auto";
    }
  });
}

const findPetForm = document.getElementById("findPetForm");
if (formPetDogRadio) {
  formPetDogRadio.addEventListener("change", function (event) {
    const dogBreedSelect = document.getElementById(
      "form-find-dog-breed-select"
    );
    const catBreedSelect = document.getElementById(
      "form-find-cat-breed-select"
    );
    catBreedSelect.style.opacity = "0.5";
    catBreedSelect.style.pointerEvents = "none";
    if (dogBreedSelect.style.opacity === "0.5") {
      dogBreedSelect.style.opacity = "1";
      dogBreedSelect.style.pointerEvents = "auto";
    }
  });

  findPetForm.addEventListener("submit", function (event) {
    let arrayPetInfo = [];
    if (!ageRangeVerified()) {
      alert("Min age value must be lower than max age value");
      event.preventDefault();
    } else {
    }
  });
}

export function ageRangeVerified() {
  const minAge = document.querySelector("#form-find-min-age");
  let minAgeValue = minAge.value;
  const maxAge = document.querySelector("#form-find-max-age");
  let maxAgeValue = maxAge.value;
  if (minAgeValue > maxAgeValue) {
    return false;
  }
  return true;
}

const browseContainer = document.querySelector(".browse-pets-container");

if (browseContainer) {
  for (let pet of pets) {
    const petDiv = document.createElement("div");
    petDiv.innerHTML = `<figure
                class="rounded-t-lg overflow-hidden flex items-center aspect-[1/1]"
              >
                <img
                  class="rounded-t-lg"
                  src="${pet.img_url}"
                  alt="product image"
                />
              </figure>
              <div class="px-5 pb-5 py-2 text-center">
                <h5
                  class="text-3xl font-semibold tracking-tight text-slate-700 righteous-regular"
                >
                  ${pet.name}
                </h5>
                <ul
                  class="[&>*]:inline-block [&>*]:pl-3 [&>*]:before:content [&>*]:before:right-2 [&>*]:before:relative [&>*]:before:content-['•'] [&>*]:before:text-orange-400"
                >
                  <li class="text-slate-700 nunito-sans-regular"> ${
                    pet.type
                  }</li>
  
                  <li class="text-slate-700 nunito-sans-regular">
                     ${pet.breed}
                  </li>
  
                  <li class="text-slate-700 nunito-sans-regular"> ${
                    pet.gender
                  }</li>
  
                  <li class="text-slate-700 nunito-sans-regular"> ${
                    pet.age
                  } yrs old</li>
  
                  <li class="text-slate-700 nunito-sans-regular"> ${pet.friendliness()}</li>
                </ul>
                <div class="flex items-center justify-center">
                  <button
                    class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg px-3 py-2 text-center text-lg mt-2"
                  >
                    Interested
                  </button>
                </div>
              </div>`;
    petDiv.classList.add(
      "bg-amber-50",
      "rounded-lg",
      "border-1",
      "shadow-sm",
      "border-orange-200"
    );
    browseContainer.appendChild(petDiv);
  }
}
