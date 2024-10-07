import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, CircularProgress, Box, Divider } from '@mui/material';
import axios from 'axios';

import './AdminStyledPage.css';

function ManageEnrolledCourseData() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/admin/get-all-enrolled-data");
        setUsersData(res.data.data);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <div className="enrolled-course-container">
      <Typography variant="h4" align="center" gutterBottom>
        Enrolled Courses
      </Typography>
      <Divider/>

      {usersData.map((user) => (
        <div key={user._id} className="user-section">
        <Divider/>
          {/* Styled Username */}
          <Typography variant="h5" align="center" sx={{ marginTop: '2rem', fontWeight: 'bold', color: '#1976d2' }}>
            User: {user.name}
          </Typography>

          {/* Detailed Table for each user */}
          <TableContainer component={Paper} sx={{ marginTop: '1.5rem' }}>
            <Table aria-label="enrolled courses table">
              <TableHead>
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell align="right">Enrolled On</TableCell>
                  <TableCell align="right">Course Cost</TableCell>
                  <TableCell align="right">Payment Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.coursename.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Grid container alignItems="center">
                        <Grid item xs={2}>
                          <img src={user.imgsrc[index]} alt={course} style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
                        </Grid>
                        <Grid item xs={10}>
                          {course}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">{user.enrolledon[index]}</TableCell>
                    <TableCell align="right">${user.coursecost[index]}</TableCell>
                    <TableCell align="right">{user.paymenttype[index]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
}

export default ManageEnrolledCourseData;
