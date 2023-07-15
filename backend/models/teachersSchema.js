const mongoose = require('mongoose')

const teachersSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    teacherName: {
        type: String
    },
    department:{
        type: String
    },
    PhoneNumber:{
        type: Number
    },
    teacherEmailId:{
        type: String
    },
    Delete:{
        type:Number,
        default:0
    },
    subject:{
        type:mongoose.Schema.Types.Mixed,
        ref:"subjectdata"
    },
    Date:{
        type:Date,
        default:Date.now()
    },

})

const teachersmodel = new mongoose.model("teachersdata" , teachersSchema)

module.exports = teachersmodel