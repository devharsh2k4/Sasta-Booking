const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {GetUserByIdFromDBService} =  require("./../service/User.Service")

const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY

async function AdminAuthorizationMidleware(req,res,next){
try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token,process.env.JWT_SECRET_KEY)

    const {userid:userId} = payload

    const result = await GetUserByIdFromDBService(userId)

    if(!result.success){
        throw new Error("AdminAuthorizationMidleware unable to get user")
    }

   const {role} = result.data

    if(role === "admin"){
        next()
    }else{
         throw new Error("AdminAuthorizationMidleware user is not admin")
    }

    
   
} catch (err) {
    console.log(err)
    res.status(err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:err.status ? err.message : "something went wrong"
    })
}
}


module.exports = {
    AdminAuthorizationMidleware
}
