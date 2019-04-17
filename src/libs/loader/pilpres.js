/*
query: {
    institute: string
    candidate: string
}
*/
const { getDb, ObjectId } = require('../db')

const loader = async query => {
    try{        
        let { data, last_crawled } = await getDb().db(process.env.DB_NAME).collection('data_pileg').findOne({
            '_id': ObjectId(process.env.DATA_PILEG_ID)
        })
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