<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// include database connection
include 'index.php';

// delete message prompt will be here
error_reporting(E_ERROR);
// select all data
$query = "SELECT * FROM posts";
$stmt = $db->prepare($query);
$posts = [];
if($stmt->execute())
{
  $cr = 0;
 while($row = $stmt->fetch(PDO::FETCH_ASSOC))
 {
  $posts[] = $row;
 }

 echo json_encode($posts);
}
// $stmt->execute();
// $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
// $json = json_encode($results);
// echo $json;
?>

