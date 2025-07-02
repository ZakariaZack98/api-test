const http = require('http');
const {log} = require('console');
const {URL} = require('url');
const url = require('url');

const data = 
  {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  };
  

const server = http.createServer((req, res) => {
  const ourUrl = url.parse(req.url);
  log(ourUrl);
  if(ourUrl.path == '/') {
    const responseData = JSON.stringify(data);
    res.end(responseData);
  } else res.end('Error: Invalid query')
})

server.listen(4040, () => {
  log('server running on port 4040')
})