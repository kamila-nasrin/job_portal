import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, Card } from '@mui/material';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3006/login', {
                username,
                password
            });
            const {role,userId}=response.data;
    
            // console.log('Login response:', response.data); // Debugging step
    
            if (role === 'user') {
                localStorage.setItem('currentUser', JSON.stringify({ _id: userId, username }));
                navigate('/user/'); // Redirect to user home page
            } else if (role === 'admin') {
                localStorage.setItem('currentAdmin', JSON.stringify({ username }));
                navigate('/admin/'); // Redirect to admin home page
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please check your credentials.');
        }
    };
    

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#fff' }}>
            <Card sx={{ maxWidth: 900, display: 'flex', flexDirection: 'row', boxShadow: 3, borderRadius: 2 }}>
                <Box sx={{ flex: 1, padding: 4, backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
                        Welcome to JobPortal
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#ccc' }}>
                        Your one-stop solution for finding your dream job. Log in to access thousands of job opportunities and more.
                    </Typography>
                </Box>
                <Box sx={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fafafa' }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                        Login
                    </Typography>
                    {/* {error && (
                        <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
                            {error}
                        </Typography>
                    )} */}
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br /><br />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#333',
                            color: '#fff',
                            paddingY: 1.5,
                            borderRadius: '5px',
                            '&:hover': {
                                backgroundColor: '#555',
                            }
                        }}
                        onClick={handleLogin}
                    >
                        Submit
                    </Button>
                    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                        <Link to="/register" variant="body2" sx={{ color: '#333', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                            Dont have an account? Register here
                        </Link>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default Signin;
