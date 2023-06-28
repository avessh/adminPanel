const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    StudentId: {
        type: Number,
        id: String,
        required : true,
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
    Date:{
        type:Date
    }
})

const StudentModel = new mongoose.model("studentData" , studentSchema)

module.exports = StudentModel