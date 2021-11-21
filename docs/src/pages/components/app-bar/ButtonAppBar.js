import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              LOGO
            </Typography>

            {/* responsive AppBar for mobile  start */}

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <div>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    mt: "32px",
                    px: "20px"
                  }}
                >
                  <MenuItem>
                    <Typography
                      onClick={handleClose}
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        m: 1
                      }}
                    >
                      Home
                    </Typography>
                  </MenuItem>

                  <Box></Box>
                  <Box>
                    {/* NAVBAR FOR DESKTOP */}

                    <MenuItem>
                      <Typography
                        onClick={handleClose}
                        variant="h6"
                        noWrap
                        component="div"
                        // onClick={}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          m: 1
                        }}
                      >
                        login
                      </Typography>
                    </MenuItem>
                  </Box>
                </Menu>
              </div>
            </Box>

            {/*  */}
            {/* for mobile responsive APPbar end here */}
            {/*  */}
            {/*  */}
            {/* NAVBAR FOR DESKTOP START HERE */}
            {/*  */}

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <MenuItem>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    m: 1
                  }}
                >
                  Home
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <MenuItem>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  // onClick={}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    m: 1
                  }}
                >
                  Login
                </Typography>
              </MenuItem>
            </Box>
 {/* NAVBAR FOR DESKTOP  END*/}

 {/* Menu dropdown icon*/}
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
