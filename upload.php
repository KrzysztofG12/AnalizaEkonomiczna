<?php

$db = mysqli_connect('localhost', 'root', '', 'baza_analiza');

	if (!$db)
        {
            die("Połączenie nieudane!" . mysqli_connect_error());
        }
$wiadomosc = '';
$folderDocelowy = "bazawykresow/";
$nazwaPliku = basename($_FILES["file"]["name"]);
$sciezkaPliku = $folderDocelowy . $nazwaPliku;
$typPliku = pathinfo($sciezkaPliku,PATHINFO_EXTENSION);
$opis = $_POST["opis"];
$waznosc = $_POST["waznosc"];
$dozwoloneTypy = array('jpg','png','jpeg','gif','pdf');

if(!empty($_FILES["file"]["name"])){
    if(in_array($typPliku, $dozwoloneTypy)){
        if(move_uploaded_file($_FILES["file"]["tmp_name"], $sciezkaPliku)){
            $insert = $db->query("INSERT into wykresy (nazwa, opis, waznosc, data)
			VALUES ('".$nazwaPliku."', '".$opis."', '".$waznosc."', NOW())");
            if($insert){
                header('Location: zapisz.php');
            }else{
                $wiadomosc = "Niepowodzenie w przesłaniu pliku, spróbuj ponownie.";
            } 
        }else{
            $wiadomosc = "Wystąpił problem w wysłaniu pliku.";
        }
    }else{
        $wiadomosc = 'Tylko formaty plików: JPG, JPEG, PNG, GIF, & PDF są dozwolne.';
    }
}else{
    $wiadomosc = 'Wybierz plik który chcesz przesłać.';
}
echo $wiadomosc;	
?>
