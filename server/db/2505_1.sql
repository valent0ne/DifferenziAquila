-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 25, 2017 at 05:08 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.0.13

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
  `id_waste_category` int(11) unsigned NOT NULL,
  `day` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `collection_points`
--

CREATE TABLE IF NOT EXISTS `collection_points` (
  `id` int(10) unsigned NOT NULL,
  `id_special_waste` int(10) unsigned NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(10) unsigned NOT NULL,
  `token` varchar(255) NOT NULL,
  `id_user` int(10) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `token`, `id_user`) VALUES
(1, '2157498557024780947', 1),
(3, '7291034528938415831', 1);

-- --------------------------------------------------------

--
-- Table structure for table `special_wastes`
--

CREATE TABLE IF NOT EXISTS `special_wastes` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `hour` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `client_code`, `first_name`, `last_name`, `address`) VALUES
(1, '12345', 'Mario', 'Rossi', 'Via Roma, 1');

-- --------------------------------------------------------

--
-- Table structure for table `waste_categories`
--

CREATE TABLE IF NOT EXISTS `waste_categories` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
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
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `recycling_sack_requests`
--
ALTER TABLE `recycling_sack_requests`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `special_wastes`
--
ALTER TABLE `special_wastes`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `special_waste_requests`
--
ALTER TABLE `special_waste_requests`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `waste_categories`
--
ALTER TABLE `waste_categories`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
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
