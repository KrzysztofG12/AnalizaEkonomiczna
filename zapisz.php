<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="CSS/main.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>Analiza ekonomiczna</title>
		<link rel = "icon" href = "./icon.png" type = "image/png">
    </head>
    
    <body>

        <header>
			<section>
				<div class="div_naglowek">
					<h1>Analiza ekonomiczna</h1>
				</div>
				<nav>
					<ul>
						<li><a href="main.php" target="_self" >Strona Główna</a></li>
						<li><a href="zapisz.php" target="_self" id="actual">Zapisz wykres</a></li>
						<li><a href="wykresy.php" target="_self">Zapisane wykresy</a></li>
					</ul>
				</nav>
			</section>
        </header>
        
        <div class="container_zapisz">
			<div class="zapisz_lewa"></div>
			<div class="zapisz_srodek">
		
				<?php
					$con = mysqli_connect('localhost', 'root', '', 'baza_analiza');

					if (!$con)
					{
						die("Connection failed!" . mysqli_connect_error());
					}
				?>
				<form action="upload.php" method="post" enctype="multipart/form-data">
					Wybierz wykres, który chcesz zapisać:
					<br>
					<input type="file" name="file" 	required="required" accept="image/*" onchange="document.getElementById('img_podglad').src = window.URL.createObjectURL(this.files[0])">
					<br>
	
					<sup id="formaty">Dozwolone formaty to: jpg, png, jpeg, gif i pdf.</sup>
					<br><br>
					Dodaj opis wykresu.
					<br>
					<textarea type="text" name="opis" id="opis" required="required" placeholder="Wpisz opis!"></textarea>
					<br>
					<label for="waznosc">Określ ważność wykresu:</label>
					<input type="range" id="waznosc" name="waznosc" min="0" max="100" oninput="this.nextElementSibling.value = this.value">
					<output>50</output>
					<br><br>
					<input type="submit" id="przycisk_wyslij" value="Wyślij">
					<input type="reset" onclick="document.getElementById('img_podglad').src = reset" id="przycisk_wyslij">
				</form>
			</div>
			<div class="zapisz_prawa">
				<img id="img_podglad" alt=""/>
			</div>
		</div>
		
        <div class="flex-container-sm">
            <div class="faq">
                <ul>
                    <li class="stopka"><a href="main.php" target="_self">Strona Główna</a</li>
					<li class="stopka"><a href="zapisz.php" target="_self">Zapisz wykres</a></li>
                    <li class="stopka"><a href="wykresy.php" target="_self">Zapisane wykresy</a></li>	
                </ul>
            </div>
			
            <div class="faq">
				Wszelkie prawa zastrzeżone.
				<br><br>
                Wszystkie teksty, rysunki, zdjęcia oraz wszystkie inne informacje opublikowane na niniejszych stronach 
                podlegają prawom autorskim.
                <br><br>
                Wszelkie kopiowanie, dystrybucja, elektroniczne przetwarzanie oraz przesyłanie zawartości bez zezwolenia 
                jest zabronione.
                <br><br>
				Twórca strony nie bierze odpowiedzialności za inwestycje zainspirowane wynikami przeprowadzonych analiz. 
				<br><br>
            </div>
        </div>
		
        <div id="autor">
            Autor: Krzysztof Graboń
        </div>
    </body>
</html>