<?php
	include '../open_db.php';

	if(!isset($_POST['value'])){
		// GETTING DATA
		$req_id = $_GET['user_id'];
		$req_layout = $_GET['layout'];
		$sql = "SELECT `{$req_layout}` FROM layouts WHERE `creator` = '{$req_id}'";
	
		$result = $conn->query($sql);
		
		foreach($result as $row => $column) {
	        echo $column[$req_layout];
	    }
	
	}
	else if(isset($_POST['value'])){
		// SAVING DATA
		$req_value = $_POST['value'];
		$req_id = $_POST['user_id'];
		$req_layout = $_POST['layout'];

		$sql = "UPDATE `layouts` SET `{$req_layout}` = '{$req_value}' WHERE `creator` = '{$req_id}'";
		$conn->query($sql);

	}

	
	$conn->close();

?>