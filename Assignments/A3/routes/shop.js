// Routes reachable for users
const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.use(
  session({
    name: "cookie",
    resave: false,
    secret: "12345678", // Secret key used to sign the session ID cookie
    saveUninitialized: true, // Save a session that is new but not modified
    cookie: { secure: false, httpOnly: false },
  })
);

router.get("/browse_result", (req, res) => {
  // console.log(req.query);
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
  };
  //
  const paramList = {
    type: type,
    catBreed: catBreed,
    dogBreed: dogBreed,
    minAge: minAge,
    maxAge: maxAge,
    gender: gender,
    friendlyTo: friendlyTo,
  };
  // console.log(paramList);
  // Filter and return a list of animal according to search parameter
  const filterData = function filterData(petsData, params) {
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
          //  Testing for breed or breed is all
          (animal.breed === params.breed ||
            params.breed === `all-${params.type}`) &&
          // Testing for age
          (params.minAge <= animal.age || params.minAge == "") &&
          (params.maxAge >= animal.age || params.maxAge == "") &&
          //Testing for gender
          (params.gender === animal.gender ||
            params.gender === "either" ||
            params.gender == undefined) &&
          // Testing for friendliness
          ((params.friendlyTo.children && animal.friendlyTo.children) ||
            params.friendlyTo.children === undefined) &&
          ((params.friendlyTo.dogs && animal.friendlyTo.dogs) ||
            params.friendlyTo.dogs === undefined) &&
          ((params.friendlyTo.cats && animal.friendlyTo.cats) ||
            params.friendlyTo.cats === undefined)
        );
      });
    }
  };
  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "../data/pets.json"),
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
    console.error("Cant retrieve pet data: " + err);
    res.status(400).json({ success: false, message: "FAILED pet retrieval" });
  }
});

router.get("/browse", (req, res) => {
  // const page = req.params.page;
  // console.log(req.session.username);
  res.render("browsePets", { username: req.session.username });
});

router.get("/", (req, res) => {
  res.render("home", { username: req.session.username });
});

router.get("/home", (req, res) => {
  res.redirect("/"); // Redirect to the root route
});

module.exports = router;
