const http = require("http");
const { log, error } = require("console");
const url = require("url");
const event = require("events");
const fs = require("fs");
const { fetchData } = require("./event");

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
    const path = fetchData(match);
    fs.readFile(path, 'utf-8', (err, data) => {
      if(err) {
        log(err)
      } else res.end(data)
    })
  } else {
    res.end("Error: Invalid query");
  }
});

server.listen(4040, () => {
  log("server running on port 4040");
});
