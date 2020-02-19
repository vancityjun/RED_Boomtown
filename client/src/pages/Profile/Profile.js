import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import UserInfo from "../../components/UserInfo/UserInfo";
import ShareItemPreview from "../../components/ShareItemPreview";
import Typography from "@material-ui/core/Typography";

const Profile = ({ items, data }) => {
  const user = Object.values(data);
  const itemList = items.map((item, i) => {
    const info = Object.values(item);
    const tag = Object.values(info[5][0]);
    const itemOwner = Object.values(info[6]);
    return (
      <ShareItemPreview
        title={info[1]}
        description={info[3]}
        imageUrl={info[2]}
        tags={tag}
        key={i}
        userName={itemOwner[1]}
        // userId={}
      />
    );
  });
  return (
    <div>
      <UserInfo user={user} />
      <Typography
        variant="h4"
        component="h4"
        style={{ color: "#f9a825", marginBottom: 10 }}
      >
        Shared Items
      </Typography>
      {itemList}
    </div>
  );
};

export default withStyles(styles)(Profile);
