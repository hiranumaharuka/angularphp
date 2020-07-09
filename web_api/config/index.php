<?php
// db credentials
$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

// print_r($url);

// Connect with the database.
function connect()
{
  $connect = new mysqli($server, $username, $password, $db);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8mb4");

  return $connect;
}

$con = connect();
