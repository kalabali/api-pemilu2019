/*
card is a cheerio object
*/
const cheerio = require('cheerio')

const cardReader = ( card, institute ) => {
    let cardData = {
        institute,
        voters_sum_percentage: '',
        candidates: [
            {
                candidates_name: 'Joko Widodo & Ma\'ruf Amin',
                voters: ''
            },
            {
                candidates_name: 'Prabowo Subianto & Sandiaga Uno',
                voters: ''
            }
        ]    
    }
    const $card = cheerio.load(card)

    cardData.voters_sum_percentage = $card('.header-single .total-head').text()    

    $card('.datapaslon .angka-bar').each((index, el) => {
        cardData.candidates[index].voters = $card(el).text()
    })
    
    return cardData
}

module.exports = cardReader