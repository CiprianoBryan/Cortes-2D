const express = require('express');
const bodyParser = require('body-parser');

const router = require('./network/routes');

let app = express();
app.use(bodyParser.json());
router(app);

app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');