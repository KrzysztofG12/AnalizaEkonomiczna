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
					<h1>Analiza ekonomiczna </h1>
				</div>
		
				<nav>
					<ul>
						<li><a href="main.php" target="_self" >Strona Główna</a></li>
						<li><a href="zapisz.php" target="_self">Zapisz wykres</a></li>
						<li><a href="wykresy.php" target="_self" id="actual">Zapisane wykresy</a></li>
					</ul>
				</nav>

			</section>
        </header>
     
        <div class="container_wykresy">
			<div class="wykresy_lewa">
				<div class="div_sortowanie">
					<h2>Sortowanie</h2>
					<form method="post">
						<fieldset>
							<legend>Rodzaj</legend>
							<input type="radio" class="optradio" id="sort_data" name="optradio" value="data" required>Data
							<label class="" for="sort_data"></label>
						
							<input type="radio" class="optradio" id="sort_waznosc" name="optradio" value="waznosc" >Ważność
							<label class="" for="sort_waznosc"></label>

							<input type="radio" class="optradio" id="sort_nazwa" name="optradio" value="nazwa" >Nazwa
							<label class="" for="sort_nazwa"></label>
						</fieldset>
						<br>
						<fieldset>
							<legend>Kolejność</legend>
							<input type="radio" class="optradio2" id="sort_ASC" name="optradio2" value="ASC" required>Rosnąco
							<label class="" for="sort_ASC"></label>

							<input type="radio" class="optradio2" id="sort_DESC" name="optradio2" value="DESC" >Malejąco
							<label class="" for="sort_DESC"></label>
						</fieldset>
						<br> 	
						<input type="submit" name="btn_wyswietl" id="btn_wyswietl" value="Wyświetl wykresy"/>	
					</form>
				</div>
			</div>
			<div class="wykresy_srodek">	
			<?php
		
				if(!isset($_POST['optradio']) || !isset($_POST['optradio2'])){
					$typ = 'data';
					$kolejnosc = 'ASC';
				}else{
					$typ = $_POST['optradio'];
					$kolejnosc = $_POST['optradio2'];
				}
				
				Sortuj($typ, $kolejnosc);
		
		
				function Sortuj($rodzaj = '', $kierunek = '') {
	
					$db = mysqli_connect('localhost', 'root', '', 'baza_analiza');
					if (!$db)
					{
						die("Connection failed!" . mysqli_connect_error());
					}
			
					$query = $db->query("SELECT * FROM wykresy ORDER BY $rodzaj $kierunek");
			
					if($query->num_rows > 0){
						while($row = $query->fetch_assoc()){
							$sciezkaPliku = 'bazawykresow/'.$row["nazwa"];
							echo '<h1>';
							echo $row['id_wykresy'].'<br>';
							echo '</h1>';
							echo '<h1>';
							echo $row['nazwa'].'<br>';
							echo '</h1>';
							echo $row['data'].'<br>';
							echo "<span id='wykresy_poziom_waznosci'>" . 'Poziom ważności: '. $row['waznosc'].'<br><br>' . "</span>";
							?>
		
							<fieldset id="fieldset_opis">
								<legend>Opis</legend>
							<?php
								echo '<h3>';
								echo $row['opis'].'<br><br><br>';
								echo '</h3>';	
							?>
							</fieldset>
							<br>
							<img src="<?php echo $sciezkaPliku; ?>" alt="" id="img_wykresy"/>
						<?php 
						}
					}else{ 
					echo "<span class='brak_wykresow'>" . 'Nie posiadasz zapisanych wykresów!' . "</span>";
					}
				} 
			?>
			</div>
			<div class="wykresy_prawa">
				<div class="div_usuwanie">
					<h2>Usuń wykres</h2>
					<form method="post" action="usun.php">
						<fieldset>
							<legend>Wybierz wykres</legend>
							<select name="usun_wykres_nazwa">
								<?php	
   
								$db = mysqli_connect('localhost', 'root', '', 'baza_analiza');

								if (!$db)
								{
									die("Connection failed!" . mysqli_connect_error());
								}
								$nazwy = $db->query("SELECT * FROM wykresy");
								if($nazwy->num_rows > 0){
									while($row = $nazwy->fetch_assoc())
									{
								?>
    
								<option value="<?php echo $row['nazwa']; ?>"><?php echo 'ID:'.$row['id_wykresy'].'  | '; echo $row['nazwa']; ?></option>
   
   
								<?php 
									}
								}
								?>
							</select>
						</fieldset>

						<input type="submit" name="btn_usun" id="btn_usun" value="Usuń wykres" onclick="return confirm('Czy na pewno chcesz nieodwracalnie usunąć ten wykres?!');"/>

					</form>
				</div>

				<button onclick="naGore()" id="btn_gora" title="Na gore">Wróć na początek</button>
				<script src="js/nagore.js"></script>
	
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

