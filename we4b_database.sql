-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2024-06-21 14:51:42
-- 服务器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `we4b_database`
--

-- --------------------------------------------------------

--
-- 表的结构 `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `branches`
--

INSERT INTO `branches` (`id`, `name`) VALUES
(1, 'Branch A'),
(2, 'Branch B'),
(3, 'Sciences'),
(4, 'Technologies'),
(5, 'Humanities');

-- --------------------------------------------------------

--
-- 表的结构 `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Mathematics'),
(2, 'Computer Science'),
(3, 'Science');

-- --------------------------------------------------------

--
-- 表的结构 `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `courseManager` varchar(100) DEFAULT NULL,
  `courseName` varchar(100) DEFAULT NULL,
  `courseCode` varchar(50) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `major_id` int(11) DEFAULT NULL,
  `credits` int(11) DEFAULT NULL,
  `seatLimit` int(11) DEFAULT NULL,
  `studentsRegistered` int(11) DEFAULT NULL,
  `bibliography` varchar(255) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `program` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `courses`
--

INSERT INTO `courses` (`id`, `courseManager`, `courseName`, `courseCode`, `branch_id`, `major_id`, `credits`, `seatLimit`, `studentsRegistered`, `bibliography`, `location_id`, `program`) VALUES
(1, 'Manager Name', 'Course Name', 'COURSE101', 1, 1, 3, 30, 0, 'Bibliography details', 1, 'Course program details'),
(2, 'teacher1', 'Optique', 'OTP201', 1, 1, 2, 35, 0, 'Book 1 by Elie Vitrai', 3, 'Un cours à propos des optiques'),
(3, 'teacher1', 'Littérature', 'LT01', 2, 2, 2, 50, 0, 'Book 5', 4, ''),
(4, 'teacher1', 'Relations internationales', 'CC01', 5, 1, 5, 30, 0, 'BOOK 3', 4, 'Explorer les relations internationales');

-- --------------------------------------------------------

--
-- 表的结构 `course_categories`
--

CREATE TABLE `course_categories` (
  `course_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `course_teachers`
--

CREATE TABLE `course_teachers` (
  `course_id` int(11) NOT NULL,
  `teacher_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `locations`
--

INSERT INTO `locations` (`id`, `name`) VALUES
(1, 'Location 1'),
(2, 'Location 2'),
(3, 'Room 101'),
(4, 'Room 202'),
(5, 'Room 303');

-- --------------------------------------------------------

--
-- 表的结构 `majors`
--

CREATE TABLE `majors` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `majors`
--

INSERT INTO `majors` (`id`, `name`) VALUES
(1, 'Major 1'),
(2, 'Major 2'),
(3, 'Major 3');

-- --------------------------------------------------------

--
-- 表的结构 `registrations`
--

CREATE TABLE `registrations` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `courseCode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `registrations`
--

INSERT INTO `registrations` (`id`, `studentId`, `courseId`, `courseCode`) VALUES
(10, 2, 1, 'COURSE101'),
(12, 1, 1, 'COURSE101'),
(14, 1, 3, 'LT01'),
(15, 1, 2, 'OTP201'),
(16, 1, 4, 'CC01');

-- --------------------------------------------------------

--
-- 表的结构 `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `courseId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `theory` int(11) DEFAULT NULL,
  `practice` int(11) DEFAULT NULL,
  `subject` int(11) DEFAULT NULL,
  `personalAppreciation` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `reviews`
--

INSERT INTO `reviews` (`id`, `courseId`, `studentId`, `theory`, `practice`, `subject`, `personalAppreciation`, `comment`) VALUES
(0, 1, 1, 2, 1, 1, 0, 'Le pire cours que j\'ai jamais suivis');

-- --------------------------------------------------------

--
-- 表的结构 `student_evaluations`
--

CREATE TABLE `student_evaluations` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `grade` char(1) NOT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `student_evaluations`
--

INSERT INTO `student_evaluations` (`id`, `course_id`, `student_id`, `grade`, `comment`) VALUES
(1, 4, 1, 'F', 'good');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `name`) VALUES
(1, 'student1', 'password1', 'student', 'Student One'),
(2, 'teacher1', 'password1', 'teacher', 'Teacher One');

--
-- 转储表的索引
--

--
-- 表的索引 `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- 表的索引 `categories`
--
ALTER TABLE `categories`
  ADD KEY `id` (`id`);

--
-- 表的索引 `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `major_id` (`major_id`),
  ADD KEY `location_id` (`location_id`);

--
-- 表的索引 `course_categories`
--
ALTER TABLE `course_categories`
  ADD PRIMARY KEY (`course_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- 表的索引 `course_teachers`
--
ALTER TABLE `course_teachers`
  ADD PRIMARY KEY (`course_id`,`teacher_name`);

--
-- 表的索引 `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- 表的索引 `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentId` (`studentId`),
  ADD KEY `courseId` (`courseId`);

--
-- 表的索引 `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`),
  ADD KEY `studentId` (`studentId`);

--
-- 表的索引 `student_evaluations`
--
ALTER TABLE `student_evaluations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_evaluation` (`course_id`,`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 使用表AUTO_INCREMENT `student_evaluations`
--
ALTER TABLE `student_evaluations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 限制导出的表
--

--
-- 限制表 `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`),
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`),
  ADD CONSTRAINT `courses_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);

--
-- 限制表 `course_categories`
--
ALTER TABLE `course_categories`
  ADD CONSTRAINT `course_categories_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- 限制表 `course_teachers`
--
ALTER TABLE `course_teachers`
  ADD CONSTRAINT `course_teachers_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- 限制表 `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `registrations_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`);

--
-- 限制表 `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`);

--
-- 限制表 `student_evaluations`
--
ALTER TABLE `student_evaluations`
  ADD CONSTRAINT `student_evaluations_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `student_evaluations_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
