require('dotenv').config()

const express = require('express')
const app = express()
const cron = require('node-cron');

const loaderPilpres = require('./libs/loader/pilpres')
const scrapperPilpress = require('./libs/scrapper/pilpres')
const loaderPileg = require('./libs/loader/pileg')
const scrapperPileg = require('./libs/scrapper/pileg')

const port = process.env.PORT

cron.schedule('* * * * *', async () => {
    const data = await Promise.all([scrapperPilpress(), scrapperPileg()])
    console.log(data)
    console.log('cron quick count updated')
});

app.options("*", function (req, res, next) {
    let headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Credentials": false,
        "Access-Control-Max-Age": '86400', // 24 hour,
        "Access-Control-Allow-Headers": "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Access-Control-Allow-Origin"
    };    
    res.writeHead(200, headers);
    res.end();
});

app.get('/', (req,res) => res.status(200).json({'msg': "pilpres 2019"}))

app.get('/pilpres', (req, res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin, Content-Type, Accept, Authorization, X-Request-With');
    res.setHeader("Content-Type", "application/json");

    try{
        const { data, last_crawled } = loaderPilpres(req.query)
        res.status(200).json({
            success: true,
            last_crawled,
            data,
            query: req.query    
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            msg: 'pantau yang lain dulu gan'
        })
    }
})

app.get('/pilpres/reload', async (req, res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin, Content-Type, Accept, Authorization, X-Request-With');
    res.setHeader("Content-Type", "application/json");
    try{
        const { data, last_crawled } = await scrapperPilpress()
        res.status(200).json({
            success: true,
            last_crawled,
            data,
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            msg: e.message
        })
    }
})

app.get('/pileg', (req, res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin, Content-Type, Accept, Authorization, X-Request-With');
    res.setHeader("Content-Type", "application/json");

    try{
        const { data, last_crawled } = loaderPileg(req.query)
        res.status(200).json({
            success: true,
            last_crawled,
            data,
            query: req.query    
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            msg: 'pantau yang lain dulu gan'
        })
    }
})

app.get('/pileg/reload', async (req, res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin, Content-Type, Accept, Authorization, X-Request-With');
    res.setHeader("Content-Type", "application/json");
    try{
        const { data, last_crawled } = await scrapperPileg()
        res.status(200).json({
            success: true,
            last_crawled,
            data,
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            msg: e.message
        })
    }
})

app.listen(port, () => console.log(`quick count listening on port ${port}!`))