-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 23 juin 2024 à 10:19
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `we4b_database`
--

-- --------------------------------------------------------

--
-- Structure de la table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `branches`
--

INSERT INTO `branches` (`id`, `name`) VALUES
(1, 'Branch A'),
(2, 'Branch B'),
(3, 'Sciences'),
(4, 'Technologies'),
(5, 'Humanities');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Mathematics'),
(2, 'Computer Science'),
(3, 'Science');

-- --------------------------------------------------------

--
-- Structure de la table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `courseName` varchar(100) DEFAULT NULL,
  `courseManager` varchar(100) DEFAULT NULL,
  `courseCode` varchar(50) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `major_id` int(11) DEFAULT NULL,
  `credits` int(11) DEFAULT NULL,
  `seatLimit` int(11) DEFAULT NULL,
  `studentsRegistered` int(11) DEFAULT NULL,
  `bibliography` varchar(255) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `program` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `courses`
--

INSERT INTO `courses` (`id`, `courseName`, `courseManager`, `courseCode`, `branch_id`, `major_id`, `credits`, `seatLimit`, `studentsRegistered`, `bibliography`, `location_id`, `program`) VALUES
(1, 'Course Name', 'Manager Name', 'COURSE101', 1, 1, 3, 30, 0, 'Bibliography details', 1, 'Course program details'),
(2, 'Optique', 'teacher1', 'OTP201', 1, 1, 2, 35, 0, 'Book 1 by Elie Vitrai', 3, 'Un cours à propos des optiques et super fun'),
(3, 'Littérature', 'teacher1', 'LT01', 2, 2, 2, 50, 0, 'Book 5', 4, ''),
(4, 'Relations internationales', 'teacher1', 'CC01', 5, 1, 5, 30, 0, 'BOOK 3', 4, 'Explorer les relations internationales'),
(5, 'Mathématiques Avancées', 'Professeur Dupont', 'MATH401', 1, 1, 4, 30, 0, 'Livre de Mathématiques Avancées par Auteur A', 1, 'Programme détaillé de Mathématiques Avancées'),
(6, 'Introduction à la Programmation', 'Professeur Martin', 'INFO101', 2, 2, 3, 50, 0, 'Introduction à la Programmation par Auteur B', 2, 'Programme détaillé d\'Introduction à la Programmation'),
(7, 'Littérature Française', 'Professeur Durand', 'LITT301', 3, 3, 2, 40, 0, 'Anthologie de la Littérature Française par Auteur C', 3, 'Programme détaillé de Littérature Française'),
(8, 'Chimie Organique', 'Professeur Bernard', 'CHIM201', 4, 1, 3, 35, 0, 'Chimie Organique par Auteur D', 4, 'Programme détaillé de Chimie Organique'),
(9, 'Physique Quantique', 'Professeur Leclerc', 'PHYS301', 1, 1, 4, 30, 0, 'Physique Quantique par Auteur E', 1, 'Programme détaillé de Physique Quantique'),
(10, 'Histoire Moderne', 'Professeur Rousseau', 'HIST201', 5, 3, 3, 40, 0, 'Histoire Moderne par Auteur F', 5, 'Programme détaillé d\'Histoire Moderne'),
(11, 'Philosophie des Sciences', 'Professeur Sartre', 'PHILO101', 3, 3, 2, 25, 0, 'Philosophie des Sciences par Auteur G', 3, 'Programme détaillé de Philosophie des Sciences'),
(12, 'Biologie Moléculaire', 'Professeur Pasteur', 'BIO301', 4, 1, 4, 35, 0, 'Biologie Moléculaire par Auteur H', 4, 'Programme détaillé de Biologie Moléculaire'),
(13, 'Économie Internationale', 'Professeur Keynes', 'ECO401', 5, 2, 3, 50, 0, 'Économie Internationale par Auteur I', 5, 'Programme détaillé d\'Économie Internationale'),
(14, 'Intelligence Artificielle', 'Professeur Turing', 'AI501', 2, 2, 5, 45, 0, 'Intelligence Artificielle par Auteur J', 2, 'Programme détaillé d\'Intelligence Artificielle');

-- --------------------------------------------------------

--
-- Structure de la table `course_categories`
--

