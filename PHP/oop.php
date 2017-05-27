<?php
//设置字符编码
header("Content-type:text/html;charset=utf-8");
/*创建对象*/
class Site {
	/* 成员变量 */
	var $url;
	var $title;

	/* 成员函数 */
	function setUrl($par) {
		$this -> url = $par;
	}

	function getUrl() {
		echo $this -> url . "<br>";
	}

	function setTitle($par) {
		$this -> title = $par;
	}

	function getTitle() {
		echo $this -> title . "<br>";
	}

}

/*实例化对象*/
$runoob = new Site;
$taobao = new Site;
$google = new Site;

// 调用成员函数，设置标题和URL
$runoob -> setTitle("菜鸟教程");
$taobao -> setTitle("淘宝");
$google -> setTitle("Google 搜索");

$runoob -> setUrl('www.runoob.com');
$taobao -> setUrl('www.taobao.com');
$google -> setUrl('www.google.com');

// 调用成员函数，获取标题和URL
$runoob -> getTitle();
$taobao -> getTitle();
$google -> getTitle();

$runoob -> getUrl();
$taobao -> getUrl();
$google -> getUrl();

/*创建对象*/
class Site2 {
	/* 成员变量 */
	var $url;
	var $title;
	//构造函数，是一种特殊的方法。主要用来在创建对象时初始化对象， 即为对象成员变量赋初始值，总与new运算符一起使用在创建对象的语句中。
	function __construct($par1, $par2) {
		$this -> url = $par1;
		$this -> title = $par2;
	}

	/* 成员函数 */
	function setUrl($par) {
		$this -> url = $par;
	}

	function getUrl() {
		echo $this -> url . "<br>";
	}

	function setTitle($par) {
		$this -> title = $par;
	}

	function getTitle() {
		echo $this -> title . "<br>";
	}

}

$runoob2 = new Site2('www.runoob.com', '菜鸟教程');
$taobao2 = new Site2('www.taobao.com', '淘宝');
$google2 = new Site2('www.google.com', 'Google 搜索');

// 调用成员函数，获取标题和URL
$runoob2 -> getTitle();
$taobao2 -> getTitle();
$google2 -> getTitle();

$runoob2 -> getUrl();
$taobao2 -> getUrl();
$google2 -> getUrl();

//继承
class Child_Site extends Site {
	var $category;

	function setCate($par) {
		$this -> category = $par;
	}

	function getCate() {
		echo $this -> category . "<br>";
	}
//方法重写
	function getUrl() {
		echo $this -> url . "<br>";
		return $this -> url;
	}

	function getTitle() {
		echo $this -> title . "<br>";
		return $this -> title;
	}
}


//属性的访问控制,方法和属性一样
/*
 public（公有）：公有的类成员可以在任何地方被访问。
 protected（受保护）：受保护的类成员则可以被其自身以及其子类和父类访问。
 private（私有）：私有的类成员则只能被其定义所在的类访问。
 类属性必须定义为公有，受保护，私有之一。如果用 var 定义，则被视为公有。
 */
class MyClass {
	public $public = 'Public';
	protected $protected = 'Protected';
	private $private = 'Private';

	function printHello() {
		echo $this -> public . "<br>";
		echo $this -> protected . "<br>";
		echo $this -> private . "<br>";
	}

}

$obj = new MyClass();
echo $obj -> public . "<br>";
// 这行能被正常执行
//echo $obj->protected; // 这行会产生一个致命错误
//echo $obj->private; // 这行也会产生一个致命错误
$obj -> printHello();
// 输出 Public、Protected 和 Private

class MyClass2 extends MyClass {
	// 可以对 public 和 protected 进行重定义，但 private 而不能
	protected $protected = 'Protected2';

	function printHello() {
		echo $this -> public . "<br>";
		echo $this -> protected . "<br>";
//		echo $this -> private;
	}

}

$obj2 = new MyClass2();
echo $obj2 -> public;
// 这行能被正常执行
//echo $obj2->private; // 未定义 private
//echo $obj2->protected; // 这行会产生一个致命错误
$obj2 -> printHello();
// 输出 Public、Protected2 和 Undefined

//使用接口（interface），可以指定某个类必须实现哪些方法，但不需要定义这些方法的具体内容。
//接口是通过 interface 关键字来定义的，就像定义一个标准的类一样，但其中定义所有的方法都是空的。
//接口中定义的所有方法都必须是公有，这是接口的特性。
//要实现一个接口，使用 implements 操作符。类中必须实现接口中定义的所有方法，否则会报一个致命错误。类可以实现多个接口，用逗号来分隔多个接口的名称。
// 声明一个'iTemplate'接口
interface iTemplate {
	public function setVariable($name, $var);
	public function getHtml($template);
}

// 实现接口
class Template implements iTemplate {
	private $vars = array();

	public function setVariable($name, $var) {
		$this -> vars[$name] = $var;
	}

	public function getHtml($template) {
		foreach ($this->vars as $name => $value) {
			$template = str_replace('{' . $name . '}', $value, $template);
		}

		return $template;
	}

}

//Static 关键字
//声明类属性或方法为 static(静态)，就可以不实例化类而直接访问。
//静态属性不能通过一个类已实例化的对象来访问（但静态方法可以）。
//由于静态方法不需要通过对象即可调用，所以伪变量 $this 在静态方法中不可用。
//静态属性不可以由对象通过 -> 操作符来访问。
//自 PHP 5.3.0 起，可以用一个变量来动态调用类。但该变量的值不能为关键字 self，parent 或 static。
class Foo {
	public static $my_static = 'foo';

	public function staticValue() {
		return self::$my_static;
	}

}

print Foo::$my_static . "<br>";
$foo = new Foo();

print $foo -> staticValue() . "<br>";

//调用父类构造方法，重写和重载
//PHP 不会在子类的构造方法中自动的调用父类的构造方法。要执行父类的构造方法，需要在子类的构造方法中调用 parent::__construct() 。
//调用父类重写的方法parent::
class BaseClass {
	function __construct() {
		print "BaseClass 类中构造方法" . "<br>";
	}
	function say(){
		echo "吃饭";
	}
}

class SubClass extends BaseClass {
	function __construct() {
		parent::__construct();
		// 子类构造方法不能自动调用父类的构造方法
		print "SubClass 类中构造方法" . "<br>";
	}

}

class OtherSubClass extends BaseClass {
	// 继承 BaseClass 的构造方法
	function say(){
		parent::say();
		echo "，喝水";
	}
}

// 调用 BaseClass 构造方法
$obj = new BaseClass();

// 调用 BaseClass、SubClass 构造方法
$obj = new SubClass();

// 调用 BaseClass 构造方法
$obj = new OtherSubClass();
?>