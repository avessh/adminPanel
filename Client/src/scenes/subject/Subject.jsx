import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme, Input } from "@mui/material";
import React, { useState, Fragment } from "react";
// import EditableRow from "./EditableRow";
// import ReadOnlyRow from "./ReadOnlyRow";
// import './index.css';
import { nanoid } from "nanoid";
// import data from "./mock-data.json";
import Papa from 'papaparse'
import axios from 'axios'
import { useEffect } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import '../subject/Subject.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'whitesmoke',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: "black",
    textAlign:"center"
};

const Contacts = () => {

    //states for modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = useState([])
    const [columnArray, setColoumnArray] = useState([])
    const [values, setValues] = useState([])
    const [subjectData, setSubjectData] = useState([])
    const [search, setSearch] = useState('')
    const [oneSubject, setOneSubject] = useState({
        subjectCode: "",
        subjectName: "",

    })

    const handleInput = (e) => {
        console.log(oneSubject);
        setOneSubject({ ...oneSubject, [e.target.name]: e.target.value })
    }

    const postData = (e) => {
        e.preventDefault();

        try {
            const response = axios
                .post("http://localhost:5505/oneSubjectData", oneSubject, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(alert('data inserted')).then(res => {
                    window.location.reload()
                })
        } catch (error) {
            console.log("error accured", error.response.oneSubject);
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
            const respose = await axios.post('http://localhost:5505/subjectData', subjectData, {
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

    console.log('data from csv', data);

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

    console.log('teachers data:', subjectData);


    const [editSubjectData, setEditSubjectData] = useState({
        subjectCode: "",
        subjectName: "",
    })

    const handleUpdateEdit = (e) => {
        console.log('edit teacher data', editSubjectData);
        setEditSubjectData({ ...editSubjectData, [e.target.name]: e.target.value })
    }

    const [editSubjectId, setEditSubjectId] = useState(-1)

    const handleEdit = (_id) => {
        setEditSubjectId(_id)
    }

    const [updatedData, setUpdatedData] = useState([])

    useEffect(() => {

        setUpdatedData(subjectData)
        console.log('updated', updatedData);
    }, [])


    const handleUpdate = () => {

        try {
            const response = axios
                .post("http://localhost:5505/editsubject", { editSubjectId, editSubjectData }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(alert('data inserted')).then(res => {
                    window.location.reload()
                })
        } catch (error) {
            console.log("error accured", error.response.editSubjectData);
        }
    }

    const handleCancel = () => {
        window.location.reload()
    }

    const [deleteWindow, setDeleteWindow] = useState(-1)

    const handleDelete = () => {
        setDeleteWindow(1)
        console.log("delete button pressed");
    }

    return (
        <div className="student">
            <div>
                <h3 style={{ color: "black" }}>Subjects</h3>
                <p style={{ color: "black" }}>Add or Modify Subject data</p>
            </div>


            <div className="app-container">
                <input style={{ margin: "10px 0" }} type="text" onChange={(e) => setSearch(e.target.value)} placeholder=" 🔍 Search Subject" />
                <div>

                    {/* modal code start */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Are you sure you want to delete this?
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <Button style={{ backgroundColor: "#3498db", height: "25px", marginRight:"5px" }} variant="contained">Yes</Button>
                                <Button onClick={handleClose} style={{ backgroundColor: "#3498db", height: "25px" }} variant="contained">Cancel</Button>
                            </Typography>
                        </Box>
                    </Modal>
                    {/* modal code end  */}
                </div>
                <div className="studentTableDiv">
                    <form >


                        <table class="table table-dark table-striped" >
                            <thead>
                                <tr>
                                    <th className="tableHeadRow" >Subject Code</th>
                                    <th className="tableHeadRow" >Subject Name</th>
                                    <th className="tableHeadRow" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjectData.filter((item) => {
                                    return search.toLowerCase() === '' ? item : item.subjectName.toLowerCase().includes(search)
                                }).map((home) => (
                                    home._id === editSubjectId ?
                                        <tr>

                                            <td><input name="subjectCode" type="text" value={home.subjectCode} placeholder={updatedData.subjectCode} onChange={handleUpdateEdit} /></td>
                                            <td><input name="subjectName" type="text" value={updatedData.subjectName} placeholder={home.subjectName} onChange={handleUpdateEdit} /></td>

                                            <td><Button onClick={() => handleUpdate(home._id)} style={{ backgroundColor: "yellow", height: "25px", marginLeft: "0px", color: "black" }} variant="contained">Update</Button>
                                                <Button onClick={handleCancel} style={{ backgroundColor: "blue", marginLeft: "5px", height: "25px", color: "white" }} variant="contained">Cancel</Button></td>
                                        </tr>
                                        :
                                        <Fragment>
                                            <tr>
                                                {/* <td>{home.teacherId}</td> */}
                                                <td>{home.subjectCode}</td>
                                                <td>{home.subjectName}</td>
                                                <td><Button onClick={() => handleEdit(home._id)} style={{ backgroundColor: "#3498db", height: "25px" }} variant="contained">Edit</Button>
                                                    <Button onClick={handleOpen} style={{ backgroundColor: "lightcoral", height: "25px", marginLeft: "10px" }} variant="contained">Delete</Button></td>
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
                        name="subjectCode"
                        required="required"
                        placeholder="Subject Code"
                        onChange={handleInput}
                        className="mannualInput"

                    />
                    <input
                        type="text"
                        name="subjectName"
                        required="required"
                        placeholder="Subject Name"
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