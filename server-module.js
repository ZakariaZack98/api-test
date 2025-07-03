const http = require("http");
const { log, error } = require("console");
const url = require("url");
const event = require("events");
const path = require("path");
const fs = require("fs");

const eventEmmiter = new event();

eventEmmiter.on("fetchPhotos", (callback) => {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then((res) => res.json())
    .then((data) => callback(data));
});


const server = http.createServer((req, res) => {
  const ourUrl = url.parse(req.url);
  log(ourUrl);
  if (ourUrl.path == "/photos") {
    eventEmmiter.emit("fetchPhotos", (data) => {
      const targetPath = path.join(__dirname, "photos.json");
      fs.writeFile(targetPath, JSON.stringify(data), (error) => {
        if (error) log("Failed to write data to file. " + error);
      });
      fs.readFile(targetPath, "utf-8", (err, data) => {
        res.end(data);
      });
    });
  } else res.end("Error: Invalid query");
});

server.listen(4040, () => {
  log("server running on port 4040");
});
