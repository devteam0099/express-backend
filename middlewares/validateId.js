const {errorResponse} = require('../utils/constants.js')

const validateId = (req,res,next) => {
    const {query} = req
    if (query) {
        const data = {...query}
        const key = Object.keys(data)[0]
        const result = data[key] 
        const regex = /^\d+$/
        return regex.test(result)? next() : errorResponse(res,400,"Please provide a valid Id type")    
    }else{
        next()  
    }
    
}
module.exports = validateId