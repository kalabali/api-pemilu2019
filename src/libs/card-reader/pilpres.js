/*
card is a cheerio object
*/
const cheerio = require('cheerio')

const cardReader = ( card, institute ) => {
    let cardData = {
        institute,
        votes_sum_percentage: '',
        candidates: [
            {
                candidates_name: 'Joko Widodo & Ma\'ruf Amin',
                votes: ''
            },
            {
                candidates_name: 'Prabowo Subianto & Sandiaga Uno',
                votes: ''
            }
        ]    
    }
    const $card = cheerio.load(card)

    cardData.votes_sum_percentage = $card('.header-single .total-head').text()    

    $card('.datapaslon .angka-bar').each((index, el) => {
        cardData.candidates[index].votes = $card(el).text()
    })
    
    return cardData
}

module.exports = cardReader