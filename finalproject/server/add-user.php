<?php
// add-user.php is for inserting new users into the database.
// Method: POST - http://localhost/php-react/add-user.php
// Required Fields – user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->EmpName)
    && isset($data->DeptId)
    && isset($data->JobTitle)
    && isset($data->City)
    && isset($data->Address)
    && isset($data->Phone)
    && !empty(trim($data->EmpName))
    && !empty(trim($data->DeptId))
    && !empty(trim($data->JobTitle))
    && !empty(trim($data->City))
    && !empty(trim($data->Address))
    && !empty(trim($data->Phone))
) {
    $empname = mysqli_real_escape_string($db_connection, trim($data->EmpName));
    $deptid = mysqli_real_escape_string($db_connection, trim($data->DeptId));
    $JobTitle = mysqli_real_escape_string($db_connection, trim($data->JobTitle));
    $city = mysqli_real_escape_string($db_connection, trim($data->City));
    $address = mysqli_real_escape_string($db_connection, trim($data->Address));
    $phone = mysqli_real_escape_string($db_connection, trim($data->Phone));
    $insertUser = mysqli_query($db_connection, "INSERT INTO `employee`(`EmpName`,`DeptId`,`JobTitle`,`City`,`Address`,`Phone`) VALUES('$empname','$deptid','$JobTitle','$city','$address','$phone')");
    if ($insertUser) {
        $last_id = mysqli_insert_id($db_connection);
        echo json_encode(["success" => 1, "msg" => "User Inserted.", "id" => $last_id]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>