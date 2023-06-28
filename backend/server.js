const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const StudentModel = require('./models/studentDataModel')
const teachersModel = require('./models/teachersSchema')
const cors = require('cors')
const courseModel = require('./models/courseShema')
const subjectmodel = require('./models/subjectSchema')
const teachersmodel = require('./models/teachersSchema')

const app = express()
app.use(express.json())

app.use(cors())

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

const PORT = 5505

const uri = "mongodb://localhost:27017"

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, connectionParams).then(() => {
    console.log("connected to database")
}).catch((e) => {
    console.log("error while connecting to database", e);
})

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// API to insert student data in bulk

app.post("/studentData", bodyParser.json(), async (req, res) => {


    try {
        const studentData = new StudentModel({
            //getting data from frontend
            id:String,
            StudentId: req.body.StudentId,
            BatchName:req.body.BatchName,
            StudentName: req.body.StudentName,
            PhoneNumber:req.body.PhoneNumber,
            Section:req.body.Section,
            StudentEmailId:req.body.StudentEmailId,
            Date:Date.now()
           
        })


        // console.log(channel.event_description);
        console.log('data from front',req.body[0].StudentName);

        // console.log(event_name);

        const inserted = await StudentModel.insertMany(req.body)
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})

//api to insert single student data
app.post("/oneStudentData", bodyParser.json(), async (req, res) => {


    try {
        const studentData = new StudentModel({
            //getting data from frontend
            StudentId: req.body.StudentId,
            BatchName:req.body.BatchName,
            StudentName: req.body.StudentName,
            PhoneNumber:req.body.PhoneNumber,
            Section:req.body.Section,
            StudentEmailId:req.body.StudentEmailId,
            Date:new Date()
           
        })


        // console.log(channel.event_description);
        console.log('data from front',studentData.StudentName);

        // console.log(event_name);

        const inserted = await studentData.save();
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})

//api to insert single teacher data
app.post("/oneTeacherData", bodyParser.json(), async (req, res) => {


    try {
        const teacherData = new teachersModel({
            //getting data from frontend
            teacherId: req.body.teacherId,
            teacherName:req.body.teacherName,
            department: req.body.department,
            PhoneNumber:req.body.PhoneNumber,
            teacherEmailId:req.body.teacherEmailId,
            Date:Date.now()
           
        })


        // console.log(channel.event_description);
        console.log('data from front',teacherData.PhoneNumber);

        // console.log(event_name);

        const inserted = await teacherData.save();
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})

//API to insert teachers data
app.post("/teachersdata", bodyParser.json(), async (req, res) => {


    try {
        const teachersData = new teachersModel({
            //getting data from frontend
            id:String,
            teacherId: req.body.teacherId,
            teacherName:req.body.teacherName,
            subjects: req.body.subjects,
            PhoneNumber:req.body.PhoneNumber,
            teacherEmailId:req.body.teacherEmailId,
            Date:Date.now()
           
        })


        // console.log(channel.event_description);
        console.log('data from front',req.body[0].teacherName);

        // console.log(event_name);

        const inserted = await teachersModel.insertMany(req.body)
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})

//API to insert course data
app.post("/coursedata", bodyParser.json(), async (req, res) => {


    try {
        const courseData = new courseModel({
            courseId: req.body.courseId,
            courseName:req.body.courseName,
            Date:Date.now()
           
        })


        // console.log(channel.event_description);

        // console.log(event_name);

        const inserted = await courseModel.insertMany(req.body)
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})

//API to insert Subject Data
app.post("/subjectData", bodyParser.json(), async (req, res) => {


    try {
        const subjectData = new subjectmodel({
            //getting data from frontend
            id:String,
            subjectCode: req.body.subjectCode,
            subjectName:req.body.subjectName,
            Date:Date.now()
           
        })


        // console.log(channel.event_description);
        console.log('data from front',req.body[0].subjectName);

        // console.log(event_name);

        const inserted = await subjectmodel.insertMany(req.body)
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})


//API to insert one course 
app.post("/oneSubjectData", bodyParser.json(), async (req, res) => {


    try {
        const subjectData = new subjectmodel({
            //getting data from frontend
            subjectCode: req.body.subjectCode,
            subjectName:req.body.subjectName,
            Date:Date.now()
           
        })


        // console.log(channel.event_description);
        console.log('data from front',subjectData.subjectCode);

        // console.log(event_name);

        const inserted = await subjectData.save();
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})

// API to fetch subject details

app.get("/fetchSubjectData", urlencodedParser, (req, res) => {
    subjectmodel.find({}).then((data) => {
        res.status(200).send(data)
        console.log('data from database' , data);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    })

})

//api to fetch student data

app.get("/fetchStudentData", urlencodedParser, (req, res) => {
    StudentModel.find({}).then((data) => {
        res.status(200).send(data)
        console.log('data from database' , data);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    })

})

//API to fetch teachers data

app.get("/fetchTeachersData", urlencodedParser, (req, res) => {
    teachersModel.find({}).then((data) => {
        res.status(200).send(data)
        console.log('data from database' , data);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    })

})

app.get("/fetchCourseData", urlencodedParser, (req, res) => {
    courseModel.find({}).then((data) => {
        res.status(200).send(data)
        console.log('data from database' , data);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    })

})

app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
})

