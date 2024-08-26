import axios from 'axios';

// CourseList must store data

const storeCourses = async () => {
    try {
        await axios.post('http://localhost:5000/addCourses', CourseList);
        console.log('Courses stored in MongoDB');
    } catch (error) {
        console.error('Error storing courses:', error);
    }
};

storeCourses();
