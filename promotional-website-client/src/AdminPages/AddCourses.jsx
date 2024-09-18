import axios from 'axios';

// CourseList must store data

const storeCourses = async () => {
    try {
        await axios.post('http://localhost:8080/courses/add-courses', CourseList);
        console.log('Courses stored in MongoDB');
    } catch (error) {
        console.error('Error storing courses:', error);
    }
};

storeCourses();
