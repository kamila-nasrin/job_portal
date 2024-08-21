import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

const MyJobs = () => {
        const [appliedJobs, setAppliedJobs] = useState([]);
    
        useEffect(() => {
            const userId = JSON.parse(localStorage.getItem('currentUser'))?._id;
        
            if (userId) {
                axios.get(`http://localhost:3006/applied-jobs/${userId}`)
                    .then(response => {
                        console.log('Fetched applied jobs:', response.data);
                        setAppliedJobs(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching applied jobs:', error.response?.data || error.message);
                    });
            }
        }, []);
        
    return (
        <Box sx={{ padding: 4, backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
                My Applied Jobs
            </Typography>

            <Grid container spacing={3}>
                {appliedJobs.map(appliedJob => (
                    <Grid item xs={12} sm={6} md={4} key={appliedJob._id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {appliedJob.jobId.Jobtitle}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Company: {appliedJob.jobId.Cmpyname}
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    Description: {appliedJob.jobId.Des}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Requirements: {appliedJob.jobId.Req}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Location: {appliedJob.jobId.Loc}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Salary: {appliedJob.jobId.Sal}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Job Type: {appliedJob.jobId.Jobtype}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Industry: {appliedJob.jobId.Industry}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MyJobs;
