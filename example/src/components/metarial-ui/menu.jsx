import React from 'react';
import { Button,Menu,MenuItem,ListItemIcon,ListItemText} from "@material-ui/core";
// import {InboxIcon,DraftsIcon,SendIcon} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

export const Menu1=({menu1,menu2,menu3})=>{
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div className="menu" style={{marginTop:37,marginLeft:180}}>
        <Button className="menu"
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Open Menu
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            <ListItemIcon>
              {/* <SendIcon fontSize="small" /> */}
            </ListItemIcon>
            <ListItemText primary={menu1} />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              {/* <DraftsIcon fontSize="small" /> */}
            </ListItemIcon>
            <ListItemText primary={menu2} />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              {/* <InboxIcon fontSize="small" /> */}
            </ListItemIcon>
            <ListItemText primary={menu3} />
          </StyledMenuItem>
        </StyledMenu>
      </div>
    );
}
