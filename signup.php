<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow the following methods from any origin
header("Access-Control-Allow-Methods: POST, OPTIONS");
// Allow the following headers from any origin
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Database credentials
$servername = "localhost";
$username = "id22134343_database";
$password = "Poultry@123";
$dbname = "id22134343_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if username and password are set in the request parameters
if(isset($_GET['username']) && isset($_GET['password'])) {
    $username = $_GET['username'];
    $password = $_GET['password'];

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert username and hashed password into database
    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashedPassword')";
    if ($conn->query($sql) === TRUE) {
        $response = array("success" => true, "message" => "User registered successfully");
        echo json_encode($response);
    } else {
        $response = array("success" => false, "message" => "Error registering user: " . $conn->error);
        echo json_encode($response);
    }
} else {
    $response = array("success" => false, "message" => "Username and/or password not provided.");
    echo json_encode($response);
}

// Close connection
$conn->close();
?>
