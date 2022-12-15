import * as React from "react";
import AppBar from "@mui/material/AppBar";
import {Box,Switch} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { auth} from "../../firebaseConfig";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import WorkIcon from '@mui/icons-material/Work';
import SmsIcon from '@mui/icons-material/Sms';
import Person4Icon from '@mui/icons-material/Person4';
import {DarkModeContext} from "../Context/darkmode";
import Logo from "../../assets/logo2.png";

const pages = [
  {
    label: "Profile",
    key: "profile",
    icon : <Person4Icon/>
  },
  {
    label: "Jobs",
    key: "jobs",
    icon : <WorkIcon/>
  },
  {
    label: "Applications",
    key: "applications",
    icon : <BackupTableIcon/>
  },
  {
    label: "Conversation",
    key: "conversation",
    icon : <SmsIcon/>
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function EmployerHoc({ children }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [state, dispatch] = React.useContext(DarkModeContext);

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

  const reRoute = (page) => {
    handleCloseNavMenu();
    navigate(`/employer/${page}`);
  };

  const LogoutFun = () => {
    localStorage.clear();
    navigate("/");
    auth.signOut();
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      ></Box>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ backgroundColor: state.darkMode ? "#000" : "#fff" }}>
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={Logo} alt="logo" style={{ width: "100px" }} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ color: state.darkMode ? "#fff" : "#000" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => reRoute(page.key)}>
                    <Typography sx={{ backgroundColor: state.darkMode ? "#1a1a1a" : "#fff" }} textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                // color: "inherit",
                textDecoration: "none"
              }}
            >
              <img src={Logo} alt="logo" style={{ width: "100px" }} />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => reRoute(page.key)}>
                  <Typography sx={{color: state.darkMode ? "#fff" : "#000"}} textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Change Mode">
                <Switch
                  value={state.darkMode}
                  onChange={() => {state.darkMode ? dispatch ({type : 'Make_light'}) : dispatch({type : 'Make_dark'})}}
                />
              </Tooltip>
              <Tooltip title="logout">
                <Button sx={{ color: state.darkMode ? "#fff" : "#000" }} onClick={LogoutFun}>
                  Logout
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        display={{
          xs: "block",
          md: "none",
          position: "fixed",
          bottom: "0px",
          width: "90%",
          background: "white",
          zIndex: "2",
          marginLeft: "0px",
        }}
      >
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {pages.map((page) => {
              return (
                <BottomNavigationAction
                  key={page.key}
                  onClick={() => reRoute(page.key)}
                  label={page.lable}
                  icon={page.icon}
                />
              );
            })}
          </BottomNavigation>
        </Box>
      </Box>
      <Box>{children}</Box>
    </>
  );
}

export default EmployerHoc;
