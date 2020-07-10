<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
if ($_POST) {

// include database connection
    include 'index.php';

    try {

// insert query
        $query = "INSERT INTO posts SET title=:title, content:content, category=:category, authorId:authorId";
        // prepare query for execution
        $stmt = $db->prepare($query);
        // posted values
        $title = $_POST['title'];
        $content = $_POST['content'];
        $category = $_POST['category'];
        $authorId = $_POST['authorId'];
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
