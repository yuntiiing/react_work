<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

$mysqli = new mysqli("localhost","root","","mmisdb2");
$mysqli->begin_transaction();
try {
    if (!$mysqli->query("CALL GetOrderSeq(@salesorder_seq, @salesorder_OrderId, @orderdetail_seq)")) {}
    if (!($res = $mysqli->query("SELECT @salesorder_seq, @salesorder_OrderId, @orderdetail_seq"))) {}

    $row = $res->fetch_assoc();
    $salesorder_seq = $row['@salesorder_seq'];
    $salesorder_OrderId = $row['@salesorder_OrderId'];
    $orderdetail_seq = $row['@orderdetail_seq'];

    if (
        isset($data->EmpId)
        && isset($data->CustId)
        && isset($data->OrderDate)
        && isset($data->ProdId)
        && isset($data->Qty)
        && is_numeric($data->Qty)
        && !empty(trim($data->EmpId))
        && !empty(trim($data->CustId))
        && !empty(trim($data->OrderDate))
        && !empty(trim($data->ProdId))
        && !empty(trim($data->Qty))
        && !empty(trim($data->Discount))
    ) {
        $empid = mysqli_real_escape_string($db_connection, trim($data->EmpId));
        $custid = mysqli_real_escape_string($db_connection, trim($data->CustId));
        $orderdate = mysqli_real_escape_string($db_connection, trim($data->OrderDate));
        $descript = mysqli_real_escape_string($db_connection, trim($data->Descript));
        $insertOrder = mysqli_query($db_connection, "INSERT INTO `salesorder` (`seq`, `OrderId`, `EmpId`, `CustId`, `OrderDate`, `Descript`) VALUES ($salesorder_seq+1, '$salesorder_OrderId', '$empid', '$custid', '$orderdate', '$descript');");
        
        $prodid = mysqli_real_escape_string($db_connection, trim($data->ProdId));
        $qty = mysqli_real_escape_string($db_connection, trim($data->Qty));
        $discount = mysqli_real_escape_string($db_connection, trim($data->Discount));
        $insertOrderdetail = mysqli_query($db_connection, "INSERT INTO `orderdetail` (`seq`, `OrderId`, `ProdId`, `Qty`, `Discount`) VALUES ($orderdetail_seq+1, '$salesorder_OrderId', '$prodid', '$qty', '$discount');");
        if ($insertOrder || $insertOrderdetail) {
            echo json_encode(["success" => 1, "msg" => "訂單新增成功!", "seq" => $salesorder_seq+1 , "OrderId" =>$salesorder_OrderId ,"seqo" =>$orderdetail_seq+1]);
        } else {
            echo json_encode(["success" => 0, "msg" => "訂單新增失敗!"]);
        }
    } elseif(
        isset($data->OrderId)
        && isset($data->ProdId)
        && isset($data->Qty)
        && isset($data->Discount)
        && is_numeric($data->Qty)
        && !empty(trim($data->OrderId))
        && !empty(trim($data->ProdId))
        && !empty(trim($data->Qty))
        && !empty(trim($data->Discount)))
    {
        $orderId = mysqli_real_escape_string($db_connection, trim($data->OrderId));
        $prodid = mysqli_real_escape_string($db_connection, trim($data->ProdId));
        $qty = mysqli_real_escape_string($db_connection, trim($data->Qty));
        $discount = mysqli_real_escape_string($db_connection, trim($data->Discount));
        $insertOrderdetail = mysqli_query($db_connection, "INSERT INTO `orderdetail` (`seq`, `OrderId`, `ProdId`, `Qty`, `Discount`) VALUES ($orderdetail_seq+1, '$orderId', '$prodid', '$qty', '$discount');");
        if ($insertOrderdetail) {
            echo json_encode(["success" => 1, "msg" => "訂單明細新增成功!", "seq" => $orderdetail_seq+1]);
        } else {
            echo json_encode(["success" => 0, "msg" => "訂單明細新增失敗!"]);
        }
    }
    else {
        echo json_encode(["success" => 0, "msg" => "輸入資料有誤，請輸入訂單資料!"]);
    }
    
    $mysqli->commit();

} catch (mysqli_sql_exception $exception) {
    $mysqli->rollback();
}
$mysqli->close();
?>