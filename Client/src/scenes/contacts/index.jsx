import { Box, Button, Input, Modal, Typography } from "@mui/material";
import Papa from "papaparse";
import axios from "axios";
import React, { useState, Fragment, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import "./index.css";
import { CSVLink } from "react-csv";


const headers = [
  { label: "Student ID", key: "StudentId" },
  { label: "Student Name", key: "StudentName" },
  { label: "Batch Name", key: "BatchName" },
  { label: "Phone Number", key: "PhoneNumber" },
  { label: "Student Email", key: "StudentEmailId" },
  { label: "Section", key: "Section" },
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

const notify = () => toast.success('Data Inserted');
const failed = () => toast.error('Student Already Exist');
const updated = () => toast.success('Student data updated');


const Contacts = () => {

  

  // *** fetching course details code start *** 

  const [courseData , setCourseData] = useState([])
  const fetchCourseDetail = async () => {
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

    fetchCourseDetail()
  }, [])

  console.log('course data in student component:', courseData);

  // *** feting course detail code ends here *** 
  

  console.log("course detain from course component" , );
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

  const [data, setData] = useState([]);
  const [columnArray, setColoumnArray] = useState([]);
  const [values, setValues] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [onestudent, setOneStudent] = useState({
    StudentId: "",
    StudentName: "",
    BatchName: "",
    PhoneNumber: Number,
    StudentEmailId: "",
    Section: "",
    course:""
  });

  const [search, setSearch] = useState("");

  console.log(search);

  const handleInput = (e) => {
    console.log(onestudent);
    setOneStudent({ ...onestudent, [e.target.name]: e.target.value });
  };

  // const [oneStudentMsgFromBack, setOneStudentMsgFromBack] = useState('')

  const postData = async (e) => {
    e.preventDefault();

    try {
      const response = axios
        .post("http://localhost:5505/oneStudentData", onestudent, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (res) => {
          if (res.data.msg === "student already exist") {

            failed()
          } else if (res.data.msg === 'please fill fields') {
            toast.error('please fill fields')
          } else {
            await notify()
            setTimeout(() => {
              window.location.reload()
            }, 2000);

          }
        })
      console.log(onestudent);
      // console.log(response.data)
    } catch (error) {
      console.log("error accured", error.response.onestudent);
    }
  };

  const handleFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnArray = [];
        const valuesArray = [];

        result.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setData(result.data);
        setColoumnArray(columnArray[0]);
        setValues(valuesArray);
      },
    });
  };

  console.log("data from csv", data);

  //api to insert student data into database

  // Validation for student CSV file


  const checkCSVfile = () => {

    data.map((home, index) => {
      
        if (home.StudentId === '') {
          toast.error(`student ID is empty in csv file ${index + 1} `)
        }else

        if (home.StudentName === '') {
          toast.error(`Student Name is Empty in line ${index + 1}`)
        }else
        if (home.Section === '') {
          toast.error(`Section is empty at line ${index + 1}`)
        }
      

    })
  }



  const handleUpload = async (e) => {
    e.preventDefault();




    try {
      const respose = await axios
        .post("http://localhost:5505/studentData", data, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => {
          if (res.data.msg === "inserted to db") {
            toast.success('Data from CSV is saved in Database')
            setTimeout(() => {
              window.location.reload()
            } , 2000)
          } else {
            toast.error('something went wrong')
          }
        })
        .then(console.log("success fully filled"), data)
    } catch (error) {
      console.log("error accured", error);
    }


  };

  const fetchStudentsDetail = async () => {
    const response = await axios
      .get("http://localhost:5505/fetchStudentData", {
        headers: {
          "Accept-Encoding": "application/json",
        },
      })
      .then((res) => {
        setStudentData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStudentsDetail();
  }, []);

  console.log("student data:", studentData);

  // code to edit table

  // const [studenId , setStudentId] = useState('')
  // const [studentName , setStudentName] = useState('')
  // const [section , setSection] = useState('')
  // const [batch , setBatch] = useState('')
  // const [phoneNumber , setPhoneNumber] = useState('')
  // const [email , setEmail] = useState('')
  const [editData, setEditData] = useState({

  });
  const handleUpdateEdit = (e) => {
    console.log("edited data", editData);
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const [editId, setEditId] = useState(-1);

  const handleEdit = (_id) => {
    setEditId(_id);
    console.log("eidt id", editId);
  };

  const handleUpdate = (_id) => {
    console.log("id is", _id);

    try {
      const response = axios
        .post(
          "http://localhost:5505/editstudent",
          { editId, editData },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async res => {
          if (res.data.msg === "student already exist") {
            failed()

          } else {
            await updated()
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          }


        })
      console.log(onestudent);
      // console.log(response.data)
    } catch (error) {
      console.log("error accured", error.response.onestudent);
    }
  };
  const handleCancel = () => {
    window.location.reload();
  };

  const [deleteW, setDeleteW] = useState(-1);

  const handleDelete = () => {
    setDeleteW(1);
  };



  const handleRowDelete = () => {
    console.log('id going to delete', deleteId);
    try {

      const respost = axios.delete("http://localhost:5505/deleteStudent/" + deleteId, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        toast.success('Row deleted')
        setTimeout(()=>window.location.reload(),2000)
      })

    } catch (error) {
      alert("error white deleting Please try after some time")
    }

  }

  // API to clear all data

  const [collectionDeletePrompt, setCollectionDeletePrompt] = useState('')

  const handleCollectionDelete = () => {
    console.log('id going to delete', deleteId);
    try {

      const respost = axios.delete("http://localhost:5505/deleteStudent/" + deleteId, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        window.location.reload()
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
    if (dropInput === "collegeWatch/DeleteStudentCollection") {
      try {

        const respost = axios.delete("http://localhost:5505/deleteStudentCollection", {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if(res.data == 'done'){
            toast.success('Collection deleted')
            setTimeout(()=>{
              window.location.reload()
              },2000)

          }
        })

      } catch (error) {
        alert("error white deleting Please try after some time")
      }
    } else {
      toast.error('Cannot delete Student Collection')
    }


  }


  return (
    <div className="student">
      <div>
        <h3 style={{ color: "black" }}>Students</h3>
        <p style={{ color: "black" }}>Add or Modify Students data</p>
      </div>
      <div id="studentTableDiv" className="app-container">
        <input
          style={{ margin: "10px 0" }}
          type="number"
          onChange={(e) => setSearch(e.target.value)}
          placeholder=" 🔍 Search Roll No."
        />
        <Toaster position="top-right" />

        <CSVLink
          data={studentData.filter((item) => {
            return search.toString() === ""
              ? item
              : item.StudentId.toString().includes(search);
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
              Are you sure you want to erase all {studentData ? "Student" : "error"}  data
              <br />
              Once you delete student collection it can never be recovered
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"black"}
            >
             ⚠️ Type <b style={{userSelect:"none" , color:"red"}}>collegeWatch/DeleteStudentCollection</b> to delete ⚠️
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
          <Box sx={style} style={{ border: "2px solid black" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"

            >
              Are you sure you want to delete this
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
          <form>
            <table
              data={studentData}
              id="studentTable"
              class="table table-dark table-striped table-hover"
            >
              <thead>
                <tr>
                  <th className="tableHeadRow">Enrollment Number</th>
                  <th className="tableHeadRow">Full Name Name</th>
                  <th className="tableHeadRow">Section</th>
                  <th className="tableHeadRow">Batch Name</th>
                  <th className="tableHeadRow">Phone Number</th>
                  <th className="tableHeadRow">Email</th>
                  <th className="tableHeadRow">Course</th>
                  <th className="tableHeadRow">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentData.filter((item) => {
                  return search.toString() === ""
                    ? item
                    : item.StudentId.toString().includes(search);
                }).map((home, index) => 
                  home._id === editId ? (
                    <tr>
                      <td>
                        <input
                          name="StudentId"
                          type="text"
                          value={editData.StudentId}
                          placeholder={home.StudentId}
                          onChange={handleUpdateEdit}
                        />
                      </td>
                      <td>
                        <input
                          name="StudentName"
                          type="text"
                          value={editData.StudentName}
                          placeholder={home.StudentName}
                          onChange={handleUpdateEdit}
                        />
                      </td>
                      <td>
                        <input
                          name="Section"
                          type="text"
                          value={editData.Section}
                          placeholder={home.Section}
                          onChange={handleUpdateEdit}
                          style={{width:"80px"}}
                        />
                      </td>
                      <td>
                        <input
                          name="BatchName"
                          type="text"
                          value={editData.BatchName}
                          placeholder={home.BatchName}
                          onChange={handleUpdateEdit}
                          style={{width:"80px"}}
                        />
                      </td>
                      <td>
                        <input
                          name="PhoneNumber"
                          type="text"
                          value={editData.PhoneNumber}
                          placeholder={home.PhoneNumber}
                          onChange={handleUpdateEdit}
                        />
                      </td>
                      <td>
                        <input
                          name="StudentEmailId"
                          type="text"
                          value={editData.StudentEmailId}
                          placeholder={home.StudentEmailId}
                          onChange={handleUpdateEdit}
                        />
                      </td>
                      <td>
                        <input
                          name="course"
                          type="text"
                          value={editData.course}
                          placeholder={home.course.courseId}
                          onChange={handleUpdateEdit}
                          style={{width:"80px"}}
                        />
                      </td>
                      <td>
                        <Button
                          onClick={() => handleUpdate(home._id)}
                          style={{

                            height: "25px",
                            marginLeft: "0px",
                            color: "black",
                          }}
                          variant="contained"
                          color={"warning"}
                        >
                          Update
                        </Button>
                        <Button
                          onClick={handleCancel}
                          style={{
                            marginLeft: "5px",
                            height: "25px",
                            color: "black",
                          }}
                          variant="contained"
                          color={"secondary"}
                        >
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    <Fragment>
                      {home.Delete === 0 ?
                        <tr key={index}>
                          <td>{home.StudentId}</td>
                          <td>{home.StudentName}</td>
                          <td>{home.Section}</td>
                          <td>{home.BatchName}</td>
                          <td>{home.PhoneNumber}</td>
                          <td>{home.StudentEmailId}</td>
                          <td>{home.course.courseId}</td>
                          <td>
                            <Button
                              onClick={() => handleEdit(home._id)}
                              style={{
                                height: "25px",
                              }}
                              variant="contained"
                              color={"info"}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDOpen(home._id)}
                              style={{
                                height: "25px",
                                marginLeft: "10px",
                              }}
                              variant="contained"
                              color={"error"}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                        :
                        <></>

                      }

                    </Fragment>
                  )
                )}
              </tbody>
            </table>
          </form>
        </div>

        <hr style={{ color: "black" }} />

        <div id="updateData">
          <h5 style={{ color: "black" }}>Choose how to update data -</h5>

          <div style={{ margin: "0px 20px" }}>
            <input
              style={{ color: "black" }}
              type="file"
              name="file"
              accept=".csv"
              onChange={handleFile}
            />

            <Button
              style={{ margin: "0px 0px" }}
              onClick={checkCSVfile}
              variant="contained"
              color={"warning"}

            >
              Check CSV
            </Button>

            <Button
              style={{ margin: "0px 5px" }}
              onClick={handleUpload}
              variant="contained"
              color={"info"}
            >
              Upload CSV
            </Button>

          </div>
        </div>

        <hr style={{ color: "black" }} />
        <p
          style={{
            color: "black",
            textAlign: "center",
            fontSize: "20px",
            padding: "1vh !important",
          }}
        >
          OR
        </p>
        <hr style={{ color: "black" }} />

        <div id="insertManual">
          <h5 style={{ color: "black" }}>Insert Manually</h5>
          <form>
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
            <select
            name="course"
             style={{height:"30px"}}
              className="mannualInput"
              onChange={handleInput}
              value={onestudent.course}
            >
              <option>Select Course</option>
              {
                courseData.map((home) => {
                  return <option value={home.courseId}>{home.courseId}</option>
                })
              }
            
              
             
            </select>
            <Button
              onClick={postData}
              style={{
                height: "30px",
                margin:"0px 0px 5px 5px"
              }}
              variant={"contained"}
              color={"info"}
            >
              Add
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
