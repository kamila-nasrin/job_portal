import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';

const UserHome = () => {
    const [availableJobsCount, setAvailableJobsCount] = useState(0);
    const [appliedJobsCount, setAppliedJobsCount] = useState(
        parseInt(localStorage.getItem('appliedJobsCount')) || 0
    );

    // Fetch user ID from local storage or context
    const userId = JSON.parse(localStorage.getItem('currentUser'))?._id;

    useEffect(() => {
        // Fetch the count of available jobs
        axios.get('http://localhost:3006/countAvailableJobs')
            .then(response => {
                console.log('Available Jobs Count Response:', response.data);
                setAvailableJobsCount(response.data.count);
            })
            .catch(error => {
                console.error('Error fetching available jobs count:', error.response?.data || error.message);
            });

        if (userId) {
            // Fetch the count of applied jobs for the user
            axios.get(`http://localhost:3006/countAppliedJobs/${userId}`)
                .then(response => {
                    console.log('Applied Jobs Count Response:', response.data);
                    setAppliedJobsCount(response.data.count);
                    // Store the count in local storage
                    localStorage.setItem('appliedJobsCount', response.data.count);
                })
                .catch(error => {
                    console.error('Error fetching applied jobs count:', error.response?.data || error.message);
                });
        } else {
            console.warn('User ID is not available.');
        }
    }, [userId]);

    return (
        <Container component="main" maxWidth="false" disableGutters sx={{ height: '100vh' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                    backgroundColor: '#f4f4f9',
                    height: '100vh'
                }}
            >
                <Grid container spacing={2} sx={{ marginBottom: 4 }}>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                            <Typography variant="h6">Available Jobs</Typography>
                            <Typography variant="h4">{availableJobsCount}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                            <Typography variant="h6">Applied Jobs</Typography>
                            <Typography variant="h4">{appliedJobsCount}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontStyle: 'italic', color: '#555' }}>
                        &quot;Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.&quot; - Albert Schweitzer
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default UserHome;
