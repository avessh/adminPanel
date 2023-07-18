const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    subjectCode: {
        type: String
    },
    subjectName:{
        type: String
    },
    department:{
        type:mongoose.Schema.Types.Mixed,
        ref:"departmentData"
    },
    course:{
        type:mongoose.Schema.Types.Mixed,
        ref:"coursedata"
    },
    Date:{
        type:Date
    }
})

const subjectmodel = new mongoose.model("subjectdata" , subjectSchema)

module.exports = subjectmodel