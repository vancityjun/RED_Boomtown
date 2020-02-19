import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6, 6)
  }
}));

const UserInfo = ({ user }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} style={{ marginBottom: 40 }}>
      <div className="cf">
        <Avatar className="avatar" alt="" src="" />

        <Typography variant="h3" component="h3">
          {user[1]}
        </Typography>
      </div>
      <Typography variant="h6">
        {user[2].length} items shared 0 items borrowed
      </Typography>
      <Typography component="p">"No bio provided."</Typography>
    </Paper>
  );
};

export default UserInfo;
