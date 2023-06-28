import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, Fragment ,useEffect } from "react";
import EditableRow from "../contacts/EditableRow.js";
import ReadOnlyRow from "../contacts/ReadOnlyRow.js";
import axios from "axios";
// import './index.css';
import { nanoid } from "nanoid";
import data from "../contacts/mock-data.json";
import courseData from "../contacts/courseData";

const Contacts = () => {

  const [courseData , setCourseData] = useState([])


  const fetchCourseDetails = async () => {



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

    fetchCourseDetails()
  }, [])

  console.log("course data" , courseData);


  const [contacts, setContacts] = useState(courseData);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
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
      courseId: contact.courseId,
      courseName: contact.courseName,
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
      <h3 style={{color:"black"}}>Courses</h3>
      <p style={{color:"black"}}>Enter the details below</p>
    </div>
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table class="table table-dark table-striped" >
          <thead>
            <tr>
              <th className="tableHeadRow" >Course ID</th>
              <th className="tableHeadRow" >Course Name</th>
              <th className="tableHeadRow" >Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={courseData}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2 style={{color:"black"}}>Add Student</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
    </div>
  );
};

export default Contacts;
