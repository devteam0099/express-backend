const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY

const validateFields = (...args) => {
    const fields = args[0]
    const affectedField = Object.keys(fields).find(key => !fields[key]  || fields[key] === "")
    return `${affectedField} should not be empty`
}

const successResponse = (code,data,count = null) => {
    const success = {code,data}
    if (count) {
        success.count = count
    }
    return success
}

const errorResponse = (code,data) => {
    return {code,data}
}

const validateRegex = (regexData) => {
    const regex = /^\d+$/
    if (Array.isArray(regexData)) {
        return regexData.every(item => regex.test(item))? true : false
    }else if(typeof regexData === 'string') {
        return regex.test(regexData)? true : false
    }
}

const validateToken = async(token) => {
    try {
        jwt.verify(token,process.env.SECRET_KEY)
        return true
    } catch (error) {
        console.log(error.message)
        return false
    }
}

module.exports = {validateFields,successResponse,errorResponse,validateRegex,validateToken}