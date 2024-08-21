import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box, TextField, Button, Paper } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';


const BJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState({
        jobtype: '',
        location: '',
        industry: ''
    });
    const navigate = useNavigate();
    

    useEffect(() => {
        axios.get('http://localhost:3006/view')
            .then(response => {
                setJobs(response.data);
                setFilteredJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        let updatedJobs = jobs;

        if (filters.jobtype) {
            updatedJobs = updatedJobs.filter(job => job.Jobtype.toLowerCase().includes(filters.jobtype.toLowerCase()));
        }

        if (filters.location) {
            updatedJobs = updatedJobs.filter(job => job.Loc.toLowerCase().includes(filters.location.toLowerCase()));
        }

        if (filters.industry) {
            updatedJobs = updatedJobs.filter(job => job.Industry.toLowerCase().includes(filters.industry.toLowerCase()));
        }

        setFilteredJobs(updatedJobs);
    };

    const handleApply = (jobId) => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const userId = user ? user._id : null;
    
        console.log('User:', user); // Debug: Check user object
        console.log('User ID:', userId); // Debug: Check user ID
    
        if (!userId) {
            alert('Please log in to apply for jobs.');
            return;
        }
    
        axios.post('http://localhost:3006/apply', { userId, jobId })
            .then(() => {
                alert('Job applied successfully!');
                // Navigate to My Jobs page
                navigate('/user/myjobs');
    
                // Fetch and update applied jobs count
                axios.get(`http://localhost:3006/applied-jobs/${userId}`)
                    .then(response => {
                        // Calculate the applied jobs count
                        const appliedJobsCount = response.data.length;
                        // Update the local storage
                        localStorage.setItem('appliedJobsCount', appliedJobsCount);
                    })
                    .catch(error => {
                        console.error('Error fetching applied jobs count:', error.response?.data || error.message);
                    });
            })
            .catch(error => {
                console.error('Error applying for job:', error.response?.data || error.message);
            });
    };

const handleSave = (jobId) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userId = user ? user._id : null;

    console.log("User",user);
    console.log("User ID",userId);

    if (!userId) {
        alert('Please log in to save jobs.');
        return;
    }

    axios.post('http://localhost:3006/save-job', { userId, jobId })
    .then(() => {
        alert('Job saved successfully!');
        navigate('/user/savejobs'); // Navigate after saving the job
    })
    .catch(error => {
        console.error('Error saving job:', error.response?.data || error.message);
    });
};
    return (
        <Box sx={{ padding: 4, backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
                Available Jobs
            </Typography>

            <Box sx={{ marginBottom: 4 }}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Filters
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Job Type"
                                name="jobtype"
                                value={filters.jobtype}
                                onChange={handleFilterChange}
                                fullWidth
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Location"
                                name="location"
                                value={filters.location}
                                onChange={handleFilterChange}
                                fullWidth
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Industry"
                                name="industry"
                                value={filters.industry}
                                onChange={handleFilterChange}
                                fullWidth
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={applyFilters}
                                sx={{
                                    borderRadius: '15px',
                                    width: '60px',
                                    height: '35px',
                                    marginTop: '10px',
                                    background: 'grey',
                                    color: 'black',
                                    '&:hover': {
                                        backgroundColor: 'darkgrey'
                                    }
                                }}
                            >
                                Apply
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            <Grid container spacing={3}>
                {filteredJobs.map(job => (
                    <Grid item xs={12} sm={6} md={4} key={job._id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {job.Jobtitle}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Company: {job.Cmpyname}
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    Description: {job.Des}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Requirements: {job.Req}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Location: {job.Loc}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Salary: {job.Sal}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Job Type: {job.Jobtype}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Industry: {job.Industry}
                                </Typography>
                                <Link to='/user/myjobs'>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: '15px',
                                        width: '100%',
                                        height: '35px',
                                        marginTop: '10px',
                                        background: 'grey',
                                        color: 'black',
                                        '&:hover': {
                                            backgroundColor: 'darkgrey'
                                        }
                                    }}
                                    onClick={() => handleApply(job._id)}
                                >
                                    Apply
                                </Button></Link>
                                <Link to='/user/savejobs'>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: '15px',
                                        width: '100%',
                                        height: '35px',
                                        marginTop: '10px',
                                        background: 'grey',
                                        color: 'black',
                                        '&:hover': {
                                            backgroundColor: 'darkgrey'
                                        }
                                    }}
                                    onClick={() => handleSave(job._id)}
                                >
                                    Save
                                </Button></Link>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BJobs;
