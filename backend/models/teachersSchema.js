const mongoose = require('mongoose')

const teachersSchema = new mongoose.Schema({
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
    Date:{
        type:Date
    }
})

const teachersmodel = new mongoose.model("teachersdata" , teachersSchema)

module.exports = teachersmodel