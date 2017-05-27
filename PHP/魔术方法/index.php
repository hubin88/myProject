<?php
class Person {
	private $name = "hubin";
	protected $age = 28;
	public $sex = "男";

	public function __construct($name, $age, $sex) {
		$this -> name = $name;
		$this -> age = $age;
		$this -> sex = $sex;
	}

	//通过访问共有的方法可以设置私有的，受保护的成员属性
	public function set($name, $value) {
		$this -> $name = $value;
	}

	//__set()方法在类的外部设置私有的，受保护的成员属性的时候回自动被调用，不需要手动调用。可以更好地对程序进行控制。
	public function __set($name, $value) {
		if ($name == "age" && $value > 30) {
			$this -> $name = $value - 5;
		} else {
			$this -> $name = $value;
		}
	}

	//获取对象的私有和受保护的成员属性
	public function get($name) {
		return $this -> $name;
	}

	//__get()方法在类的外部私有的，受保护的成员属性的时候回自动被调用，不需要手动调用。可以更好地对程序进行控制。
	public function __get($name) {
		if ($name == "age") {
			return 18;
		} else {
			return $this -> $name;
		}
	}

	//判断成员属性是否存在
	public function is_set($name) {
		return isset($this -> $name);
		//isset判断成员属性是否存在，在类的外面不能判断私有的和受保护的成员属性0
	}

	//在类的外面可以直接用isset()来判断成员属性
	public function __isset($name) {
		if ($name == "sex") {
			return false;
		} else {
			return isset($this -> $name);
		}
	}
	//释放成员属性
	public function un_set($name){
		unset($this->$name);
	}
	//在外部可以释放成员属性
	public function __unset($name){
		if($name=="name"){
			return;
		}
		unset($this->$name);
	}

}

$personOne = new Person();
$personOne -> set("name", "张三");
$personOne -> name = "李四";

$personTwo = new Person("王五", 20, "女");
$personTwo -> get("age");
$personTwo -> age;

$personThree = new Person("赵六", 30, "女");
var_dump($personThree -> is_set("name"));
var_dump(isset($personThree -> age));

$personFour = new Person("丁一", 32, "女");
$personFour->un_set("age");
unset($personFour->name);
var_dump($personFour);
?>