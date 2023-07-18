const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    _id:{
        type:String
    },

    courseId: {
        type: String,
        required: true,
        unique: true,

    },
    Delete: {
        type: Number,
        default: 0
    },
    courseName: {
        type: String
    },
    department:{
        type:mongoose.Schema.Types.Mixed,
        ref:"departmentData"
    },
    Date: {
        type: Date
    }
})

const courseModel = new mongoose.model("coursedata", courseSchema)

module.exports = courseModel