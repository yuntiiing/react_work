<?php
// all-users.php is to fetch all users that exist in the database.
// Method: GET - http://localhost/php-react/all-users.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data=json_decode(file_get_contents("php://input"));

if (isset($data->prod)) {
    $prod = mysqli_real_escape_string($db_connection, trim($data->prod));
    $product = mysqli_query($db_connection, "SELECT * FROM product WHERE ProdID='$prod' OR ProdName='$prod'");
    if (mysqli_num_rows($product) > 0) {
        $product = mysqli_fetch_assoc($product);
        echo json_encode(["success" => 1, "product" => $product], JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo json_encode(["success" => 0,"msg" => "查無此產品，請重新輸入!"]);
    }
}else {
    echo json_encode(["success" => 0, "msg" => "請輸入值!"]);
}


?>
