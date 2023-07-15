const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const StudentModel = require('./models/studentDataModel')
const teachersModel = require('./models/teachersSchema')
const cors = require('cors')
const courseModel = require('./models/courseShema')
const subjectmodel = require('./models/subjectSchema')
const teachersmodel = require('./models/teachersSchema')
const departmentModel = require('./models/departmentSchema')
const { ObjectId } = require('mongodb')

const app = express()
app.use(express.json())

app.use(cors())

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

const PORT = 5505

const uri = "mongodb://localhost:27017/campusWatch"

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
            id: String,
            StudentId: req.body.StudentId,
            BatchName: req.body.BatchName,
            StudentName: req.body.StudentName,
            PhoneNumber: req.body.PhoneNumber,
            Section: req.body.Section,
            StudentEmailId: req.body.StudentEmailId,

        })


        // console.log(channel.event_description);
        // console.log('data from front', req.body[0].StudentName);

        // console.log(event_name);
        console.log('studentdata' , req.body);

        const inserted = await StudentModel.insertMany(req.body)
        // console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ msg: "something is wrong in CSV file" })
    }

})

//api to insert single student data
app.post("/oneStudentData", bodyParser.json(), async (req, res) => {

    

    StudentModel.findOne({StudentId:req.body.StudentId}).then((student) => {
        if(req.body.StudentId === ''){
            
            return   res.send({msg:"please fill fields"})
        }else if(student){
            return   res.send({msg:"student already exist"})
        }else{

        try {
            const studentData = new StudentModel({
                //getting data from frontend
                _id:req.body.StudentId,
                StudentId: req.body.StudentId,
                BatchName: req.body.BatchName,
                StudentName: req.body.StudentName,
                PhoneNumber: req.body.PhoneNumber,
                Section: req.body.Section,
                StudentEmailId: req.body.StudentEmailId,
                course:req.body.course
    
            })
    
    
            // console.log(channel.event_description);
            // console.log('data from front', studentData.StudentName);
    
            // console.log(event_name);
    
            const inserted =  studentData.save();
            // console.log(inserted)
            res.status(200).send({ "msg": "inserted to db" })
        } catch (e) {
            console.log(e)
            res.status(500).send({ "msg": "error" })
        }
        }
    })


    



})

//api to insert single teacher data
app.post("/oneTeacherData", bodyParser.json(), async (req, res) => {


    try {
        const teacherData = new teachersModel({
            //getting data from frontend
            _id:req.body.PhoneNumber,
            teacherId: req.body.teacherId,
            teacherName: req.body.teacherName,
            department: req.body.department,
            PhoneNumber: req.body.PhoneNumber,
            teacherEmailId: req.body.teacherEmailId,
            subject:req.body.subject

        })


        // console.log(channel.event_description);
        // console.log('data from front', teacherData.PhoneNumber);

        // console.log(event_name);

        const inserted = await teacherData.save();
        // console.log(inserted)
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
            id: String,
            teacherId: req.body.teacherId,
            teacherName: req.body.teacherName,
            subjects: req.body.subjects,
            PhoneNumber: req.body.PhoneNumber,
            teacherEmailId: req.body.teacherEmailId,

        })


        // console.log(channel.event_description);
        // console.log('data from front', req.body[0].teacherName);

        // console.log(event_name);

        const inserted = await teachersModel.insertMany(req.body)
        // console.log(inserted)
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
            student_Id:req.body.studentId,
            courseId: req.body.courseId,
            courseName: req.body.courseName,
            Date: Date.now()

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

// API to insert one couse at time

app.post("/oneCourseData", bodyParser.json(), async (req, res) => {


    try {
        const courseData = new courseModel({
            _id:req.body.courseId,
            courseId: req.body.courseId,
            courseName: req.body.courseName,
            Date: Date.now()
        })


        // console.log(channel.event_description);
        // console.log('data from front', courseData.courseName);

        // console.log(event_name);

        const inserted = await courseData.save();
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
            id: String,
            subjectCode: req.body.subjectCode,
            subjectName: req.body.subjectName,
            Date: Date.now()

        })


        // console.log(channel.event_description);
        // console.log('data from front', req.body[0].subjectName);

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
            _id:req.body.subjectCode,
            subjectCode: req.body.subjectCode,
            subjectName: req.body.subjectName,
            department:req.body.department,
            Date: Date.now()

        })


        // console.log(channel.event_description);
        // console.log('data from front', subjectData.subjectCode);

        // console.log(event_name);

        const inserted = await subjectData.save();
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})

