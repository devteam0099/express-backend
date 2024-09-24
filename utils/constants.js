const emptyFieldFinder = (...args) => {
    const fields = args[0]
    const affectedField = Object.keys(fields).find(key => !fields[key]  || fields[key] === "")
    return affectedField
}

const successResponse = (resp,code,message,count = null) => {
    const data = {code,message}
    if (count) {
        data.count = count
    }
    return resp.send(data)
}

const errorResponse = (resp,code,message) => {
    return resp.send({code,message})
}
module.exports = {emptyFieldFinder,successResponse,errorResponse}