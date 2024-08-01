const bcrypt = require('bcrypt')
const {CreateNewUserInDBService} = require('./../service/User.Service')

async function CreateNewUserController(request,response){
    try{
        const {name,email,password} = request.body


        if(!name || !email || !password){
            return response.status(400).json({
                success : false,
                message : "Please enter all the fields"
            })
        }
        
        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword =  bcrypt.hashSync(password,salt)
        const result = await CreateNewUserInDBService(name,email,encryptedPassword)

        if(result.success){
            response.status(201).json({
                success : true,
                message : "User created successfully",
            })
        }else{
            throw new Error("CreateNewUserController failed to complete task")
        }
    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

module.exports = {
    CreateNewUserController
}