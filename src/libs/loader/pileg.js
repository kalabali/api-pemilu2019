/*
query: {
    institute: string
    political_party: string
}
*/

let { data, last_crawled } = require('../../data/quick-count-pileg.json')

const loader = query => {
    try{
        const { institute, political_party } = query
        
        if(institute && institute !== ''){
            const key = institute.toLowerCase();
            const re = new RegExp(key,"g");
            data = data.filter(d => d.institute.toLowerCase().search(re) !== -1)            
        }
        if(political_party && political_party !== ''){
            const key = political_party.toLowerCase();            
            const re = new RegExp(key,"g");
            data = data.map(d => {
                d.political_party = d.political_party.filter(({ name }) => name.toLowerCase().search(re) !== -1 )                
                return d
            })
        }
        return {
            data,
            last_crawled
        }        
    }
    catch(e){
        throw new Error(e)
    }
}

module.exports = loader