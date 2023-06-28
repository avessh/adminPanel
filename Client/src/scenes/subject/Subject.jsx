import { Box, Input, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
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
    const [subjectData, setSubjectData] = useState([])
    const [oneSubject, setOneSubject] = useState({
        subjectCode: "",
        subjectName: "",
    })

    const [search, setSearch] = useState('')

    console.log(search);



    const handleInput = (e) => {
        console.log(oneSubject);
        setOneSubject({ ...oneSubject, [e.target.name]: e.target.value })
    }

    const postData = async (e) => {
        e.preventDefault();

        try {
            const response = axios
                .post("http://localhost:5505/oneSubjectData", oneSubject, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(console.log("filled")).then(alert('data inserted'))
            console.log(oneSubject);
            // console.log(response.data)
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

    console.log('data from csv', data);


    //api to insert student data into database

    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            const respose = await axios.post('http://localhost:5505/subjectData', data, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(console.log('success fully filled'), data).then(alert('data is inserted'))
        } catch (error) {
            console.log("error accured", error);
        }
    }

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

    console.log('course data:', subjectData);


    const [contacts, setContacts] = useState(data);
    const [addFormData, setAddFormData] = useState({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
    });

    const [editFormData, setEditFormData] = useState({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
    });

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            id: nanoid(),
            fullName: addFormData.fullName,
            address: addFormData.address,
            phoneNumber: addFormData.phoneNumber,
            email: addFormData.email,
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: editContactId,
            fullName: editFormData.fullName,
            address: editFormData.address,
            phoneNumber: editFormData.phoneNumber,
            email: editFormData.email,
        };

        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === editContactId);

        newContacts[index] = editedContact;

        setContacts(newContacts);
        setEditContactId(null);
    };

    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);

        const formValues = {
            fullName: contact.fullName,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === contactId);

        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    return (
        <div className="student">
            <div>
                <h3 style={{ color: "black" }}>Subjects</h3>
                <p style={{ color: "black" }}>Add or Modify Subject data</p>
            </div>
            <div id="studentTableDiv" className="app-container">
                <input style={{ margin: "10px 0" }} type="text" onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search Subject" />
                <div className="studentTableDiv">
                    <form onSubmit={handleEditFormSubmit}>
                        <table data={subjectData} id="studentTable" class="table table-dark table-striped table-hover" >
                            <thead>
                                <tr>
                                    <th className="tableHeadRow" >Subject Code</th>
                                    <th className="tableHeadRow">Subject Name</th>
                                    <th className="tableHeadRow">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjectData.filter((item) => {
                                    return search.toLowerCase() === '' ? item : item.subjectName.toLowerCase().includes(search)
                                }).map((home) => (
                                    <Fragment>
                                        <tr>
                                            <td>{home.subjectCode}</td>
                                            <td>{home.subjectName}</td>
                                            <td><Button style={{ backgroundColor: "#3498db", height: "25px" }} variant="contained">Edit</Button><Button style={{ backgroundColor: "lightcoral", height: "25px", marginLeft: "10px" }} variant="contained">Delete</Button></td>
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
                    <form onSubmit={handleAddFormSubmit}>
                        <input
                            type="text"
                            name="subjectCode"
                            required="required"
                            placeholder="Subject Code"
                            className="mannualInput"
                            value={oneSubject.subjectCode}
                            onChange={handleInput}
                        />
                        <input
                            type="text"
                            name="subjectName"
                            required="required"
                            placeholder="Subject Name"
                            className="mannualInput"
                            value={oneSubject.subjectName}
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
