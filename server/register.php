<?php

$nickname = $_POST['nickname'];
$username = $_POST['username'];
$password = $_POST['password'];


$link = mysqli_connect('localhost', 'root', 'root', 'huiyu');
$sql = "INSERT INTO `users` (`username`, `password`, `nickname`) VALUES('$username', '$password', '$nickname')";
$res = mysqli_query($link, $sql);

if ($res) {
  echo json_encode(array(
    "message" => "用户注册成功",
    "bool" => "true"
  ));
} else {
  echo json_encode(array(
    "message" => "用户名或密码错误",
    "bool" => "false"
  ));
}



?>