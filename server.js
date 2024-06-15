const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let categories = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Computer Science" },
  { id: 3, name: "Science" }
];

let locations = [
  { id: 1, name: "Location 1" },
  { id: 2, name: "Location 2" },
  { id: 3, name: "Room 101" },
  { id: 4, name: "Room 202" },
  { id: 5, name: "Room 303" }
];

let branches = [
  { id: 1, name: "Branch A" },
  { id: 2, name: "Branch B" },
  { id: 3, name: "Sciences" },
  { id: 4, name: "Technologies" },
  { id: 5, name: "Humanities" }
];

let majors = [
  { id: 1, name: "Major 1" },
  { id: 2, name: "Major 2" },
  { id: 3, name: "Major 3" }
];

let courses = [
  {
    id: 1,
    courseManager: "Manager A",
    teachers: ["Teacher A"],
    categories: [1, 3], // Referencing category IDs
    courseName: "Calculus",
    courseCode: "MATH101",
    branch: 1, // Referencing branch ID
    major: 1, // Referencing major ID
    credits: 3,
    seatLimit: 30,
    studentsRegistered: 25,
    bibliography: "Book 1",
    location: 1, // Referencing location ID
    program: "This course covers advanced calculus topics..."
  },
  {
    id: 2,
    courseManager: "Manager B",
    teachers: ["Teacher B"],
    categories: [2], // Referencing category IDs
    courseName: "Algorithms",
    courseCode: "CS201",
    branch: 2, // Referencing branch ID
    major: 2, // Referencing major ID
    credits: 4,
    seatLimit: 40,
    studentsRegistered: 35,
    bibliography: "Book 2",
    location: 2, // Referencing location ID
    program: "Introduction to algorithms and data structures..."
  }
];

let reviews = [
  // Your reviews here
];

// Routes
app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/courses/:courseCode', (req, res) => {
    const courseCode = req.params.courseCode;
    const course = courses.find(c => c.courseCode === courseCode);
    if (course) {
        res.json(course);
    } else {
        res.status(404).send('Course not found');
    }
});

app.get('/reviews', (req, res) => {
    const courseCode = req.query.courseCode;
    const courseReviews = reviews.filter(r => r.courseCode === courseCode);
    res.json(courseReviews);
});

// Routes to get categories, locations, branches, and majors
app.get('/categories', (req, res) => {
    res.json(categories);
});

app.get('/locations', (req, res) => {
    res.json(locations);
});

app.get('/branches', (req, res) => {
    res.json(branches);
});

app.get('/majors', (req, res) => {
    res.json(majors);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
