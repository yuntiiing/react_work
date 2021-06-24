<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->ProdName)
    && isset($data->ProdID)
    && isset($data->UnitPrice)
    && isset($data->Cost)
    && is_numeric($data->UnitPrice)
    && is_numeric($data->Cost)
    && !empty(trim($data->ProdName))
    && !empty(trim($data->ProdID))
    && !empty(trim($data->UnitPrice))
    && !empty(trim($data->Cost))
) {
    $prodname = mysqli_real_escape_string($db_connection, trim($data->ProdName));
    $prodid = mysqli_real_escape_string($db_connection, trim($data->ProdID));
    $price = mysqli_real_escape_string($db_connection, trim($data->UnitPrice));
    $cost = mysqli_real_escape_string($db_connection, trim($data->Cost));
    $insertProduct = mysqli_query($db_connection, "INSERT INTO `Product` (`ProdName`,`ProdID`,`UnitPrice`,`Cost`) VALUES($prodname,$prodid,$price,$cost)");
    if ($insertProduct) {
        echo json_encode(["success" => 1, "msg" => "新增成功"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "新增失敗，請重新輸入!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "資料輸入錯誤，請重新輸入!"]);
}
?>