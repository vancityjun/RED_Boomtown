import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import Button from '@material-ui/core/Button'
import './Header.scss'
import { Link } from 'react-router-dom'
import { LOGOUT_MUTATION } from '../../apollo/queries'
import { Mutation } from 'react-apollo'
import client from '../../apollo'

const Header = props => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar position="static">
      <Toolbar className="toolBar">
        <Link to="/">
          <img
            src={require('../../images/boomtown.svg')}
            alt=""
            style={{ width: 40 }}
          />
        </Link>
        <div>
          <Link to="/share">
            <Button>
              <AddCircleIcon />
              SHARE SOMETHING
            </Button>
          </Link>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: 200
              }
            }}
          >
            <Link onClick={handleClose} to="/profile">
              <MenuItem>
                <FingerprintIcon />
                your profile
              </MenuItem>
            </Link>
            <Mutation
              mutation={LOGOUT_MUTATION}
              onCompleted={() => {
                client.resetStore()
              }}
            >
              {(logoutMutation, { data }) => {
                return (
                  <MenuItem
                    onClick={() => {
                      logoutMutation()
                    }}
                  >
                    <PowerSettingsNewIcon />
                    log out
                  </MenuItem>
                )
              }}
            </Mutation>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
