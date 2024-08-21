import { Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

const Homes = () => {
  const [job, setJob] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3006/view")
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const delValue = (id) => {
    axios.delete(`http://localhost:3006/remove/${id}`)
      .then((res) => {
        alert(res.data.message);
        setJob(job.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const updateValue = (val) => {
    navigate("/admin/managejobs", { state: { val } });
  };

  return (
   
    <Box sx={{ padding: 4, backgroundColor: '#eaeaea', minHeight: '100vh' }}><br/>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
        View Jobs
      </Typography>
      <Grid container spacing={4}>
        {job.map((val) => (
          <Grid item xs={12} sm={6} md={4} key={val._id}>
            <Card sx={{ borderRadius: '12px', boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {val.Jobtitle}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ marginTop: 1 }}>
                  <strong>Company:</strong> {val.Cmpyname}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Description:</strong> {val.Des}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Requirements:</strong> {val.Req}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Location:</strong> {val.Loc}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Salary:</strong> {val.Sal}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Job Type:</strong> {val.Jobtype}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Industry:</strong> {val.Industry}
                </Typography>
              </CardContent>
              <Box sx={{ padding: 2, display: 'flex', justifyContent: 'flex-end' }}>
               <Button
                  variant="contained"
                  size="small"
                  color="success"
                  sx={{ marginRight: 1 }}
                  onClick={() => updateValue(val)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => delValue(val._id)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    // </Navbar>
  );
};

export default Homes;
