<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->OrderId)) {
    $ordid = $data->OrderId;
    $deleteorder = mysqli_query($db_connection, "DELETE FROM `salesorder` WHERE `OrderId`='$ordid'");
    $deleteorderdetail = mysqli_query($db_connection, "DELETE FROM `orderdetail` WHERE `OrderId`='$ordid'");
    if ($deleteorder && $deleteorderdetail) {
        echo json_encode(["success" => 1, "msg" => "訂單刪除成功!"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "訂單刪除失敗!"]);
    }
}elseif (isset($data->seq)){
    $seq = $data->seq;
    $deleteorderdetail = mysqli_query($db_connection, "DELETE FROM `orderdetail` WHERE `seq`='$seq'");
    if ($deleteorderdetail) {
        echo json_encode(["success" => 1, "msg" => "訂單明細刪除成功!"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "訂單明細刪除失敗!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "刪除失敗!"]);
}
?>