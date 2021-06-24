<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->ProdID) && is_numeric($data->ProdID)) {
    $prodid = $data->ProdID;
    $deleteproduct = mysqli_query($db_connection, "DELETE FROM `Product` WHERE `ProdID`='$prodid'");
    if ($deleteproduct) {
        echo json_encode(["success" => 1, "msg" => "Product Deleted"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Product Not Found!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Product Not Found !"]);
}
?>