// import { Box } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
// import Header from "../../components/Header";
import {  Button } from "@mui/material";
import React, { useState, Fragment } from "react";
// import EditableRow from "./EditableRow";
// import ReadOnlyRow from "./ReadOnlyRow";
import './index.css';
// import { nanoid } from "nanoid";
// import data from "./mock-data.json";
import Papa from 'papaparse'
import axios from 'axios'
import { useEffect } from "react";

const Contacts = () => {

  const [data, setData] = useState([])
  const [columnArray, setColoumnArray] = useState([])
  const [values, setValues] = useState([])
  const [teacherData, setTeacherData] = useState([])
  const [search, setSearch] = useState('')
  const [oneTeacher, setOneTeacher] = useState({
    teacherName: "",
    department: "",
    PhoneNumber: Number,
    teacherEmailId: ""


  })

  const handleInput = (e) => {
    console.log(oneTeacher);
    setOneTeacher({ ...oneTeacher, [e.target.name]: e.target.value })
  }

  const postData = (e) => {
    e.preventDefault();

    try {
      const response = axios
        .post("http://localhost:5505/oneTeacherData", oneTeacher, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then(alert('data inserted')).then(res => {
          window.location.reload()
        })
      console.log(oneTeacher);
      // console.log(response.data)
    } catch (error) {
      console.log("error accured", error.response.oneTeacher);
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

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      const respose = await axios.post('http://localhost:5505/teachersdata', data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(console.log('success fully filled'), data).then(alert('data is inserted'))
    } catch (error) {
      console.log("error accured", error);
    }
  }

  console.log('data from csv', data);

  const fetchTeachersDetail = async () => {

    const response = await axios.get('http://localhost:5505/fetchTeachersData',
      {

        headers: {
          'Accept-Encoding': 'application/json',
        }

      })
      .then(res => {
        setTeacherData(res.data)
      }).catch(err => console.log(err))

  }

  useEffect(() => {

    fetchTeachersDetail()
  }, [])

  console.log('teachers data:', teacherData);


  const [editTeacherData , setEditTeacherData] = useState({
    teacherName: "",
    department: "",
    PhoneNumber: Number,
    teacherEmailId: ""
  })

  const handleUpdateEdit = (e) => {
    console.log('edit teacher data' , editTeacherData);
    setEditTeacherData({...editTeacherData , [e.target.name]: e.target.value})
  }

  const [editTeacherId , setEditTeacherId] = useState(-1)

  const handleEdit = (_id) => {
    setEditTeacherId(_id)
  }

  const handleUpdate = () => {

    try {
      const response = axios
        .post("http://localhost:5505/editteacher", { editTeacherId , editTeacherData}, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then(alert('data inserted')).then(res => {
          window.location.reload()
        })
      console.log(editTeacherData);
      // console.log(response.data)
    } catch (error) {
      console.log("error accured", error.response.editTeacherData);
    }
  }

  const handleCancel = () => {
    window.location.reload()
  }

  return (
    <div className="student">
      <div>
        <h3 style={{ color: "black" }}>Teachers</h3>
        <p style={{ color: "black" }}>Add or Modify Teachers data</p>
      </div>
      <div className="app-container">
        <input style={{ margin: "10px 0" }} type="text" onChange={(e) => setSearch(e.target.value)} placeholder=" 🔍 Search Teacher" />
        <div className="studentTableDiv">
          <form >

            <table class="table table-dark table-striped" >
              <thead>
                <tr>
                  <th className="tableHeadRow" >Name</th>
                  <th className="tableHeadRow" >Department</th>
                  <th className="tableHeadRow" >Phone Number</th>
                  <th className="tableHeadRow" >Email</th>
                  <th className="tableHeadRow" >Action</th>
                </tr>
              </thead>
              <tbody>
                {teacherData.filter((item) => {
                  return search.toLowerCase() === '' ? item : item.teacherName.toLowerCase().includes(search)
                }).map((home) => (
                  home._id === editTeacherId ?
                  <tr>
                  
                  <td><input name="teacherName" type="text" value={editTeacherData.StudentName} placeholder={home.teacherName} onChange={handleUpdateEdit} /></td>
                  <td><input name="department" type="text" value={editTeacherData.Section} placeholder={home.department} onChange={handleUpdateEdit} /></td>
                  <td><input name="PhoneNumber" type="text" value={editTeacherData.BatchName} placeholder={home.PhoneNumber} onChange={handleUpdateEdit} /></td>
                  <td><input name="teacherEmailId" type="text" value={editTeacherData.teacherEmailId} placeholder={home.teacherEmailId} onChange={handleUpdateEdit} /></td>
                 
                  <td><Button onClick={() => handleUpdate(home._id)} style={{ backgroundColor: "yellow", height: "25px", marginLeft: "0px", color: "black" }} variant="contained">Update</Button>
                  <Button onClick={handleCancel} style={{ backgroundColor: "blue", marginLeft:"5px", height: "25px", color: "white" }} variant="contained">Cancel</Button></td>
                </tr>
                  :
                  <Fragment>
                    <tr>
                      {/* <td>{home.teacherId}</td> */}
                      <td>{home.teacherName}</td>
                      <td>{home.department}</td>
                      <td>{home.PhoneNumber}</td>
                      <td>{home.teacherEmailId}</td>
                      <td><Button onClick={() => handleEdit(home._id)} style={{ backgroundColor: "#3498db", height: "25px" }} variant="contained">Edit</Button><Button style={{ backgroundColor: "lightcoral", height: "25px", marginLeft: "10px" }} variant="contained">Delete</Button></td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </div>

        <hr style={{ color: "black" }} />

        <h5 style={{ color: "black" }}>Choose how to update data</h5>

        <div style={{ margin: "20px 0" }}>
          <input style={{ color: "black" }} type='file' name='file' accept='.csv' onChange={handleFile} />
          <Button style={{ margin: "0px 0px", backgroundColor: "#3498db" }} onClick={handleUpload} variant="contained">Upload CSV</Button>
          <hr style={{ color: "black" }} />
          <p style={{ color: "black", textAlign: 'center' }}>or</p>
          <hr style={{ color: "black" }} />
        </div>

        <h5 style={{ color: "black" }}>Insert Manually</h5>
        <form >
          <input
            type="text"
            name="teacherName"
            required="required"
            placeholder="Teacher name"
            onChange={handleInput}
            className="mannualInput"

          />
          <input
            type="text"
            name="department"
            required="required"
            placeholder="Department"
            onChange={handleInput}
            className="mannualInput"
          />
          <input
            type="number"
            name="PhoneNumber"
            required="required"
            placeholder="Phone Number"
            onChange={handleInput}
            className="mannualInput"
          />
          <input
            type="email"
            name="teacherEmailId"
            required="required"
            placeholder="Email"
            onChange={handleInput}
            className="mannualInput"
          />
          <Button onClick={postData} style={{ backgroundColor: "#3498db", height: "30px", marginLeft: "10px" }} variant="contained">Add</Button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;