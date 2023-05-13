import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';

function AdminNav() {
  const drawerWidth = 240;

  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem key={1} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate('/admin/users');
                }}>
                <ListItemIcon>
                  <PersonIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key={2} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate('/admin/levels');
                }}>
                <ListItemIcon>
                  <BarChartIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="Levels" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key={2} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate('/admin/tasks');
                }}>
                <ListItemIcon>
                  <AssignmentTurnedInIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="Tasks" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default AdminNav;
