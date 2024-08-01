const AdventureModel = require('./../models/Adventure.model')

async function CreateNewAdventureInDBService(cityId, name, category, images, duration, pricePerHead) {
    try {


        const result = await AdventureModel.create({
            cityId,
            name,
            category,
            images,
            duration,
            pricePerHead
        })


        if (result) {
            return {
                success: true,
                data: result
            }
        } else {
            throw new Error("CreateNewAdventureInDBService unable to create  ")
        }


    } catch (error) {
        console.log(error)
        return {
            success: false
        }
    }
}

async function GetAllAdventuresInACityDBService(cityId) {
    try {
        const result = await AdventureModel.find({
            cityID
        })

        if (result) {
            return {
                success: true,
                data: result
            }
        } else {
            throw new Error("GetAllAdventureInACityFromDBService unable to get the city")
        }

    } catch (error) {
        console.log(error)
        return {
            success: false
        }
    }
}

async function UpdateAllAdventuresInACityDBService(cityId,data){
   
        try {
    
            const {  
                name,
                category,
                images,
                duration,
                pricePerHead} = data
            const adventureDocument = await AdventureModel.findById(cityId)
    
            if (name) {
                adventureDocument.name = name
            }
            if (category) {
                adventureDocument.description = description
            }
            if (images) {
                adventureDocument.cuisines = cuisines
            }
            if (duration) {
                adventureDocument.image = image
            }
            if (pricePerHead) {
                adventureDocument.image = image
            }
    
            const result = await adventureDocument.save()
    
            if (result) {
                return {
                    success: true,
                    data: result
                }
            } else {
                throw new Error("UpdateAllAdventuresInACityDBService unable to update city with id", cityId)
            }
    
        } catch (err) {
            console.log(err)
            return {
                success: false
            }
        }
    
    
}

async function DeleteAllAdventureInACityDBService(cityId){

    try{
        const result = await AdventureModel.findByIdAndDelete(cityId)
        if(result){
            return {
                success: true,
                data: result
            }
        } else {
            throw new Error("DeleteAllAdventureInACityDBService unable to delete city with id", cityId)
        }
    }catch(err){
        console.log(err)
        return {
            success: false
        }
    }
}

module.exports = {
    CreateNewAdventureInDBService,
    GetAllAdventuresInACityDBService,
    DeleteAllAdventureInACityDBService,
    UpdateAllAdventuresInACityDBService
}