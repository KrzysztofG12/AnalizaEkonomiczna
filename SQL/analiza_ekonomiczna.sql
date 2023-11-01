-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 02 Sty 2023, 23:08
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `baza_analiza`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wykresy`
--

CREATE TABLE `wykresy` (
  `id_wykresy` int(11) NOT NULL,
  `nazwa` text COLLATE utf8_polish_ci NOT NULL,
  `opis` text COLLATE utf8_polish_ci NOT NULL,
  `waznosc` int(11) NOT NULL,
  `data` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `wykresy`
--

INSERT INTO `wykresy` (`id_wykresy`, `nazwa`, `opis`, `waznosc`, `data`) VALUES
(1, 'Apple 2017-2022.png', 'Wykres firmy Apple z okresu 2017-2022. Kolumny High, Low, Adj Close.', 90, '2022-11-21 01:53:17'),
(2, 'Apple Close EMA Pred.png', 'Wykres Apple z okresu 2017-2022. Dokładniejsza predykcja kolumny Adj Close, metodą EMA. Rozmiar okna 7. 100% danych.', 60, '2022-11-21 01:57:55'),
(3, 'Apple Close SMA Pred.png', 'Wykres Apple z okresu 2017-2022. Dokładniejsza predykcja kolumny Adj Close, metodą SMA. Rozmiar okna 7. 100% danych.', 20, '2022-11-21 01:58:51');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `wykresy`
--
ALTER TABLE `wykresy`
  ADD PRIMARY KEY (`id_wykresy`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `wykresy`
--
ALTER TABLE `wykresy`
  MODIFY `id_wykresy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
