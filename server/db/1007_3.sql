-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jul 10, 2017 at 09:01 PM
-- Server version: 5.5.49-log
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `differenziaquila`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE IF NOT EXISTS `calendar` (
  `id` int(10) unsigned NOT NULL,
  `id_waste_category` int(11) unsigned DEFAULT NULL,
  `day` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `calendar`
--

INSERT INTO `calendar` (`id`, `id_waste_category`, `day`) VALUES
(4, 4, '2017-06-01'),
(5, NULL, '2017-06-02'),
(6, 6, '2017-06-03'),
(7, NULL, '2017-06-04'),
(8, 5, '2017-06-05'),
(9, 6, '2017-06-06'),
(10, 1, '2017-06-07'),
(11, 2, '2017-06-08'),
(12, 4, '2017-06-09'),
(14, 6, '2017-06-10'),
(15, NULL, '2017-07-11'),
(16, NULL, '2017-06-12'),
(17, 6, '2017-06-13'),
(18, 1, '2017-06-14'),
(19, 2, '2017-06-15'),
(20, 4, '2017-06-16'),
(21, 6, '2017-06-17'),
(22, NULL, '2017-06-18'),
(23, 5, '2017-06-19'),
(24, 6, '2017-06-20'),
(25, 1, '2017-06-21'),
(26, 2, '2017-06-22'),
(27, 4, '2017-06-23'),
(28, 6, '2017-06-24'),
(29, NULL, '2017-07-25'),
(30, NULL, '2017-06-26'),
(31, 6, '2017-06-27'),
(32, 1, '2017-06-28'),
(33, 2, '2017-06-29'),
(34, 4, '2017-06-30'),
(35, 6, '2017-07-01'),
(36, NULL, '2017-07-02'),
(37, 5, '2017-07-03'),
(38, 6, '2017-07-04'),
(39, 1, '2017-07-05'),
(40, 2, '2017-07-06'),
(41, 4, '2017-07-07'),
(42, 6, '2017-07-08'),
(43, NULL, '2017-07-09'),
(44, NULL, '2017-07-10'),
(45, 6, '2017-07-11'),
(46, 1, '2017-07-12'),
(47, 2, '2017-07-13'),
(48, 4, '2017-07-14'),
(49, 6, '2017-07-15'),
(50, NULL, '2017-07-16'),
(51, 5, '2017-07-17'),
(52, 6, '2017-07-18'),
(53, 1, '2017-07-19'),
(54, 2, '2017-07-20'),
(55, 4, '2017-07-21'),
(56, 6, '2017-07-22'),
(57, NULL, '2017-07-23'),
(58, NULL, '2017-07-24'),
(59, 6, '2017-07-25'),
(60, 1, '2017-07-26'),
(61, 2, '2017-07-27'),
(62, 4, '2017-07-28'),
(63, 6, '2017-07-29'),
(64, NULL, '2017-07-30'),
(65, 5, '2017-07-31'),
(66, 6, '2017-08-01'),
(67, 1, '2017-08-02'),
(68, 2, '2017-08-03'),
(69, 4, '2017-08-04'),
(70, 6, '2017-08-05'),
(71, NULL, '2017-08-06'),
(72, NULL, '2017-08-07'),
(73, 6, '2017-08-08'),
(74, 1, '2017-08-09'),
(75, 2, '2017-08-10'),
(76, 4, '2017-08-11'),
(77, 6, '2017-08-12'),
(78, NULL, '2017-08-13'),
(79, 5, '2017-08-14'),
(80, NULL, '2017-08-15'),
(81, 6, '2017-08-16'),
(82, 2, '2017-08-17'),
(83, 4, '2017-08-18'),
(84, 6, '2017-08-19'),
(85, NULL, '2017-08-20'),
(86, NULL, '2017-08-21'),
(87, 6, '2017-08-22'),
(88, 1, '2017-08-23'),
(89, 2, '2017-08-24'),
(90, 4, '2017-08-25'),
(91, 6, '2017-08-26'),
(92, NULL, '2017-08-27'),
(93, 5, '2017-08-28'),
(94, 6, '2017-08-29'),
(95, 1, '2017-08-30'),
(96, 2, '2017-08-31'),
(97, 4, '2017-09-01'),
(98, 6, '2017-09-02'),
(99, NULL, '2017-09-03'),
(100, NULL, '2017-09-04'),
(101, 6, '2017-09-05'),
(102, 1, '2017-09-06'),
(103, 2, '2017-09-07'),
(104, 4, '2017-09-08'),
(105, 6, '2017-09-09'),
(106, NULL, '2017-09-10'),
(107, 5, '2017-09-11'),
(108, 6, '2017-09-12'),
(109, 1, '2017-09-13'),
(110, 2, '2017-09-14'),
(111, 4, '2017-09-15'),
(112, 6, '2017-09-16'),
(113, NULL, '2017-09-17'),
(114, NULL, '2017-09-18'),
(115, 6, '2017-09-19'),
(116, 1, '2017-09-20'),
(117, 2, '2017-09-21'),
(118, 4, '2017-09-22'),
(119, 6, '2017-09-23'),
(120, NULL, '2017-09-24'),
(121, 5, '2017-09-25'),
(122, 6, '2017-09-26'),
(123, 1, '2017-09-27'),
(124, 2, '2017-09-28'),
(125, 4, '2017-09-29'),
(126, 6, '2017-09-30'),
(127, NULL, '2017-10-01'),
(128, NULL, '2017-10-02'),
(129, 6, '2017-10-03'),
(130, 1, '2017-10-04'),
(131, 2, '2017-10-05'),
(132, 4, '2017-10-06'),
(133, 6, '2017-10-07'),
(134, NULL, '2017-10-08'),
(135, 5, '2017-10-09'),
(136, 6, '2017-10-10'),
(137, 1, '2017-10-11'),
(138, 2, '2017-10-12'),
(139, 4, '2017-10-13'),
(140, 6, '2017-10-14'),
(141, NULL, '2017-10-15'),
(142, NULL, '2017-10-16'),
(143, 6, '2017-10-17'),
(144, 1, '2017-10-18'),
(145, 2, '2017-10-19'),
(146, 4, '2017-10-20'),
(147, 6, '2017-10-21'),
(148, NULL, '2017-10-22'),
(149, 5, '2017-10-23'),
(150, 6, '2017-10-24'),
(151, 1, '2017-10-25'),
(152, 2, '2017-10-26'),
(153, 4, '2017-10-27'),
(154, 6, '2017-10-28'),
(155, NULL, '2017-10-29'),
(156, 1, '2017-10-30'),
(157, 6, '2017-10-31'),
(158, NULL, '2017-11-01'),
(159, 2, '2017-11-02'),
(160, 4, '2017-11-03'),
(161, 6, '2017-11-04'),
(162, NULL, '2017-11-05'),
(163, 5, '2017-11-06'),
(164, 6, '2017-11-07'),
(165, 1, '2017-11-08'),
(166, 2, '2017-11-09'),
(167, 4, '2017-11-10'),
(168, 6, '2017-11-11'),
(169, NULL, '2017-11-12'),
(170, NULL, '2017-11-13'),
(171, 6, '2017-11-14'),
(172, 1, '2017-11-15'),
(173, 2, '2017-11-16'),
(174, 4, '2017-11-17'),
(175, 6, '2017-11-18'),
(176, NULL, '2017-11-19'),
(177, 5, '2017-11-20'),
(178, 6, '2017-11-21'),
(179, 1, '2017-11-22'),
(180, 2, '2017-11-23'),
(181, 4, '2017-11-24'),
(182, 6, '2017-11-25'),
(183, NULL, '2017-11-26'),
(184, NULL, '2017-11-27'),
(185, 6, '2017-11-28'),
(186, 1, '2017-11-29'),
(187, 2, '2017-11-30'),
(188, 4, '2017-12-01'),
(189, 6, '2017-12-02'),
(190, NULL, '2017-12-03'),
(191, 5, '2017-12-04'),
(192, 6, '2017-12-05'),
(193, 1, '2017-12-06'),
(194, 4, '2017-12-07'),
(195, NULL, '2017-12-08'),
(196, 6, '2017-12-09'),
(197, NULL, '2017-12-10'),
(198, NULL, '2017-12-11'),
(199, 6, '2017-12-12'),
(200, 1, '2017-12-13'),
(201, 2, '2017-12-14'),
(202, 4, '2017-12-15'),
(203, 6, '2017-12-16'),
(204, NULL, '2017-12-17'),
(205, 5, '2017-12-18'),
(206, 6, '2017-12-19'),
(207, 1, '2017-12-20'),
(208, 2, '2017-12-21'),
(209, 4, '2017-12-22'),
(210, 6, '2017-12-23'),
(211, NULL, '2017-12-24'),
(212, NULL, '2017-12-25'),
(213, 6, '2017-12-26'),
(214, 1, '2017-12-27'),
(215, 2, '2017-12-28'),
(217, 4, '2017-12-29'),
(218, 6, '2017-12-30'),
(219, NULL, '2017-12-31'),
(220, NULL, '2018-01-01'),
(221, 6, '2018-01-02'),
(222, 1, '2018-01-03'),
(223, 2, '2018-01-04'),
(224, 4, '2018-01-05'),
(225, 6, '2018-01-06'),
(226, NULL, '2018-01-07'),
(227, 5, '2018-01-08'),
(228, 6, '2018-01-09'),
(229, 1, '2018-01-10'),
(230, 2, '2018-01-11'),
(231, 4, '2018-01-12'),
(232, 6, '2018-01-13'),
(233, NULL, '2018-01-14'),
(234, NULL, '2018-01-15'),
(235, 6, '2018-01-16'),
(236, 1, '2018-01-17'),
(237, 2, '2018-01-18'),
(238, 4, '2018-01-19'),
(239, 6, '2018-01-20'),
(240, NULL, '2018-01-21'),
(241, 5, '2018-01-22'),
(242, 6, '2018-01-23'),
(243, 1, '2018-01-24'),
(244, 2, '2018-01-25'),
(245, 4, '2018-01-26'),
(246, 6, '2018-01-27'),
(247, NULL, '2018-01-28'),
(248, NULL, '2018-01-29'),
(249, 6, '2018-01-30'),
(250, 1, '2018-01-31');

-- --------------------------------------------------------

--
-- Table structure for table `collection_points`
--

CREATE TABLE IF NOT EXISTS `collection_points` (
  `id` int(10) unsigned NOT NULL,
  `id_special_waste` int(10) unsigned NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `description` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(10) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `recycling_sacks`
--

CREATE TABLE IF NOT EXISTS `recycling_sacks` (
  `id` int(10) unsigned NOT NULL,
  `id_waste_category` int(10) unsigned NOT NULL,
  `icon` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recycling_sacks`
--

INSERT INTO `recycling_sacks` (`id`, `id_waste_category`, `icon`, `name`, `color`) VALUES
(1, 1, '', 'paper', ''),
(2, 2, '', 'plastic', '');

-- --------------------------------------------------------

--
-- Table structure for table `recycling_sack_requests`
--

CREATE TABLE IF NOT EXISTS `recycling_sack_requests` (
  `id` int(10) unsigned NOT NULL,
  `id_recycling_sack` int(10) unsigned NOT NULL,
  `id_user` int(10) unsigned NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recycling_sack_requests`
--

INSERT INTO `recycling_sack_requests` (`id`, `id_recycling_sack`, `id_user`, `amount`, `date`) VALUES
(1, 1, 1, 3, '2017-07-10'),
(2, 1, 1, 3, '2017-07-10'),
(3, 1, 1, 3, '2017-07-10');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(10) unsigned NOT NULL,
  `token` varchar(255) NOT NULL,
  `id_user` int(10) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `token`, `id_user`) VALUES
(1, '2157498557024780947', 1),
(3, '7291034528938415831', 1),
(5, '4448768682741444161', 1);

-- --------------------------------------------------------

--
-- Table structure for table `special_wastes`
--

CREATE TABLE IF NOT EXISTS `special_wastes` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `special_wastes`
--

INSERT INTO `special_wastes` (`id`, `name`, `description`) VALUES
(1, 'Agricultural waste', 'Agricultural waste description'),
(2, 'Biomedical waste', 'Biomedical waste description'),
(3, 'Electronic waste', 'Electronic waste description\r\n'),
(4, 'Radioactive waste', 'Radioactive waste description');

-- --------------------------------------------------------

--
-- Table structure for table `special_waste_requests`
--

CREATE TABLE IF NOT EXISTS `special_waste_requests` (
  `id` int(10) unsigned NOT NULL,
  `id_special_waste` int(10) unsigned NOT NULL,
  `id_user` int(10) unsigned NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `date` date NOT NULL,
  `hour` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `special_waste_requests`
--

INSERT INTO `special_waste_requests` (`id`, `id_special_waste`, `id_user`, `amount`, `date`, `hour`) VALUES
(1, 1, 1, 3, '2017-07-10', '9-11'),
(2, 1, 1, 3, '2017-07-10', '9-11'),
(3, 1, 1, 3, '2017-07-10', '9-11'),
(4, 1, 1, 3, '2017-07-10', '9-11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL,
  `client_code` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL COMMENT 'Via e numero civico'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `client_code`, `first_name`, `last_name`, `address`) VALUES
(1, '12345', 'Mario', 'Rossi', 'Via Roma, 1'),
(4, '1122334455', 'Bruno', 'Bianchi', 'Via Boh, 5');

-- --------------------------------------------------------

--
-- Table structure for table `waste_categories`
--

CREATE TABLE IF NOT EXISTS `waste_categories` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `waste_categories`
--

INSERT INTO `waste_categories` (`id`, `name`, `description`, `icon`) VALUES
(1, 'paper', 'paper description', ''),
(2, 'plastic', 'plastic description', ''),
(4, 'undifferentiated', 'undifferentiated desription', ''),
(5, 'glass', 'glass description', ''),
(6, 'organic', 'organic description', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_waste_category` (`id_waste_category`);

--
-- Indexes for table `collection_points`
--
ALTER TABLE `collection_points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_special_waste` (`id_special_waste`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recycling_sacks`
--
ALTER TABLE `recycling_sacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_waste_category` (`id_waste_category`);

--
-- Indexes for table `recycling_sack_requests`
--
ALTER TABLE `recycling_sack_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_recycling_sack` (`id_recycling_sack`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sessions_users_idx` (`id_user`);

--
-- Indexes for table `special_wastes`
--
ALTER TABLE `special_wastes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `special_waste_requests`
--
ALTER TABLE `special_waste_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_special_waste` (`id_special_waste`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `client_code` (`client_code`);

--
-- Indexes for table `waste_categories`
--
ALTER TABLE `waste_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=251;
--
-- AUTO_INCREMENT for table `collection_points`
--
ALTER TABLE `collection_points`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `recycling_sacks`
--
ALTER TABLE `recycling_sacks`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `recycling_sack_requests`
--
ALTER TABLE `recycling_sack_requests`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `special_wastes`
--
ALTER TABLE `special_wastes`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `special_waste_requests`
--
ALTER TABLE `special_waste_requests`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `waste_categories`
--
ALTER TABLE `waste_categories`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `calendar`
--
ALTER TABLE `calendar`
  ADD CONSTRAINT `calendar_ibfk_1` FOREIGN KEY (`id_waste_category`) REFERENCES `waste_categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `collection_points`
--
ALTER TABLE `collection_points`
  ADD CONSTRAINT `collection_points_ibfk_1` FOREIGN KEY (`id_special_waste`) REFERENCES `special_wastes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `recycling_sacks`
--
ALTER TABLE `recycling_sacks`
  ADD CONSTRAINT `recycling_sacks_ibfk_1` FOREIGN KEY (`id_waste_category`) REFERENCES `waste_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recycling_sack_requests`
--
ALTER TABLE `recycling_sack_requests`
  ADD CONSTRAINT `recycling_sack_requests_ibfk_1` FOREIGN KEY (`id_recycling_sack`) REFERENCES `recycling_sacks` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `recycling_sack_requests_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `fk_sessions_constraint` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `special_waste_requests`
--
ALTER TABLE `special_waste_requests`
  ADD CONSTRAINT `special_waste_requests_ibfk_1` FOREIGN KEY (`id_special_waste`) REFERENCES `special_wastes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `special_waste_requests_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
