import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import UserInfo from "../../components/UserInfo/UserInfo";
import ShareItemPreview from "../../components/ShareItemPreview";

const Profile = (props, { classes }) => {
  const user = Object.values(props.data);
  const itemList = props.items.map((item, i) => {
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
      />
    );
  });
  return (
    <div>
      <UserInfo userName={user[1]} />
      {itemList}
    </div>
  );
};

export default withStyles(styles)(Profile);
