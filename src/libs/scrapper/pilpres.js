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
const cardReader = require('../card-reader/pilpres')
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