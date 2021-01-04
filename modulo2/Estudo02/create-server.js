const http = require("http");
const dt = require("./segundo-server");
//const hostname = '192.168.1.65';
//const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write(req.url);

  // res.write(`<p>Olá edwilson : ${dt.myDateTime()}</p>`);
  res.end();
});

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

server.listen(8080);
