-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 03, 2020 alle 12:38
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `4b_project`
--
CREATE DATABASE IF NOT EXISTS `4b_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `4b_project`;

-- --------------------------------------------------------

--
-- Struttura della tabella `ordini`
--

CREATE TABLE `ordini` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(64) NOT NULL,
  `pagamento` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `ordini`
--

INSERT INTO `ordini` (`id`, `email`, `address`, `pagamento`) VALUES
(1, 'nik.mina10@gmail.com', 'via giotto 29', 'Credit Card'),
(2, 'nik.mina10@gmail.com', 'vvhhbj', 'PayPal'),
(3, 'prova@gmail.com', 'kkk', 'Net Banking');

-- --------------------------------------------------------

--
-- Struttura della tabella `shopping`
--

CREATE TABLE `shopping` (
  `id` int(11) NOT NULL,
  `gender` varchar(16) NOT NULL,
  `marca` varchar(32) NOT NULL,
  `colore` varchar(16) NOT NULL,
  `prezzo` double NOT NULL,
  `img` varchar(255) NOT NULL,
  `tipo` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `shopping`
--

INSERT INTO `shopping` (`id`, `gender`, `marca`, `colore`, `prezzo`, `img`, `tipo`) VALUES
(1, 'male', 'Gucci', 'nero', 150, 'img/gucciTshirt.jpg', 'vestito'),
(2, 'male', 'Nike', 'nero', 35, 'img/pantsNike.jpg', 'vestito'),
(3, 'male', 'Nike', 'bianco', 100, 'img/airforce1.jpg', 'scarpa'),
(4, 'female', 'Beauty Journey', 'bianco', 25, 'img/BeautyjourneyTop.jpg', 'vestito'),
(5, 'male', 'Burberry', 'nero', 220, 'img/cinturaBurberry.jpg', 'cintura'),
(6, 'female', 'Gucci', 'nero', 175, 'img/cinturaGucci.jpg', 'cintura'),
(7, 'female', 'Moschino', 'nero', 155, 'img/felpaMoschinoF.jpg', 'vestito'),
(8, 'male', 'Stone Island', 'giallo', 120, 'img/felpaSI.jpg', 'vestito'),
(9, 'male', 'Calvin Klein', 'jeans', 95, 'img/pantsCK.jpg', 'vestito'),
(10, 'female', 'Levis', 'grigio', 20, 'img/tshirtLevis.jpg', 'vestito'),
(11, 'male', 'Adidas', 'nero', 55, 'img/felpa-adidas.jpg', 'vestito'),
(12, 'female', 'Converse', 'nero', 65, 'img/converseScarpe.jpg', 'scarpa'),
(13, 'male', 'Polo Ralph Lauren', 'grigio', 80, 'img/tshirtPoloRalphLauren.jpg', 'vestito'),
(14, 'male', 'Colmar', 'blu', 110, 'img/giubbottoColmar.jpg', 'vestito'),
(15, 'female', 'Rinascimento', 'nero/grigio', 45, 'img/vestitoRinasc.jpg', 'vestito'),
(16, 'female', 'Philipp Plein ', 'nero/grigio', 260, 'img/pantsPhilipp.jpg', 'vestito'),
(17, 'female', 'Fendi', 'verde/marrone', 250, 'img/borsaFendi.jpg', 'borsa'),
(18, 'female', 'Coco Chanel', 'bianco', 175, 'img/tshirtCC.jpg', 'vestito'),
(19, 'female', 'Adidas', 'nero', 20, 'img/leggingsAdidas.jpg', 'vestito'),
(20, 'male', 'Moncler', 'nero', 180, 'img/giubbottoMoncler.jpg', 'vestito'),
(21, 'male', 'Off White', 'nero/oro', 150, 'img/cintaOffWhite.jpg', 'cintura'),
(22, 'female', 'Coco Chanel', 'nero', 165, 'img/borsaCC.png', 'borsa'),
(23, 'male', 'Balenciaga', 'verde', 500, 'img/scarpeTripleS.jpg', 'scarpa'),
(24, 'female', 'Alexander Mc Queen', 'bianco/rosa', 395, 'img/scarpaMcQueen.jpg', 'scarpa');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `ordini`
--
ALTER TABLE `ordini`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `shopping`
--
ALTER TABLE `shopping`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `ordini`
--
ALTER TABLE `ordini`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `shopping`
--
ALTER TABLE `shopping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
