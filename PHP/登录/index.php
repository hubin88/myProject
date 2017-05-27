<?php
session_start();
header("Content-type:text/html;charset=utf-8");
$servername = "localhost";
$user = "root";
$pwd = "root";
// 创建连接
$conn = mysql_connect($servername, $user, $pwd);
// 检测连接
if (!$conn) {
	die("连接失败: " . mysql_error());
}
mysql_query("set names 'utf8'");
//// 创建数据库
//$retvalCreate = mysql_query("CREATE DATABASE myDB", $conn);
//if(!$retvalCreate)
//{
//die('创建数据库失败: ' . mysql_error());
//}
//选择数据库
mysql_select_db("myDB");
//创建数据表
//$sqlTable= "CREATE TABLE login(id INT NOT NULL AUTO_INCREMENT, username VARCHAR(100) NOT NULL,password VARCHAR(40) NOT NULL,PRIMARY KEY (id));";
//$retvalTable = mysql_query( $sqlTable, $conn );
//if(!$retvalTable )
//{
//die('数据表创建失败: ' . mysql_error());
//}
////插入数据
//$sqlInsert = "INSERT INTO login (username,password) VALUES ('户彬','123456')";
//$retvalInsert = mysql_query( $sqlInsert, $conn );
//if(!$retvalInsert )
//{
//die('Could not enter data: ' . mysql_error());
//}
$username = $_POST["username"];
$password = $_POST["password"];
//查询
$sqlSelect = 'SELECT password FROM myDB	WHERE username="'.$username.'"';
$retvalSelect = mysql_query($sqlSelect, $conn);
if (!$retvalSelect) {
	die('Could not get data: ' . mysql_error());
}
$result = mysql_fetch_assoc($retvalSelect);
if($result["password"]==$password){
	$_SESSION('login')=$username;
	echo "登陆成功";
}else{
	echo "登陆失败";
}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<form action="index.php" method="post">
			<h1>登录</h1>
			姓名：
			<input type="text" name="username"/>
			<br />
			密码：
			<input type="password" name=password/>
			<br />
			<input type="submit" value="登录"/>
		</form>
	</body>
</html>
