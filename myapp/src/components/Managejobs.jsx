import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Managejobs = () => {
  const [inputs, setInputs] = useState({
    Jobtitle: "",
    Cmpyname: "",
    Des: "",
    Req: "",
    Loc: "",
    Sal: "",
    Jobtype: "",
    Industry:""
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Handler to update form state
  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Handler to submit form data
  const addHandler = () => {
    if (location.state !== null) {
      axios.put(`http://localhost:3006/update/${location.state.val._id}`, inputs)
        .then((res) => {
          alert(res.data.message);
          navigate('/admin/');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post("http://localhost:3006/add", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate('/admin/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Effect to populate form with existing data if updating
  useEffect(() => {
    if (location.state !== null) {
      setInputs({
        Jobtitle: location.state.val.Jobtitle,
        Cmpyname: location.state.val.Cmpyname,
        Des: location.state.val.Des,
        Req: location.state.val.Req,
        Loc: location.state.val.Loc,
        Sal: location.state.val.Sal,
        Jobtype: location.state.val.Jobtype,
        Industry: location.state.val.Industry,
      });
    }
  }, [location.state]);

  return (

    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f9' }}>
      <Card variant="outlined" sx={{ maxWidth: 600, borderRadius: '16px', boxShadow: 4 }}>
        <CardContent sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
            {location.state ? 'Update Job' : 'Add Job'}
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              id="job-title"
              label="Job Title"
              variant="outlined"
              name="Jobtitle"
              value={inputs.Jobtitle}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />
            <TextField
              id="company-name"
              label="Company"
              variant="outlined"
              name="Cmpyname"
              value={inputs.Cmpyname}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              name="Des"
              value={inputs.Des}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />
            <TextField
              id="requirements"
              label="Requirements"
              variant="outlined"
              name="Req"
              value={inputs.Req}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />
            <TextField
              id="location"
              label="Location"
              variant="outlined"
              name="Loc"
              value={inputs.Loc}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />
            <TextField
              id="salary"
              label="Salary"
              variant="outlined"
              name="Sal"
              value={inputs.Sal}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />
            <TextField
              id="job-type"
              label="Job Type"
              variant="outlined"
              name="Jobtype"
              value={inputs.Jobtype}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />
             <TextField
              id="industry"
              label="Industry"
              variant="outlined"
              name="Industry"
              value={inputs.Industry}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" onClick={addHandler} sx={{ width: 200, padding: 1.5 }}>
                {location.state ? 'Update' : 'Add'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>

  );
}

export default Managejobs;
