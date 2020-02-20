import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles({
  card: {
    minWidth: "calc((100% / 3) - 20px)",
    margin: 10,
    display: "inline-block"
  },
  media: {
    height: 300
  }
});
const ShareItemPreview = ({
  title,
  description,
  imgUrl,
  tags,
  datePosted,
  userName,
  userId
}) => {
  const image = imgUrl ? imgUrl : require("../../images/placeholder-img.jpg");
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Link to={"./profile/" + userId}>
        <CardMedia className={classes.media} image={image} title={title} />
        <CardContent style={{ display: "flex", alignItems: "center" }}>
          <Avatar className="avatar" alt="" src="" />
          <div>
            <Typography variant="body2" component="p">
              {userName}
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              {datePosted}
            </Typography>
          </div>
        </CardContent>
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {tags}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="secondary">
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
};

export default ShareItemPreview;
