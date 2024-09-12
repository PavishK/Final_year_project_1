import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

export default function SuccessToaster({ message }) {
  const [open, setOpen] = React.useState(true);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={message}
        action={[
          <IconButton key="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      >
        <Alert 
          onClose={handleClose} 
          severity="success" // Changed to success
          sx={{
            width: {
              xs: '80vw', // for small screens (mobile)
              sm: '50vw', // for medium screens (tablet)
              md: '30vw', // for large screens (desktop)
            },
            borderRadius: '10px',
            padding: {
              xs: '12px', // small padding on small screens
              sm: '16px', // slightly larger on medium screens
              md: '20px', // default padding for large screens
            }
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
