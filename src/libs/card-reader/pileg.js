/*
card is a cheerio object
*/
const cheerio = require('cheerio')

const cardReader = ( card, institute ) => {
    let cardData = {
        institute,
        voters_sum_percentage: '',
        political_party: []
    }
    const $card = cheerio.load(card)

    cardData.voters_sum_percentage = $card('.header-single .total-head').text()    

    $card('.paslon li').each((index, el) => {
        cardData.political_party.push({
            name: $card(el).find('.namapaslon').text(),
            votes: $card(el).find('.angka-bar').text()
        })
    })
    
    return cardData
}

module.exports = cardReader