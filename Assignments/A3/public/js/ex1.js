//
// const express = require("express");
// const app = express();
// const path = require("path");
// const PORT = process.env.PORT || 3500;

// app.get("/", (req, res) => {});
// ^begin or end with a slash OR index.html
// app.get("^/$|ex1(.html)?", (req, res) => {
//   // path.join join all paths together
//   res.sendFile(path.join(__dirname, "..", "ex1.html"));
// });

// message saying server is running
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const app = express();
const port = 3500;

// Middleware to parse form data
// extended true just makes
app.use(express.urlencoded({ extended: true }));

// Route to serve the form
app.get("/", (req, res) => {
  res.send(`
    <form action="/findSummation" method="POST">
      <label>Find the summation of n: (input ex: 5)
      <input type="text" name="param1" placeholder="5"></label>
      <button type="submit">Submit</button>
    </form>
    
    <form action="/upper_First_and_Last" method="POST">
      <label>Modify string to capitalize first and last letter (input ex: hello world): 
      <input type="text" name="param1" placeholder="string"></label>
      <button type="submit">Submit</button>
    </form>
    
    <form action="/find_Average_and_Median" method="POST">
       <label>Input an array of string: 
      <input type="text" name="param1" placeholder="[1,3,5,8]"></label>
      <button type="submit">Submit</button>
    </form>

    <form action="/find_4_digits" method="POST">
      <label>Finding the first 4 digits of your string:
      <input type="text" name="param1" placeholder="1 3 6 2 1"></label>
      <button type="submit">Submit</button>
    </form>
  `);
});
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// route for calling findSummation
app.post("/findSummation", (req, res) => {
  const { param1 } = req.body;
  const result = findSummation(param1);
  res.send(`Result of findSummation(${param1}): ${result}`);
});

app.post("/upper_First_and_Last", (req, res) => {
  const { param1 } = req.body;
  const result = uppercaseFirstandLast(param1);
  res.send(`Result of uppercaseFirstandLast(${param1}): ${result}`);
});

app.post("/find_Average_and_Median", (req, res) => {
  const { param1 } = req.body;
  const resArr = findAverageAndMedian(param1);
  res.send(
    `Result of findAverageAndMedian(${param1}): ${JSON.stringify(
      resArr
    )}, ave: ${resArr[0]} and median: ${resArr[1]}`
  );
});

app.post("/find_4_digits", (req, res) => {
  const { param1 } = req.body;
  const result = find4Digits(param1);
  res.send(`Result of uppercaseFirstandLast(${param1}): ${result}`);
});

function findSummation(n = 1) {
  if (isNaN(n) || n < 0) {
    return false;
  }
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

function uppercaseFirstandLast(input) {
  let newStr = "";
  for (let i = 0; i < input.length; i++) {
    if (i == 0 || i == input.length - 1) {
      newStr += input.charAt(i).toUpperCase();
    } else {
      newStr += input.charAt(i);
    }
  }
  return newStr;
}

function findAverageAndMedian(arr) {
  try {
    let arrParsed = JSON.parse(arr);
    const sum = arrParsed.reduce((acc, currNum) => acc + currNum, 0);
    const ave = sum / arrParsed.length;
    let median;
    arrParsed.sort((a, b) => a - b);
    console.log("sorted" + arrParsed);
    const midIndex = Math.round(arrParsed.length / 2);
    if (arrParsed.length % 2 != 0) {
      median = arrParsed[midIndex - 1];
    } else if (arrParsed.length % 2 == 0) {
      median = (arrParsed[midIndex] + arrParsed[midIndex - 1]) / 2;
    }
    return [ave, median];
  } catch (error) {
    console.error("Error parsing JSON:", error.message);
    return false;
  }
}

function find4Digits(strSpacedNums) {
  // parse the integer while removing everything
  try {
    let num = parseInt(strSpacedNums.replace(/\s+/g, ""), 10);
    console.log(num);
    if (num > 9999) {
      while (num > 9999) {
        num = Math.floor(num / 10);
      }
      return num;
    } else {
      return false;
    }
  } catch {
    console.error("Error parsing String into an integer:", error.message);
  }
}
// TESTING AREA:
// console.log(findSummation(2));
// console.log(uppercaseFirstandLast("hello world"));
// console.log(findAverageAndMedian([12, 3, 5, 7, 1, 4, 19, 26]));
// console.log(find4Digits(" 3 9 4 7 4 1"));
