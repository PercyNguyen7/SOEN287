const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const router = express.Router();
console.log(path.join(__dirname, "../data/accounts.json"));

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    } else {
      res.status(200).json({ success: true, message: "Logout successful" });
    }
  });
});

// in between post request for user creating an account
router.post("/creating-account", (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  let newMapArray;

  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "../data/accounts.json"),
      "utf8"
    );
    const parsedArr = JSON.parse(jsonData);
    const parsedMap = new Map(parsedArr);

    // if has username
    if (parsedMap.has(username)) {
      console.log("username is taken. nothhing happened");
      res.status(409).json({
        error: "Username is taken. Please choose another username.",
      });
      return;
    } else {
      parsedMap.set(username, password);
      newMapArray = Array.from(parsedMap);
    }
  } catch (err) {
    // if no account exists, we make a new json file
    console.error("error");
    const newMap = new Map();
    newMap.set(username, password);
    newMapArray = Array.from(newMap);
  }
  const jsonData = JSON.stringify(newMapArray, null, 2); // `null, 2` for pretty-printing the JSON
  // Write the JSON string to a file (synchronously)
  fs.writeFileSync(
    path.join(__dirname, "../data/accounts.json"),
    jsonData,
    "utf8"
  );
  res.status(200).json({ success: true, message: "Login successful" });
});

router.post("/signing-in", (req, res) => {
  const { username, password } = req.body;
  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "../data/accounts.json"),
      "utf8"
    );
    const parsedArr = JSON.parse(jsonData);
    const parsedMap = new Map(parsedArr);

    if (!parsedMap.has(username)) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    // Check if the password matches
    if (parsedMap.get(username) === password) {
      req.session.username = username; // Set the session username
      res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Error fetching user accounts:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});
module.exports = router;
