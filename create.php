<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include 'index.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
  print_r($request->data);
// include database connection
    try {

// insert query
        $query = "INSERT INTO posts SET title=:title, content:content, category=:category, authorId:authorId";
        // prepare query for execution
        $stmt = $db->prepare($query);
        // posted values
        $title = trim($request->data->title);
        $content = trim($request->data->content);
        $category = trim($request->data->category);
        $authorId = $request['authorId'];
        // bind the parameters
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':authorId', $authorId);
        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(array('result'=>'success'));
        } else {
            echo json_encode(array('result'=>'fail'));
        }
    }
    // show error
    catch (PDOException $exception) {
        die('ERROR: ' . $exception->getMessage());
    }
}
