var express = require('express'),
    wines = require('./routes/dive');
 
var app = express();

//app.get('/api/dives/:id/reports', wines.findByManager);
app.get('/api/dives/:id', wines.findById);
app.get('/api/dives', wines.findAll);

app.listen(3000);
console.log('Listening on port 3000.');