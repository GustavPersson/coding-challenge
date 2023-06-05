
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import getAddressTitle from "../utils/getTitle";
import { useEffect, useState } from "react";

function AppWrapper() {
  const [title, setTitle] = useState<string | undefined>("Home");
  const location = useLocation();

  useEffect(() => {
    setTitle(getAddressTitle(location.pathname));
  }, [location]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#FFF" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Link to="">
                <MenuIcon />
              </Link>
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              color="#353535"
            >
              <Box sx={{ textTransform: "capitalize" }}>{title}</Box>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <Paper sx={{ p: 3, m: 3 }}>
          <Outlet />
        </Paper>
      </Container>
    </>
  );
}

export default AppWrapper;
