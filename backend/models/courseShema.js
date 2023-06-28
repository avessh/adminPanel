const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseId: {
        type: Number,
        required : true,
        unique   :true,
        ref : "courses"

    },
    courseName: {
        type: String
    },
    Date:{
        type:Date
    }
})

const courseModel = new mongoose.model("coursedata" , courseSchema)

module.exports = courseModel