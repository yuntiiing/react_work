<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->OrderId)
    &&isset($data->EmpId)
    && isset($data->CustId)
    && isset($data->OrderDate)
    && isset($data->Descript)
    && !empty(trim($data->OrderId))
    && !empty(trim($data->EmpId))
    && !empty(trim($data->CustId))
    && !empty(trim($data->OrderDate))
) {
    $orderid = $data->OrderId;
    $empid = mysqli_real_escape_string($db_connection, trim($data->EmpId));
    $custid = mysqli_real_escape_string($db_connection, trim($data->CustId));
    $orderdate = mysqli_real_escape_string($db_connection, trim($data->OrderDate));
    $descript = mysqli_real_escape_string($db_connection, trim($data->Descript));
    $updateorder = mysqli_query($db_connection, "UPDATE `salesorder` SET `EmpId`='$empid', `CustId`='$custid', `OrderDate`='$orderdate',`Descript`='$descript' WHERE `OrderId`='$orderid'");
    if ($updateorder) {
        echo json_encode(["success" => 1, "msg" => "訂單更新成功!"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "訂單更新失敗，請重新輸入!"]);
    }
} elseif (
    isset($data->seq)
    &&isset($data->ProdId)
    && isset($data->Qty)
    && isset($data->Discount)
    && !empty(trim($data->ProdId))
    && !empty(trim($data->Qty))
    && !empty(trim($data->Discount))
) {
    $seq = $data->seq;
    $prodid = mysqli_real_escape_string($db_connection, trim($data->ProdId));
    $qty = mysqli_real_escape_string($db_connection, trim($data->Qty));
    $discount = mysqli_real_escape_string($db_connection, trim($data->Discount));
    $updateorderdetail = mysqli_query($db_connection, "UPDATE `orderdetail` SET `ProdId`='$prodid', `Qty`='$qty', `Discount`='$discount' WHERE `seq`='$seq'");
    if ($updateorderdetail) {
        echo json_encode(["success" => 1, "msg" => "訂單明細更新成功!"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "訂單明細更新失敗，請重新輸入!"]);
    }

}
else {
    echo json_encode(["success" => 0, "msg" => "請輸入值!"]);
}
?>