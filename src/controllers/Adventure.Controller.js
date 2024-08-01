const httpStatus = require('http-status')

const {CreateNewAdventureInDBService, GetAllAdventuresInACityDBService}  = require('./../service/Adventure.Service')


async function CreateNewAdventureController(request,response){
try {

    const { cityId,name,category,images, duration,pricePerHead} = request.body

    const result = await CreateNewAdventureInDBService( cityId,name,category,images, duration,pricePerHead)

    if(!result.success){
        throw new Error("CreateNewAdventureController failed to complete task")
    }

    response.status(201).json({
        success : true,
        data : result.data
    })
    
} catch (error) {
    console.log(error)
    response.status(500).json({
        success : false,
        message : "Something went wrong" 
    })
}
}


async function GetAllAdventureInACityController (){



    try {

        const {cityId} = request.query

        const result = await GetAllAdventuresInACityDBService(cityId)

        if (result.success) {
            response.status(httpStatus.OK).json({
                success: true,
                data: result.data
            })
        } else {
            throw new Error("GGetAllAdventureInACityController didn't give any adventure")
        }
        
    } catch (error) {
        console.log(error)
        return{
            success:false
        }
    }
}

async function UpdateAdventureInACityController(request,response){
 try{
        const {id: cityId}= request.query

        const DATA = {}
        const { name,
            category,
            images,
            duration,
            pricePerHead}= request.body

        const result = await UpdateCityInDBService(cityId)

        if(result.success){
        response.status(200).json({
            success: true,
            data:result
        })
        }else{
            throw new Error("UpdateCityController threw error")
        }

    }catch(error){
        console.log(error)
        response.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function DeleteAdventureInACityController(request,response){
    try {
        const {id: cityId}= request.query

        const result = await DeleteCityInDBService(cityId)

        if(result.success){
            response.status(200).json({
                success: true,
                data: result
            })
        }else{
            throw new Error("DeleteAdventureInACityController threw error")
        }
        
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }

}

module.exports = {
    CreateNewAdventureController,
    GetAllAdventureInACityController,
    UpdateAdventureInACityController,
    DeleteAdventureInACityController
}