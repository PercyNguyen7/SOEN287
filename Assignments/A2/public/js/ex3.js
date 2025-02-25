const array = [-4, 3, 9, 1, -5];

function addNumbers(arr) {
  let sum = 0;
  arr.forEach((num) => {
    sum += num;
  });
  return sum;
}
function findMaxNumber() {
  let maxNum = 0;
  arguments[0].forEach((num) => {
    if (num > maxNum) {
      maxNum = num;
    }
  });
  return maxNum;
}

const mixedArray = ["Apple", 3, 4.5, "5 Monkey", { name: "Peter", age: 12 }];

function addOnlyNumbers(arr) {
  let sum = 0;
  mixedArray.forEach((num) => {
    let parsedNum = parseFloat(num);
    if (!isNaN(parsedNum)) sum += parseFloat(num);
  });
  return sum;
}

const mixedString = "$19zP/wqr21jjh52109asnf";

function getDigits(string) {
  let result = "";
  for (let i = 0; i < string.length; i++) {
    let currChar = string.charAt(i);
    if (!isNaN(currChar)) {
      result += currChar;
    }
  }
  return result;
}
function reverseString(string) {
  let result = "";
  for (let i = string.length - 1; i >= 0; i--) {
    let currChar = string.charAt(i);
    result += currChar;
  }
  return result;
}

function getCurrentDate() {
  return new Date();
}

function displayResult() {
  document.querySelector("#para1").textContent = array.toString();
  document.querySelector("#para2").textContent =
    "Sum of array is " + addNumbers(array);
  document.querySelector("#para3").textContent =
    "Max number is " + findMaxNumber(array);
  document.querySelector("#para4").textContent = mixedArray.toString();
  document.querySelector("#para5").textContent =
    "Sum of mixed array is " + addOnlyNumbers(mixedArray);
  document.querySelector(
    "#para6"
  ).textContent = `Mixed string is "${mixedString}"`;
  document.querySelector("#para7").textContent =
    'Digit string from mixed string above is: "' + getDigits(mixedString) + '"';
  document.querySelector(
    "#para8"
  ).textContent = `Reversed string from mixed string is: "${reverseString(
    mixedString
  )}"`;
  document.querySelector(
    "#para9"
  ).textContent = `Current date is ${getCurrentDate()}`;
}

displayResult();
