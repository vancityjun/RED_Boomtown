import React, { useContext } from "react";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlertDialog = () => {
  const itemPreviewContext = useContext(ItemPreviewContext);
  const { open, handleClose } = itemPreviewContext;

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Your item was added</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You may add another item if you like.To add another item click 'Add
          another item'. To view your item click 'Back to items page'
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          add another item
        </Button>
        <Button onClick={handleClose} component={RouterLink} to="./items">
          back to items page
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
