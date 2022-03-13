-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-03-2022 a las 23:27:45
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `segundo_proyecto_backend`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `idMovie` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `portada` varchar(200) DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `sinopsis` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies`
--

INSERT INTO `movies` (`idMovie`, `nombre`, `portada`, `precio`, `stock`, `sinopsis`) VALUES
(4, 'EL PECADO', 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/7Dd75aNfNCpbUlF63tS565G3J59.jpg', 300, 2, 'El hermano mayor de Adam murió en un accidente de coche hace un año, por lo que su familia no ha vuelto a ser la misma desde entonces. Mientras sus padres luchan para hacer frente a su dolor, Adam (un niño de 10 años), no puede evitar sentirse culpable por la muerte de su hermano y siente que está solo en el mundo.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `renta`
--

CREATE TABLE `renta` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_pelicula` int(11) DEFAULT NULL,
  `fecha_renta` date DEFAULT NULL,
  `fecha_dev` date DEFAULT NULL,
  `fecha_real_dev` date NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `comisión` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `birthday` date NOT NULL,
  `profilePicture` text NOT NULL,
  `password` text NOT NULL,
  `typeUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `name`, `email`, `birthday`, `profilePicture`, `password`, `typeUser`) VALUES
(9, 'Sergio A. Gamarra', 'sergioagamarra@gmail.com', '2022-03-10', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', '1234', 1),
(10, 'Sergio Antonio', 'sergioagamarra1@gmail.com', '2022-03-10', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', '1234', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`idMovie`);

--
-- Indices de la tabla `renta`
--
ALTER TABLE `renta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_pelicula` (`id_pelicula`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `movies`
--
ALTER TABLE `movies`
  MODIFY `idMovie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `renta`
--
ALTER TABLE `renta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `renta`
--
ALTER TABLE `renta`
  ADD CONSTRAINT `renta_ibfk_1` FOREIGN KEY (`id_pelicula`) REFERENCES `movies` (`idMovie`) ON UPDATE CASCADE,
  ADD CONSTRAINT `renta_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`idUser`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
