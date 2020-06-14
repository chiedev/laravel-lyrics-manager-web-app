<?php
include 'open_db.php';
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

$hint = "";
if (isset($_REQUEST["user"])){
    // get the 'user' parameter from URL
    $user = $_REQUEST["user"];
    if ($user !== "") {
        foreach($result as $row => $column) {
            if ($column['username'] === $user) {
                if ($hint === "") {
                    $hint = "<li id='tip' class='red'></li><span class='red'>already exists</span>";
                }
            }
        }
    }
    echo $hint === "" ? "<li id='tip' class='green'></li><span class='green'>available</span>" : $hint;
}
else if (isset($_REQUEST["email"])){
    // get the 'email' parameter from URL
    $email = $_REQUEST["email"];
    if ($email !== "") {
        foreach($result as $row => $column) {
            if ($column['email'] === $email) {
                if ($hint === "") {
                    $hint = "<li id='tip' class='red'></li><span class='red'>already exists</span>";
                }
            }
        }
        if ($hint === "") {
            if (filter_var($email, FILTER_VALIDATE_EMAIL)){
                $hint = "<li id='tip' class='green'></li><span class='green'>available</span>";
            }
        }
    }
    echo $hint === "" ? "<li id='tip'></li><span>required</span>" : $hint;
}
else if (isset($_REQUEST["pass"])){
    // get the 'email' parameter from URL
    $pass = $_REQUEST["pass"];
    $hint = "<div id='level'></div><li>Weak</li> <li>Normal</li> <li>Good</li> <li>Strong</li>";
    echo $hint;
}


$conn->close();
?>