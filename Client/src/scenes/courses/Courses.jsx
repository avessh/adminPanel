import { Button } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";
// import { useState, useEffect } from "react";
import Papa from 'papaparse'
import axios from 'axios'
import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
// import "./App.css";
// import data from "./mock-data.json";
// import ReadOnlyRow from "./components/ReadOnlyRow";
// import EditableRow from "./EditableRow";
// import ReadOnlyRow from "./ReadOnlyRow";
// import './index.css';





const Contacts = () => {

  const [data, setData] = useState([])
  const [columnArray, setColoumnArray] = useState([])
  const [values, setValues] = useState([])
  const [courseData, setCourseData] = useState([])
  const [oneCourse, setOneCourse] = useState({
    courseId: "",
    courseName: "",
  })

  const [search, setSearch] = useState('')

  console.log(search);



  const handleInput = (e) => {
    console.log(oneCourse);
    setOneCourse({ ...oneCourse, [e.target.name]: e.target.value })
  }

  const postData = async (e) => {
    e.preventDefault();

    try {
      const response = axios
        .post("http://localhost:5505/oneCourseData", oneCourse, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then(alert('data inserted')).then(res => {
          window.location.reload()
        })
      console.log(oneCourse);
      // console.log(response.data)
    } catch (error) {
      console.log("error accured", error.response.onestudent);
    }
  }

  const handleFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnArray = []
        const valuesArray = []

        result.data.map((d) => {
          columnArray.push(Object.keys(d))
          valuesArray.push(Object.values(d))
        })
        setData(result.data)
        setColoumnArray(columnArray[0])
        setValues(valuesArray)
      }
    })
  }

  console.log('data from csv', data);


  //api to insert student data into database

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      const respose = await axios.post('http://localhost:5505/coursedata', data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(console.log('success fully filled'), data).then(alert('data is inserted')).then(res => {
        window.location.reload()
      })
    } catch (error) {
      console.log("error accured", error);
    }
  }

  const fetchStudentsDetail = async () => {

    const response = await axios.get('http://localhost:5505/fetchCourseData',
      {

        headers: {
          'Accept-Encoding': 'application/json',
        }

      })
      .then(res => {
        setCourseData(res.data)
      }).catch(err => console.log(err))

  }

  useEffect(() => {

    fetchStudentsDetail()
  }, [])

  console.log('student data:', courseData);

  // code to edit table

  // const [studenId , setStudentId] = useState('')
  // const [studentName , setStudentName] = useState('')
  // const [section , setSection] = useState('')
  // const [batch , setBatch] = useState('')
  // const [phoneNumber , setPhoneNumber] = useState('')
  // const [email , setEmail] = useState('')
  const [editCourseData, setEditCourseData] = useState({
    courseData: "",
    courseName: "",
  })
  const handleUpdateEdit = (e) => {
    console.log('edited data', editCourseData);
    setEditCourseData({ ...editCourseData, [e.target.name]: e.target.value })
  }
  const [editCourseId, setEditCourseId] = useState(-1)

  const handleEdit = (_id) => {
    setEditCourseId(_id)
    console.log("eidt id", editCourseId);
  }

  const handleUpdate = (_id) => {
    console.log("id is", _id);

    try {
      const response = axios
        .post("http://localhost:5505/editcourse", { editCourseId, editCourseData }, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then(alert('data inserted')).then(res => {
          window.location.reload()
        })
    } catch (error) {
      console.log("error accured", error.response.editCourseData);
    }

  }


  const handleCancel = () => {
    window.location.reload()
  }

  return (
    <div className="student">
      <div>
        <h3 style={{ color: "black" }}>Courses</h3>
        <p style={{ color: "black" }}>Add or Modify Course data</p>
      </div>
      <div id="studentTableDiv" className="app-container">
        <input style={{ margin: "10px 0" }} type="text" onChange={(e) => setSearch(e.target.value)} placeholder=" 🔍 Search Course" />
        <div className="studentTableDiv">
          <form>
            <table data={courseData} id="studentTable" class="table table-dark table-striped table-hover" >
              <thead>
                <tr>
                  <th className="tableHeadRow" >Course ID</th>
                  <th className="tableHeadRow">Course Name</th>
                  <th className="tableHeadRow">Action</th>
                </tr>
              </thead>
              <tbody>
                {courseData.filter((item) => {
                  return search.toLowerCase() === '' ? item : item.courseName.toLowerCase().includes(search)
                }).map((home) => (
                  home._id === editCourseId ?
                    <tr>
                      <td>
                        <input name="courseId" type="text" value={editCourseData.StudentId} placeholder={home.courseId} onChange={handleUpdateEdit} />
                      </td>
                      <td>
                        <input name="courseName" type="text" value={editCourseData.StudentName} placeholder={home.courseName} onChange={handleUpdateEdit} />
                      </td>
                      <td>
                        <Button onClick={() => handleUpdate(home._id)} style={{ backgroundColor: "yellow", height: "25px", marginLeft: "0px", color: "black" }} variant="contained">Update</Button>
                        <Button onClick={handleCancel} style={{ backgroundColor: "blue", marginLeft: "5px", height: "25px", color: "white" }} variant="contained">Cancel</Button>
                      </td>
                    </tr>
                    :
                    <Fragment>
                      <tr>
                        <td>{home.courseId}</td>
                        <td>{home.courseName}</td>
                        <td>
                          <Button onClick={() => handleEdit(home._id)} style={{ backgroundColor: "#3498db", height: "25px" }} variant="contained">Edit</Button>
                          <Button style={{ backgroundColor: "lightcoral", height: "25px", marginLeft: "10px" }} variant="contained">Delete</Button></td>
                      </tr>
                    </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </div>


        <hr style={{ color: "black" }} />

        <div id="updateData">
          <h5 style={{ color: "black" }}>Choose how to update data -</h5>

          <div style={{ margin: "0px 20px" }}>
            <input style={{ color: "black" }} type='file' name='file' accept='.csv' onChange={handleFile} />
            <Button style={{ margin: "0px 0px", backgroundColor: "#3498db" }} onClick={handleUpload} variant="contained">Upload CSV</Button>
          </div>
        </div>



        <hr style={{ color: "black" }} />
        <p style={{ color: "black", textAlign: 'center', fontSize: "20px", padding: "1vh !important" }}>OR</p>
        <hr style={{ color: "black" }} />

        <div id="insertManual">
          <h5 style={{ color: "black" }}>Insert Manually</h5>
          <form >
            <input
              type="text"
              name="courseId"
              required="required"
              placeholder="Course ID"
              className="mannualInput"
              value={oneCourse.StudentId}
              onChange={handleInput}
            />
            <input
              type="text"
              name="courseName"
              required="required"
              placeholder="Course Name"
              className="mannualInput"
              value={oneCourse.StudentName}
              onChange={handleInput}
            />
            <Button onClick={postData} style={{ backgroundColor: "#3498db", height: "30px", marginLeft: "10px" }} variant="contained">Add</Button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contacts;
