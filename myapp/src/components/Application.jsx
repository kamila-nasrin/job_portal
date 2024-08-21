import { Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [errorMessage, setErrorMessage] = useState(null);  // State to handle error message

  useEffect(() => {
    // Fetch the applications from the backend
    axios.get('http://localhost:3006/admin/viewApplications')
      .then(response => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching applications:', error.response?.data || error.message);
        setErrorMessage('Failed to fetch applications. Please try again.');  // Set error message
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography align="center">Loading...</Typography>;  // Loading state
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <Card variant="outlined" sx={{ borderRadius: '16px', boxShadow: 4 }}>
        <CardContent sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
            View Applications
          </Typography>
          {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}  {/* Display error message */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>User Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Job Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Company</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No applications found</TableCell>
                  </TableRow>
                ) : (
                  applications.map((application) => (
                    <TableRow key={application._id}>
                      <TableCell>{application.userId?.fullname || 'N/A'}</TableCell>
                      <TableCell>{application.userId?.email || 'N/A'}</TableCell>
                      <TableCell>{application.jobId?.Jobtitle || 'N/A'}</TableCell>
                      <TableCell>{application.jobId?.Cmpyname || 'N/A'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Application;
