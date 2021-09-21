const express = require('express')
const app = express()
const port = 8000
const fs = require("fs");
app.get('/', (req, res) => {
    app.use('/data', express.static('data'))
    app.use('/public/display.js',express.static('public/display.js'))
    app.use('/public/style/style.css',express.static('public/style/style.css'))
    app.use('/libs', express.static('libs'))
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})