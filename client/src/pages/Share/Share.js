import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
import ShareItemForm from "../../components/ShareItemForm";
import ShareItemPreview from "../../components/ShareItemPreview";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import { ViewerContext } from "../../context/ViewerProvider";
import { TagsContext } from "./ShareContainer";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";

const Share = ({ classes }) => {
  const viewerContext = useContext(ViewerContext);
  const tagsContext = useContext(TagsContext);
  const itemPreviewContext = useContext(ItemPreviewContext);
  const { item } = itemPreviewContext.state;
  const itemOwner = Object.values(viewerContext);
  const tags = item.tags.map(tags => {
    return tags.title;
  });
  console.log(tags);
  return (
    <div>
      <ShareItemPreview
        title={item.title}
        description={item.description}
        imgUrl={item.imgUrl}
        tags={tags.join(", ")}
        userName={itemOwner[2]}
      />
      <ShareItemForm />
      <AlertDialog />
    </div>
  );
};

export default withStyles(styles)(Share);
