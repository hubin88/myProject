<?php
header("Content-type:text/html;charset=utf-8");
$servername = "localhost";
$username = "root";
$password = "880516";
// 创建连接
$conn = mysql_connect($servername, $username, $password);
// 检测连接
if (!$conn) {
	die("连接失败: " . mysql_error());
}
echo "连接成功<br>";
mysql_query("set names 'utf8'");
// 创建数据库
//$retvalCreate = mysql_query("CREATE DATABASE RUNOOB", $conn);
//if(!$retvalCreate)
//{
//die('创建数据库失败: ' . mysql_error());
//}
//echo "数据库 RUNOOB 创建成功<br>";

//删除数据库
//$retvalDrop = mysql_query("DROP DATABASE RUNOOB", $conn );
//if(!$retvalDrop )
//{
//die('删除数据库失败: ' . mysql_error());
//}
//echo "数据库 RUNOOB 删除成功<br>";

//选择数据库
mysql_select_db("myDB");

//创建数据表
//$sqlTable= "CREATE TABLE myDB_tbl(myDB_id INT NOT NULL AUTO_INCREMENT,myDB_title VARCHAR(100) NOT NULL,myDB_author VARCHAR(40) NOT NULL,submission_date DATE,PRIMARY KEY (myDB_id));";
//$retvalTable = mysql_query( $sqlTable, $conn );
//if(!$retvalTable )
//{
//die('数据表创建失败: ' . mysql_error());
//}
//echo "数据表创建成功<br>";

//删除数据表
//$retvalDropTable = mysql_query("DROP TABLE myDB_tbl", $conn );
//if(!$retvalDropTable )
//{
//die('数据表删除失败: ' . mysql_error());
//}
//echo "数据表删除成功<br>";

//插入数据
//$sqlInsert = "INSERT INTO myDB_tbl (myDB_title,myDB_author, submission_date) VALUES ('数据插入','户彬','2016-07-15')";
//$retvalInsert = mysql_query( $sqlInsert, $conn );
//if(! $retvalInsert )
//{
//die('Could not enter data: ' . mysql_error());
//}
//echo "插入数据成功";

//删除数据
//$retvalDelete = mysql_query( "delete from myDB_tbl where myDB_id=1", $conn );
//if(!$retvalDelete )
//{
//die('Could not delete data: ' . mysql_error());
//}
//echo "删除数据成功<br>";

//查询数据
$sqlSelect = 'SELECT myDB_id, myDB_title,myDB_author, submission_date FROM myDB_tbl';
$retvalSelect = mysql_query($sqlSelect, $conn);
if (!$retvalSelect) {
	die('Could not get data: ' . mysql_error());
}
//while($row = mysql_fetch_array($retvalSelect, MYSQL_ASSOC));
while ($row = mysql_fetch_assoc($retvalSelect)) {
	echo "Tutorial ID :{$row['myDB_id']} <br> " . "Title: {$row['myDB_title']} <br> " . "Author: {$row['myDB_author']} <br> " . "Submission Date : {$row['submission_date']} <br> " . "--------------------------------<br>";
}
//内存释放
mysql_free_result($retvalSelect);
echo "查询数据成功<br>";

//where字句
$sqlWhere = 'SELECT myDB_id, myDB_title,myDB_author, submission_date FROM myDB_tbl WHERE myDB_author="户彬2"';
$retvalWhere = mysql_query($sqlWhere, $conn);
while ($row = mysql_fetch_assoc($retvalWhere)) {
	echo "Tutorial ID :{$row['myDB_id']} <br> " . "Title: {$row['myDB_title']} <br> " . "Author: {$row['myDB_author']} <br> " . "Submission Date : {$row['submission_date']} <br> " . "--------------------------------<br>";
}
echo "查询数据成功<br>";

//更新或修改数据
$sqlUpdate = 'UPDATE myDB_tbl SET myDB_title="Learning JAVA" WHERE myDB_id=3';
$retvalUpdate = mysql_query($sqlUpdate, $conn);
if (!$retvalUpdate) {
	die('Could not update data: ' . mysql_error());
}
echo "更新数据成功<br>";

//删除数据
$sqlDelete = 'DELETE FROM myDB_tbl WHERE myDB_id=6';
$retvalDelete = mysql_query($sqlDelete, $conn);
if (!$retvalDelete) {
	die('Could not delete data: ' . mysql_error());
}
echo "删除数据成功<br>";

//like子句,%代表任意字符，如果没有%，like与=效果一样
$sqlLike = 'SELECT * FROM myDB_tbl WHERE myDB_author LIKE "%彬%"';
$retvalLike = mysql_query($sqlLike, $conn);
if (!$retvalLike) {
	die('Could not get data: ' . mysql_error());
}
while ($row = mysql_fetch_array($retvalLike, MYSQL_ASSOC)) {
	echo "Tutorial ID :{$row['myDB_id']}  <br> " . "Title: {$row['myDB_title']} <br> " . "Author: {$row['myDB_author']} <br> " . "Submission Date : {$row['submission_date']} <br> " . "--------------------------------<br>";
}
echo "Fetched data successfully<br>++++++++++++++++++++++++++++++++++++++++++++++<br>";

//排序, ASC 或 DESC 关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升序排列
$sqlPaixu = 'SELECT * FROM myDB_tbl ORDER BY myDB_author DESC';
$retvalPaixu = mysql_query($sqlPaixu, $conn);
if (!$retvalPaixu) {
	die('Could not get data: ' . mysql_error());
}
while ($row = mysql_fetch_array($retvalPaixu, MYSQL_ASSOC)) {
	echo "Tutorial ID :{$row['myDB_id']}  <br> " . "Title: {$row['myDB_title']} <br> " . "Author: {$row['myDB_author']} <br> " . "Submission Date : {$row['submission_date']} <br> " . "--------------------------------<br>";
}
echo "排序数据成功<br>";
//关闭连接
mysql_close($conn);
?>