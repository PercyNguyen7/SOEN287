const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const fs = require("node:fs");
const PORT = 3200 || process.env.port;

app.use(
  session({
    name: "cookie",
    resave: false,
    secret: "12345678", // Secret key used to sign the session ID cookie
    saveUninitialized: true, // Save a session that is new but not modified
    cookie: { secure: false, httpOnly: false },
  })
);

// Middleware to make new username variable for ejs templates to render
app.use((req, res, next) => {
  if (req.session.username) {
    res.locals.username = req.session.username; // Make username available in all templates
  }
  next();
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views")); // set the current views directory
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
  const dogBreed = req.query["dog-breed"]; // "all-dog"
  const minAge = req.query["min-age"]; // "1"
  const maxAge = req.query["max-age"]; // "2"
  const gender = req.query["gender"]; // "male"
  const friendlyTo = {
    dogs: req.query["friendly-dogs"],
    cats: req.query["friendly-cats"],
    children: req.query["friendly-children"],
  }; // "on"
  // Log the parameters to the console or use them in your logic
  const paramList = {
    type: type,
    catBreed: catBreed,
    dogBreed: dogBreed,
    minAge: minAge,
    maxAge: maxAge,
    gender: gender,
    friendlyTo: friendlyTo,
  };
  // console.log({
  //   type,
  //   catBreed,
  //   dogBreed,
  //   minAge,
  //   maxAge,
  //   gender,
  //   friendlyTo,
  // });
  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "./data/pets.json"),
      "utf8"
    );
    const parsedJSON = JSON.parse(jsonData);
    const filteredData = { [type]: filterData(parsedJSON, paramList) };

    console.log("the filtered data: " + filteredData);
    res.status(200).json({
      success: true,
      message: "Successful pet retrieval",
      petData: filteredData,
    });
  } catch (err) {
    console.error("Cant retrieve pet data: ");
    res.status(400).json({ success: false, message: "FAILED pet retrieval" });
  }
  // res.status(200).json({ message: "Successful search", petData: petData });
});
function filterData(petsData, params) {
  console.log(params);
  if (petsData.hasOwnProperty(params.type)) {
    const animalArr = petsData[params.type];
    if (params.type == "dog") {
      params.breed = params.dogBreed;
    } else if (params.type == "cat") {
      params.breed = params.catBreed;
    }

    return animalArr.filter((animal) => {
      return (
        (animal.breed === params.breed ||
          params.breed === `all-${params.type}`) &&
        params.minAge <= animal.age &&
        params.maxAge >= animal.age &&
        (params.gender === animal.gender || params.gender === "either") &&
        ((params.friendlyTo.children && animal.friendlyTo.children) ||
          params.friendlyTo.children === undefined) &&
        ((params.friendlyTo.dogs && animal.friendlyTo.dogs) ||
          params.friendlyTo.dogs === undefined) &&
        ((params.friendlyTo.cats && animal.friendlyTo.cats) ||
          params.friendlyTo.cats === undefined)
      );
    });
  }
}

app.get("/browse", (req, res) => {
  // const page = req.params.page;
  // console.log(req.session.username);
  res.render("browsePets", { username: req.session.username });
});
app.get("/get_data", (req, res) => {
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
app.post("/givePet", (req, res) => {
  const {
    "pet-name": name,
    type,
    breed,
    "min-age": minAgeStr,
    "max-age": maxAgeStr,
    gender,
    "friendly-dogs": friendlyDogs,
    "friendly-cats": friendlyCats,
    "friendly-children": friendlyChildren,
    comment,
    "img-url": img_url,
    "owner-fname": ownerFname,
    "owner-lname": ownerLname,
    "owner-email": ownerEmail,
  } = req.body;
  const minAge = Number(minAgeStr);
  const maxAge = Number(maxAgeStr);
  // const newPetFull = {
  //   name: name,
  //   breed: breed,
  //   minAge: minAge,
  //   maxAge: maxAge,
  //   gender: gender,
  //   comment: comment,
  //   friendlyTo: {
  //     dogs: friendlyDogs,
  //     cats: friendlyCats,
  //     children: friendlyChildren,
  //   },
  //   img_url: img_url,
  //   ownerFname: ownerFname,
  //   ownerLname: ownerLname,
  //   ownerEmail: ownerEmail,
  // };

  const newPet = {
    name: name,
    type: capitalizeStr(type),
    breed: breed,
    gender: gender,
    minAge: minAge,
    maxAge: maxAge,
    age: Math.round((maxAge + minAge) / 2),
    friendlyTo: {
      children: friendlyChildren,
      dogs: friendlyDogs,
      cats: friendlyCats,
    },
    comment: comment,
    img_url: img_url,
    ownerFname: ownerFname,
    ownerLname: ownerLname,
    ownerEmail: ownerEmail,
  };
  console.log(newPet);

  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "./data/pets.json"),
      "utf8"
    );
    const parsedJSON = JSON.parse(jsonData);
    // console.log(parsedJSON);
    if (parsedJSON.hasOwnProperty(type)) {
      parsedJSON[type].push(newPet);
    }
    // console.log(parsedJSON.cat);
    const newStringifiedData = JSON.stringify(parsedJSON, null, 2); // `null, 2` for pretty-printing the JSON

    fs.writeFileSync(
      path.join(__dirname, "./data/pets.json"),
      newStringifiedData,
      "utf8"
    );
    res
      .status(200)
      .json({ success: true, message: "Pet registered successfully" });
  } catch (err) {
    console.error("Cant retrieve pet data: ");
    res.status(400).json({ success: false, message: "FAILED pet retrieval" });
  }
});
function capitalizeStr(str) {
  if (str.length > 0) {
    str = str[0].toUpperCase() + str.slice(1);
  }
  return str;
}

// in between post request for user creating an account
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
