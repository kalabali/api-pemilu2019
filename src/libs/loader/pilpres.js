/*
query: {
    institute: string
    candidate: string
}
*/

let { data, last_crawled } = require('../../data/quick-count-pilpres.json')

const loader = query => {
    try{
        const { institute, candidate } = query
        
        if(institute && institute !== ''){
            const key = institute.toLowerCase();
            const re = new RegExp(key,"g");
            data = data.filter(d => d.institute.toLowerCase().search(re) !== -1)            
        }
        if(candidate && candidate !== ''){
            const key = candidate.toLowerCase();            
            const re = new RegExp(key,"g");
            data = data.map(d => {
                d.candidates = d.candidates.filter(({ candidates_name }) => candidates_name.toLowerCase().search(re) !== -1 )                
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