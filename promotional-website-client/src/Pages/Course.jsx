import React from 'react';
import { useState ,useEffect} from 'react';
import './styledPage.css';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CourseList from '../images/course_img/CourseList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Backdrop, CircularProgress } from "@mui/material";
import Toaster from '../Form/Toaster';

function Course() {

  const [courses, setCourses] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate(null);

  useEffect(() => {
      const fetchCourses = async () => {
        setIsLoading(true);
          try { 
             
              const response = await axios.get('http://localhost:8080/courses');
              setCourses(response.data);
              console.log(response.data)
          } catch (error) {
              console.error('Error fetching courses:', error);
              setIsLoading(false);
          }
          setIsLoading(false);
      };

      fetchCourses();
  }, []);


  const SelectCourse = (item) => {
    localStorage.setItem("CourseData",JSON.stringify(item));
    navigate('/course-book',{state:item});
    
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress />
      </Backdrop>
      <div className="course-container">
        {courses.map((course,key) => (
          <div className="course-item" key={course.id}>
            <div className="courses">
              <img src={CourseList[key]} alt='none' />
            </div>
            <div className="courses">
              <div className="right-item-container">
                <h3>{course.name}</h3>
                <span className='cost-item'>{course.cost}</span>  
              </div>
              <p className='description-text'>{course.desc}</p>
              <div className="enroll-container">
                <p className='enrolled-item'><span className='enrolled-count'>{course.enrolled}</span> Enrolled</p>
                <button onClick={() => SelectCourse(course)}>Enroll Now <NorthEastIcon sx={{fontSize:'medium'}}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {!isLoading ? (<Toaster key="201" message="Network error" />) : null} */}
    </>
  );
}

export default Course;
