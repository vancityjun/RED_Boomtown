import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { LOGOUT_MUTATION } from "../../apollo/queries";
import { ViewerContext } from "../../context/ViewerProvider";
import { graphql } from "react-apollo";

const Header = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const viewerContext = useContext(ViewerContext);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <img
            src={require("../../images/boomtown.svg")}
            alt=""
            style={{ width: 40 }}
          />
        </Link>
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
          <Link to="/profile">
            <MenuItem>
              <FingerprintIcon />
              your profile
            </MenuItem>
          </Link>
          <MenuItem
            onClick={() =>
              props.logout({
                variables: { id: viewerContext.id }
              })
            }
          >
            <PowerSettingsNewIcon />
            log out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default graphql(LOGOUT_MUTATION, {
  // options: { refetchQueries: [] },
  name: "logout"
})(Header);
