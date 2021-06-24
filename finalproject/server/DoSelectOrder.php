<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$order = mysqli_query($db_connection, "SELECT * FROM salesorder Order BY seq");
$employee=mysqli_query($db_connection, "SELECT DISTINCT EmpId,EmpName FROM employee");
$customer=mysqli_query($db_connection, "SELECT DISTINCT CustId,CustName FROM customer");
$product=mysqli_query($db_connection, "SELECT DISTINCT ProdID,ProdName FROM product");

if (mysqli_num_rows($order) > 0) {
    $order = mysqli_fetch_all($order, MYSQLI_ASSOC);
    $employee = mysqli_fetch_all($employee, MYSQLI_ASSOC);
    $customer = mysqli_fetch_all($customer, MYSQLI_ASSOC);
    $product = mysqli_fetch_all($product, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "order" => $order, "employee" => $employee, "customer" => $customer, "product" => $product], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0]);
}
?>
