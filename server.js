const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/ng9crud'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/ng9crud/index.html'));
});
var distDir = __dirname + '/dist/';
app.use(express.static(distDir));
// app.get('/*', function(req, res) {
//   res.sendFile('index.html', {root: 'dist/ng9-crud/'}
// );
// });
app.listen(process.env.PORT || 8080);
console.log('Server listening on port 8080');
