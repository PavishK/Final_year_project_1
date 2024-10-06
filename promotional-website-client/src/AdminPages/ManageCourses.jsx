import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  AppBar,
  Toolbar,
  Snackbar,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import axios from "axios";
import './AdminStyledPage.css'; // Custom CSS for additional styling

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/courses/list-courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDialogOpen = () => {
    setSelectedCourse(null);
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setConfirmDeleteDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setSelectedCourse(null);
    }, 200);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteDialog(false);
    setSelectedCourse(null);
  };

  // Function to add a new course
  const handleAddCourse = async (courseData) => {
    try {
      await axios.post("http://localhost:8080/admin/add-courses", courseData);
      setToastMessage("Course added successfully!");
      fetchCourses();
      handleDialogClose();
      setToastOpen(true);
    } catch (error) {
      console.error("Error adding course:", error);
      setToastMessage("Error adding course.");
      setToastOpen(true);
    }
  };

  // Function to update an existing course
  const handleUpdateCourse = async (courseData) => {
    try {
      await axios.put(`http://localhost:8080/admin/update-course/${selectedCourse._id}`, courseData);
      setToastMessage("Course updated successfully!");
      fetchCourses();
      handleDialogClose();
      setToastOpen(true);
    } catch (error) {
      console.error("Error updating course:", error);
      setToastMessage("Error updating course.");
      setToastOpen(true);
    }
  };

  // Function to delete a course
  const handleDeleteCourse = async () => {
    if (selectedCourse) {
      try {
        await axios.delete(`http://localhost:8080/admin/delete-course/${selectedCourse._id}`);
        setToastMessage("Course deleted successfully!");
        fetchCourses();
        handleConfirmDeleteClose();
        setToastOpen(true);
      } catch (error) {
        console.error("Error deleting course:", error);
        setToastMessage("Error deleting course.");
        setToastOpen(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      name: e.target.name.value,
      desc: e.target.desc.value,
      cost: parseFloat(e.target.cost.value),
      available: e.target.available.checked,
      coursesrc: e.target.coursesrc.value,
    };

    if (editMode && selectedCourse) {
      handleUpdateCourse(courseData);
    } else {
      handleAddCourse(courseData);
    }
  };

  return (
    <div className="manage-courses-container" style={{ padding: 16 }}>
      {/* AppBar Header */}
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: "#333" }}>
            Manage Courses
          </Typography>
          <IconButton color="primary" onClick={handleDialogOpen}>
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Course Cards - Vertical List View */}
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        {courses.map((course) => (
          <Grid item xs={12} sm={12} md={6} key={course._id}>
            <Card className="course-card" style={{ boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)", marginBottom: 16 }}>
              <Grid container>
                {/* Image Section */}
                <Grid item xs={12} md={4}>
                  <img 
                    src={course.coursesrc} 
                    alt={course.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px 0 0 4px' }} 
                  />
                </Grid>

                {/* Content Section */}
                <Grid item xs={12} md={8}>
                  <CardContent style={{ padding: 16 }}>
                    <Typography variant="h5" style={{ fontWeight: 500 }}>{course.name}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
                      {course.desc}
                    </Typography>
                    <Typography variant="h6" color="primary" style={{ marginTop: 8 }}>
                      ₹{course.cost}
                    </Typography>
                    <Typography variant="body2" style={{ color: course.available ? "green" : "red", marginTop: 8 }}>
                      {course.available ? "Available" : "Not Available"}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" marginTop={2}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEditClick(course)}
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(course)}
                        style={{ marginLeft: 8 }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Course Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? "Edit Course" : "Add Course"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="course-form">
            <TextField
              label="Course Name"
              name="name"
              defaultValue={selectedCourse ? selectedCourse.name : ""}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Description"
              name="desc"
              defaultValue={selectedCourse ? selectedCourse.desc : ""}
              fullWidth
              required
              multiline
              rows={3}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Cost"
              name="cost"
              type="number"
              defaultValue={selectedCourse ? selectedCourse.cost : ""}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Image URL"
              name="coursesrc"
              defaultValue={selectedCourse ? selectedCourse.coursesrc : ""}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox name="available" defaultChecked={selectedCourse ? selectedCourse.available : false} />}
              label="Available"
              style={{ marginTop: 16 }}
            />
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
              <Button type="submit" variant="contained" color="primary">{editMode ? "Update" : "Add"}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteDialog} onClose={handleConfirmDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this course?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteClose} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteCourse} variant="contained" color="primary">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Toast Snackbar */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={handleToastClose}
        message={toastMessage}
      />
    </div>
  );
};

export default ManageCourses;
