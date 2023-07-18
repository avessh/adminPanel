const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    StudentId: {
        type: Number,
        id: String,
        unique   :true,

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
    },
    course:{
        type:mongoose.Schema.Types.Mixed,
        ref:"coursedata"

    },
    department:{
        type:mongoose.Schema.Types.Mixed,
        ref:"departmentData"
    }
})

const StudentModel = new mongoose.model("studentData" , studentSchema)

module.exports = StudentModel