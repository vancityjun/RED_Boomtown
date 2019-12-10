import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const UserInfo = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Avatar style={{ float: "left" }} alt="" src="" />

      <Typography variant="h5" component="h3">
        {props.userName}
      </Typography>
      <Typography component="p">"No bio provided."</Typography>
    </Paper>
  );
};

export default UserInfo;
