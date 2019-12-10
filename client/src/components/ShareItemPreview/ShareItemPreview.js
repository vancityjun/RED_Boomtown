import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import Avatar from "@material-ui/core/Avatar";
// import styles from "./styles";
const useStyles = makeStyles({
  card: {
    // maxWidth: 345,
    width: "calc((100% / 3) - 20px)",
    margin: 10,
    display: "inline-block"
  },
  media: {
    height: 300
  }
});
const ShareItemPreview = ({ title, description, imgUrl, tags, userName }) => {
  const image = imgUrl ? imgUrl : require("../../images/placeholder-img.jpg");
  // console.log(imgUrl);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={title} />
        <CardContent>
          <Avatar style={{ float: "left" }} alt="" src="" />
          <div>
            <Typography variant="body2" component="p">
              {userName}
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              datePosted
            </Typography>
          </div>
        </CardContent>
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
      </CardActionArea>
      <CardActions>
        <Button variant="outlined" color="secondary">
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
};

export default ShareItemPreview;
