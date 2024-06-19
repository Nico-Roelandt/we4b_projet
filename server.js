const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbFilePath = './db.json';

function readDatabase() {
  if (fs.existsSync(dbFilePath)) {
    const data = fs.readFileSync(dbFilePath);
    return JSON.parse(data);
  } else {
    return {
      categories: [],
      locations: [],
      branches: [],
      majors: [],
      users: [],
      courses: [],
      reviews: []
    };
  }
}

function writeDatabase(data) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

function generateNewId(courses) {
  if (courses.length === 0) return 1;
  const ids = courses.map(course => course.id);
  return Math.max(...ids) + 1;
}

// Routes
app.get('/courses', (req, res) => {
  const db = readDatabase();
  res.json(db.courses);
});

app.get('/courses/:courseCode', (req, res) => {
  const db = readDatabase();
  const courseCode = req.params.courseCode;
  const course = db.courses.find(c => c.courseCode === courseCode);
  if (course) {
    res.json(course);
  } else {
    res.status(404).send('Course not found');
  }
});

app.get('/reviews', (req, res) => {
  const db = readDatabase();
  const courseCode = req.query.courseCode;
  const courseReviews = db.reviews.filter(r => r.courseCode === courseCode);
  res.json(courseReviews);
});

app.get('/categories', (req, res) => {
  const db = readDatabase();
  res.json(db.categories);
});

app.get('/locations', (req, res) => {
  const db = readDatabase();
  res.json(db.locations);
});

app.get('/branches', (req, res) => {
  const db = readDatabase();
  res.json(db.branches);
});

app.get('/majors', (req, res) => {
  const db = readDatabase();
  res.json(db.majors);
});

app.post('/login', (req, res) => {
  const db = readDatabase();
  const { username, password, role } = req.body;
  const user = db.users.find(u => u.username === username && u.password === password && u.role === role);
  if (user) {
    res.json(user);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/courses', (req, res) => {
  const db = readDatabase();
  const newCourse = req.body;
  newCourse.id = generateNewId(db.courses); // Assign a new ID
  // Ensure new course format consistency
  newCourse.teachers = Array.isArray(newCourse.teachers) ? newCourse.teachers : newCourse.teachers.split(',');
  newCourse.categories = Array.isArray(newCourse.categories) ? newCourse.categories : newCourse.categories.split(',').map(String);
  newCourse.branch = String(newCourse.branch);
  newCourse.major = String(newCourse.major);
  newCourse.location = String(newCourse.location);
  db.courses.push(newCourse);
  writeDatabase(db);
  res.status(201).json(newCourse);
});

app.put('/courses/:id', (req, res) => {
  const db = readDatabase();
  const courseId = parseInt(req.params.id);
  const updatedCourse = req.body;
  const courseIndex = db.courses.findIndex(c => c.id === courseId);
  if (courseIndex > -1) {
    // Ensure updated course format consistency
    updatedCourse.teachers = Array.isArray(updatedCourse.teachers) ? updatedCourse.teachers : updatedCourse.teachers.split(',');
    updatedCourse.categories = Array.isArray(updatedCourse.categories) ? updatedCourse.categories : updatedCourse.categories.split(',').map(String);
    updatedCourse.branch = String(updatedCourse.branch);
    updatedCourse.major = String(updatedCourse.major);
    updatedCourse.location = String(updatedCourse.location);
    db.courses[courseIndex] = { ...db.courses[courseIndex], ...updatedCourse };
    writeDatabase(db);
    res.json(db.courses[courseIndex]);
  } else {
    res.status(404).send('Course not found');
  }
});


app.delete('/courses/:id', (req, res) => {
  const db = readDatabase();
  const courseId = parseInt(req.params.id);
  const courseIndex = db.courses.findIndex(c => c.id === courseId);
  if (courseIndex > -1) {
    db.courses.splice(courseIndex, 1);
    writeDatabase(db);
    res.status(204).send();
  } else {
    res.status(404).send('Course not found');
  }
});

app.get('/teachers/:teacherId/courses', (req, res) => {
  const db = readDatabase();
  const teacherId = parseInt(req.params.teacherId);
  const teacher = db.users.find(user => user.id === teacherId && user.role === 'teacher');
  
  if (!teacher) {
    return res.status(404).send('Teacher not found');
  }

  const teacherName = teacher.username;
  const courses = db.courses.filter(course => course.teachers.includes(teacherName));
  res.json({ courses });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
