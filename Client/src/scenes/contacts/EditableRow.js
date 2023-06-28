import React, { useState } from "react";
import { Button } from "@mui/material";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {

  const [editData , setEditData] = useState({

  })

  const handleEditInput = (e) => {

  }


  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="courseId"
          value={editFormData.fullName}
          onChange={handleEditInput}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="courseName"
          value={editFormData.address}
          onChange={handleEditFormChange}
        ></input>
      </td>
    
     
      <td>
        <Button style={{ backgroundColor: "#3498db" , height:"25px" }} variant="contained" type="submit">Save</Button>
        <Button  style={{ backgroundColor: "#3498db" , height:"25px", marginLeft:"10px" }} variant="contained" type="button" onClick={handleCancelClick}>
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