CREATE TABLE `course_categories` (
  `course_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `course_categories`
--

INSERT INTO `course_categories` (`course_id`, `category_id`) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 3),
(4, 1),
(5, 1),
(6, 3),
(7, 3),
(8, 1),
(9, 2),
(10, 2);

-- --------------------------------------------------------

--
-- Structure de la table `course_schedule`
--

CREATE TABLE `course_schedule` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `time` varchar(10) NOT NULL,
  `day` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `course_schedule`
--

INSERT INTO `course_schedule` (`id`, `courseId`, `time`, `day`) VALUES
(1, 1, '08:00', 'Lundi'),
(2, 2, '10:00', 'Mardi'),
(3, 3, '14:00', 'Vendredi'),
(4, 1, '09:00', 'Lundi'),
(5, 2, '11:00', 'Mardi'),
(6, 3, '14:00', 'Mercredi'),
(7, 4, '16:00', 'Jeudi'),
(8, 5, '08:00', 'Vendredi'),
(9, 6, '10:00', 'Lundi'),
(10, 7, '12:00', 'Mardi'),
(11, 8, '13:00', 'Mercredi'),
(12, 9, '15:00', 'Jeudi'),
(13, 10, '17:00', 'Vendredi');

-- --------------------------------------------------------

--
-- Structure de la table `course_teachers`
--

CREATE TABLE `course_teachers` (
  `course_id` int(11) NOT NULL,
  `teacher_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `course_teachers`
--

INSERT INTO `course_teachers` (`course_id`, `teacher_name`) VALUES
(1, 'Professeur Dupont'),
(2, 'Professeur Martin'),
(3, 'Professeur Durand'),
(4, 'Professeur Bernard'),
(5, 'Professeur Leclerc'),
(6, 'Professeur Rousseau'),
(7, 'Professeur Sartre'),
(8, 'Professeur Pasteur'),
(9, 'Professeur Keynes'),
(10, 'Professeur Turing');

-- --------------------------------------------------------

--
-- Structure de la table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `locations`
--

INSERT INTO `locations` (`id`, `name`) VALUES
(1, 'Location 1'),
(2, 'Location 2'),
(3, 'Room 101'),
(4, 'Room 202'),
(5, 'Room 303');

-- --------------------------------------------------------

--
-- Structure de la table `majors`
--

CREATE TABLE `majors` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `majors`
--

INSERT INTO `majors` (`id`, `name`) VALUES
(1, 'Major 1'),
(2, 'Major 2'),
(3, 'Major 3');

-- --------------------------------------------------------

--
-- Structure de la table `registrations`
--

CREATE TABLE `registrations` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `courseCode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `registrations`
--

INSERT INTO `registrations` (`id`, `studentId`, `courseId`, `courseCode`) VALUES
(10, 2, 1, 'COURSE101'),
(19, 1, 2, 'OTP201'),
(20, 1, 3, 'LT01'),
(36, 1, 2, 'INFO101'),
(37, 2, 3, 'LITT301'),
(38, 2, 4, 'CHIM201'),
(39, 1, 10, 'HIST201');

-- --------------------------------------------------------

--
-- Structure de la table `reviews`
--
-- Erreur de lecture de structure pour la table we4b_database.reviews : #1932 - Table &#039;we4b_database.reviews&#039; doesn&#039;t exist in engine
-- Erreur de lecture des données pour la table we4b_database.reviews : #1064 - Erreur de syntaxe près de &#039;FROM `we4b_database`.`reviews`&#039; à la ligne 1

-- --------------------------------------------------------

--
-- Structure de la table `student_evaluations`
--

CREATE TABLE `student_evaluations` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `grade` char(1) NOT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `student_evaluations`
--

INSERT INTO `student_evaluations` (`id`, `course_id`, `student_id`, `grade`, `comment`) VALUES
(47, 1, 1, 'A', 'Très bon étudiant, participe activement.'),
(48, 2, 1, 'B', 'Bon travail mais pourrait s\'améliorer en pratique. Merci pour votre participation'),
(49, 3, 2, 'A', 'Excellente compréhension des concepts.'),
(50, 4, 2, 'C', 'Des difficultés dans les exercices pratiques.'),
(51, 5, 1, 'B', 'Bonne participation, mais des erreurs dans les devoirs.'),
(52, 6, 1, 'A', 'Très bonne maîtrise des sujets abordés.'),
(53, 7, 2, 'B', 'Bon travail général, quelques erreurs mineures.');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `school` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `awards` text DEFAULT NULL,
  `office_hours` varchar(100) DEFAULT NULL,
  `research_achievements` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `name`, `avatar_url`, `gender`, `email`, `phone`, `bio`, `school`, `department`, `awards`, `office_hours`, `research_achievements`) VALUES
(0, 'etudiant2', 'motdepasse2', 'student', 'Étudiant Deux', 'assets/default.jpg', 'femme', 'etudiant2@example.com', '0102030406', 'Bonjour, je suis Étudiant Deux', 'Université A', 'Informatique', 'Prix d\'excellence', NULL, NULL),
(1, 'student1', 'password1', 'student', 'Student One', 'assets/default.jpg', 'male', 'test@gmail.com', '12345678', 'Hello', 'UTBM', 'INFO', 'awards', NULL, NULL),
(2, 'teacher1', 'password1', 'teacher', 'Teacher One', 'assets/default.jpg', 'female', 'teacher@utbm.fr', '123123123', 'Bonjour', 'UTBM', 'INFO', NULL, '8:00-18:00', 'technology');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD KEY `id` (`id`);

--
-- Index pour la table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `major_id` (`major_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Index pour la table `course_categories`
--
ALTER TABLE `course_categories`
  ADD PRIMARY KEY (`course_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Index pour la table `course_schedule`
--
ALTER TABLE `course_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`);

--
-- Index pour la table `course_teachers`
--
ALTER TABLE `course_teachers`
  ADD PRIMARY KEY (`course_id`,`teacher_name`);

--
-- Index pour la table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Index pour la table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentId` (`studentId`),
  ADD KEY `courseId` (`courseId`);

--
-- Index pour la table `student_evaluations`
--
ALTER TABLE `student_evaluations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_evaluation` (`course_id`,`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `course_schedule`
--
ALTER TABLE `course_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT pour la table `student_evaluations`
--
ALTER TABLE `student_evaluations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`),
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`),
  ADD CONSTRAINT `courses_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);

--
-- Contraintes pour la table `course_categories`
--
ALTER TABLE `course_categories`
  ADD CONSTRAINT `course_categories_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `course_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Contraintes pour la table `course_schedule`
--
ALTER TABLE `course_schedule`
  ADD CONSTRAINT `course_schedule_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`);

--
-- Contraintes pour la table `course_teachers`
--
ALTER TABLE `course_teachers`
  ADD CONSTRAINT `course_teachers_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Contraintes pour la table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `registrations_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `student_evaluations`
--
ALTER TABLE `student_evaluations`
  ADD CONSTRAINT `student_evaluations_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `student_evaluations_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
