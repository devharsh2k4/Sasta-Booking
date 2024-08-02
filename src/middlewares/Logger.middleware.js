const httpStatus = require("http-status")
const fs = require('fs')

async function RequestPathAndMethodLoggerMiddleware(req, res, next) {

    try {
        const {method,path} = req

        console.log(method,path)

        const log = `Timestamp: ${new Date()} - ${path} - ${method}\n`

        fs.appendFileSync('request.log.txt',log,'utf-8')

        next()
    } catch (err) {
        console.log(err)
        res.status(err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:err.status ? err.message : "Something went wrong"
        })
    }
}

module.exports = {
    RequestPathAndMethodLoggerMiddleware
}