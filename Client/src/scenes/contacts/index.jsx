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
import './index.css';





const Contacts = () => {

  const [data, setData] = useState([])
  const [columnArray, setColoumnArray] = useState([])
  const [values, setValues] = useState([])
  const [studentData, setStudentData] = useState([])
  const [onestudent, setOneStudent] = useState({
    StudentId: "",
    StudentName: "",
    BatchName: "",
    PhoneNumber: Number,
    StudentEmailId: "",
    Section: ""
  })

  const [search, setSearch] = useState('')

  console.log(search);



  const handleInput = (e) => {
    console.log(onestudent);
    setOneStudent({ ...onestudent, [e.target.name]: e.target.value })
  }

  const postData = async (e) => {
    e.preventDefault();

    try {
      const response = axios
        .post("http://localhost:5505/oneStudentData", onestudent, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then(alert('data inserted'))
      console.log(onestudent);
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
      const respose = await axios.post('http://localhost:5505/studentData', data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(console.log('success fully filled'), data).then(alert('data is inserted'))
    } catch (error) {
      console.log("error accured", error);
    }
  }

  const fetchStudentsDetail = async () => {

    const response = await axios.get('http://localhost:5505/fetchStudentData',
      {

        headers: {
          'Accept-Encoding': 'application/json',
        }

      })
      .then(res => {
        setStudentData(res.data)
      }).catch(err => console.log(err))

  }

  useEffect(() => {

    fetchStudentsDetail()
  }, [])

  console.log('student data:', studentData);

  // code to edit table

  // const [studenId , setStudentId] = useState('')
  // const [studentName , setStudentName] = useState('')
  // const [section , setSection] = useState('')
  // const [batch , setBatch] = useState('')
  // const [phoneNumber , setPhoneNumber] = useState('')
  // const [email , setEmail] = useState('')
  const [editData , setEditData] = useState({
    
  })
  const handleUpdateEdit = (e) => {
    console.log('edited data',editData);
    setEditData({ ...editData , [e.target.name]: e.target.value})
  }
  const [editId , setEditId] = useState(-1)

  const handleEdit = (studentId) => {
    setEditId(studentId)
  }

  const handleUpdate = () => {

  }


  return (
    <div className="student">
      <div>
        <h3 style={{ color: "black" }}>Students</h3>
        <p style={{ color: "black" }}>Add or Modify Students data</p>
      </div>
      <div id="studentTableDiv" className="app-container">
        <input style={{ margin: "10px 0" }} type="number" onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search Roll No." />
        <div className="studentTableDiv">
          <form>
            <table data={studentData} id="studentTable" class="table table-dark table-striped table-hover" >
              <thead>
                <tr>
                  <th className="tableHeadRow" >Enrollment Number</th>
                  <th className="tableHeadRow">Full Name Name</th>
                  <th className="tableHeadRow">Section</th>
                  <th className="tableHeadRow">Batch Name</th>
                  <th className="tableHeadRow">Phone Number</th>
                  <th className="tableHeadRow">Email</th>
                  <th className="tableHeadRow">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentData.filter((item) => {
                  return search.toString() === '' ? item : item.StudentId.toString().includes(search)
                }).map((home) => (
                  home._id === editId ? 
                  <tr>
                    <td><input name="editStudentId" type="text" value={editData.StudentId} placeholder={home.StudentId} onChange={handleUpdateEdit}/></td>
                    <td><input name="editStudentName" type="text" value={editData.StudentName} placeholder={home.StudentName} onChange={handleUpdateEdit}/></td>
                    <td><input name="editStudentSection" type="text" value={editData.Section} placeholder={home.Section} onChange={handleUpdateEdit}/></td>
                    <td><input name="editBatchName" type="text" value={editData.BatchName} placeholder={home.BatchName} onChange={handleUpdateEdit}/></td>
                    <td><input name="editPhoneNumber" type="text" value={editData.PhoneNumber} placeholder={home.PhoneNumber} onChange={handleUpdateEdit}/></td>
                    <td><input name="editStudentEmailId" type="text" value={editData.StudentEmailId} placeholder={home.StudentEmailId} onChange={handleUpdateEdit}/></td>
                    <td><Button onClick={handleUpdate} style={{ backgroundColor: "yellow", height: "25px", marginLeft: "10px" , color:"black" }} variant="contained">Update</Button></td>
                  </tr>
                  :
                  <Fragment>
                    <tr>
                      <td>{home.StudentId}</td>
                      <td>{home.StudentName}</td>
                      <td>{home.Section}</td>
                      <td>{home.BatchName}</td>
                      <td>{home.PhoneNumber}</td>
                      <td>{home.StudentEmailId}</td>
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
              name="StudentId"
              required="required"
              placeholder="Enrollment Number"
              className="mannualInput"
              value={onestudent.StudentId}
              onChange={handleInput}
            />
            <input
              type="text"
              name="StudentName"
              required="required"
              placeholder="Student Name"
              className="mannualInput"
              value={onestudent.StudentName}
              onChange={handleInput}
            />
            <input
              type="text"
              name="Section"
              required="required"
              placeholder="Section"
              className="mannualInput"
              value={onestudent.Section}
              onChange={handleInput}
            />
            <input
              type="text"
              name="BatchName"
              required="required"
              placeholder="Batch Name"
              className="mannualInput"
              value={onestudent.BatchName}
              onChange={handleInput}
            />

            <input
              type="number"
              name="PhoneNumber"
              required="required"
              placeholder="Phone Number"
              className="mannualInput"
              value={onestudent.PhoneNumber}
              onChange={handleInput}
            />

            <input
              type="email"
              name="StudentEmailId"
              required="required"
              placeholder="Email"
              className="mannualInput"
              value={onestudent.StudentEmailId}
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
