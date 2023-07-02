const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    StudentId: {
        type: Number,
        id: String,
        unique   :true,
        ref : "courses"

    },
    BatchName: {
        type: String
    },
    StudentName:{
        type: String
    },
    PhoneNumber:{
        type: Number
    },
    StudentEmailId:{
        type: String
    },
    Section:{
        type: String
    },
    Delete:{
        type:Number,
        default:0
    },
    Date:{
        type:Date,
        default: Date.now()
    }
})

const StudentModel = new mongoose.model("studentData" , studentSchema)

module.exports = StudentModel