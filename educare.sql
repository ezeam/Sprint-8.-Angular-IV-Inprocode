-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-09-2024 a las 10:54:43
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `educare`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(6) NOT NULL,
  `dni` varchar(15) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `ciudad` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefono` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `dni`, `nombre`, `apellido`, `ciudad`, `email`, `telefono`) VALUES
(25, '447512396P', 'Ester', 'Zea', 'Budapest', 'prueba52@gmail.com', '478559634'),
(50, '44789532D', 'Pepe', 'Perez', 'Ciudad real', 'pepeperez@gmail.com', '602457893');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(6) NOT NULL,
  `from` date NOT NULL,
  `to` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `from`, `to`) VALUES
(2089, '2024-09-11', '2024-09-21'),
(2106, '2024-09-10', '2024-10-30'),
(2107, '2024-09-16', '2024-09-28'),
(2108, '2024-10-15', '2024-10-25'),
(2109, '2024-10-02', '2024-10-23'),
(2110, '2024-10-02', '2024-10-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `markers`
--

CREATE TABLE `markers` (
  `id` int(6) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `markers`
--

INSERT INTO `markers` (`id`, `nombre`, `lat`, `lng`) VALUES
(1, 'New york', 40.7128, -74.006),
(2, 'Buenos Aires', -34.6037, -58.3816),
(3, 'París', 48.8566, 2.3522),
(4, 'Pekín ', 39.9042, 116.4074),
(5, 'Canberra', -35.2809, 149.13),
(6, 'Brasilia', -15.7801, -47.9292),
(7, 'Ciudad del Cabo', -33.9249, 18.4241);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(6) NOT NULL,
  `mes` varchar(15) NOT NULL,
  `importe` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `mes`, `importe`) VALUES
(1, 'Enero', 1500),
(2, 'Febrero', 20000),
(3, 'Marzo', 30000),
(4, 'Abril', 10000),
(5, 'Mayo', 60000),
(6, 'Junio', 5000),
(7, 'Julio', 100000),
(8, 'Agosto', 25000),
(9, 'Septiembre', 12000),
(10, 'Octubre', 4000),
(11, 'Noviembre', 70000),
(12, 'Diciembre', 26000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2111;

--
-- AUTO_INCREMENT de la tabla `markers`
--
ALTER TABLE `markers`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
