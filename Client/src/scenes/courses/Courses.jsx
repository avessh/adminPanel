import { Button , Modal , Box , Typography} from "@mui/material";

import Papa from 'papaparse'
import axios from 'axios'
import React, { useState, Fragment, useEffect } from "react";
import { CSVLink } from "react-csv";
import toast, { Toaster } from 'react-hot-toast';


const headers = [
  { label: "Course ID", key: "courseId" },
  { label: "Course Name", key: "courseName" },
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

  const handleRowDelete = () => {
    console.log('id going to delete', deleteId);
    try {

      const respost = axios.delete("http://localhost:5505/deleteCourse/" + deleteId, {
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
    if (dropInput === "collegeWatch/DeleteCourseCollection") {
      try {

        const respost = axios.delete("http://localhost:5505/deleteCourseCollection", {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.data == 'done') {
            toast.success('Collection deleted')
            console.log("collection deleted");
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

  const postData = async (e) => {
    e.preventDefault();

    try {
      const response = axios
        .post("http://localhost:5505/oneCourseData", oneCourse, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          toast.success("data inserted")
          setTimeout(() => {
            window.location.reload()
          },2000)
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

  const fetchCourseData = async () => {

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

    fetchCourseData()
  }, [])

  console.log('Course data:', courseData);

  // code to edit table

  // const [studenId , setStudentId] = useState('')
  // const [studentName , setStudentName] = useState('')
  // const [section , setSection] = useState('')
  // const [batch , setBatch] = useState('')
  // const [phoneNumber , setPhoneNumber] = useState('')
  // const [email , setEmail] = useState('')
  const [editCourseData, setEditCourseData] = useState({
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
        <Toaster position="top-right" />
        <CSVLink
          data={courseData.filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.coursename.toLowerCase().includes(search);
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
              ⚠️ Type <b style={{ userSelect: "none", color: "red" }}>collegeWatch/DeleteCourseCollection</b> to delete
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
                    {
                      home.Delete === 0 ?
                      <tr>
                      <td>{home.courseId}</td>
                      <td>{home.courseName}</td>
                      <td>
                        <Button onClick={() => handleEdit(home._id)} style={{ backgroundColor: "#3498db", height: "25px" }} variant="contained">Edit</Button>
                        <Button onClick={() => handleDOpen(home._id)} style={{ backgroundColor: "lightcoral", height: "25px", marginLeft: "10px" }} variant="contained">Delete</Button></td>
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
