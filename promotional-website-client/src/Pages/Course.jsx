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
  const [errorLoading,setErrorLoading]=useState(false);
  const navigate=useNavigate(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try { 
          const response = await axios.get('http://localhost:8080/courses/list-courses');
          setCourses(response.data);
          console.log(response.data);
          setErrorLoading(false); // Set error loading to false if data is fetched successfully
      } catch (error) {
          setErrorLoading(true); // Set error to true if there's an error
          console.error('Error fetching courses:', error);
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
          <div className="course-item" key={key}>
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
              {!course.available?(<p className='enrolled-item'>Available</p>):(
                <p className='enrolled-item-notAvailabel'>NotAvailable</p>
        )}
        {!course.available?(<button onClick={() => SelectCourse(course)}>Enroll Now <NorthEastIcon sx={{fontSize:'medium'}}/></button>):
        (<button  disabled >Enroll Now <NorthEastIcon sx={{fontSize:'medium'}}/></button>)}

              </div>
            </div>
          </div>
        ))}
      </div>
      {errorLoading ? (<Toaster key="201" message="Unable to load courses. Server Error" />) : null}
    </>
  );
}

export default Course;


  // const CourseData=[
  //   {
  //     "id": 1,
  //     "name": "Data Science With Python",
  //     "src": "DataScience",
  //     "cost": "500/month",
  //     "coursesrc": "https://www.aiche.org/sites/default/files/images/courses/lead_custom_image_ela271.jpg",
  //     "desc": "Transform data into insights and boost your career with Python Data Science.",
  //     "enrolled": 0
  //   },
  //   {
  //     "id": 2,
  //     "name": "Mobile App Development",
  //     "src": "MobileApp",
  //     "cost": "500/month",
  //     "coursesrc": "https://www.opensourceforu.com/wp-content/uploads/2018/05/Android-app-development.jpg",
  //     "desc": "Build innovative and powerful Android apps to transform your ideas into reality.",
  //     "enrolled": 0
  //   },
  //   {
  //     "id": 3,
  //     "name": "Selenium Testing With Java",
  //     "src": "Selenium",
  //     "cost": "500/month",
  //     "coursesrc": "https://blog.testleaf.com/wp-content/uploads/2022/10/1.jpg",
  //     "desc": "Automate testing and enhance software quality with Selenium and Java.",
  //     "enrolled": 0
  //   },
  //   {
  //     "id": 4,
  //     "name": "Ethical Hacking",
  //     "src": "Hacking",
  //     "cost": "500/month",
  //     "coursesrc": "https://www.briskinfosec.com/assets/blogs/ethical-hacking.png",
  //     "desc": "Become an Ethical Hacker: Protect systems and data with advanced cybersecurity skills.",
  //     "enrolled": 0
  //   },
  //   {
  //     "id": 5,
  //     "name": "Full Stack Python",
  //     "src": "FSPy",
  //     "cost": "500/month",
  //     "coursesrc": "https://www.vagdevitechnologies.com/wp-content/uploads/2024/04/python-full-stack-1.jpg",
  //     "desc": "Build dynamic web applications from front to back with Full Stack Python Development.",
  //     "enrolled": 0
  //   },
  //   {
  //     "id": 6,
  //     "name": "Full Stack Java",
  //     "src": "FSJava",
  //     "cost": "500/month",
  //     "coursesrc": "https://skill9academy.com/images/img/crd-img4.jpg",
  //     "desc": "Develop robust, scalable web applications end-to-end with Full Stack Java Development.",
  //     "enrolled": 0
  //   },
  //   {
  //     "id": 7,
  //     "name": "Full Stack PHP",
  //     "src": "FSPhp",
  //     "cost": "500/month",
  //     "coursesrc": "https://invedus.com/images/services/php.png",
  //     "desc": "Build dynamic, end-to-end web applications with Full Stack PHP development.",
  //     "enrolled": 0
  //   },
  //   {
  //     "id": 8,
  //     "name": "Full Stack Development",
  //     "src": "FullStack",
  //     "cost": "500/month",
  //     "coursesrc": "https://www.revenueriver.co/hs-fs/hubfs/fullstack.jpeg?length=1300&name=fullstack.jpeg",
  //     "desc": "Build complete, dynamic web solutions from start to finish with Full Stack Development.",
  //     "enrolled": 0
  //   },
  //   {
  //     "id": 9,
  //     "name": "Devops Training",
  //     "src": "Devops",
  //     "cost": "500/month",
  //     "coursesrc": "https://www.cyberphoton.com/wp-content/uploads/2018/01/banner_03.jpg",
  //     "desc": "Streamline your workflow and boost efficiency with comprehensive DevOps training.",
  //     "enrolled": 0
  //   },
  //   {
  //     "id": 10,
  //     "name": "Digital Marketing",
  //     "src": "DigitalM",
  //     "cost": "500/month",
  //     "coursesrc": "https://www.brontobytes.com/blog/wp-content/uploads/2020/08/digital-marketing.jpg",
  //     "desc": "Enhance your skills and drive success with our comprehensive Digital Marketing Training.",
  //     "enrolled": 0
  //   },
  //   {
  //     "id": 11,
  //     "name": "Blockchain Training",
  //     "src": "Blockchain",
  //     "cost": "500/month",
  //     "coursesrc": "https://devqode.com/wp-content/uploads/2021/12/blockchain-development.png",
  //     "desc": "Unlock the potential of decentralized technology with expert Blockchain training.",
  //     "enrolled": 0
  //   }
  // ]
  
