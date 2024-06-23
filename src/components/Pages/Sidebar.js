import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import '../Style/Sidebar.css';

const Sidebar = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/product">
            <ListItemIcon>
              <ProductionQuantityLimitsIcon />
            </ListItemIcon>
            <ListItemText primary={"Product"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/reports">
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary={"Reports"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {/* Additional list items can be added here */}
      </List>
    </Box>
  );

  return (
    <div className='Sidebar'>
      <MenuIcon
        className='MenuIcon' // Apply the MenuIcon class for styling
        onClick={toggleDrawer("left", true)}
      />

      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};

export default Sidebar;
