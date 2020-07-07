const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/ng9-crud'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/ng9-crud/index.html'));});
app.listen(process.env.PORT || 8080);
