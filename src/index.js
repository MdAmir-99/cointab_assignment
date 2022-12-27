const express = require('express');
const route = require('./routes/route.js');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cors());
app.use('/', route);

app.listen(process.env.PORT || 3001, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});