-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2015 at 08:22 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `temptest`
--

-- --------------------------------------------------------

--
-- Table structure for table `nimmtgames`
--

CREATE TABLE IF NOT EXISTS `nimmtgames` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player1` int(11) NOT NULL,
  `player2` int(11) NOT NULL,
  `player3` int(11) NOT NULL,
  `row1` varchar(20) NOT NULL,
  `row2` varchar(20) NOT NULL,
  `row3` varchar(20) NOT NULL,
  `row4` varchar(20) NOT NULL,
  `play1` varchar(40) NOT NULL,
  `play2` varchar(40) NOT NULL,
  `play3` varchar(40) NOT NULL,
  `played1` varchar(40) NOT NULL,
  `played2` varchar(40) NOT NULL,
  `played3` varchar(40) NOT NULL,
  `remain1` varchar(40) NOT NULL,
  `remain2` varchar(40) NOT NULL,
  `remain3` varchar(40) NOT NULL,
  `game` int(11) NOT NULL,
  `turn` int(11) NOT NULL,
  `setup` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
