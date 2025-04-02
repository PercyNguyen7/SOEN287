const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const fs = require("node:fs");
const PORT = 3200 || process.env.port;

app.use(
  session({
    secret: "your-secret-key", // Secret key used to sign the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save a session that is new but not modified
    cookie: { secure: false },
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views")); // set the current views directory

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
app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
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
app.get("/browse_result", (req, res) => {
  // Access query parameters using req.query
  const type = req.query.type; // "dog"
  const catBreed = req.query["cat-breed"]; // "all-cat"
  const dogBreed = req.query["dog-breed-select"]; // "all-dog"
  const minAge = req.query["min-age"]; // "1"
  const maxAge = req.query["max-age"]; // "2"
  const gender = req.query["gender"]; // "male"
  const getAlong = req.query["get-along"]; // "on"
  // Log the parameters to the console or use them in your logic
  const response = {
    type: type,
    catBreed: catBreed,
    dogBreed: dogBreed,
    minAge: minAge,
    maxAge: maxAge,
    gender: gender,
    getAlong: getAlong,
  };
  console.log({
    type,
    catBreed,
    dogBreed,
    minAge,
    maxAge,
    gender,
    getAlong,
  });
  res.status(200).json({ message: "Successful search", data: response });
});

app.get("/browse", (req, res) => {
  // const page = req.params.page;
  console.log(req.session.username);
  res.render("browsePets", { username: req.session.username });
});
app.get("/data", (req, res) => {
  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "./data/pets.json"),
      "utf8"
    );
    const parsedJSON = JSON.parse(jsonData);
    res.status(200).json({
      success: true,
      message: "Successful pet retrieval",
      petData: parsedJSON,
    });
  } catch (err) {
    console.error("Cant retrieve pet data: ");
    res.status(400).json({ success: false, message: "FAILED pet retrieval" });
  }
});
app.get("/data2", (req, res) => {
  try {
    const jsonData = JSON.stringify(pets, null, 2); // `null, 2` for pretty-printing the JSON

    fs.writeFileSync(
      path.join(__dirname, "./data/pets.json"),
      jsonData,
      "utf8",
      (err) => {
        if (err) console.log("Couldnt write file");
        else console.log("file written");
      }
    );
    res.status(200).json({ message: "pet posting" });
    return;
  } catch (err) {
    console.error("Error make pets:", err);
    res.status(500).json({ message: "Cant fetch pets" });
  }
});
// using /:page wild card
app.get("/:page", (req, res) => {
  const page = req.params.page;
  console.log(req.session.username);
  res.render(page, { username: req.session.username }); // Automatically renders 'views/<page>.ejs'
});

app.post("/creating-account", (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  let newMapArray;
  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "./data/accounts.json"),
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
    // if no account exists, we make a new json file
    console.error("error");
    const newMap = new Map();
    newMap.set(username, password);
    newMapArray = Array.from(newMap);
  }
  const jsonData = JSON.stringify(newMapArray, null, 2); // `null, 2` for pretty-printing the JSON
  // Write the JSON string to a file (synchronously)
  fs.writeFileSync(
    path.join(__dirname, "./data/accounts.json"),
    jsonData,
    "utf8"
  );
  res.status(200).json({ success: true, message: "Login successful" });
});

app.post("/signing-in", (req, res) => {
  const { username, password } = req.body;

  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "./data/accounts.json"),
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

let dogs = [
  {
    name: "Tumme",
    type: "Dog",
    breed: "Cocker Spaniel",
    gender: "Male",
    age: 2,

    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    comment: "Likes to get his tummy rubbed",
    img_url:
      "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Amaretto",
    type: "Dog",
    breed: "Poodle",
    gender: "Male",
    age: 3,

    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    comment: "Ines's dog, not for adoption",
    img_url: "../imgs/amaretto.jpg",
  },
  {
    name: "Rat",
    type: "Dog",
    breed: "French Bulldog",
    gender: "Female",
    age: 3,

    friendlyTo: {
      children: true,
      dogs: false,
      cats: true,
    },
    comment: "Looks like a rat sometimes",
    img_url:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bard",
    type: "Dog",
    breed: "Golden Retriever",
    gender: "Female",
    age: 5,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    comment: "Soft, likes to cuddle",
    img_url:
      "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?q=80&w=1362&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ruff Ruff",
    type: "Dog",
    breed: "Yorkshire Terrier",
    gender: "Female",
    age: 1,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    comment: "Small but dangerous",
    img_url:
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  },
  {
    name: "Bestie",
    type: "Dog",
    breed: "Samoyed",
    gender: "Female",
    age: 5,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    comment: "Always a little extra",
    img_url:
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

let cats = [
  {
    name: "Bluff",
    type: "Cat",
    breed: "American Shorthair",
    gender: "Female",
    age: 3,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    comment: "Hiss 24/7",
    img_url:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  },
  {
    name: "Headlights",
    type: "Cat",
    breed: "Persian",
    gender: "Female",
    age: 6,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    comment: "Eyes Wide Heads Empty",
    img_url:
      "https://images.unsplash.com/photo-1548366086-7f1b76106622?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  },
  {
    name: "Yawny",
    type: "Cat",
    breed: "American Shorthair",
    gender: "Male",
    age: 1,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: false,
    },
    comment: "Eyes Wide Heads Empty",
    img_url:
      "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  },
  {
    name: "Tartarus",
    type: "Cat",
    breed: "Abyssus",
    gender: "Male",
    age: 4,
    friendlyTo: {
      children: true,
      dogs: false,
      cats: false,
    },
    comment: "Got his name from the dark abyss of Tartarus",
    img_url:
      "https://images.unsplash.com/photo-1571566882372-1598d88abd90?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  },
  {
    name: "Squint",
    type: "Cat",
    breed: "Persian",
    gender: "Male",
    age: 7,
    friendlyTo: {
      children: true,
      dogs: true,
      cats: true,
    },
    comment: "Looks grumpy but is actually quite nice",
    img_url:
      "https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
let pets = { dog: dogs, cat: cats };
