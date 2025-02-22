const CityModel = require('./../models/City.Model')

async function CreateNewCityInDBService(name, image, description, cuisines) {
    try {

        const result = await CityModel.create({
            name,
            image,
            description,
            cuisines
        })

        if (result) {
            return {
                success: true,
                data: result
            }
        }

    } catch (error) {
        console.log(error)
        return {
            success: false
        }
    }
}

async function GetAllCityFromDBService() {
    try {

        const result = await CityModel.find()

        if (result) {
            return {
                success: true,
                data: result
            }
        } else {
            throw new Error("GetAllCityFromDBService unable to get the city")
        }
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
}

async function DeleteCityInDBService(cityId) {
    try{
        const result = await CityModel.findByIdAndDelete(cityId)
        if(result){
            return {
                success: true,
                data: result
            }
        } else {
            throw new Error("DeleteCityInDBService unable to delete city with id", cityId)
        }
    }catch(err){
        console.log(err)
        return {
            success: false
        }
    }
}

async function UpdateCityInDBService(cityId, data) {
    try {

        const { name, description, cuisines, image } = data
        const cityDocument = await CityModel.findById(cityId)

        if (name) {
            cityDocument.name = name
        }
        if (description) {
            cityDocument.description = description
        }
        if (cuisines) {
            cityDocument.cuisines = cuisines
        }
        if (image) {
            cityDocument.image = image
        }

        const result = await cityDocument.save()

        if (result) {
            return {
                success: true,
                data: result
            }
        } else {
            throw new Error("UpdateCityInDBService unable to update city with id", cityId)
        }

    } catch (err) {
        console.log(err)
        return {
            success: false
        }
    }
}

module.exports = {
    CreateNewCityInDBService,
    GetAllCityFromDBService,
    UpdateCityInDBService,
    DeleteCityInDBService
}