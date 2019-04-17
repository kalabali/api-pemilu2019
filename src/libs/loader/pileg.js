/*
query: {
    institute: string
    political_party: string
}
*/
const { getDb, ObjectId } = require('../db')

const loader = async query => {
    try{
        let { data, last_crawled } = await getDb().db(process.env.DB_NAME).collection('data_pileg').findOne({
            '_id': ObjectId(process.env.DATA_PILEG_ID)
        })
        console.log({data, last_crawled})
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