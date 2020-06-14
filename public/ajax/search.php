<?php
include 'open_db.php';

$q = $_REQUEST["q"];
$q = "%" . $q . "%";
$hint = "";
//$sql = "SELECT * FROM songs";
$sql = "SELECT title,artist,version,slug FROM songs WHERE title LIKE ? LIMIT 10";//'%".$q."%'";
// $result = $conn->query($sql);
$statment = $conn->prepare($sql);
$statment->bind_param("s", $q);
$statment->execute();
// get the q parameter from URL
$res = $statment->get_result()->fetch_all(MYSQLI_ASSOC);
$songs = [];

foreach ($res as $song) {
    $son["title"] = $song["title"];
    $son["artist"] = $song["artist"] ;
    $son["version"] = $song["version"] ;
    $son["slug"] = $song["slug"] ;
    $songs[] = $son;
}

echo json_encode($songs);
$conn->close();
?>
