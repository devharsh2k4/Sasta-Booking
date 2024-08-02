const bcrypt = require('bcrypt')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { CreateNewUserInDBService, GetUserByEmailFromDBService } = require('./../service/User.Service')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

async function CreateNewUserController(request, response) {
    try {
        const { name, email, password } = request.body


        if (!name || !email || !password) {
            return response.status(400).json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword = bcrypt.hashSync(password, salt)
        const result = await CreateNewUserInDBService(name, email, encryptedPassword)

        if (result.success) {
            response.status(201).json({
                success: true,
                message: "User created successfully",
            })
        } else {
            throw new Error("CreateNewUserController failed to complete task")
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function SignInUserController(request, response) {
    try {
        const { email, password } = request.body


        if (!email || !password) {
            const err = new Error("Email and password are required")
            err.status = httpStatus.BAD_REQUEST
            throw err

        }

        const UserResult = await GetUserByEmailFromDBService(email)

        if (!UserResult.success) {
            const err = new Error("Invalid Email or Password")
            err.status = httpStatus.BAD_REQUEST
            throw err
        } 
 
        const {password:encryptedPassword,_id:userId} = UserResult.data

        const PasswordCompareResult =  bcrypt.compareSync(password,encryptedPassword)

        if(!PasswordCompareResult){
            const err = new Error("Email and password are required")
            err.status = httpStatus.BAD_REQUEST
            throw err
        }

        const PAYLOAD = {
            userid:userId
        }
        
      const token =  jwt.sign(PAYLOAD,JWT_SECRET_KEY,{expiresIn:"1h"})

      response.status(httpStatus.CREATED).json({
          success:true,
          message:"User logged in successfully",
          token
      })


    } catch (error) {
        console.log(error)
        response.status(error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.status ? error.message : "Something went wrong"
        })
    }
}

module.exports = {
    CreateNewUserController,
    SignInUserController
}