import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ShareItemPreview from "../../components/ShareItemPreview";

const Items = ({ classes, items }) => {
  console.log(items);
  const itemList = items.map((item, i) => {
    const info = Object.values(item);
    const tag = Object.values(info[5][0]);
    const itemOwner = Object.values(info[6]);
    return (
      <ShareItemPreview
        title={info[1]}
        description={info[3]}
        imageUrl={info[2]}
        datePosted={info[4]}
        tags={tag[0]}
        key={i}
        userId={itemOwner[0]}
        userName={itemOwner[1]}
      />
    );
  });
  return <div>{itemList}</div>;
};

export default withStyles(styles)(Items);
