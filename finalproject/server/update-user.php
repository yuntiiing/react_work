<?php
// update-user.php is for updating an existing user.
// Method: POST - http://localhost/php-react/update-user.php
// Required Fields: id --> EmpId, user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->Empid)
    && isset($data->EmpName)
    && isset($data->DeptId)
    && isset($data->JobTitle)
    && isset($data->City)
    && isset($data->Address)
    && isset($data->Phone)
    && is_numeric($data->Empid)
    && !empty(trim($data->EmpName))
    && !empty(trim($data->DeptId))
    && !empty(trim($data->JobTitle))
    && !empty(trim($data->City))
    && !empty(trim($data->Address))
    && !empty(trim($data->Phone))
) {
    $empname = mysqli_real_escape_string($db_connection, trim($data->EmpName));
    $deptid = mysqli_real_escape_string($db_connection, trim($data->DeptId));
    $jobtitle = mysqli_real_escape_string($db_connection, trim($data->JobTitle));
    $city = mysqli_real_escape_string($db_connection, trim($data->City));
    $address = mysqli_real_escape_string($db_connection, trim($data->Address));
    $phone = mysqli_real_escape_string($db_connection, trim($data->Phone));
    $updateUser = mysqli_query($db_connection, "UPDATE `employee` SET `EmpName`='$empname', `DeptId`='$deptid', `JobTitle`='$jobtitle', `City`='$city', `Address`='$address', `Phone`='$phone' WHERE `EmpId`='$data->Empid'");
    if ($updateUser) {
        echo json_encode(["success" => 1, "msg" => "User Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>