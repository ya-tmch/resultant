const express = require('express')
const getMiddleware = require('./data').getMiddleware
const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// api
app.get('/api/v1/stocks', getMiddleware())

// index
app.get('/*', (req, res) => {
    res.render('index.ejs', {title: 'Приветки;)'})
})

// error
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).end()
})

app.listen(8080, () => {
    console.log('Open ip:8080')
})
