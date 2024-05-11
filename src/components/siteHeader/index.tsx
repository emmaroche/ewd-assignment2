import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = {
  title: {
    flexGrow: 1,
    cursor: "pointer"
  },
  title2: {
    flexGrow: 1,
  },
  appbar: {
    // background: "none",
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const handleClickHome = () => {
    navigate("/home");
  }
  const location = useLocation();
  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Now Playing", path: "/movies/nowPlaying" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Popular Movies", path: "/movies/popular" },
    { label: "Favourites", path: "/movies/favourites" },
    { label: "Must Watch", path: "/movies/mustWatch" },
    { label: "Fantasy Movie", path: "/movies/fantasyMovie" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar sx={styles.appbar} position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title} onClick={handleClickHome}>
            Movies Fan App
          </Typography>
          <Typography variant="h6" sx={styles.title2}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{ color: location.pathname === opt.path ? "text.primary" : "inherit" }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={{ color: location.pathname === opt.path ? "text.primary" : "inherit" }}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />

      {/* <div className={classes.offset} /> */}
    </>
  );
};

export default SiteHeader;