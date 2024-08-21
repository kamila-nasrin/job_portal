import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";


const Navbar = () => {
  return (
    <>
    <AppBar sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
          JobPortal
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/admin/managejobs" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                color: '#fff',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
                marginRight: 2,
                borderRadius: '8px'
              }}
            >
              Manage Jobs
            </Button>
          </Link>
          <Link to="/admin/viewapplication" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                color: '#fff',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
                marginRight: 2,
                borderRadius: '8px'
              }}
            >
              View Application
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                color: '#fff',
                backgroundColor: '#d32f2f',
                '&:hover': { backgroundColor: '#c62828' },
                borderRadius: '8px'
              }}
            >
              Logout
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
     {/* Ensure the content below the navbar is visible */}
     <Box sx={{ marginTop: 10 }}>
     <Outlet />
   </Box>
   </>
  );
}

export default Navbar;
