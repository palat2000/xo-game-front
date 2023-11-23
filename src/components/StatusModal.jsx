import { Box, Button, Modal } from "@mui/material";
import "./statusModal.css";

function StatusModal({ status, handleClose }) {
  return (
    <Modal aria-labelledby="parent-modal-title" open={Boolean(status)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          padding: "20px",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          boxShadow: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "3px",
        }}
      >
        <h2 id="parent-modal-title">{status}</h2>
        <Button variant="contained" onClick={handleClose}>
          Restart
        </Button>
      </Box>
    </Modal>
  );
}

export default StatusModal;
