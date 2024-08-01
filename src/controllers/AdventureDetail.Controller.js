

const {CreateNewAdventureDetailInDBService} = require("./../service/AdventureDetail.Service")

async function CreateNewAdventureDetailController(request,response){
   try{
    const {adventureId} = request.query
    const {subtitle,description,slots} = request.body

    const modifiedDateSlots = slots.map((element)=>{
        const modifiedDateSlots = slots.map((element) => {
         const [day,month,year] = element.date.split("-").map(Number)


         const date = new Date(Date.UTC(year,month-1,day))

         return {
            date,
            numberOfPerson : element.numberOfPerson
         }
        });
    })



    const result = await CreateNewAdventureDetailInDBService(adventureId,subtitle,description,modifiedDateSlots)

    if(result.success){
        response.status(201).json({
            success : true,
            data : result.data
        })
    }else{
        throw new Error("CreateNewAdventureDetailController failed to complete task")
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
    CreateNewAdventureDetailController
}