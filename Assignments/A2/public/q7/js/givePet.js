"use strict";
// import { ageRangeVerified } from "./findPet.js";

const numberInputs = document.querySelectorAll(".number-inputs");
numberInputs.forEach((input) => {
  input.addEventListener("input", function (event) {
    let maxValue = parseInt(event.target.max, 10);
    let minValue = parseInt(event.target.min, 10);
    let currentValue = parseInt(event.target.value, 10);

    if (currentValue > maxValue) {
      event.target.value = maxValue; // Reset to max value if exceeded
    }
    if (currentValue < minValue) {
      event.target.value = minValue; // Reset to min value if exceeded
    }
  });
});
