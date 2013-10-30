<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Page Title</title>
</head>
<body>
	
	<!-- URL encoding for _GET request -->
	
	<a href="php.php?dot=
	<?php echo urlencode("is cute") ?>&cat=lalaith"><?php echo htmlspecialchars("<click> me! <click> me!"); ?></a>
		
	<?php
	
	// Getting form _POST information
	
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	echo "{$username}: {$password}";
	
	?>	
	
</body>
</html>
