<?php
header("Content-type:text/html;charset=utf-8");
$servername = "localhost";
$username = "root";
$password = "880516";
$conn = mysql_connect($servername, $username, $password);
mysql_query("CREATE DATABASE RUNOOB", $conn);
mysql_select_db("RUNOOB");
mysql_query('DROP TABLE IF EXISTS employee_tbl', $conn);
mysql_query('CREATE TABLE employee_tbl ( id int(11) NOT NULL, name char(10) NOT NULL DEFAULT "", date datetime NOT NULL, singin tinyint(4) NOT NULL DEFAULT "0" COMMENT "登录次数", PRIMARY KEY (id))', $conn);
mysql_query("INSERT INTO employee_tbl VALUES ('1', '小明', '2016-04-22 15:25:33', '1'), ('2', '小王', '2016-04-20 15:25:47', '3'), ('3', '小丽', '2016-04-19 15:26:02', '2'), ('4', '小王', '2016-04-07 15:26:14', '4'), ('5', '小明', '2016-04-11 15:26:40', '4'), ('6', '小明', '2016-04-04 15:26:54', '2')",$conn)
?>