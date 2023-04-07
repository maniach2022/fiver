import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../CSS/announcementConfiguration.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#B9F3FC",
  border: "2px solid #000",
  boxShadow: 24,
  paddingtop: "0px",
  p: 4,
};

export default function AnnouncementConfiguration() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>Announcement Configuration</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ fontWeight: "bolder", fontSize: "2vh" }}>
            Announcement Configuration
          </div>
          <br />
          <div className="formarea">
            <div>
              <select required>
                <option value="0">None</option>
              </select>
            </div>
            <br />
            <div>
              <textarea rows="2" cols="40"/>
            </div>
            <br />
          </div>
          <div style={{display:'flex',justifyContent:'space-around'}}>
              <button type="submit">
                Select
              </button>
              <button type="submit">
                Add
              </button>
              <button type="submit">
                Delete
              </button>
            </div>
          <br />
        </Box>
      </Modal>
    </div>
  );
}
