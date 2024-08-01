const mongoose = require('mongoose');

const AdventureSchema = new mongoose.Schema({

    name:{
        type:String,
        required : true
    },
    cityId : {
        type : mongoose.Schema.Types.ObjectId,
        rel : "cities",
        required : true
    },
    category : {
        type : [String],
        required : false
    },
    images : {
        type : [String],
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    pricePerHead : {
        type : Number,
        required : true
    },
    currency : {
        type: String,
        default: "INR"
    }
})

const AdventureModel = mongoose.model( "adventures" , AdventureSchema);

module.exports = AdventureModel;