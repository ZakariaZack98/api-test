const http = require("http");
const { log, error } = require("console");
const url = require("url");
const event = require("events");
const path = require("path");
const fs = require("fs");

const eventEmmiter = new event();

const resources = ["photos", "posts", "comments", "albums", "todos", "users"];

resources.forEach((resource) => {
  eventEmmiter.on(
    `fetch${resource.charAt(0).toUpperCase() + resource.slice(1)}`,
    (callback) => {
      fetch(`https://jsonplaceholder.typicode.com/${resource}`)
        .then((res) => res.json())
        .then((data) => callback(data));
    }
  );
});

const server = http.createServer((req, res) => {
  const ourUrl = url.parse(req.url);
  log(ourUrl);
  const match = resources.find((resource) => ourUrl.path === `/${resource}`);
  if (match) {
    const eventName = `fetch${match.charAt(0).toUpperCase() + match.slice(1)}`;
    eventEmmiter.emit(eventName, (data) => {
      const targetPath = path.join(__dirname, `${match}.json`);
      fs.writeFile(targetPath, JSON.stringify(data), (error) => {
        if (error) log("Failed to write data to file. " + error);
      });
      fs.readFile(targetPath, "utf-8", (err, fileData) => {
        res.end(fileData);
      });
    });
  } else {
    res.end("Error: Invalid query");
  }
});

server.listen(4040, () => {
  log("server running on port 4040");
});
