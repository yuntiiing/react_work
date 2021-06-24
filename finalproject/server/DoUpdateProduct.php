<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id)
    && isset($data->ProdName)
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
    $id = $data->id;
    $prodname = mysqli_real_escape_string($db_connection, trim($data->ProdName));
    $prodid = mysqli_real_escape_string($db_connection, trim($data->ProdID));
    $price = mysqli_real_escape_string($db_connection, trim($data->UnitPrice));
    $cost = mysqli_real_escape_string($db_connection, trim($data->Cost));
    $updateproduct = mysqli_query($db_connection, "UPDATE `Product` SET `ProdName`='$prodname', `ProdID`='$prodid' , `UnitPrice`='$price',`Cost`='$cost' WHERE `ProdId`='$id'");
    if ($updateproduct) {
        echo json_encode(["success" => 1, "msg" => "Product Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Product Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>