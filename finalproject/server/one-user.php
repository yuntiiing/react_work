<?php
// all-users.php is to fetch all users that exist in the database.
// Method: GET - http://localhost/php-react/all-users.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data=json_decode(file_get_contents("php://input"));

if (isset($data->id)
    && isset($data->phone)
    && is_numeric($data->id)
    && !empty(trim($data->id))
    && !empty(trim($data->phone))
    ) {
    $id = $data->id;
    $phone = $data->phone;
    $user = mysqli_query($db_connection, "SELECT EmpId as id ,EmpName as `name`, DeptName, Phone, JobTitle FROM employee,dept WHERE EmpId='$id' and Phone='$phone' and employee.DeptId=dept.DeptId");
    if (mysqli_num_rows($user) > 0) {
        $users = mysqli_fetch_assoc($user);
        echo json_encode(["success" => 1, "user" => $users], JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo json_encode(["success" => 0,"msg" => "User Not Found"]);
    }
}else {
    echo json_encode(["success" => 0]);
}


?>
