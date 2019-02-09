var express = require('express');
var app = express();
app.use(express.static(__dirname + '/dist/salvus-dashboard'));
app.listen(process.env.PORT || 3000);