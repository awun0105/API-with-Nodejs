const PORT = process.env.PORT || 1000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const newspapers = [{
        name: 'newsbtc',
        address: 'https://www.newsbtc.com',
        base: ''
    },
    {
        name: 'investorplace',
        address: 'https://investorplace.com/',
        base: ''
    },
    {
        name: 'cryptolian',
        address: 'https://www.cryptopolitan.com/news/',
        base: '',
    },
    {
        name: 'coinquora',
        address: 'https://coinquora.com',
        base: '',
    },
    {
        name: 'cryptonomist',
        address: 'https://en.cryptonomist.ch/categoria/crypto/bitcoin-en/',
        base: '',
    },
    {
        name: 'cryptodaily',
        address: 'https://cryptodaily.co.uk',
        base: '',
    },
    {
        name: 'utoday',
        address: 'https://u.today/bitcoin-news',
        base: '',
    }
]
const articles = []
    // lookup = [{
    //     lookupname: "bitcoin"
    // }, {
    //     lookupname: "BTC"
    // }, {
    //     lookupname: "Bitcoin"
    // }]
newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Bitcoin")', html).each(function() {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })

        })
})
app.get('/', (req, res) => {
    res.json('Welcome to my bitcoin News API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId
    const newspaperAddr = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base
    axios.get(newspaperAddr)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []
            $('a:contains("Bitcoin")', html).each(function() {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})
app.listen(PORT, () => console.log(`server running on PORT ` + PORT))