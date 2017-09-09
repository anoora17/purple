DROP DATABASE IF EXISTS cupcakes_db;

CREATE DATABASE cupcakes_db;

DROP TABLE IF EXISTS `customers`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `orderitems`;
DROP TABLE IF EXISTS `products`;

CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `addr1` varchar(255) DEFAULT NULL,
  `addr2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zipcode` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderdate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CustomerId` (`CustomerId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productid` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(5,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `OrderId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderId` (`OrderId`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `imagepath` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `products` (id, name, price, description, imagepath, createdat, updatedat) VALUES (20,'Vanilla Bean',3.00,'Delicious vanilla icing covered in coffee beans','/images/vanilla_choc_cupcake.PNG','2017-09-02 11:44:11','2017-09-02 11:44:11');
INSERT INTO `products` (id, name, price, description, imagepath, createdat, updatedat) VALUES (21,'Pick Lady',3.25,'Vanilla cake with pink strawberry frosting','/images/pink_vanilla_cupcake.PNG','2017-09-02 11:44:37','2017-09-02 11:44:37');
INSERT INTO `products` (id, name, price, description, imagepath, createdat, updatedat) VALUES (22,'Choco JJ  Fruit',3.00,'Chocolate cake covered in movie theatre candies','/images/blue_choc.PNG','2017-09-02 11:44:11','2017-09-02 11:44:11');
INSERT INTO `products` (id, name, price, description, imagepath, createdat, updatedat) VALUES (23,'Double Chocolate',3.25,'Chocolate lovers dream','/images/choc_ganache.PNG','2017-09-02 11:44:37','2017-09-02 11:44:37');
INSERT INTO `products` (id, name, price, description, imagepath, createdat, updatedat) VALUES (24,'Vanilla JJ Fruit',3.00,'Vanilla cake covered in movie theatre candies','/images/vanilla_sprinkles.PNG','2017-09-02 11:44:11','2017-09-02 11:44:11');
INSERT INTO `products` (id, name, price, description, imagepath, createdat, updatedat) VALUES (25,'Sunshine',3.25,'Chocolate cake with sunshine frosting','/images/yellow_choc_cupcake.PNG','2017-09-02 11:44:37','2017-09-02 11:44:37');


INSERT INTO `customers` VALUES (3,'John','Doe','jon@gmail.com','testtest1','3301 M Street NW','','Washington','DC','20007','2017-09-02 15:40:08','2017-09-02 15:40:08');
INSERT INTO `customers` VALUES (4,'Jane','Johnson','jane@gmail.com','testtest1','3301 M Street NW','','Washington','DC','20007','2017-09-02 15:40:51','2017-09-02 15:40:51');
INSERT INTO `customers` VALUES (5,'Willow','Landry','willow@gmail.com','testtest1','3301 M Street NW','','Washington','DC','20007','2017-09-02 15:41:37','2017-09-02 15:41:37');


