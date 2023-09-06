import React, { useContext, Fragment, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItemText,
  useMediaQuery,
  Drawer,
  Hidden,
  Divider,
} from '@mui/material';
import { AuthContext } from '../AuthContext';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGlobe,faChevronDown,faSearch} from '@fortawesome/free-solid-svg-icons';
const bounceAnimation = keyframes`
  0%, 20%, 60%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  80% {
    transform: translateY(-10px);
  }
`;

const NavbarMenu = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

const StyledList = styled(List)`
  &.drawerList {
    color: #000;
    display: flex;
    flex-direction: column; /* Stack items vertically */
  }
`;

const NavbarItem = styled(Link)`
  text-decoration: none;
  color: ${props => (props.sidebar ? "#000" : "#fff")};
  margin-left: 16px;
  display: inline-block;
  font-size: 18px;
  font-weight: normal; /* Default font-weight */

  /* &:hover {
    color: yellow;
    transform: scale(1.2);
  } */

  /* Conditional styling for the active page */
  ${props =>
    props.active &&
    css`
      color: white;
      font-size: 20px; /* Font size for active item */
      font-weight: bold; /* Font weight for active item */
    `}
`;


const MenuIconWrapper = styled.span`
  display: inline-block;
  width: 24px;
  height: 2px;
  background-color: #fff;
  position: relative;
  transition: background-color 0.3s ease-in-out;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transition: transform 0.3s ease-in-out;
  }

  &::before {
    top: -6px;
  }

  &::after {
    top: 6px;
  }

  ${props =>
    props.open &&
    css`
      background-color: transparent;

      &::before {
        transform: rotate(45deg);
        top: 0;
      }

      &::after {
        transform: rotate(-45deg);
        top: 0;
      }
    `}
`;

const LogoImage = styled.img`
  height: 4rem;
  width: 10rem;
  margin-right: 50px;
  margin-left: 1rem;
  cursor: pointer;
  padding: 5px;
`;

