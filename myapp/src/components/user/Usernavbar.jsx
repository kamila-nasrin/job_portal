import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
// import ProfileDropdown from "./ProfileDropdown"; // Import ProfileDropdown component

const Usernavbar = () => {
  return (
    <>
    <AppBar sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
          JobPortal
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/user/bjob" style={{ textDecoration: 'none' }}>
            <Typography
              variant="button"
              sx={{
                color: '#fff',
                marginRight: 2,
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1976d2',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                }
              }}
            >
              Browse Jobs
            </Typography>
          </Link>
          <Link to="/user/myjobs" style={{ textDecoration: 'none' }}>
            <Typography
              variant="button"
              sx={{
                color: '#fff',
                marginRight: 2,
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1976d2',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                }
              }}
            >
              My Jobs
            </Typography>
          </Link>
          <Link to="/user/savejobs" style={{ textDecoration: 'none' }}>
            <Typography
              variant="button"
              sx={{
                color: '#fff',
                marginRight: 2,
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1976d2',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                }
              }}
            >
              Save Jobs
            </Typography>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="button"
              sx={{
                color: '#fff',
                marginRight: 2,
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                }
              }}
            >
              Logout
            </Typography>
          </Link>
          {/* <ProfileDropdown /> Integrate ProfileDropdown component */}
        </Box>
      </Toolbar>
    </AppBar>
     {/* Ensure the content below the navbar is visible */}
     <Box sx={{ marginTop: 10 }}>
     <Outlet/>
   </Box>
   </>
  );
}

export default Usernavbar;
