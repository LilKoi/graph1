const express = require('express')
const app = express()
const port = 3000
const fs = require("fs");
app.get('/', (req, res) => {
    app.use('/data', express.static('data'))
    app.use('/libs', express.static('libs'))
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})