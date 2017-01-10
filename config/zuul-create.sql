SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `zuuljs`
--
CREATE DATABASE IF NOT EXISTS `zuuljs` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `zuuljs`;

-- --------------------------------------------------------

--
-- Table structure for table `access`
--

DROP TABLE IF EXISTS `access`;
CREATE TABLE IF NOT EXISTS `access` (
  `accessId` int(11) NOT NULL AUTO_INCREMENT,
  `deviceId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `accessDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `requestState` varchar(140) DEFAULT NULL,
  `ipAddress` varchar(45) DEFAULT NULL,
  `accessSuccess` int(11) NOT NULL,
  `responseState` varchar(140) DEFAULT NULL,
  `userAgent` varchar(150) DEFAULT NULL,
  `deviceFunctionId` int(11) DEFAULT NULL,
  `keyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`accessId`),
  UNIQUE KEY `accessid_UNIQUE` (`accessId`),
  KEY `deviceid_idx` (`deviceId`),
  KEY `userid_idx` (`userId`),
  KEY `a_devicefunctionid_idx` (`deviceFunctionId`),
  KEY `access_ibfk_3_idx` (`keyId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
CREATE TABLE IF NOT EXISTS `device` (
  `deviceId` int(11) NOT NULL AUTO_INCREMENT,
  `publicDeviceId` varchar(45) NOT NULL,
  `privateDeviceId` varchar(45) NOT NULL,
  `particleDeviceId` varchar(45) DEFAULT NULL,
  `deviceName` varchar(100) NOT NULL,
  `deviceDescription` varchar(140) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `creatorId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `deviceToken` varchar(20) NOT NULL,
  `particleDeviceName` varchar(45) NOT NULL,
  `lastStatus` int(11) DEFAULT NULL,
  PRIMARY KEY (`deviceId`),
  UNIQUE KEY `deviceid_UNIQUE` (`deviceId`),
  UNIQUE KEY `devicetoken_UNIQUE` (`deviceToken`),
  UNIQUE KEY `publicDeviceId_UNIQUE` (`publicDeviceId`),
  UNIQUE KEY `privateDeviceId_UNIQUE` (`privateDeviceId`),
  KEY `_idx` (`userId`),
  KEY `creatorid_idx` (`creatorId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Table structure for table `devicefunction`
--

DROP TABLE IF EXISTS `devicefunction`;
CREATE TABLE IF NOT EXISTS `devicefunction` (
  `deviceFunctionId` int(11) NOT NULL AUTO_INCREMENT,
  `publicDeviceFunctionId` varchar(45) NOT NULL,
  `privateDeviceFunctionId` varchar(45) NOT NULL,
  `deviceId` int(11) NOT NULL,
  `functionName` varchar(45) NOT NULL,
  `functionDescription` varchar(140) DEFAULT NULL,
  `functionDataType` varchar(45) NOT NULL,
  `particleFunctionName` varchar(100) NOT NULL,
  `particleFunctionVariable` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`deviceFunctionId`),
  UNIQUE KEY `devicefunctionid_UNIQUE` (`deviceFunctionId`),
  UNIQUE KEY `publicDeviceFunctionId_UNIQUE` (`publicDeviceFunctionId`),
  UNIQUE KEY `privateDeviceFunctionId_UNIQUE` (`privateDeviceFunctionId`),
  KEY `deviceid_idx` (`deviceId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Table structure for table `devicekey`
--

DROP TABLE IF EXISTS `devicekey`;
CREATE TABLE IF NOT EXISTS `devicekey` (
  `keyId` int(11) NOT NULL AUTO_INCREMENT,
  `publicKeyId` varchar(45) NOT NULL,
  `privateKeyId` varchar(45) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `creatorId` int(11) NOT NULL,
  `deviceId` int(11) NOT NULL,
  `keyToken` varchar(45) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateRegistered` datetime DEFAULT NULL,
  `accessActivationDate` date DEFAULT NULL,
  `accessExpirationDate` date DEFAULT NULL,
  `accessFrequency` int(11) DEFAULT NULL,
  `accessFrequencyUnits` varchar(45) DEFAULT NULL,
  `accessType` varchar(45) DEFAULT NULL,
  `accessTimeStart` time DEFAULT NULL,
  `accessTimeEnd` time DEFAULT NULL,
  `keyActive` int(11) NOT NULL DEFAULT '1',
  `keyTimeZone` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`keyId`),
  UNIQUE KEY `KeyID_UNIQUE` (`keyId`),
  UNIQUE KEY `KeyToken_UNIQUE` (`keyToken`),
  UNIQUE KEY `publicKeyId_UNIQUE` (`publicKeyId`),
  UNIQUE KEY `privateKeyId_UNIQUE` (`privateKeyId`),
  KEY `DeviceID_idx` (`deviceId`),
  KEY `UserID_idx` (`userId`),
  KEY `creatorid_idx` (`creatorId`),
  KEY `creatorid_idx_keys` (`creatorId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `keyfunctionassignment`
--

DROP TABLE IF EXISTS `keyfunctionassignment`;
CREATE TABLE IF NOT EXISTS `keyfunctionassignment` (
  `keyFunctionAssignmentId` int(11) NOT NULL AUTO_INCREMENT,
  `keyId` int(11) NOT NULL,
  `deviceFunctionId` int(11) NOT NULL,
  PRIMARY KEY (`keyFunctionAssignmentId`),
  UNIQUE KEY `keyfunctionassignmentid_UNIQUE` (`keyFunctionAssignmentId`),
  KEY `keyid_idx` (`keyId`),
  KEY `devicefunctionid_idx` (`deviceFunctionId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `particleToken` varchar(45) DEFAULT NULL,
  `publicUserId` varchar(45) NOT NULL,
  `privateUserId` varchar(45) NOT NULL,
  `bio` varchar(140) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `Email_UNIQUE` (`email`),
  UNIQUE KEY `publicUserId_UNIQUE` (`publicUserId`),
  UNIQUE KEY `privateUserId_UNIQUE` (`privateUserId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_accessdetails`
--
DROP VIEW IF EXISTS `view_accessdetails`;
CREATE TABLE IF NOT EXISTS `view_accessdetails` (
`accessId` int(11)
,`publicDeviceId` varchar(45)
,`deviceId` int(11)
,`accessedBy` varchar(91)
,`accessDate` timestamp
,`ipAddress` varchar(45)
,`requestState` varchar(140)
,`accessSuccess` int(11)
,`responseState` varchar(140)
,`deviceCreatorId` int(11)
,`deviceUserId` int(11)
,`functionName` varchar(45)
,`keyId` int(11)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_devicedetails`
--
DROP VIEW IF EXISTS `view_devicedetails`;
CREATE TABLE IF NOT EXISTS `view_devicedetails` (
`deviceId` int(11)
,`publicDeviceId` varchar(45)
,`userId` int(11)
,`creatorId` int(11)
,`deviceName` varchar(100)
,`deviceDescription` varchar(140)
,`lastStatus` int(11)
,`deviceToken` varchar(20)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_devicefunctiondetails`
--
DROP VIEW IF EXISTS `view_devicefunctiondetails`;
CREATE TABLE IF NOT EXISTS `view_devicefunctiondetails` (
`deviceFunctionId` int(11)
,`publicDeviceFunctionId` varchar(45)
,`functionName` varchar(45)
,`functionDescription` varchar(140)
,`functionDataType` varchar(45)
,`particleFunctionName` varchar(100)
,`particleFunctionVariable` varchar(15)
,`publicDeviceId` varchar(45)
,`deviceId` int(11)
,`deviceName` varchar(100)
,`deviceDescription` varchar(140)
,`lastStatus` int(11)
,`deviceCreatorId` int(11)
,`particleDeviceId` varchar(45)
,`deviceUserId` int(11)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_devicekeydetails`
--
DROP VIEW IF EXISTS `view_devicekeydetails`;
CREATE TABLE IF NOT EXISTS `view_devicekeydetails` (
`keyId` int(11)
,`publicKeyId` varchar(45)
,`privateKeyId` varchar(45)
,`keyUserId` int(11)
,`keyCreatorId` int(11)
,`keyActive` int(11)
,`assignedTo` varchar(91)
,`deviceId` int(11)
,`keyToken` varchar(45)
,`publicDeviceId` varchar(45)
,`deviceName` varchar(100)
,`deviceDescription` varchar(140)
,`lastStatus` int(11)
,`deviceUserId` int(11)
,`deviceCreatorId` int(11)
,`accessActivationDate` date
,`accessExpirationDate` date
,`accessTimeStart` time
,`accessTimeEnd` time
,`lastAccessed` timestamp
,`accessFrequency` int(11)
,`accessFrequencyUnits` varchar(45)
,`keyTimeZone` varchar(200)
,`remainingCalls` varchar(22)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_devicekeyfunctiondetails`
--
DROP VIEW IF EXISTS `view_devicekeyfunctiondetails`;
CREATE TABLE IF NOT EXISTS `view_devicekeyfunctiondetails` (
`deviceId` int(11)
,`deviceName` varchar(100)
,`lastStatus` int(11)
,`deviceFunctionId` int(11)
,`publicDeviceFunctionId` varchar(45)
,`functionName` varchar(45)
,`functionDescription` varchar(140)
,`functionDataType` varchar(45)
,`particleFunctionVariable` varchar(15)
,`particleFunctionName` varchar(100)
,`keyId` int(11)
,`publicKeyId` varchar(45)
,`keyUserId` int(11)
,`publicDeviceId` varchar(45)
,`deviceUserId` int(11)
,`deviceCreatorId` int(11)
,`particleDeviceId` varchar(45)
,`particleToken` varchar(45)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_particledevicekeydetails`
--
DROP VIEW IF EXISTS `view_particledevicekeydetails`;
CREATE TABLE IF NOT EXISTS `view_particledevicekeydetails` (
`deviceId` int(11)
,`deviceName` varchar(100)
,`particleDeviceName` varchar(45)
,`deviceDescription` varchar(140)
,`lastStatus` int(11)
,`publicDeviceId` varchar(45)
,`particleDeviceId` varchar(45)
,`deviceUserId` int(11)
,`deviceCreatorId` int(11)
,`keyUserId` int(11)
,`keyId` int(11)
,`publicKeyId` varchar(45)
,`keyActive` int(11)
,`particleToken` varchar(45)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_publicdevicefunctionid`
--
DROP VIEW IF EXISTS `view_publicdevicefunctionid`;
CREATE TABLE IF NOT EXISTS `view_publicdevicefunctionid` (
`deviceFunctionId` int(11)
,`publicDeviceFunctionId` varchar(45)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_userdetails`
--
DROP VIEW IF EXISTS `view_userdetails`;
CREATE TABLE IF NOT EXISTS `view_userdetails` (
`userId` int(11)
,`email` varchar(45)
,`firstName` varchar(45)
,`lastName` varchar(45)
,`password` varchar(100)
,`particleToken` varchar(45)
,`publicUserId` varchar(45)
,`privateUserId` varchar(45)
,`bio` varchar(140)
,`keyCount` bigint(21)
,`deviceCount` bigint(21)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_verifydevicetoken`
--
DROP VIEW IF EXISTS `view_verifydevicetoken`;
CREATE TABLE IF NOT EXISTS `view_verifydevicetoken` (
`deviceId` int(11)
,`publicDeviceId` varchar(45)
,`deviceToken` varchar(20)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_verifykeyterms`
--
DROP VIEW IF EXISTS `view_verifykeyterms`;
CREATE TABLE IF NOT EXISTS `view_verifykeyterms` (
`keyId` int(11)
,`publicKeyId` varchar(45)
,`userId` int(11)
,`keyCreatorId` int(11)
,`deviceId` int(11)
,`accessActivationDate` date
,`accessExpirationDate` date
,`accessTimeStart` time
,`accessTimeEnd` time
,`lastAccessed` timestamp
,`accessFrequency` int(11)
,`accessFrequencyUnits` varchar(45)
,`keyTimeZone` varchar(200)
,`keyActive` int(11)
,`remainingCalls` varchar(22)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_verifykeytoken`
--
DROP VIEW IF EXISTS `view_verifykeytoken`;
CREATE TABLE IF NOT EXISTS `view_verifykeytoken` (
`keyId` int(11)
,`publicKeyId` varchar(45)
,`keyToken` varchar(45)
);
-- --------------------------------------------------------

--
-- Structure for view `view_accessdetails`
--
DROP TABLE IF EXISTS `view_accessdetails`;

CREATE VIEW `view_accessdetails` AS (select `a`.`accessId` AS `accessId`,`d`.`publicDeviceId` AS `publicDeviceId`,`d`.`deviceId` AS `deviceId`,concat(`u`.`firstName`,' ',`u`.`lastName`) AS `accessedBy`,`a`.`accessDate` AS `accessDate`,`a`.`ipAddress` AS `ipAddress`,`a`.`requestState` AS `requestState`,`a`.`accessSuccess` AS `accessSuccess`,`a`.`responseState` AS `responseState`,`d`.`creatorId` AS `deviceCreatorId`,`d`.`userId` AS `deviceUserId`,`df`.`functionName` AS `functionName`,`a`.`keyId` AS `keyId` from (((`access` `a` join `device` `d` on((`d`.`deviceId` = `a`.`deviceId`))) join `user` `u` on((`a`.`userId` = `u`.`userId`))) join `devicefunction` `df` on((`a`.`deviceFunctionId` = `df`.`deviceFunctionId`))) order by `a`.`accessDate` desc);

-- --------------------------------------------------------

--
-- Structure for view `view_devicedetails`
--
DROP TABLE IF EXISTS `view_devicedetails`;

CREATE VIEW `view_devicedetails` AS (select `device`.`deviceId` AS `deviceId`,`device`.`publicDeviceId` AS `publicDeviceId`,`device`.`userId` AS `userId`,`device`.`creatorId` AS `creatorId`,`device`.`deviceName` AS `deviceName`,`device`.`deviceDescription` AS `deviceDescription`,`device`.`lastStatus` AS `lastStatus`,`device`.`deviceToken` AS `deviceToken` from `device`);

-- --------------------------------------------------------

--
-- Structure for view `view_devicefunctiondetails`
--
DROP TABLE IF EXISTS `view_devicefunctiondetails`;

CREATE VIEW `view_devicefunctiondetails` AS (select `df`.`deviceFunctionId` AS `deviceFunctionId`,`df`.`publicDeviceFunctionId` AS `publicDeviceFunctionId`,`df`.`functionName` AS `functionName`,`df`.`functionDescription` AS `functionDescription`,`df`.`functionDataType` AS `functionDataType`,`df`.`particleFunctionName` AS `particleFunctionName`,`df`.`particleFunctionVariable` AS `particleFunctionVariable`,`d`.`publicDeviceId` AS `publicDeviceId`,`d`.`deviceId` AS `deviceId`,`d`.`deviceName` AS `deviceName`,`d`.`deviceDescription` AS `deviceDescription`,`d`.`lastStatus` AS `lastStatus`,`d`.`creatorId` AS `deviceCreatorId`,`d`.`particleDeviceId` AS `particleDeviceId`,`d`.`userId` AS `deviceUserId` from (`devicefunction` `df` join `device` `d` on((`df`.`deviceId` = `d`.`deviceId`))));

-- --------------------------------------------------------

--
-- Structure for view `view_devicekeydetails`
--
DROP TABLE IF EXISTS `view_devicekeydetails`;

CREATE VIEW `view_devicekeydetails` AS (select `k`.`keyId` AS `keyId`,`k`.`publicKeyId` AS `publicKeyId`,`k`.`privateKeyId` AS `privateKeyId`,`k`.`userId` AS `keyUserId`,`k`.`creatorId` AS `keyCreatorId`,`k`.`keyActive` AS `keyActive`,concat(`u`.`firstName`,' ',`u`.`lastName`) AS `assignedTo`,`k`.`deviceId` AS `deviceId`,`k`.`keyToken` AS `keyToken`,`d`.`publicDeviceId` AS `publicDeviceId`,`d`.`deviceName` AS `deviceName`,`d`.`deviceDescription` AS `deviceDescription`,`d`.`lastStatus` AS `lastStatus`,`d`.`userId` AS `deviceUserId`,`d`.`creatorId` AS `deviceCreatorId`,`k`.`accessActivationDate` AS `accessActivationDate`,`k`.`accessExpirationDate` AS `accessExpirationDate`,`k`.`accessTimeStart` AS `accessTimeStart`,`k`.`accessTimeEnd` AS `accessTimeEnd`,`a`.`accessDate` AS `lastAccessed`,`k`.`accessFrequency` AS `accessFrequency`,`k`.`accessFrequencyUnits` AS `accessFrequencyUnits`,`k`.`keyTimeZone` AS `keyTimeZone`,(case `k`.`accessFrequency` when 0 then 'Infinite' when 99999 then 'Infinite' else coalesce((case `k`.`accessFrequencyUnits` when 'Per Day' then (select (`k2`.`accessFrequency` - count(`a2`.`accessId`)) from (`access` `a2` left join `devicekey` `k2` on(((`k2`.`keyId` = `a2`.`keyId`) and (`a2`.`userId` = `k2`.`userId`)))) where ((dayofmonth(`a2`.`accessDate`) = dayofmonth(now())) and (`a2`.`userId` = `k`.`userId`) and (`k2`.`keyId` = `k`.`keyId`)) group by `k2`.`keyId`,dayofmonth(`a2`.`accessDate`) order by `a2`.`accessDate`) when 'Per Week' then (select (`k2`.`accessFrequency` - count(`a2`.`accessId`)) from (`access` `a2` left join `devicekey` `k2` on(((`k2`.`keyId` = `a2`.`keyId`) and (`a2`.`userId` = `k2`.`userId`)))) where ((dayofmonth(`a2`.`accessDate`) = dayofmonth(now())) and (`a2`.`userId` = `k`.`userId`) and (`k2`.`keyId` = `k`.`keyId`)) group by `k2`.`keyId`,dayofmonth(`a2`.`accessDate`) order by `a2`.`accessDate`) when 'Per Month' then (select (`k2`.`accessFrequency` - count(`a2`.`accessId`)) from (`access` `a2` left join `devicekey` `k2` on(((`k2`.`keyId` = `a2`.`keyId`) and (`a2`.`userId` = `k2`.`userId`)))) where ((dayofmonth(`a2`.`accessDate`) = dayofmonth(now())) and (`a2`.`userId` = `k`.`userId`) and (`k2`.`keyId` = `k`.`keyId`)) group by `k2`.`keyId`,dayofmonth(`a2`.`accessDate`) order by `a2`.`accessDate`) when 'Per Year' then (select (`k2`.`accessFrequency` - count(`a2`.`accessId`)) from (`access` `a2` left join `devicekey` `k2` on(((`k2`.`keyId` = `a2`.`keyId`) and (`a2`.`userId` = `k2`.`userId`)))) where ((dayofmonth(`a2`.`accessDate`) = dayofmonth(now())) and (`a2`.`userId` = `k`.`userId`) and (`k2`.`keyId` = `k`.`keyId`)) group by `k2`.`keyId`,dayofmonth(`a2`.`accessDate`) order by `a2`.`accessDate`) when 'Total' then (`k`.`accessFrequency` - count(0)) else 0 end),`k`.`accessFrequency`) end) AS `remainingCalls` from (((`devicekey` `k` left join `access` `a` on(((`k`.`deviceId` = `a`.`deviceId`) and (`a`.`userId` = `k`.`userId`)))) left join `user` `u` on((`k`.`userId` = `u`.`userId`))) left join `device` `d` on((`k`.`deviceId` = `d`.`deviceId`))) group by `k`.`keyId`);

-- --------------------------------------------------------

--
-- Structure for view `view_devicekeyfunctiondetails`
--
DROP TABLE IF EXISTS `view_devicekeyfunctiondetails`;

CREATE VIEW `view_devicekeyfunctiondetails` AS (select `d`.`deviceId` AS `deviceId`,`d`.`deviceName` AS `deviceName`,`d`.`lastStatus` AS `lastStatus`,`df`.`deviceFunctionId` AS `deviceFunctionId`,`df`.`publicDeviceFunctionId` AS `publicDeviceFunctionId`,`df`.`functionName` AS `functionName`,`df`.`functionDescription` AS `functionDescription`,`df`.`functionDataType` AS `functionDataType`,`df`.`particleFunctionVariable` AS `particleFunctionVariable`,`df`.`particleFunctionName` AS `particleFunctionName`,`k`.`keyId` AS `keyId`,`k`.`publicKeyId` AS `publicKeyId`,`k`.`userId` AS `keyUserId`,`d`.`publicDeviceId` AS `publicDeviceId`,`d`.`userId` AS `deviceUserId`,`d`.`creatorId` AS `deviceCreatorId`,`d`.`particleDeviceId` AS `particleDeviceId`,`u`.`particleToken` AS `particleToken` from ((((`devicefunction` `df` left join `keyfunctionassignment` `kfa` on((`kfa`.`deviceFunctionId` = `df`.`deviceFunctionId`))) left join `devicekey` `k` on((`kfa`.`keyId` = `k`.`keyId`))) join `device` `d` on((`df`.`deviceId` = `d`.`deviceId`))) join `user` `u` on((`d`.`creatorId` = `u`.`userId`))) where ((`k`.`keyActive` = 1) or isnull(`k`.`keyActive`)));

-- --------------------------------------------------------

--
-- Structure for view `view_particledevicekeydetails`
--
DROP TABLE IF EXISTS `view_particledevicekeydetails`;

CREATE VIEW `view_particledevicekeydetails` AS (select `d`.`deviceId` AS `deviceId`,`d`.`deviceName` AS `deviceName`,`d`.`particleDeviceName` AS `particleDeviceName`,`d`.`deviceDescription` AS `deviceDescription`,`d`.`lastStatus` AS `lastStatus`,`d`.`publicDeviceId` AS `publicDeviceId`,`d`.`particleDeviceId` AS `particleDeviceId`,`d`.`userId` AS `deviceUserId`,`d`.`creatorId` AS `deviceCreatorId`,`k`.`userId` AS `keyUserId`,`k`.`keyId` AS `keyId`,`k`.`publicKeyId` AS `publicKeyId`,`k`.`keyActive` AS `keyActive`,`u`.`particleToken` AS `particleToken` from ((`device` `d` left join `devicekey` `k` on((`d`.`deviceId` = `k`.`deviceId`))) join `user` `u` on((`d`.`creatorId` = `u`.`userId`))));

-- --------------------------------------------------------

--
-- Structure for view `view_publicdevicefunctionid`
--
DROP TABLE IF EXISTS `view_publicdevicefunctionid`;

CREATE VIEW `view_publicdevicefunctionid` AS (select `devicefunction`.`deviceFunctionId` AS `deviceFunctionId`,`devicefunction`.`publicDeviceFunctionId` AS `publicDeviceFunctionId` from `devicefunction`);

-- --------------------------------------------------------

--
-- Structure for view `view_userdetails`
--
DROP TABLE IF EXISTS `view_userdetails`;

CREATE VIEW `view_userdetails` AS (select `u`.`userId` AS `userId`,`u`.`email` AS `email`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`password` AS `password`,`u`.`particleToken` AS `particleToken`,`u`.`publicUserId` AS `publicUserId`,`u`.`privateUserId` AS `privateUserId`,`u`.`bio` AS `bio`,count(`k`.`keyId`) AS `keyCount`,count(`d`.`deviceId`) AS `deviceCount` from ((`user` `u` left join `devicekey` `k` on((`k`.`userId` = `u`.`userId`))) left join `device` `d` on((`d`.`userId` = `u`.`userId`))) group by `u`.`userId`);

-- --------------------------------------------------------

--
-- Structure for view `view_verifydevicetoken`
--
DROP TABLE IF EXISTS `view_verifydevicetoken`;

CREATE VIEW `view_verifydevicetoken` AS (select `device`.`deviceId` AS `deviceId`,`device`.`publicDeviceId` AS `publicDeviceId`,`device`.`deviceToken` AS `deviceToken` from `device` where isnull(`device`.`userId`));

-- --------------------------------------------------------

--
-- Structure for view `view_verifykeyterms`
--
DROP TABLE IF EXISTS `view_verifykeyterms`;

CREATE VIEW `view_verifykeyterms` AS (select `k`.`keyId` AS `keyId`,`k`.`publicKeyId` AS `publicKeyId`,`k`.`userId` AS `userId`,`k`.`creatorId` AS `keyCreatorId`,`k`.`deviceId` AS `deviceId`,`k`.`accessActivationDate` AS `accessActivationDate`,`k`.`accessExpirationDate` AS `accessExpirationDate`,`k`.`accessTimeStart` AS `accessTimeStart`,`k`.`accessTimeEnd` AS `accessTimeEnd`,`a`.`accessDate` AS `lastAccessed`,`k`.`accessFrequency` AS `accessFrequency`,`k`.`accessFrequencyUnits` AS `accessFrequencyUnits`,`k`.`keyTimeZone` AS `keyTimeZone`,`k`.`keyActive` AS `keyActive`,(case `k`.`accessFrequency` when 0 then 'Infinite' else coalesce((case `k`.`accessFrequencyUnits` when 'Per Day' then (select (`k2`.`accessFrequency` - count(`a2`.`accessId`)) from (`access` `a2` left join `devicekey` `k2` on(((`k2`.`keyId` = `a2`.`keyId`) and (`a2`.`userId` = `k2`.`userId`)))) where ((dayofmonth(`a2`.`accessDate`) = dayofmonth(now())) and (`a2`.`userId` = `k`.`userId`) and (`k2`.`keyId` = `k`.`keyId`)) group by `k2`.`keyId`,dayofmonth(`a2`.`accessDate`) order by `a2`.`accessDate`) when 'Per Week' then (select (`k2`.`accessFrequency` - count(`a2`.`accessId`)) from (`access` `a2` left join `devicekey` `k2` on(((`k2`.`keyId` = `a2`.`keyId`) and (`a2`.`userId` = `k2`.`userId`)))) where ((dayofmonth(`a2`.`accessDate`) = dayofmonth(now())) and (`a2`.`userId` = `k`.`userId`) and (`k2`.`keyId` = `k`.`keyId`)) group by `k2`.`keyId`,dayofmonth(`a2`.`accessDate`) order by `a2`.`accessDate`) when 'Per Month' then (select (`k2`.`accessFrequency` - count(`a2`.`accessId`)) from (`access` `a2` left join `devicekey` `k2` on(((`k2`.`keyId` = `a2`.`keyId`) and (`a2`.`userId` = `k2`.`userId`)))) where ((dayofmonth(`a2`.`accessDate`) = dayofmonth(now())) and (`a2`.`userId` = `k`.`userId`) and (`k2`.`keyId` = `k`.`keyId`)) group by `k2`.`keyId`,dayofmonth(`a2`.`accessDate`) order by `a2`.`accessDate`) when 'Per Year' then (select (`k2`.`accessFrequency` - count(`a2`.`accessId`)) from (`access` `a2` left join `devicekey` `k2` on(((`k2`.`keyId` = `a2`.`keyId`) and (`a2`.`userId` = `k2`.`userId`)))) where ((dayofmonth(`a2`.`accessDate`) = dayofmonth(now())) and (`a2`.`userId` = `k`.`userId`) and (`k2`.`keyId` = `k`.`keyId`)) group by `k2`.`keyId`,dayofmonth(`a2`.`accessDate`) order by `a2`.`accessDate`) when 'Total' then (`k`.`accessFrequency` - count(0)) else 0 end),`k`.`accessFrequency`) end) AS `remainingCalls` from (`devicekey` `k` left join `access` `a` on(((`k`.`deviceId` = `a`.`deviceId`) and (`a`.`userId` = `k`.`userId`)))) group by `k`.`keyId` order by `a`.`accessDate`);

-- --------------------------------------------------------

--
-- Structure for view `view_verifykeytoken`
--
DROP TABLE IF EXISTS `view_verifykeytoken`;

CREATE VIEW `view_verifykeytoken` AS (select `devicekey`.`keyId` AS `keyId`,`devicekey`.`publicKeyId` AS `publicKeyId`,`devicekey`.`keyToken` AS `keyToken` from `devicekey` where isnull(`devicekey`.`userId`));

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access`
--
ALTER TABLE `access`
  ADD CONSTRAINT `access_ibfk_1` FOREIGN KEY (`deviceId`) REFERENCES `device` (`deviceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `access_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `access_ibfk_3` FOREIGN KEY (`keyId`) REFERENCES `devicekey` (`keyId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `a_devicefunctionid` FOREIGN KEY (`deviceFunctionId`) REFERENCES `devicefunction` (`deviceFunctionId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `device`
--
ALTER TABLE `device`
  ADD CONSTRAINT `creatorid` FOREIGN KEY (`creatorId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userid` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `devicefunction`
--
ALTER TABLE `devicefunction`
  ADD CONSTRAINT `devicefunction_ibfk_1` FOREIGN KEY (`deviceId`) REFERENCES `device` (`deviceId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `devicekey`
--
ALTER TABLE `devicekey`
  ADD CONSTRAINT `creatorid_keys` FOREIGN KEY (`creatorId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `DeviceID` FOREIGN KEY (`deviceId`) REFERENCES `device` (`deviceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userid_keys` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `keyfunctionassignment`
--
ALTER TABLE `keyfunctionassignment`
  ADD CONSTRAINT `keyfunctionassignment_ibfk_1` FOREIGN KEY (`keyId`) REFERENCES `devicekey` (`keyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `keyfunctionassignment_ibfk_2` FOREIGN KEY (`deviceFunctionId`) REFERENCES `devicefunction` (`deviceFunctionId`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
