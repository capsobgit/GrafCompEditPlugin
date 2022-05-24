-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: grafana
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appState`
--

DROP TABLE IF EXISTS `appState`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appState` (
  `id` int NOT NULL AUTO_INCREMENT,
  `xPos` int NOT NULL,
  `yPos` int NOT NULL,
  `dateOnSave` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appState`
--

LOCK TABLES `appState` WRITE;
/*!40000 ALTER TABLE `appState` DISABLE KEYS */;
INSERT INTO `appState` VALUES (1,200,400,'2022-04-28');
/*!40000 ALTER TABLE `appState` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jsonAppState`
--

DROP TABLE IF EXISTS `jsonAppState`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jsonAppState` (
  `id` varchar(255) NOT NULL,
  `state` json DEFAULT NULL,
  `dateOnSave` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jsonAppState`
--

LOCK TABLES `jsonAppState` WRITE;
/*!40000 ALTER TABLE `jsonAppState` DISABLE KEYS */;
INSERT INTO `jsonAppState` VALUES ('flow_01','{\"edges\": [{\"id\": \"reactflow__edge-1a-randomnode_1653411302674\", \"source\": \"1\", \"target\": \"randomnode_1653411302674\", \"animated\": true, \"sourceHandle\": \"a\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-1c-randomnode_1653411331413\", \"source\": \"1\", \"target\": \"randomnode_1653411331413\", \"animated\": false, \"sourceHandle\": \"c\", \"targetHandle\": null}], \"nodes\": [{\"z\": 0, \"id\": \"1\", \"data\": {\"label\": \"Node 1\"}, \"type\": \"customNode\", \"style\": {\"width\": 100, \"border\": \"solid\", \"padding\": 10, \"background\": \"yellow\", \"borderRadius\": 75}, \"width\": 100, \"height\": 25, \"dragging\": false, \"position\": {\"x\": 207, \"y\": 54}, \"selected\": false, \"handleBounds\": {\"source\": [{\"x\": 47, \"y\": 20.399993896484375, \"id\": \"a\", \"width\": 6, \"height\": 6, \"position\": \"bottom\"}, {\"x\": 79.39999389648438, \"y\": 20.399993896484375, \"id\": \"b\", \"width\": 6, \"height\": 6, \"position\": \"bottom\"}, {\"x\": 9.399993896484377, \"y\": 20.399993896484375, \"id\": \"c\", \"width\": 6, \"height\": 6, \"position\": \"bottom\"}], \"target\": [{\"x\": 47, \"y\": -1.600006103515625, \"id\": null, \"width\": 6, \"height\": 6, \"position\": \"top\"}]}, \"positionAbsolute\": {\"x\": 207, \"y\": 54}}, {\"z\": 0, \"id\": \"randomnode_1653411302674\", \"data\": {\"label\": \"Added node\"}, \"width\": 150, \"height\": 40, \"dragging\": false, \"position\": {\"x\": 158.5, \"y\": 201.75}, \"selected\": false, \"handleBounds\": {\"source\": [{\"x\": 71.99501342773439, \"y\": 36.79499664306641, \"id\": null, \"width\": 6, \"height\": 6, \"position\": \"bottom\"}], \"target\": [{\"x\": 71.99501342773439, \"y\": -3.1900100708007817, \"id\": null, \"width\": 6, \"height\": 6, \"position\": \"top\"}]}, \"positionAbsolute\": {\"x\": 158.5, \"y\": 201.75}}, {\"z\": 1000, \"id\": \"randomnode_1653411331413\", \"data\": {\"label\": \"Added node\"}, \"width\": 150, \"height\": 40, \"dragging\": false, \"position\": {\"x\": 25.5, \"y\": 115.75}, \"selected\": true, \"handleBounds\": {\"source\": [{\"x\": 71.99501342773439, \"y\": 36.79499664306641, \"id\": null, \"width\": 6, \"height\": 6, \"position\": \"bottom\"}], \"target\": [{\"x\": 71.99501342773439, \"y\": -3.1900100708007817, \"id\": null, \"width\": 6, \"height\": 6, \"position\": \"top\"}]}, \"positionAbsolute\": {\"x\": 25.5, \"y\": 115.75}}], \"viewport\": {\"x\": 30.500000000000057, \"y\": 12.909090909090937, \"zoom\": 0.909090909090909}}','2022-05-24 18:54:57');
/*!40000 ALTER TABLE `jsonAppState` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesurement`
--

DROP TABLE IF EXISTS `mesurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesurement` (
  `time` datetime DEFAULT NULL,
  `value` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesurement`
--

LOCK TABLES `mesurement` WRITE;
/*!40000 ALTER TABLE `mesurement` DISABLE KEYS */;
/*!40000 ALTER TABLE `mesurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preserve_permissions`
--

DROP TABLE IF EXISTS `preserve_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preserve_permissions` (
  `permissions_id` varchar(255) NOT NULL,
  PRIMARY KEY (`permissions_id`),
  CONSTRAINT `preserve_permissions_ibfk_1` FOREIGN KEY (`permissions_id`) REFERENCES `jsonAppState` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preserve_permissions`
--

LOCK TABLES `preserve_permissions` WRITE;
/*!40000 ALTER TABLE `preserve_permissions` DISABLE KEYS */;
INSERT INTO `preserve_permissions` VALUES ('flow_01');
/*!40000 ALTER TABLE `preserve_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-24 19:01:26
