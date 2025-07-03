const event = require("events");
const { log } = require("console");
const path = require("path");
const fs = require("fs");

const eventEmmiter = new event();

const fetchData = (resourceName) => {
  eventEmmiter.on(resourceName, (callback) => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceName}`)
      .then((res) => res.json())
      .then((data) => callback(data));
  });
  const targetPath = path.join(__dirname, `${resourceName}.json`);
  eventEmmiter.emit(resourceName, (data) => {
    fs.writeFile(targetPath, JSON.stringify(data), (error) => {
      if (error) log("Failed to write data to file. " + error);
    });
  });
  return targetPath;
};

module.exports = { fetchData };
