<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->startdate)
    && isset($data->enddate)
    && !empty(trim($data->startdate))
    && !empty(trim($data->enddate))
) {
    $startdate = mysqli_real_escape_string($db_connection, trim($data->startdate));
    $enddate = mysqli_real_escape_string($db_connection, trim($data->enddate));
    $sales = mysqli_query($db_connection, "SELECT customer.CustId, CustName,sum(Qty*UnitPrice*Discount) as Total,sum(Qty*(UnitPrice*Discount-Cost)) as Profit
    FROM customer,salesorder,orderdetail,product
    WHERE customer.CustId=salesorder.CustId AND
    salesorder.OrderId=orderdetail.OrderId AND
    orderdetail.ProdId=product.ProdID AND
    OrderDate BETWEEN '$startdate' AND '$enddate'
    GROUP BY customer.CustId,CustName");
    $salesreport = mysqli_fetch_all($sales, MYSQLI_ASSOC);
    if ($salesreport){
        echo json_encode(["success" => 1, "sales" => $salesreport, JSON_UNESCAPED_UNICODE ,"msg"=> "查詢成功"]);
    } else{
        echo json_encode(["success" => 0,"msg"=> "查無資料，請重新輸入!"]);
    }
} else {
    echo json_encode(["success" => 0,"msg"=>"資料輸入錯誤，請重新輸入!"]);
}
?>
