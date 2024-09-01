const express = require("express");
const routes = require("./routes");

const app = express();
const port = 3000;

console.clear();

app.use(express.static("public"));

// Use the defined routes
app.use("/", routes);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
