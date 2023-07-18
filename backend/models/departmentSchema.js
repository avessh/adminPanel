const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({

    _id:{
        type:String
    },

    departmentId: {
        type: String,
        required: true,
        unique: true,
        ref: "courses"

    },
    Delete: {
        type: Number,
        default: 0
    },
    departmentName: {
        type: String
    },
    course:{
        type:mongoose.Schema.Types.Mixed,
        ref:"coursedata"
    },
    Date: {
        type: Date
    }
})

const departmentModel = new mongoose.model("departmentData", departmentSchema)

module.exports = departmentModel