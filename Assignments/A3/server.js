const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const fs = require("node:fs");
const PORT = 3200 || process.env.port;

const shopRoutes = require("./routes/shop.js");
const userRoutes = require("./routes/user.js");

// Adding Session Middleware
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
app.set("views", path.join(__dirname, "./views"));

// middleware used to parse incoming requests with application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// middleware to parse json files
app.use(express.json());

// middleware to serve static data from public folder
app.use(express.static(path.join(__dirname, "./public")));

app.use(shopRoutes);

app.get("/get_data", (req, res) => {
  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "./data/pets.json"),
      "utf8"
    );
    const parsedJSON = JSON.parse(jsonData);
    // console.log(parsedJSON);
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

// app.get("/data2", (req, res) => {
//   try {
//     const jsonData = JSON.stringify(pets, null, 2); // `null, 2` for pretty-printing the JSON

//     fs.writeFileSync(
//       path.join(__dirname, "./data/pets.json"),
//       jsonData,
//       "utf8",
//       (err) => {
//         if (err) console.log("Couldnt write file");
//         else console.log("file written");
//       }
//     );
//     res.status(200).json({ message: "pet posting" });
//     return;
//   } catch (err) {
//     console.error("Error make pets:", err);
//     res.status(500).json({ message: "Cant fetch pets" });
//   }
// });
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
  const capitalizeStr = function (str) {
    if (str.length > 0) str = str[0].toUpperCase() + str.slice(1);
    return str;
  };
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

app.use(userRoutes);
app.listen(PORT, (err) => {
  if (err) console.error("error is:" + err);
  console.log(`Server is running on localhost:${PORT}`);
});
