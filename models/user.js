const mongoose = require("mongoose")
const schema =mongoose.Schema;

const userSchema = new schema({
    email : {
        type : String,
        require:true,
        unique:true
    },
    name:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('User', userSchema)