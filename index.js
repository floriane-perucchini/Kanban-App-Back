require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const router = require('./app/router.js')
const app = express();

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const bodyParser = multer();
app.use(bodyParser.none());

app.use(router);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`)
})