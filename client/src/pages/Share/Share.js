import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

import ShareItemForm from '../../components/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'
import AlertDialog from '../../components/AlertDialog/AlertDialog'
import { ViewerContext } from '../../context/ViewerProvider'
import { ItemPreviewContext } from '../../context/ItemPreviewProvider'

const Share = ({ classes }) => {
  const viewerContext = useContext(ViewerContext)
  const itemPreviewContext = useContext(ItemPreviewContext)
  const { item } = itemPreviewContext.state
  const itemOwner = Object.values(viewerContext)
  const tags = item.tags.map(tags => {
    return tags.title
  })
  return (
    <div className="container">
      <ShareItemPreview
        title={item.title}
        description={item.description}
        imgUrl={item.imgUrl}
        tags={tags.join(', ')}
        userName={itemOwner[2]}
        userId={itemOwner[0]}
        datePosted={Date.now()}
      />
      <div>
        <ShareItemForm />
      </div>
      <AlertDialog />
    </div>
  )
}

export default withStyles(styles)(Share)
