const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse URL-encoded data (for POST method)
app.use(express.urlencoded({ extended: true }));

// Serve the HTML form and handle GET request with query parameters
app.get("/", (req, res) => {
  const { name, phonenumber } = req.query;

  if (name && phonenumber) {
    // If GET parameters are available, show the result
    res.send(
      `Received GET request: Name = ${name}, Phone Number = ${phonenumber}`
    );
  } else {
    // Display the form if no parameters are in the URL
    res.send(`
      <h1>Submit Form (GET method)</h1>
      <form action="/" method="GET">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required>
        <br><br>
        <label for="phone">Phone Number:</label>
        <input type="text" name="phonenumber" id="phone" required>
        <br><br>
        <button type="submit">Submit via GET</button>
      </form>

      <h1>Submit Form (POST method)</h1>
      <form action="/submit" method="POST">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required>
        <br><br>
        <label for="phone">Phone Number:</label>
        <input type="text" name="phonenumber" id="phone" required>
        <br><br>
        <button type="submit">Submit via POST</button>
      </form>
    `);
  }
});

// Handle POST request and extract the body data
app.post("/submit", (req, res) => {
  const { name, phonenumber } = req.body;
  if (name && phonenumber) {
    res.send(
      `Received POST request: Name = ${name}, Phone Number = ${phonenumber}`
    );
  } else {
    res.send("Please submit the form with your name and phone number.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
