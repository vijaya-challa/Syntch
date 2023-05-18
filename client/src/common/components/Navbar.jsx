import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState, useContext } from 'react';
import useAuthUser from 'auth/hooks/useAuthUser';
import SyntchLogo from 'common/components/SyntchLogo';
import { NavLink, useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@mui/material';

function Navbar(props) {
  const theme = useTheme();
  const { colorModeContext } = props;
  const { toggleColorMode } = useContext(colorModeContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [navPages, setNavPages] = useState([]);
  const { authUser, userSignOut, isAdmin } = useAuthUser();

  const pages = [
    {
      label: 'Dashboard',
      route: '/',
      canShow: authUser
    },
    {
      label: 'Try',
      route: '/tasksection',
      canShow: !authUser
    },
    {
      label: 'How To Play',
      route: '/howtoplay',
      canShow: true
    },
    {
      label: 'Login',
      route: '/login',
      canShow: !authUser
    },
    {
      label: 'Register',
      route: '/register',
      canShow: !authUser
    },
    {
      label: 'Admin',
      route: '/admin',
      canShow: isAdmin()
    }
  ];

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavMenuClick = (route) => {
    handleCloseNavMenu();
    navigate(route);
  };

  const editProfile = () => {
    handleCloseUserMenu();
    navigate('/editprofile');
  };

  const handleSignout = async () => {
    handleCloseUserMenu();
    await userSignOut();
    navigate('/login');
  };

  useEffect(() => {
    const protectedPages = pages.filter((page) => {
      return page.canShow;
    });
    setNavPages(protectedPages);
  }, []);

  useEffect(() => {
    const protectedPages = pages.filter((page) => {
      return page.canShow;
    });
    setNavPages(protectedPages);
  }, [isAdmin, authUser]);

  return (
    <div>
      <AppBar position="fixed" sx={{ zIndex: (thm) => thm.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' }
              }}>
              <NavLink to="/">
                <SyntchLogo />
              </NavLink>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}>
                {navPages.map((page) => (
                  <MenuItem key={page.label} onClick={() => handleNavMenuClick(page.route)}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1
              }}>
              <NavLink to="/">
                <SyntchLogo />
              </NavLink>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navPages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => handleNavMenuClick(page.route)}
                  sx={{ mr: 3, color: 'white', display: 'block' }}>
                  {page.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
                <IconButton sx={{ mr: 5 }} onClick={toggleColorMode}>
                  {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </Tooltip>
              {authUser && (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={authUser.displayName} src={authUser.photoURL} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    <MenuItem key="profile" onClick={editProfile}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem
                      key="Logout"
                      onClick={() => {
                        handleSignout();
                      }}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default Navbar;
