const { CreateNewCityInDBService, GetAllCityFromDBService, UpdateCityInDBService } = require("./../service/City.Service")

async function CreateNewCityConytoller(request, response) {
    try {

        const { name, description, image, cuisines } = request.body

        const result = await CreateNewCityInDBService(name, image, description, cuisines)

        if (!result.success) {
            throw new Error("CreateNewCityInDBService failed to complete task")
        }

        response.status(201).json({
            success: true,
            data: result.data
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function GetAllCityController(request,response) {
    try {
        const result = await GetAllCityFromDBService()

        if (result.success) {
            const DATA = result.data.map((element) => {
                const { _id, name, image, description, cuisines } = element

                return {
                    id: _id,
                    name,
                    image,
                    description,
                    cuisines
                }
            })

            response.status(200).json({
                success: true,
                data: DATA
            })
        } else {
            throw new Error("GetAllCityFromDBService didn't give any city")
        }
    } catch (err) {
        console.log(err)
        response.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function DeleteCityController(){
    try {
        const {id: cityId}= request.query

        const result = await DeleteCityInDBService(cityId)

        if(result.success){
            response.status(200).json({
                success: true,
                data: result
            })
        }else{
            throw new Error("DeleteCityInDBService threw error")
        }
        
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function UpdateCityController(request,response){
    try{
        const {id: cityId}= request.query

        const DATA = {}
        const {name,description,image,cuisines}= request.body

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

module.exports = {
    CreateNewCityConytoller,
    GetAllCityController,
    UpdateCityController,
    DeleteCityController
}