const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configurez votre connexion MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Remplacez par votre nom d'utilisateur MySQL
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'we4b_database'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Route pour obtenir les cours avec toutes les informations nécessaires
app.get('/courses', (req, res) => {
  const query = `
    SELECT 
      courses.*, 
      branches.name AS branchName, 
      majors.name AS majorName, 
      locations.name AS locationName,
      GROUP_CONCAT(categories.name) AS categoryNames
    FROM courses
    INNER JOIN branches ON courses.branch_id = branches.id
    INNER JOIN majors ON courses.major_id = majors.id
    INNER JOIN locations ON courses.location_id = locations.id
    LEFT JOIN course_categories ON courses.id = course_categories.course_id
    LEFT JOIN categories ON course_categories.category_id = categories.id
    GROUP BY courses.id;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching courses');
    } else {
      res.json(results);
    }
  });
});

// Routes pour obtenir les catégories, branches, majors, et locations
app.get('/categories', (req, res) => {
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching categories');
    } else {
      res.json(results);
    }
  });
});

app.get('/categoriesByCourseId', (req, res) => {
  const courseId = req.query.courseId;
  const query = `
    SELECT categories.*
    FROM categories
    INNER JOIN course_categories ON categories.id = course_categories.category_id
    WHERE course_categories.course_id = ?;
  `;
  connection.query(query, [courseId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching categories');
    } else {
      res.json(results);
    }
  });
});

app.get('/branches', (req, res) => {
  connection.query('SELECT * FROM branches', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching branches');
    } else {
      res.json(results);
    }
  });
});

app.get('/majors', (req, res) => {
  connection.query('SELECT * FROM majors', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching majors');
    } else {
      res.json(results);
    }
  });
});

app.get('/locations', (req, res) => {
  connection.query('SELECT * FROM locations', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching locations');
    } else {
      res.json(results);
    }
  });
});

// Route pour l'authentification des utilisateurs
app.post('/login', (req, res) => {
  const { username, password, role } = req.body;
  connection.query('SELECT * FROM users WHERE username = ? AND password = ? AND role = ?', [username, password, role], (err, results) => {
    if (err) {
      res.status(500).send('Error logging in');
    } else if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Route pour ajouter un nouveau cours
app.post('/addCourse', (req, res) => {
  const newCourse = req.body;
  const query = 'INSERT INTO courses (courseManager, courseName, courseCode, branch_id, major_id, credits, seatLimit, studentsRegistered, bibliography, location_id, program) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [newCourse.courseManager, newCourse.courseName, newCourse.courseCode, newCourse.branch_id, newCourse.major_id, newCourse.credits, newCourse.seatLimit, newCourse.studentsRegistered, newCourse.bibliography, newCourse.location_id, newCourse.program];
  connection.query(query, values, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error adding course' });
    } else {
      res.status(201).json({ id: results.insertId, ...newCourse });
    }
  });
});

// Route pour mettre à jour un cours existant
app.put('/updateCourse/:id', (req, res) => {
  const courseId = req.params.id;
  const updatedCourse = req.body;
  const query = 'UPDATE courses SET courseManager = ?, courseName = ?, courseCode = ?, branch_id = ?, major_id = ?, credits = ?, seatLimit = ?, studentsRegistered = ?, bibliography = ?, location_id = ?, program = ? WHERE id = ?';
  const values = [updatedCourse.courseManager, updatedCourse.courseName, updatedCourse.courseCode, updatedCourse.branch_id, updatedCourse.major_id, updatedCourse.credits, updatedCourse.seatLimit, updatedCourse.studentsRegistered, updatedCourse.bibliography, updatedCourse.location_id, updatedCourse.program, courseId];
  connection.query(query, values, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error updating course' });
    } else {
      res.status(200).json({ id: courseId, ...updatedCourse });
    }
  });
});

// Route pour supprimer un cours
app.delete('/deleteCourse/:id', (req, res) => {
  const courseId = req.params.id;
  const query = 'DELETE FROM courses WHERE id = ?';
  connection.query(query, [courseId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting course' });
    } else {
      res.status(200).json({ message: 'Course deleted successfully' });
    }
  });
});

// Route pour inscrire un étudiant à un cours
app.post('/register', (req, res) => {
  const { studentId, courseId, courseCode } = req.body;
  if (!studentId || !courseId || !courseCode) {
    res.status(400).json({ message: 'Missing studentId, courseId or courseCode' });
    return;
  }

  // Requête pour vérifier si l'étudiant est déjà inscrit au cours
  const checkQuery = 'SELECT * FROM registrations WHERE studentId = ? AND courseId = ?';
  connection.query(checkQuery, [studentId, courseId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error checking registration' });
      return;
    }

    if (results.length > 0) {
      res.status(400).json({ message: 'Student already registered for this course' });
      return;
    }

    // Requête pour inscrire l'étudiant au cours
    const registerQuery = 'INSERT INTO registrations (studentId, courseId, courseCode) VALUES (?, ?, ?)';
    connection.query(registerQuery, [studentId, courseId, courseCode], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Error registering student' });
        return;
      }

      res.status(201).json({ message: 'Student registered successfully' });
    });
  });
});

// Route pour obtenir les détails d'un cours spécifique
app.get('/courseByCode', (req, res) => {
  const courseCode = req.query.courseCode;
  const query = `
    SELECT 
      courses.*,
      branches.name AS branchName,
      majors.name AS majorName,
      locations.name AS locationName,
      GROUP_CONCAT(categories.name) AS categoryNames,
      GROUP_CONCAT(course_teachers.teacher_name) AS teacherNames
    FROM courses
    LEFT JOIN branches ON courses.branch_id = branches.id
    LEFT JOIN majors ON courses.major_id = majors.id
    LEFT JOIN locations ON courses.location_id = locations.id
    LEFT JOIN course_categories ON courses.id = course_categories.course_id
    LEFT JOIN categories ON course_categories.category_id = categories.id
    LEFT JOIN course_teachers ON courses.id = course_teachers.course_id
    WHERE courses.courseCode = ?
    GROUP BY courses.id;
  `;
  connection.query(query, [courseCode], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching course details');
    } else {
      res.json(results[0]); // Nous retournons le premier (et unique) résultat
    }
  });
});

app.get('/studentCourses', (req, res) => {
  const studentId = req.query.studentId;
  if (!studentId) {
    res.status(400).send('Missing studentId');
    return;
  }

  const query = `
    SELECT courses.*, registrations.id AS registrationId
    FROM courses
    INNER JOIN registrations ON courses.id = registrations.courseId
    WHERE registrations.studentId = ?
  `;
  connection.query(query, [studentId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching student courses');
      return;
    }

    const courses = results;
    const creditsQuery = `
      SELECT SUM(courses.credits) AS credits
      FROM courses
      INNER JOIN registrations ON courses.id = registrations.courseId
      WHERE registrations.studentId = ?
    `;
    connection.query(creditsQuery, [studentId], (err, creditResults) => {
      if (err) {
        res.status(500).send('Error fetching student credits');
        return;
      }

      res.json({
        courses: courses,
        credits: creditResults[0].credits,
      });
    });
  });
});

// Route pour obtenir les critiques d'un cours spécifique
app.get('/reviews', (req, res) => {
  const courseCode = req.query.courseCode;
  const query = `
    SELECT 
      reviews.id,
      reviews.theory,
      reviews.practice,
      reviews.subject,
      reviews.personalAppreciation,
      reviews.comment,
      users.name AS author_name
    FROM reviews
    INNER JOIN courses ON reviews.courseId = courses.id
    INNER JOIN users ON reviews.studentId = users.id
    WHERE courses.courseCode = ?;
  `;
  connection.query(query, [courseCode], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching reviews');
    } else {
      res.json(results);
    }
  });
});

app.post('/submitReview', (req, res) => {
  const { courseId, studentId, theory, practice, subject, personalAppreciation, comment } = req.body;
  if (!courseId || !studentId || theory === undefined || practice === undefined || subject === undefined || personalAppreciation === undefined || !comment) {
    res.status(400).json({ message: 'Missing courseId, studentId, theory, practice, subject, personalAppreciation, or comment' });
    return;
  }

  const query = 'INSERT INTO reviews (courseId, studentId, theory, practice, subject, personalAppreciation, comment) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [courseId, studentId, theory, practice, subject, personalAppreciation, comment], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error submitting review' });
      return;
    }

    res.status(201).json({ message: 'Review submitted successfully' });
  });
});


// Route pour désinscrire un étudiant d'un cours
app.post('/unregisterCourse', (req, res) => {
  const { studentId, courseId } = req.body;
  if (!studentId || !courseId) {
    res.status(400).json({ message: 'Missing studentId or courseId' });
    return;
  }

  const query = 'DELETE FROM registrations WHERE studentId = ? AND courseId = ?';
  connection.query(query, [studentId, courseId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error unregistering course' });
      return;
    }

    res.status(200).json({ message: 'Unregistered successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Route pour obtenir les cours créés par un gestionnaire spécifique
app.get('/coursesByManager', (req, res) => {
  const courseManager = req.query.courseManager;
  const query = `
    SELECT 
      courses.*, 
      branches.name AS branchName, 
      majors.name AS majorName, 
      locations.name AS locationName,
      GROUP_CONCAT(categories.name) AS categoryNames
    FROM courses
    INNER JOIN branches ON courses.branch_id = branches.id
    INNER JOIN majors ON courses.major_id = majors.id
    INNER JOIN locations ON courses.location_id = locations.id
    LEFT JOIN course_categories ON courses.id = course_categories.course_id
    LEFT JOIN categories ON course_categories.category_id = categories.id
    WHERE courses.courseManager = ?
    GROUP BY courses.id;
  `;
  connection.query(query, [courseManager], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching courses');
    } else {
      res.json(results);
    }
  });
});


// 获取课程的学生名单
app.get('/courseStudents', (req, res) => {
  const courseId = req.query.courseId;
  const query = `
    SELECT users.id, users.name 
    FROM registrations 
    INNER JOIN users ON registrations.studentId = users.id 
    WHERE registrations.courseId = ?;
  `;
  connection.query(query, [courseId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching students');
    } else {
      res.json(results);
    }
  });
});

// 获取学生的评价
app.get('/studentEvaluation', (req, res) => {
  const { courseId, studentId } = req.query;
  const query = `
    SELECT * FROM student_evaluations 
    WHERE course_id = ? AND student_id = ?;
  `;
  connection.query(query, [courseId, studentId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching evaluation');
    } else {
      res.json(results.length > 0 ? results[0] : null);
    }
  });
});

// 提交学生评价
app.post('/submitEvaluation', (req, res) => {
  const { courseId, studentId, grade, comment } = req.body;
  const query = `
    INSERT INTO student_evaluations (course_id, student_id, grade, comment) 
    VALUES (?, ?, ?, ?) 
    ON DUPLICATE KEY UPDATE grade = VALUES(grade), comment = VALUES(comment);
  `;
  connection.query(query, [courseId, studentId, grade, comment], (err, results) => {
    if (err) {
      res.status(500).send('Error submitting evaluation');
    } else {
      res.status(201).json({ message: 'Evaluation submitted successfully' });
    }
  });
});

// 获取用户信息
app.get('/userInfo', (req, res) => {
  const userId = req.query.userId;
  const query = `
    SELECT * FROM users WHERE id = ?;
  `;
  connection.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching user information');
    } else {
      res.json(results[0]);
    }
  });
});

// this is the API for personal-info but can not show courses
app.get('/userInfo', (req, res) => {
  const userId = req.query.userId;
  const userQuery = `
    SELECT 
      users.*, 
      users.role,
      GROUP_CONCAT(DISTINCT CONCAT(courses.courseName, ' (', courses.courseCode, ')')) AS studentCourses,
      GROUP_CONCAT(DISTINCT CONCAT(courses.courseName, ' (', courses.courseCode, ')')) AS teacherCourses
    FROM users 
    LEFT JOIN registrations ON users.id = registrations.studentId 
    LEFT JOIN courses ON registrations.courseId = courses.id 
    WHERE users.id = ? 
    GROUP BY users.id;
  `;
  connection.query(userQuery, [userId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching user information');
    } else {
      res.json(results[0] || {});
    }
  });
});
