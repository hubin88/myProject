<?php
header("Content-type:text/html;charset=utf-8");
// 将姓名填充到数组中
$a=array("Anna","Brittany","Cinderella","Diana","Eva","Fiona","Gunda","Hege","Inga","Johanna","Kitty","Linda","Nina","Ophelia","Petunia","Amanda","Raquel","Cindy","Doris","Eve","Evita","Sunniva","Tove","Unni","Violet","Liza","Elizabeth","Ellen","Wenche","Vicky");
$q=$_POST['str'];
//查找是否由匹配值， 如果 q>0
$hint="";
if (strlen($q) > 0)
{
	for($i=0; $i<count($a); $i++)
	{
		if (strtolower($q)==strtolower(substr($a[$i],0,strlen($q))))
		{
			if ($hint=="")
			{
				$hint=$a[$i];
			}
			else
			{
				$hint=$hint." , ".$a[$i];
			}
		}
	}
}

// 如果没有匹配值设置输出为 "no suggestion" 
if ($hint == "")
{
	$response="no suggestion";
}
else
{
	$response=$hint;
}

//输出返回值
echo $response;
?>