// api to post one department data
app.post("/oneDepartmentData", bodyParser.json(), async (req, res) => {


    try {
        const departmentData = new departmentModel({
            //getting data from frontend
            _id:req.body.departmentId,
            departmentId: req.body.departmentId,
            departmentName: req.body.departmentName,
            course:req.body.course,
            Date: Date.now()

        })


        // console.log(channel.event_description);
        // console.log('data from front', subjectData.subjectCode);

        // console.log(event_name);

        const inserted = await departmentData.save();
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})

// API to fetch subject details

app.get("/fetchSubjectData", urlencodedParser, (req, res) => {
    subjectmodel.find({}).populate([{path:'department' , populate :{path:"course"}}]).then((data) => {
        res.status(200).send(data)
        // console.log('data from database', data);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    })

})

// api to fetch department details

app.get("/fetchDepartmentData", urlencodedParser, (req, res) => {
    departmentModel.find({}).populate('course').then((data) => {
        res.status(200).send(data)
        // console.log('data from database', data);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    })

})

//api to fetch student data

app.get("/fetchStudentData", urlencodedParser, (req, res) => {
    StudentModel.find({}).populate([{path:'course' , populate:{path:'department'}}]).then((data) => {
        res.status(200).send(data)
        // console.log('data from database', data);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    })

})

//API to fetch teachers data

app.get("/fetchTeachersData", urlencodedParser, (req, res) => {
    teachersModel.find({}).populate([{path:'subject' , populate:{path:'department' , populate:{path:'course'}}}]).then((data) => {
        res.status(200).send(data)
        // console.log('data from database', data);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    })

})

app.get("/fetchCourseData", urlencodedParser, (req, res) => {
    courseModel.find({}).then((data) => {
        res.status(200).send(data)
        // console.log('data from database', data);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    })

})

//code for editing data


// API for student data edit

app.post("/editstudent", bodyParser.json(), async (req, res) => {

    await StudentModel.findOne({StudentId:req.body.editData.StudentId}).then((student) => {
        if(student){
            console.log("student id" , req.body.editData.StudentId);
            return res.send({msg:"student already exist"})

        }else{
            try {

                const result =  StudentModel.updateOne({ _id: req.body.editId }, {
                    $set: {
                        StudentId: req.body.editData.StudentId,
                        StudentName: req.body.editData.StudentName,
                        Section: req.body.editData.Section,
                        BatchName: req.body.editData.BatchName,
                        PhoneNumber: req.body.editData.PhoneNumber,
                        StudentEmailId: req.body.editData.StudentEmailId,
                        course:req.body.editData.course
        
                    }
                }).then((data) => {
                    res.status(200).send(data)
                    // console.log('id', req.body.editId);
                    // console.log('student', req.body.editData.StudentName);
                })
        
                // console.log("updated", result);
        
            } catch (err) {
                console.log(err)
                res.status(500).send({ "msg": "error" })
            }
        }
    })

   


})

// API to edit teacher data

app.post("/editteacher", bodyParser.json(), async (req, res) => {



    try {

        const result = await teachersModel.updateOne({ _id: req.body.editTeacherId }, {
            $set: {

                teacherName: req.body.editTeacherData.teacherName,
                department: req.body.editTeacherData.department,
                PhoneNumber: req.body.editTeacherData.PhoneNumber,
                teacherEmailId: req.body.editTeacherData.teacherEmailId,

            }
        }).then((data) => {
            res.status(200).send(data)
            // console.log('id', req.body.editTeacherId);
            // console.log('student', req.body.editTeacherData.teacherName);
        })

        // console.log("updated", result);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "msg": "error" })
    }


})


//APi to edit course data
app.post("/editcourse", bodyParser.json(), async (req, res) => {



    try {

        const result = await courseModel.updateOne({ _id: req.body.editCourseId }, {
            $set: {

                courseId: req.body.editCourseData.courseId,
                courseName: req.body.editCourseData.courseName,

            }
        }).then((data) => {
            res.status(200).send(data)
            console.log('id', req.body.editCourseId);
            console.log('student', req.body);
        })

        // console.log("updated", result);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "msg": "error" })
    }


})


// API to edit subject data
app.post("/editsubject", bodyParser.json(), async (req, res) => {



    try {

        const result = await subjectmodel.updateOne({ _id: req.body.editSubjectId }, {
            $set: {

                subjectCode: req.body.editSubjectData.subjectCode,
                subjectName: req.body.editSubjectData.subjectName,

            }
        }).then((data) => {
            res.status(200).send(data)
            console.log('id', req.body.editSubjectId);
            console.log('student', req.body.editSubjectData.subjectCode);
        })

        // console.log("updated", result);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "msg": "error" })
    }


})

// code for deleteing rows

// API code to delete one student
app.delete("/deleteStudent/:id" ,  async (req, res) => {



    try {

        const result = await StudentModel.updateOne({_id: req.params.id} , {
            $set :{
                Delete:1
            }

        }).then(console.log('delete id' , req.params.id))
          .then((data) => {
            res.status(200).send('done')
            // console.log(result);
        })

        // console.log("deleted", result);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "msg": "error" })
    }


})

// API code to delete one teacher
app.delete("/deleteTeacher/:id" ,  async (req, res) => {


    try {

        const result = await teachersModel.updateOne({_id: req.params.id} , {
            $set :{
                Delete:1
            }

        }).then(console.log('delete id' , req.params.id))
          .then((data) => {
            res.status(200).send('done')
            // console.log(result);
        })

        // console.log("deleted", result);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "msg": "error" })
    }


})

// API to delete one Course
app.delete("/deleteCourse/:id" ,  async (req, res) => {


    try {

        const result = await courseModel.updateOne({_id: req.params.id} , {
            $set :{
                Delete:1
            }

        }).then(console.log('delete id' , req.params.id))
          .then((data) => {
            res.status(200).send('done')
            // console.log(result);
        })

        // console.log("deleted", result);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "msg": "error" })
    }


})



// API to delete student collection
app.delete("/deleteStudentCollection" ,  async (req, res) => {



    try {

        const result = await StudentModel.deleteMany({})
          .then((data) => {
            res.status(200).send('done')
            // console.log(result);
        })

        // console.log("deleted", result);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "msg": "error" })
    }


})

// API to delete teacher collection
app.delete("/deleteTeachersCollection" ,  async (req, res) => {



    try {

        const result = await teachersModel.deleteMany({})
          .then((data) => {
            res.status(200).send('done')
            // console.log(result);
        })

        // console.log("deleted", result);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "msg": "error" })
    }


})

// API to delete course collection
app.delete("/deleteCourseCollection" ,  async (req, res) => {



    try {

        const result = await courseModel.deleteMany({})
          .then((data) => {
            res.status(200).send('done')
            console.log("collection deleted");
            // console.log(result);
        })

        // console.log("deleted", result);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "msg": "error" })
    }


})




app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
})

