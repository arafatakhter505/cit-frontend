import { Alert, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

export const AlertContext = createContext();

const AlertContaxtApi = ({ children }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const alertInfo = { setAlertOpen, setSeverity, setAlertMessage };
  return (
    <AlertContext.Provider value={alertInfo}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export default AlertContaxtApi;
