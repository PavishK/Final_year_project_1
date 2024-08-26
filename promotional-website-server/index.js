const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();

app.use(express.json());

const userRoutes = require("./Routes/userRoutes");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is Connected to Database");
  } catch (err) {
    console.log("Server is NOT connected to Database", err.message);
  }
};
connectDb();

app.get("/", (req, res) => {
  res.send("API is running123");
});

app.use("/user", userRoutes);

const courseSchema = new mongoose.Schema({
  id: Number,
  src: String,
  name: String,
  cost: String,
  enrolled: Number,
  desc: String,
  coursesrc: String
});

const Course = mongoose.model('Course', courseSchema);

// Route to add courses to MongoDB
app.post('/add-courses', async (req, res) => {
  try {
      const courses = req.body;
      await Course.insertMany(courses);
      res.status(200).send('Courses added successfully!');
      console.log("Course Added successfully!");
  } catch (error) {
      res.status(500).send('Error adding courses');
  }
});

// Route to fetch courses from MongoDB
app.get('/courses', async (req, res) => {
  try {
      const courses = await Course.find();
      res.status(200).json(courses);
      console.log("Data fetched by -> ",req.url);
  } catch (error) {
      res.status(500).send('Error fetching courses');
  }
});





// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log("Server is Running..."));
