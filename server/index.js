const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const getSentiment = require('./getSentiment');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/api/:query/sentiment', (req, res) => {
  getSentiment(req.params.query)
    .then(sentiment => res.send({ sentiment }));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));