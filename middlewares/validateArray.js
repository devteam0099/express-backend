const {errorResponse}  =require('../utils/constants.js')

const validateArray = (req,res,next) => {
    const {ids} = req.body
    const regex = /^\d+$/
    return (ids && Array.isArray(ids) && ids.length > 0)? ids.every(item => regex.test(item))? next() : 
    errorResponse(res,400,"Please provide IDs in correct format") :
    !ids? errorResponse(res,400,"Please select atleast one ID to proceed") : !Array.isArray(ids)?
    errorResponse(res,400,"Please provide IDs in Array format") : errorResponse(res,400,"Please select atleast one id to proceed")
}
module.exports = validateArray