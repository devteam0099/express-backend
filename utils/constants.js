const emptyFieldFinder = (...args) => {
    const fields = args[0]
    const affectedField = Object.keys(fields).find(key => !fields[key]  || fields[key] === "")
    return affectedField
}

const successResponse = (resp,code,data,count = null) => {
    const message = {code,data}
    if (count) {
        message.count = count
    }
    return resp.send(message)
}

const errorResponse = (resp,code,message) => {
    return resp.send({code,message})
}

const validateRegex = (regexData) => {
    const regex = /^\d+$/
    if (Array.isArray(regexData)) {
        return regexData.every(item => regex.test(item))? true : false
    }else if(typeof regexData === 'string') {
        return regex.test(regexData)? true : false
    }
}


module.exports = {emptyFieldFinder,successResponse,errorResponse,validateRegex}