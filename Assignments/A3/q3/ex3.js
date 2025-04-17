// RUN ISNTRUCTION: from current directory A3, type
// npx nodemon q3/ex3
// then go to: http://localhost:3500/
let express = require("express");
let app = express();
const PORT = 3500;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "ex3.html"));
});

app.post("/post", (req, res) => {
  console.log(req.body);
  const { name1, name2, phone1, phone2 } = req.body;
  res.send(`Results:<br>
      ${name1}'s phone #${phone1} is ${
    verifyNumber(phone1) ? "valid" : "invalid"
  }.<br>
      ${name2}'s phone #${phone2} is ${
    verifyNumber(phone2) ? "valid" : "invalid"
  }.`);
});
// console.log(verifyNumber("123-456-7899"));

function verifyNumber(str) {
  if (str.length != 12) {
    return false;
  }
  for (let i = 0; i < str.length; i++) {
    if (i == 3 || i == 7) {
      if (str[i] != "-") {
        return false;
      }
    } else {
      if (isNaN(str[i])) {
        return false;
      }
    }
  }
  return true;
}
function verifyNumber(str) {
  const regex = /^\d{3}-\d{3}-\d{4}$/;
  return regex.test(str);
}
