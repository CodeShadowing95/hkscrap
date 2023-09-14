CREATE DATABASE IF NOT EXISTS stage_db;
USE stage_db;

-- --------------------------------------------------------

--
-- Structure de la table `dataoverview`
--

DROP TABLE IF EXISTS `dataoverview`;
CREATE TABLE IF NOT EXISTS `dataoverview` (
  `DO_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) DEFAULT NULL,
  `LABEL` varchar(255) NOT NULL DEFAULT 'Restaurants à Lyon',
  `WEBSITE` varchar(20) DEFAULT NULL,
  `START_DATE` varchar(50) DEFAULT NULL,
  `EXEC_TIME` varchar(10) DEFAULT NULL,
  `LIGNES` int(11) NOT NULL DEFAULT '0',
  `RESULTS` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`DO_ID`),
  KEY `FK_DATAOVER_REFERENCE_USER` (`USER_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `dataoverview`
--

INSERT INTO `dataoverview` (`DO_ID`, `USER_ID`, `LABEL`, `WEBSITE`, `START_DATE`, `EXEC_TIME`, `LIGNES`, `RESULTS`) VALUES
(1, 1, 'Tâche', 'Google Maps', '24/08/23', '00:10:06', 0, 'hk_scrape_F7IcGoc'),
(2, 1, 'Tâche', 'Google Maps', '24/08/23', '00:09:31', 0, 'hk_scrape_NDbj6Le'),
(3, 1, 'Tâche', 'Google Maps', '24/08/23', '00:09:04', 0, 'hk_scrape_OHOTciv'),
(4, 1, 'Tâche', 'Google Maps', '24/08/23', '00:09:52', 0, 'hk_scrape_FdyNnei'),
(5, 1, 'Tâche', 'Google Maps', '24/08/23', '00:09:32', 122, 'hk_scrape_11gw0zZ'),
(6, 1, 'Tâche', 'Google Maps', '24/08/23', '00:08:52', 122, 'hk_scrape_7W8Apbn'),
(7, 1, 'Tâche', 'Google Maps', '24/08/23', '00:08:42', 122, 'hk_scrape_RkWwGhl'),
(8, 1, 'Tâche', 'Google Maps', '25/08/23', '00:09:00', 122, 'hk_scrape_WfAa3mD'),
(9, 1, 'Tâche', 'Google Maps', '25/08/23', '00:09:06', 122, 'hk_scrape_j9hjs1B'),
(10, 1, 'Tâche', 'Google Maps', '25/08/23', '00:08:53', 122, 'hk_scrape_MfRsgwl'),
(11, 1, 'Tâche', 'Google Maps', '25/08/23', '00:08:44', 122, 'hk_scrape_QMnBFMP'),
(12, 1, 'Tâche', 'Google Maps', '25/08/23', '00:08:48', 122, 'hk_scrape_qpa6tAK'),
(13, 1, 'Tâche', 'Google Maps', '25/08/23', '00:08:44', 122, 'hk_scrape_1PDWBln'),
(14, 1, 'azed', 'Google Maps', '26/08/23', '00:08:48', 122, 'hk_scrape_1E6WxUJ'),
(15, 1, '', 'Google Maps', '27/08/23', '00:09:01', 122, 'hk_scrape_NvukSyY'),
(16, 1, 'Entreprises IT', 'Google Maps', '28/08/23', '00:08:49', 122, 'hk_scrape_4QDhNHt'),
(17, 1, 'Tâche', 'Google Maps', '07/09/23', '00:09:04', 122, 'hk_scrape_TmuxeKi');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOM` varchar(255) NOT NULL,
  `PRENOM` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `TELEPHONE` varchar(20) DEFAULT NULL,
  `MOTDEPASSE` text NOT NULL,
  `AVATAR` varchar(50) DEFAULT NULL,
  `ROLE` varchar(20) DEFAULT 'Utilisateur',
  `PAYS` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`USER_ID`, `NOM`, `PRENOM`, `EMAIL`, `TELEPHONE`, `MOTDEPASSE`, `AVATAR`, `ROLE`, `PAYS`) VALUES
(1, 'Kuaté', 'Hermann', 'hermann.kuate@gmail.com', '04572636', '$2y$10$4a3mqYUDa/SGgI4cTU30M.P8PqcG6.kNstAcaczv5GnF5kQGCliSS', NULL, 'Modérateur', 'France'),
(2, 'Ghomsi Ghomsi', 'Emmanuel', 'ghomsi.emmanuel@gmail.com', '246813579', '81b87be71decdd74ee12a34ad4c278b401bc2a09', NULL, 'Utilisateur', 'Cameroun'),
(11, 'MBOUME NAMEGNI', 'Frank Patrick', 'patrick.namegni@gmail.com', '752149328', '81b87be71decdd74ee12a34ad4c278b401bc2a09', NULL, 'Utilisateur', 'France'),
(15, 'DOE', 'John', 'test@gmail.com', '7894561423', '81b87be71decdd74ee12a34ad4c278b401bc2a09', NULL, 'Utilisateur', 'Cameroun');
COMMIT;
