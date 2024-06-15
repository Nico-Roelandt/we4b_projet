const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let courses = [
    {
        id: 1,
        courseManager: "Manager A",
        teachers: ["Teacher A"],
        categories: ["Mathematics", "Science"],
        courseName: "Calculus",
        courseCode: "MATH101",
        branch: "Branch A",
        major: "Major 1",
        credits: 3,
        seatLimit: 30,
        studentsRegistered: 25,
        bibliography: "Book 1",
        location: "Location 1",
        program: "This course covers advanced calculus topics..."
    },
    {
        id: 2,
        courseManager: "Manager B",
        teachers: ["Teacher B"],
        categories: ["Computer Science"],
        courseName: "Algorithms",
        courseCode: "CS201",
        branch: "Branch B",
        major: "Major 2",
        credits: 4,
        seatLimit: 40,
        studentsRegistered: 35,
        bibliography: "Book 2",
        location: "Location 2",
        program: "Introduction to algorithms and data structures..."
    }
];

let reviews = [
    {
        id: 1,
        courseCode: "MATH101",
        theory: 4,
        practice: 5,
        subject: 4,
        personalAppreciation: 5,
        comment: "Great course, well explained."
    },
    {
        id: 2,
        courseCode: "MATH101",
        theory: 3,
        practice: 4,
        subject: 4,
        personalAppreciation: 3,
        comment: "Challenging but very rewarding."
    },
    {
        id: 3,
        courseCode: "CS201",
        theory: 5,
        practice: 5,
        subject: 5,
        personalAppreciation: 5,
        comment: "Very informative and practical."
    },
    {
        id: 4,
        courseCode: "CS201",
        theory: 4,
        practice: 3,
        subject: 4,
        personalAppreciation: 3,
        comment: "A bit tough but learned a lot."
    }
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
    if(courseCode) {
        const courseReviews = reviews.filter(r => r.courseCode === courseCode);
        res.json(courseReviews);
    } else {
        res.status(404).send('Course not found reviews');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
