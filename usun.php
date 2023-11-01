<?php 

	$db = mysqli_connect('localhost', 'root', '', 'baza_analiza');

    if (!$db){
		die("Connection failed!" . mysqli_connect_error());
    }
		
$nazwa = $_POST["usun_wykres_nazwa"];
$folder = "bazawykresow/";
		
		if(isset($_POST["usun_wykres_nazwa"])) 
		{ 
			$delete = $db->query("DELETE FROM `wykresy` WHERE `wykresy`.`nazwa` = '".$nazwa."'");
			!unlink( $folder . $nazwa);
		}    
		
header('Location: wykresy.php'); 
?>

 