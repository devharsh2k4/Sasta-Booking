const UserModel = require('../models/User.model');

async function CreateNewUserInDBService(name, email, encryptedPassword) {
    try {
        const result = await UserModel.create({
            name,
            email,
            password: encryptedPassword
        })

        if (result) {
            return {
                success: true,
                data: result
            }
        } else {
            throw new Error("CreateNewUserInDBService unable to create user")
        }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }
    }
}

async function GetUserByEmailFromDBService(email, password) {
    try {
        const result = await UserModel.find({
            email
        })

        if (result.length) {
           
                return {
                    success: true,
                    data: result[0]
                }
            }else {
            throw new Error("GetUserByEmailFromDBService unable to get user")
        }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }
    }
}


async function GetUserByIdFromDBService(userid) {
        try {
            const result = await UserModel.find({
                userid
            })
    
            if (result) {
               
                    return {
                        success: true,
                        data: result[0]
                    }
                }else {
                throw new Error("GetUserByUserIdFromDBService unable to get user")
            }
        } catch (error) {
            console.log(error)
            return {
                success: false
            }
        }
    
    }
module.exports = {
    CreateNewUserInDBService,
    GetUserByEmailFromDBService,
    GetUserByIdFromDBService
}