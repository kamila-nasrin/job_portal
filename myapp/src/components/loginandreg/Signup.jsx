import { Box, Typography, TextField, Button, Link, Card } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [place, setPlace] = useState('');
    const [age, setAge] = useState('');
    const [qualification, setQualification] = useState('');
    const [photo, setPhoto] = useState(null);
    const [resume, setResume] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('place', place);
        formData.append('age', age);
        formData.append('qualification', qualification);
        formData.append('photo', photo);
        formData.append('resume', resume);

        try {
            const response = await axios.post('http://localhost:3006/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Registration successful:', response.data);
            navigate('/'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#fff' }}>
            <Card sx={{ maxWidth: 600, padding: 4, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
                    Register for JobPortal
                </Typography>
                <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
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
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <TextField
                    label="Place"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
                <TextField
                    label="Age"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <TextField
                    label="Qualification"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{
                        backgroundColor: '#333',
                        color: '#fff',
                        paddingY: 1.5,
                        borderRadius: '5px',
                        marginTop: 2,
                        '&:hover': {
                            backgroundColor: '#555',
                        }
                    }}
                >
                    Upload Photo
                    <input
                        type="file"
                        hidden
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </Button>
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{
                        backgroundColor: '#333',
                        color: '#fff',
                        paddingY: 1.5,
                        borderRadius: '5px',
                        marginTop: 2,
                        '&:hover': {
                            backgroundColor: '#555',
                        }
                    }}
                >
                    Upload Resume
                    <input
                        type="file"
                        hidden
                        onChange={(e) => setResume(e.target.files[0])}
                    />
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: '#333',
                        color: '#fff',
                        paddingY: 1.5,
                        borderRadius: '5px',
                        marginTop: 2,
                        '&:hover': {
                            backgroundColor: '#555',
                        }
                    }}
                    onClick={handleRegister}
                >
                    Register
                </Button>
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Link
                to="/"
                variant="body2"
                sx={{
                    color: '#333',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                }}
            >
                Already have an account? Login here
            </Link>
        </Box>
        
            </Card>
        </Box>
    );
};

export default Signup;
