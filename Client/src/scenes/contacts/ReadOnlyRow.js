import React from "react";
import { Button } from "@mui/material";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>
        <Button
         style={{ backgroundColor: "#3498db" , height:"25px" }} variant="contained"
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </Button>
        <Button  style={{ backgroundColor: "#3498db" , height:"25px", marginLeft:"10px" }} variant="contained" type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
