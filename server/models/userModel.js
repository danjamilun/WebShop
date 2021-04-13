const mongoose = require("mongoose");

const {Schema} = mongoose;

const userModel = new Schema(
    {
    name:{type: String,
        trim:true,//odnsosno svaki razmak na pocetku i kraju bit ce otklonjen
        //required:true,//obavezan unos
        maxlength:32},
    password:{type:String, required: true},
    email:{type: String,
        trim:true,//odnsosno svaki razmak na pocetku i kraju bit ce otklonjen
        required:true,//obavezan unos
        maxlength:32,
        unique:32//jedinstveno},
    }
});

module.exports = mongoose.model('User', userModel,'users');