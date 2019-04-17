/*
main file that will do the scrapping job from tempo quickcount
the lembaga thing is {
    1. indikator politik indonesia
    2. indo barometer
    3. charta politika
}
*/

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const cardReader = require('./card-reader')
const institue = [
    'indikator politik indonesia',
    'indo barometer',
    'charta politika'
]

const scrapper = async () => {
    try{
        const { data:html } = await axios.get('https://quickcount.tempo.co/')
        const $ = cheerio.load(html)

        const $card = $('.card-single')
        const data = $card.map((index, card) => {
            return cardReader(card, institue[index])
        }).get()        

        let aestTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
        aestTime = new Date(aestTime);
        
        fs.writeFile(path.resolve('src/data/quick-count.json'), JSON.stringify({
            data,
            last_crawled: aestTime.toLocaleString()
        }), 'utf8', () => {
            console.log('quick count data updated')
        });

        return {
            data,
            last_crawled: aestTime.toLocaleString()
        }
    }
    catch(e){
        throw new Error(e)
    }
}

module.exports = scrapper