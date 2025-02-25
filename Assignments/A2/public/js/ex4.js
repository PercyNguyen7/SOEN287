"use strict";

const items = [
  { name: "Basic Web Programming", price: "19.99" },
  { name: "Intro to PHP", price: "86.00" },
  { name: "Advanced JQuery", price: "55.00" },
];

function verifyInputs() {
  if (
    document.querySelector("#quantity1").value == "" ||
    document.querySelector("#quantity2").value == "" ||
    document.querySelector("#quantity3").value == ""
  )
    alert("Please provide a number quantity for each book!");
}

function calCostByQuantity(price, quantity) {
  return price * quantity;
}
function calTotalPrice(array) {
  let total = 0;
  array.forEach((price) => {
    total += price;
  });
  return total;
}

// when submitting the form
document
  .getElementById("orderForm")
  .addEventListener("submit", function (event) {
    // preventing the form from submitting
    event.preventDefault();

    verifyInputs();

    const quantityArr = getQuantities();
    const costByQuantityArr = calCosts(quantityArr);

    displayResults(costByQuantityArr, quantityArr);
  });

// get the quantities of items
function getQuantities() {
  const item1Quantity = document.querySelector("#quantity1").value;
  const item2Quantity = document.querySelector("#quantity2").value;
  const item3Quantity = document.querySelector("#quantity3").value;

  return [item1Quantity, item2Quantity, item3Quantity];
}

//calculate the cost for each item by quantity
function calCosts(quantityArr) {
  let costByQuantityArr = [];
  for (let i = 0; i < quantityArr.length; i++) {
    const cost = calCostByQuantity(items[i].price, quantityArr[i]);
    costByQuantityArr.push(cost);
  }
  return costByQuantityArr;
}

function displayResults(costByQuantityArr, quantityArr) {
  const resultDiv = document.querySelector("#result");
  resultDiv.textContent = "";
  //display results for each item
  for (let i = 0; i < quantityArr.length; i++) {
    createItemParagraph(
      items[i].name,
      quantityArr[i],
      costByQuantityArr[i],
      resultDiv
    );
  }
  //display final total
  createFinalTotalParagraph(costByQuantityArr, resultDiv);
}

function createItemParagraph(itemName, quantity, cost, resultDiv) {
  const para = document.createElement("p");
  const spanInfo = document.createElement("span");

  spanInfo.textContent = `${itemName} (Quantity = ${quantity}): `;
  spanInfo.style.fontWeight = "700";

  const spanCostByQuantity = document.createElement("span");
  spanCostByQuantity.textContent = "$" + cost;

  para.append(spanInfo, spanCostByQuantity);
  resultDiv.appendChild(para);
}

function createFinalTotalParagraph(costByQuantityArr, resultDiv) {
  const paraFinal = document.createElement("p");
  paraFinal.style.paddingTop = "1rem";

  const spanInfo = document.createElement("span");
  const spanCostByQuantity = document.createElement("span");
  spanInfo.textContent = `Final Total: `;
  spanInfo.style.fontWeight = "700";

  const total = calTotalPrice(costByQuantityArr);
  spanCostByQuantity.textContent = `$${total}`;

  paraFinal.append(spanInfo, spanCostByQuantity);
  resultDiv.appendChild(paraFinal);
}
