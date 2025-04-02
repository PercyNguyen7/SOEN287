// RUN ISNTRUCTION: from current directory A3, type
// npx nodemon q2/numOfVisits

// then go to http://localhost:3500/
// to clear cookies: http://localhost:3500/r

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  // IF THERE IS A COOKIE
  if (req.cookies.userData) {
    console.log(req.cookies);
    const newDate = new Date().toString();
    const newVisitCount = req.cookies.userData[0] + 1;
    const newData = [newVisitCount, newDate];
    res.cookie("userData", newData);
    res.send(
      `Welcome back, this is your #${req.cookies.userData[0]} visit on this webpage! Last time you visited was on ${req.cookies.userData[1]}`
    );
  } else {
    const date = new Date().toString();
    const visitCount = 2;
    const data = [visitCount, date];
    res.cookie("userData", data);
    res.send(`Welcome
to my webpage! It is your first time here.`);
  }
});

//Route for clearing cookies
app.get("/r", (req, res) => {
  res.clearCookie("userData");
  res.send("user removed cookie");
});

//Iterate users data from cookie
// app.get("/a", (req, res) => {
//   //shows all the cookies
//   const date = new Date();
//   const visitCount = 0;
//   const data = [visitCount, date];

//   res.cookie("userData", data);
//   console.log(req.cookies);
//   res.send(req.cookies);
// });

//server listens to port 3500
app.listen(3500, (err) => {
  if (err) throw err;
  console.log("listening on port 3500");
});
