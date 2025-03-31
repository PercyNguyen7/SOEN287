const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const fs = require("node:fs");
const PORT = 3500 || process.env.port;

app.use(
  session({
    secret: "your-secret-key", // Secret key used to sign the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save a session that is new but not modified
    cookie: { secure: false },
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..")); // set the current views directory as ./q4

// Middleware to check if user is logged in
app.use((req, res, next) => {
  if (req.session.username) {
    res.locals.username = req.session.username; // Make username available in all templates
  }
  next();
});

// middleware used to parse incoming requests with application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// middleware to parse json files
app.use(express.json());

// ensures req.body is populated with parsed form data
app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  // console.log("signed in");

  res.render("home", { username: req.session.username });
});

app.get("/home", (req, res) => {
  res.redirect("/"); // Redirect to the root route
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    } else {
      res.status(200).json({ success: true, message: "Logout successful" });
    }
  });
});

// using /:page wild card
app.get("/:page", (req, res) => {
  const page = req.params.page;
  console.log(req.session.username);
  res.render(page, { username: req.session.username }); // Automatically renders 'views/<page>.ejs'
});

app.post("/creating-account", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  let newMapArray;
  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "../files/accounts.json"),
      "utf8"
    );
    const parsedArr = JSON.parse(jsonData);
    const parsedMap = new Map(parsedArr);

    // if has username
    if (parsedMap.has(username)) {
      console.log("username is taken. nothhing happened");
      res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
      return;
    } else {
      parsedMap.set(username, password);
      newMapArray = Array.from(parsedMap);
    }
  } catch (err) {
    console.error("error");
    const newMap = new Map();
    newMap.set(username, password);
    newMapArray = Array.from(newMap);
  }
  const jsonData = JSON.stringify(newMapArray, null, 2); // `null, 2` for pretty-printing the JSON
  // Write the JSON string to a file (synchronously)
  fs.writeFileSync(
    path.join(__dirname, "../files/accounts.json"),
    jsonData,
    "utf8"
  );
  res.status(200).json({ success: true, message: "Login successful" });
});

app.post("/signing-in", (req, res) => {
  const { username, password } = req.body;

  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "../files/accounts.json"),
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

app.listen(PORT, (err) => {
  if (err) console.error("error is:" + err);
  console.log(`Server is running on localhost:${PORT}`);
});
