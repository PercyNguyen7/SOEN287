"use strict";

import { pets } from "./pets.js";

// Check if user selects cat or dog to find

// If the form exists, then modify it when it changes

function ageRangeVerified() {
  const minAge = document.querySelector("#min-age");
  let minAgeValue = minAge.value;
  const maxAge = document.querySelector("#max-age");
  let maxAgeValue = maxAge.value;
  if (minAgeValue > maxAgeValue) {
    return false;
  }
  return true;
}

function listenCatRadio() {
  const formPetCatRadio = document.querySelector("#cat-radio");
  formPetCatRadio.addEventListener("change", function (event) {
    const dogBreedSelect = document.querySelector("#dog-breed-select");
    const catBreedSelect = document.querySelector("#cat-breed-select");
    dogBreedSelect.style.opacity = "0.5";
    dogBreedSelect.style.pointerEvents = "none";
    if (catBreedSelect.style.opacity === "0.5") {
      catBreedSelect.style.opacity = "1";
      catBreedSelect.style.pointerEvents = "auto";
    }
  });
}
function listenDogRadio() {
  const formPetDogRadio = document.getElementById("dog-radio");
  formPetDogRadio.addEventListener("change", function (event) {
    const dogBreedSelect = document.getElementById("dog-breed-select");
    const catBreedSelect = document.getElementById("cat-breed-select");
    catBreedSelect.style.opacity = "0.5";
    catBreedSelect.style.pointerEvents = "none";
    if (dogBreedSelect.style.opacity === "0.5") {
      dogBreedSelect.style.opacity = "1";
      dogBreedSelect.style.pointerEvents = "auto";
    }
  });
}
function listenSubmitForm() {
  const findPetForm = document.getElementById("find-pet-form");
  findPetForm.addEventListener("submit", function (event) {
    if (!ageRangeVerified()) {
      alert("Min age value must be lower than max age value");
      event.preventDefault();
    } else {
      // event.preventDefault();
      // fetch('./', {
      // }
      // )
    }
  });
}
// function matchingProfiles(profile){
//   if(profile.petType ==  'Dog'){

//   }
// }

function renderPetsForms(profile) {
  const browseContainer = document.querySelector(".browse-pets-container");

  // let petsFlat = pets.flat();
  let allPets = [];
  for (let animalType in pets) {
    if (Object.prototype.hasOwnProperty.call(pets, animalType)) {
      allPets.push(...pets[animalType]);
    }
  }
  console.log(allPets);

  for (let animal of allPets) {
    console.log(animal);
    const petDiv = document.createElement("div");
    petDiv.innerHTML = `<figure
                  class="rounded-t-lg overflow-hidden flex items-center aspect-[1/1]"
                >
                  <img
                    class="rounded-t-lg"
                    src="${animal.img_url}"
                    alt="product image"
                  />
                </figure>
                <div class="px-5 pb-5 py-2 text-center">
                  <h5
                    class="text-3xl font-semibold tracking-tight text-slate-700 righteous-regular"
                  >
                    ${animal.name}
                  </h5>
                  <ul
                    class="[&>*]:inline-block [&>*]:pl-3 [&>*]:before:content [&>*]:before:right-2 [&>*]:before:relative [&>*]:before:content-['•'] [&>*]:before:text-orange-400"
                  >
                    <li class="text-slate-700 nunito-sans-regular"> ${animal.type}</li>

                    <li class="text-slate-700 nunito-sans-regular">
                       ${animal.breed}
                    </li>

                    <li class="text-slate-700 nunito-sans-regular"> ${animal.gender}</li>

                    <li class="text-slate-700 nunito-sans-regular"> ${animal.age} yrs old</li>

                    <li class="text-slate-700 nunito-sans-regular"> ${animal.friendliness}</li>
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

function updateAnimalFormOptions(animalType) {
  let animalArr;
  if (animalType == "dog") {
    animalArr = pets.dog;
  } else if (animalType == "cat") {
    animalArr = pets.cat;
  }
  const animalSelectForm = document.querySelector(
    `#${animalType}-breed-select`
  );
  const breedsSet = new Set();
  const breedsArr = [];
  console.log(breedsSet);
  for (const animal of animalArr) {
    if (!breedsSet.has(animal.breed)) {
      breedsArr.push(animal.breed);
      breedsSet.add(animal.breed);
    }
  }
  const sortedBreedsArr = Array.from(breedsArr).sort();
  // breeds array

  const optionAll = document.createElement("option");
  optionAll.value = `all-${animalType}`;
  optionAll.textContent = "All";
  animalSelectForm.appendChild(optionAll);
  for (const breed of sortedBreedsArr) {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    animalSelectForm.appendChild(option);
  }
}

export function initializeFindPetPage() {
  listenCatRadio();
  listenDogRadio();
  listenSubmitForm();

  updateAnimalFormOptions("dog");
  updateAnimalFormOptions("cat");
  renderPetsForms();
}
