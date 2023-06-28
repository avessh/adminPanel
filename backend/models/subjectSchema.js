const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    subjectCode: {
        type: String
    },
    subjectName:{
        type: String
    },
    Date:{
        type:Date
    }
})

const subjectmodel = new mongoose.model("subjectdata" , subjectSchema)

module.exports = subjectmodel