const Navbar = () => {
  const { loggedIn, logout, currentUser } = useContext(AuthContext);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  console.log('current user from navbar', currentUser);

  let currentUserID;
  try {
    const jsonUser = JSON.parse(currentUser);
    currentUserID = jsonUser.userId;
  } catch (error) {
    console.error('Error parsing or accessing user data:', error);
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const location = useLocation();

  return (
    <AppBar position="fixed" style={{background: "linear-gradient(45deg, #530f79,#14134b)",boxShadow:"none",paddingTop:"10px",paddingRight:"50px",paddingLeft:"30px"}}>
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            <LogoImage src={Logo} alt="Regen Global Logo" />
           
          </Link>
          {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIconWrapper open={drawerOpen} />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer}
              classes={{ paper: 'drawerContent' }}
              PaperProps={{ component: 'div', style: { zIndex: 1200 } }}
            >
              <StyledList className="drawerList">
             
              <NavbarItem
                  key="Home"
                  to="/"
                  sidebar={isMobile}
                  className="navbarItem"
                  onClick={toggleDrawer}
                  active={location.pathname === '/'}
                >
                  <ListItemText primary="Home" />
                </NavbarItem>
                {loggedIn && (
                  
                  <NavbarItem
                    key="Profile"
                    to={`/profile/${currentUserID}`}
                    className="navbarItem"
                    onClick={toggleDrawer}
                    active={location.pathname === `/profile/${currentUserID}`}
                  >
                    <ListItemText primary="Profile" />
                  </NavbarItem>
                )}
                <NavbarItem
                  key="About"
                  to="/services"
                  sidebar={isMobile}
                  className="navbarItem"
                  onClick={toggleDrawer}
                  active={location.pathname === '/services'}
                >
                  <ListItemText primary="About" />
                  
                </NavbarItem>
                <NavbarItem
                  key="Contact"
                  to="/contact"
                  sidebar={isMobile}
                  className="navbarItem"
                  onClick={toggleDrawer}
                  active={location.pathname === '/contact'}
                >
                  <ListItemText primary="Contact" />
                </NavbarItem>
                {loggedIn ? (
                  <NavbarItem
                    key="Logout"
                    to="/"
                    sidebar={isMobile}
                    className="navbarItem"
                    onClick={() => {
                      toggleDrawer();
                      handleLogout();
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </NavbarItem>
                ) : (
                  <NavbarItem
                    key="Login"
                    to="/doctorlogin"
                    sidebar={isMobile}
                    className="navbarItem"
                    onClick={toggleDrawer}
                    active={location.pathname === '/doctorlogin'}
                  >
                    <ListItemText primary="Doctor Login" />
                  </NavbarItem>
                )}
              </StyledList>
            </Drawer>
          </>
        ) : (
          <Hidden smDown implementation="css">
             
            <NavbarMenu>
            <NavbarItem
                  key="Home"
                  to="/"
                  sidebar={isMobile}
                  className="navbarItem"
                  onClick={toggleDrawer}
                  active={location.pathname === '/'}
                >
                  <ListItemText primary="Home" sx={{marginRight:"20px"}} />
                 
                 
                </NavbarItem>
              {loggedIn && (
                <NavbarItem
                  key="Profile"
                  to={`/profile/${currentUserID}`}
                  className="navbarItem"
                  active={location.pathname === `/profile/${currentUserID}`}
                >
                  <ListItemText primary="Profile"  sx={{marginRight:"20px"}}  />
                </NavbarItem>
              )}
              <NavbarItem
                key="About"
                to="/services"
                className="navbarItem"
                active={location.pathname === '/services'}
              >
                <ListItemText primary="About"   sx={{marginRight:"20px"}} />
              </NavbarItem>
              <NavbarItem
                key="Contact"
                to="/contact"
                className="navbarItem"
                active={location.pathname === '/contact'}
              >
                <ListItemText primary="Contact"  sx={{marginRight:"20px"}} />
              </NavbarItem>
              <NavbarItem
                  key="FAQ"
                  to="/"
                  className="navbarItem"
                >
                  <ListItemText primary="FAQ" />
                </NavbarItem>
             
            </NavbarMenu>
          </Hidden>
        )}
        </div>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIconWrapper open={drawerOpen} />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer}
              classes={{ paper: 'drawerContent' }}
              PaperProps={{ component: 'div', style: { zIndex: 1200 } }}
            >
              <StyledList className="drawerList">
                {loggedIn && (
                  <NavbarItem
                    key="Profile"
                    to={`/profile/${currentUserID}`}
                    className="navbarItem"
                    onClick={toggleDrawer}
                    active={location.pathname === `/profile/${currentUserID}`}
                  >
                    <ListItemText primary="Profile" />
                  </NavbarItem>
                )}
                <NavbarItem
                  key="About"
                  to="/services"
                  sidebar={isMobile}
                  className="navbarItem"
                  onClick={toggleDrawer}
                  active={location.pathname === '/services'}
                >
                  <ListItemText primary="About" />
                </NavbarItem>
                <NavbarItem
                  key="Contact"
                  to="/contact"
                  sidebar={isMobile}
                  className="navbarItem"
                  onClick={toggleDrawer}
                  active={location.pathname === '/contact'}
                >
                  <ListItemText primary="Contact" />
                </NavbarItem>
                {loggedIn ? (
                  <NavbarItem
                    key="Logout"
                    to="/"
                    sidebar={isMobile}
                    className="navbarItem"
                    onClick={() => {
                      toggleDrawer();
                      handleLogout();
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </NavbarItem>
                ) : (
                  <NavbarItem
                    key="Login"
                    to="/doctorlogin"
                    sidebar={isMobile}
                    className="navbarItem"
                    onClick={toggleDrawer}
                    active={location.pathname === '/doctorlogin'}
                  >
                    <ListItemText primary="Doctor Login" />
                  </NavbarItem>
                )}
              </StyledList>
            </Drawer>
          </>
        ) : (
          <Hidden smDown implementation="css">
            <NavbarMenu>
              {/* {loggedIn && (
                <NavbarItem
                  key="Profile"
                  to={`/profile/${currentUserID}`}
                  className="navbarItem"
                  active={location.pathname === `/profile/${currentUserID}`}
                >
                  <ListItemText primary="Profile" />
                </NavbarItem>
              )} */}
              <NavbarItem
                key="About"
                to="/services"
                className="navbarItem"
                active={location.pathname === '/services'}
              >
                <div style={{
                  display:"flex",
                  alignItems:"center",
                  gap:"5px",
                  marginRight:"10px"

                }}>
                <FontAwesomeIcon icon={faGlobe} />
                <ListItemText primary="ENG" />
                <FontAwesomeIcon icon={faChevronDown} style={{fontSize:"10px"}} />
                </div>
              </NavbarItem>
              <NavbarItem
                key="Contact"
                to="/contact"
                className="navbarItem"
                active={location.pathname === '/contact'}
              >
                 <FontAwesomeIcon icon={faSearch}  sx={{marginLeft:"20px"}} />
                
              </NavbarItem>
              {loggedIn ? (
                <NavbarItem
                  key="Logout"
                  to="/"
                  className="navbarItem"
                  onClick={handleLogout}
                >
                  <ListItemText primary="Logout" />
                </NavbarItem>
              ) : (
                <NavbarItem
                  key="Login"
                  to="/doctorlogin"
                  className="navbarItem"
                >
                  <ListItemText primary="Doctor Login"  sx={{
                    marginLeft:"20px",
                    background:"linear-gradient(#0019FB, #E409E8)",
                    borderRadius:"25px",
                    padding:"20px 40px",
                    fontSize:"22px",
                    textTransform:"capitalize",
                    fontWeight:"500",
                    fontFamily:" 'Poppins', sans-serif",
                    border:"2px solid #E409E8"
                    }} />
                </NavbarItem>
              )}
            </NavbarMenu>
          </Hidden>
        )}
      </Toolbar>
     <span style={{
          width: "80%",
          height: ".1px",
          display: "block",
          background:"linear-gradient(#FFFFFF 0%,#FFFFFF 100%,#FFFFFF 0%)",
          margin: "auto",
          position: "absolute",
          bottom: "-3px",
          left: "114px",
         
     }}></span>
    </AppBar>
  );
};

export default Navbar;
