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
-- Table structure for table `nimmtsetup`
--

CREATE TABLE IF NOT EXISTS `nimmtsetup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player1` int(11) NOT NULL,
  `player2` int(11) NOT NULL,
  `player3` int(11) NOT NULL,
  `hand1` varchar(40) NOT NULL,
  `hand2` varchar(40) NOT NULL,
  `hand3` varchar(40) NOT NULL,
  `row1` varchar(3) NOT NULL,
  `row2` varchar(3) NOT NULL,
  `row3` varchar(3) NOT NULL,
  `row4` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `nimmtsetup`
--

INSERT INTO `nimmtsetup` (`id`, `player1`, `player2`, `player3`, `hand1`, `hand2`, `hand3`, `row1`, `row2`, `row3`, `row4`) VALUES
(1, 1, 2, 3, '16 23 24 41 45 59 78 79 81 97', '10 18 20 25 34 46 63 68 98 101', '9 11 44 51 55 60 61 65 71 77', '86', '2', '42', '88'),
(2, 1, 2, 3, '20 35 36 48 55 60 76 92 94 95', '7 19 24 39 58 71 74 79 93 97', '8 13 14 16 29 54 56 68 78 101', '99', '52', '17', '104'),
(3, 1, 2, 3, '33 38 46 68 71 72 73 74 97 100', '12 28 29 52 55 57 76 88 91 102', '3 11 35 36 41 58 60 80 85 95', '16', '20', '23', '26'),
(4, 1, 2, 3, '2 23 31 36 69 76 77 80 95 96', '1 10 12 33 34 39 40 65 89 99', '18 47 49 52 57 59 74 79 92 93', '35', '22', '19', '5'),
(5, 1, 2, 3, '16 24 38 50 51 59 65 85 92 94', '3 5 15 31 34 56 62 72 89 97', '19 30 37 49 53 63 83 87 101 104', '47', '52', '81', '8'),
(6, 1, 2, 3, '7 23 31 69 76 86 96 97 98 100', '9 10 35 38 42 46 47 48 55 88', '17 20 34 57 63 66 75 85 89 101', '51', '99', '39', '95');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
