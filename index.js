const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.get('/', (req, res) => {
    res.json('Welcome to my Crypto API');
})
app.get('/News', (req, res) => {
    axios.get('https://www.tradingview.com/chart/EiM5N1VF/?symbol=BINANCE%3ALITUSDT')
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            $('a:contain')
        });
});
app.listen(PORT, () => console.log('server running on PORT ' + PORT))