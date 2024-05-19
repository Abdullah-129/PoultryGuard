<?php

// Database credentials
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if username and password are set
if(isset($_GET['username']) && isset($_GET['password'])) {
    $username = $_GET['username'];
    $password = $_GET['password'];

    // Query to check if username and password exist in database
    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Username and password exist in database
        $response = array("success" => true);
        echo json_encode($response);
    } else {
        // Username and/or password do not exist in database
        $response = array("success" => false, "message" => "Invalid username or password.");
        echo json_encode($response);
    }
} else {
    $response = array("success" => false, "message" => "Username and password not provided.");
    echo json_encode($response);
}

// Close connection
$conn->close();

?>
