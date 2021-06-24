<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data=json_decode(file_get_contents("php://input"));

if (isset($data->OrderId)) {
    $orderid = mysqli_real_escape_string($db_connection, trim($data->OrderId));
    
    $order = mysqli_query($db_connection, "SELECT * FROM salesorder WHERE OrderId='$orderid'");
    $orderdetail = mysqli_query($db_connection, "SELECT * FROM orderdetail WHERE OrderId='$orderid'");
    if (mysqli_num_rows($orderdetail) > 0 && mysqli_num_rows($order)) {
        $order = mysqli_fetch_all($order, MYSQLI_ASSOC);
        $orderdetail = mysqli_fetch_all($orderdetail, MYSQLI_ASSOC);
        echo json_encode(["success" => 1, "order"=>$order, "orderdetail" => $orderdetail], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["success" => 0, "msg" => "查無此資料，請重新輸入!"]);
    }
}else {
    echo json_encode(["success" => 0, "msg" => "請輸入值!"]);
}



?>
