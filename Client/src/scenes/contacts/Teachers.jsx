
import { Button, Modal, Box, Typography } from "@mui/material";
import React, { useState, Fragment } from "react";

import toast, { Toaster } from 'react-hot-toast';
import './index.css';

import Papa from 'papaparse'
import axios from 'axios'
import { useEffect } from "react";

import { CSVLink } from "react-csv";

const headers = [
  { label: "Teacher Name", key: "teacherName" },
  { label: "Department", key: "department" },
  { label: "Phone Number", key: "PhoneNumber" },
  { label: "Tearcher Email", key: "teacherEmailId" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "whitesmoke",
  border: "2px solid red",
  boxShadow: 24,
  p: 4,
  color: "black",
  textAlign: "center",
};

const Contacts = () => {

  // *** fetching subject details ***

  const [subjectData , setSubjectData] = useState([])

  const fetchSubjectDetail = async () => {

    const response = await axios.get('http://localhost:5505/fetchSubjectData',
        {

            headers: {
                'Accept-Encoding': 'application/json',
            }

        })
        .then(res => {
            setSubjectData(res.data)
        }).catch(err => console.log(err))

}

    useEffect(() => {

        fetchSubjectDetail()
    }, [])

    console.log('subject data:', subjectData);

    // *** subject details end here ***

  //states for modal
  const [open, setOpen] = React.useState(false);
  const [oneDelete, setOneDelete] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleteId, setDeleteId] = useState('')

  const handleDOpen = (_id) => {
    setOneDelete(true)
    setDeleteId(_id)
    console.log("delete is id is", deleteId);
  };

  const handleDClose = () => setOneDelete(false);

  const [data, setData] = useState([])
  const [columnArray, setColoumnArray] = useState([])
  const [values, setValues] = useState([])
  const [teacherData, setTeacherData] = useState([])
  const [search, setSearch] = useState('')
  const [oneTeacher, setOneTeacher] = useState({
    teacherName: "",
    department: "",
    PhoneNumber: Number,
    teacherEmailId: "",
    subject:""


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
        }).then(res => {
          toast.success("Data inserted")
          setTimeout(() => {
            window.location.reload()
          } , 2000)
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
    if(data.length === 0){
      toast.error("Please Select File")
    }else{

    
    try {
      const respose = await axios.post('http://localhost:5505/teachersdata', data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => {
        if (res.data.msg === "inserted to db") {
          toast.success('Data from CSV is saved in Database')
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        } else {
          toast.error('something went wrong')
        }
      })
        .then(console.log("success fully filled"), data)
    } catch (error) {
      console.log("error accured", error);
    }
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


  const [editTeacherData, setEditTeacherData] = useState({
    teacherName: "",
    department: "",
    PhoneNumber: Number,
    teacherEmailId: ""
  })

  const handleUpdateEdit = (e) => {
    console.log('edit teacher data', editTeacherData);
    setEditTeacherData({ ...editTeacherData, [e.target.name]: e.target.value })
  }

  const [editTeacherId, setEditTeacherId] = useState(-1)

  const handleEdit = (_id) => {
    setEditTeacherId(_id)
  }

  const handleUpdate = () => {

    try {
      const response = axios
        .post("http://localhost:5505/editteacher", { editTeacherId, editTeacherData }, {
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

  const handleRowDelete = () => {
    console.log('id going to delete', deleteId);
    try {

      const respost = axios.delete("http://localhost:5505/deleteTeacher/" + deleteId, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        handleDClose()
        toast.success('Row deleted')
        setTimeout(() => window.location.reload(), 2000)
      })

    } catch (error) {
      alert("error white deleting Please try after some time")
    }

  }


  const [dropInput, setDropInput] = useState('')

  const handleDropInput = (e) => {
    console.log('drop input', dropInput);
    setDropInput(e.target.value);
  }

  // code for deleting student collection

  const handleDrop = () => {
    if (dropInput === "collegeWatch/DeleteTeachersCollection") {
      try {

        const respost = axios.delete("http://localhost:5505/deleteTeachersCollection", {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.data === 'done') {
            toast.success('Collection deleted')
            setTimeout(() => {
              window.location.reload()
            }, 2000)

          }
        })

      } catch (error) {
        alert("error white deleting Please try after some time")
      }
    } else {
      toast.error('Cannot delete Student Collection')
    }


  }

  // validate CSV file

  const checkCSVfile = () => {

    if(data.length === 0){
      toast.error("Please select file")
    }

    data.map((home, index) => {

     
        if (home.teacherName === "") {
          toast.error(`Teacher Name is empty at csv file ${index + 1} `)
        }else
  
        if (home.department === "") {
          toast.error(`Department is Empty at line ${index + 1}`)
        }else
        if (home.PhoneNumber === '') {
          toast.error(`Phone Number is empty at line ${index + 1}`)
        }else if(home.teacherEmailId === ""){
          toast.error(`Email is empty at line ${index + 1}`)
        }
      
  })

  }

  return (
    <div className="student">
      <div>
        <h3 style={{ color: "black" }}>Teachers</h3>
        <p style={{ color: "black" }}>Add or Modify Teachers data</p>
      </div>
      <div className="app-container">
        <input style={{ margin: "10px 0",border:"1px solid black" , borderRadius:"3px" , padding:"3px" , width:'13%' }} type="text" onChange={(e) => setSearch(e.target.value)} placeholder="  Search Teacher" />
        <Toaster position="top-right" />
        <CSVLink
          data={teacherData.filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.teacherName.toLowerCase().includes(search);
          })}
          headers={headers}
        >
          <button
            style={{
              backgroundColor: "lightgrey",
              border: "none",
              padding: "4.5px 8px",
              margin: "0px 8px",
              borderRadius: "5px",
              fontSize: "12px",
            }}
          >
            Download
          </button>
        </CSVLink>
        <button
          onClick={handleOpen}
          style={{

            backgroundColor: "lightcoral",
            border: "none",
            padding: "4.5px 8px",
            margin: "0px 0px",
            borderRadius: "5px",
            fontSize: "12px",
          }}
        >
          Delete All
        </button>
        {/* modal code start */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"black"}
            >
              Are you sure you want to erase all Teachers Data
              <br />
              Once you delete teachers collection it can never be recovered
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"black"}
            >
              ⚠️ Type <b style={{ userSelect: "none", color: "red" }}>collegeWatch/DeleteTeachersCollection</b> to delete
            </Typography>
            <input
              style={{
                color: "black",
                borderTop: "none",
                borderRight: "none",
                borderBottom: "1px solid red",
                borderLeft: "none",
                backgroundColor: "whitesmoke",
                width: "100%"

              }}
              onChange={handleDropInput}
              value={dropInput}
            ></input>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button
                style={{ height: "25px", marginRight: "5px" }}
                variant="contained"
                color={"error"}
                onClick={handleDrop}
              >
                DROP
              </Button>
              <Button
                onClick={handleClose}
                style={{ height: "25px" }}
                variant="contained"
                color={"primary"}
              >
                Cancel
              </Button>
            </Typography>
          </Box>
        </Modal>

        <Modal
          open={oneDelete}
          onClose={handleDClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style} style={{ border: "2px solid black", width: "400px" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"

            >
              ⚠️ Are you sure you want to delete this
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button
                style={{ height: "25px", marginRight: "5px" }}
                variant="contained"
                color={"error"}
                onClick={handleRowDelete}
              >
                DROP
              </Button>
              <Button
                onClick={handleDClose}

                style={{ height: "25px" }}
                variant="contained"
                color={"primary"}
              >
                Cancel
              </Button>
            </Typography>
          </Box>
        </Modal>
        {/* modal code end  */}
        <div className="studentTableDiv">
          <form >

            <table class="table table-dark table-striped" >
              <thead>
                <tr style={{overflowY:"scroll"}}>
                  <th className="tableHeadRow" >Name</th>
                  
                  <th className="tableHeadRow" >Phone Number</th>
                  <th className="tableHeadRow" >Email</th>
                  <th className="tableHeadRow" >Subject</th>
                  <th className="tableHeadRow" >Department</th>
                  <th style={{marginRight:"0px" , width:"15vw"}} className="tableHeadRow" >Action</th>
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
                        <Button onClick={handleCancel} style={{ backgroundColor: "blue", marginLeft: "5px", height: "25px", color: "white" }} variant="contained">Cancel</Button></td>
                    </tr>
                    :
                    <Fragment>
                      {
                        home.Delete === 0 ?
                          <tr>
                            {/* <td>{home.teacherId}</td> */}
                            <td>{home.teacherName}</td>
                            <td>{home.PhoneNumber}</td>
                            <td>{home.teacherEmailId}</td>
                            <td>{home.subject.subjectCode}</td>
                            <td>{home.subject.department.departmentId}</td>
                            <td>
                            <Button onClick={() => handleEdit(home._id)} style={{  height: "25px" }} variant="contained" color={"info"}>Edit</Button>
                            <Button onClick={() => handleDOpen(home._id)} style={{ height: "25px", marginLeft: "10px" }} variant="contained" color={"error"}>Delete</Button>
                            </td>
                          </tr>
                          :
                          <></>
                      }

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
          <Button style={{ margin: "0px 0px" }} onClick={checkCSVfile} variant="contained" color={"warning"}>Check CSV</Button>
          <Button style={{ margin: "0px 5px"}} onClick={handleUpload} variant="contained" color={"info"}>Upload CSV</Button>
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
          {/* <input
            type="text"
            name="department"
            required="required"
            placeholder="Department"
            onChange={handleInput}
            className="mannualInput"
          /> */}
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
           <select
            name="subject"
             style={{height:"30px"}}
              className="mannualInput"
              onChange={handleInput}
            >
              <option>Select Subject</option>
              {
                subjectData.map((home) => {
                  return <option value={home.subjectCode}>{home.subjectCode}</option>
                })
              }
            
              
             
            </select>
          <Button onClick={postData} style={{ height: "30px", margin: "0px 0px 5px 5px" }} variant="contained" color={"info"}>Add</Button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;