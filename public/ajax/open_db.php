<?php
$servername = "localhost";
$username = "chiediml_admin";
$password = "-y3U9~;OooA0";
$dbname = "chiediml_laravel";
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
