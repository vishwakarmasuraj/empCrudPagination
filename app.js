const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_CONNECTION).then(() => {
    console.log('Successfully connected to Database')
    app.listen(port, () => console.log(`Server is listening at ${ port }`))
})


