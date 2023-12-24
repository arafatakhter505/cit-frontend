import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { AuthContext } from "../../contextApi/UserContext";
import { AlertContext } from "../../contextApi/AlertContextApi";
import axios from "axios";
import dev from "../../config";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const { setAlertOpen, setSeverity, setAlertMessage } =
    useContext(AlertContext);
  const { authUser, logout } = useContext(AuthContext);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [carst, setCarts] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get(
          `${dev.serverUrl}/api/carts/${authUser?._id}`
        );
        const data = res.data.cart;
        setCarts(data);
      } catch (error) {
        setAlertOpen(true);
        setSeverity("error");
        setAlertMessage(error.message);
      }
    };

    getCart();
  }, []);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <LogoutOutlinedIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <AccountCircleOutlinedIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth={"lg"}>
          <Toolbar>
            <Link to="/">
              <img
                src="/logo.png"
                alt="logo"
                width={50}
                style={{ padding: 2, width: "40px" }}
              />
            </Link>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search product…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {authUser?._id ? (
                <>
                  <IconButton
                    onClick={() => setDrawerOpen(true)}
                    size="large"
                    color="inherit"
                  >
                    <Badge badgeContent={carst.length} color="error">
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={logout}
                  >
                    <LogoutOutlinedIcon />
                  </IconButton>
                </>
              ) : (
                <Link to="/login" style={{ color: "#fff" }}>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <AccountCircleOutlinedIcon />
                  </IconButton>
                </Link>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default Header;
