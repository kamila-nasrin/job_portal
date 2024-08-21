/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

const SaveJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);


    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('currentUser'))?._id;
        // const userId = user ? user._id : null;

        if (userId) {
            axios.get(`http://localhost:3006/saved-jobs/${userId}`)
                .then(response => {
                    // Log the response data
                    setSavedJobs(response.data);
                })
                .catch(error => {
                    console.error('Error fetching saved jobs:', error);
                   
                });
        } 
    }, []);


    return (
        <Box sx={{ padding: 4, backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
                Saved Jobs
            </Typography>

            <Grid container spacing={3}>
                {savedJobs.map(savedJob => (
                    <Grid item xs={12} sm={6} md={4} key={savedJob.jobId._id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {savedJob.jobId.Jobtitle}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Company: {savedJob.jobId.Cmpyname}
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    Description: {savedJob.jobId.Des}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Requirements: {savedJob.jobId.Req}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Location: {savedJob.jobId.Loc}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Salary: {savedJob.jobId.Sal}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Job Type: {savedJob.jobId.Jobtype}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Industry: {savedJob.jobId.Industry}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SaveJobs;
