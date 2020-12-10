<?php

$one = $_GET['cat_one'];
$method = $_GET['sort_method'];
$type = $_GET['sort_type'];
$current = $_GET['current'];
$pagesize = $_GET['pagesize'];



// 组装 sql 语句
$sql =  "SELECT * FROM `goods`";

if($one != 'all') $sql .= "WHERE `cat_one_id`='$one'";
if($method == '综合') $sql .= " ORDER BY `goods_id` $type";
if($method == '价格') $sql .= " ORDER BY `goods_price` $type";

$state = ($current - 1) * $pagesize;
$sql .= " LIMIT $state, $pagesize";

$link = mysqli_connect('localhost', 'root', 'root', 'huiyu');
$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);


echo json_encode(array(
  "message" => "获取商品列表成功",
  "current" => $current,
  "code" => 1,
  "list" => $data,
  'sql' => $sql
));


?>