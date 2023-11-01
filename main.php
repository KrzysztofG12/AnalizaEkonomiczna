<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="CSS/main.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>Analiza ekonomiczna</title>
		<link rel = "icon" href = "./grafiki/icon.png" type = "image/png">
    </head>
    
    <body>
        <header>
			<section>
      
				<div class="div_naglowek">
					<h1>Analiza ekonomiczna</h1>
				</div>
		
				<nav>
					<ul>
						<li><a href="main.php" target="_self" id="actual">Strona Główna</a></li>
						<li><a href="zapisz.php" target="_self">Zapisz wykres</a></li>
						<li><a href="wykresy.php" target="_self">Zapisane wykresy</a></li>
					</ul>
				</nav>
			</section>
		</header>
		
        <div class="div_container_main">
			<div class="div_main_lewa" id="div_main_lewa" >
				<div id="div_statystyki" style="display: none;"></div>
			</div>
			
			<div class="div_main_srodek">
				<div class="div_wybierz_plik" id="div_wybierz_plik" style="display: block;">
					Wybierz plik CSV, który chcesz przeanalizować:
					<br>
					<input type="file" name="inpt_plik_analiza" id="inpt_plik_analiza" accept="text/*">
					<button id="btn_wyswietl_formularz" class="btn_all" onclick="zatwiedzPlik()" disabled="true">Zatwierdź</button>
					<br>
					<sup id="formaty">Wartości w pliku muszą być oddzielone przecinkami i mogą zawierać tylko liczby!</sup>
				</div>
	
				<div class="div_srodek_dane" id="div_srodek_dane"style="display: none;">	
					<br>
					<label for="inpt_nazwa_tytul">Podaj tytuł wykresu:</label>
					<input type="text" name="inpt_nazwa_tytul" id="inpt_nazwa_tytul" value="Mój wykres" required="required">
					<br><br>
					<label for="inpt_nazwa_tytulY">Podaj tytuł osi Y:</label>
					<input type="text" name="inpt_nazwa_tytulY" id="inpt_nazwa_tytulY" value="Cena" required="required">
					<br><br>
					<label for="sel_nazwa_data">Wybierz nazwę kolumny zawierajacej daty:</label>
					<br>
					<select id="sel_nazwa_data" name="sel_nazwa_data">
						<option value="" selected disabled hidden>Wybierz kolumnę z datami</option>
						<option id="index_x" name="index_x"></option>
					</select>
					<br><br>
					<label for="sel_format_data">Wybierz format daty, który zawiera plik CSV:</label>
					<br>
					<select id="sel_format_data" name="sel_format_data">
						<option value="" selected disabled hidden>Wybierz format daty</option>
						<option value="YYYY-MM-DD">YYYY-MM-DD</option>
						<option value="DD-MM-YYYY">DD-MM-YYYY</option>
						<option value="MM-DD-YYYY">MM-DD-YYYY</option>
						<option value="DD-MM-YY">DD-MM-YY</option>
						<option value="MM-DD-YY">MM-DD-YY</option>
						<option value="YY-MM-DD">YY-MM-DD</option>
					</select>
					<br><br>
					<label for="sel_kolejnosc_data">Wybierz kolejność dat z pliku:</label>
					<br>
					<select id="sel_kolejnosc_data" name="sel_kolejnosc_data">
						<option value="Rosnąco">Rosnąco</option>
						<option value="Malejąco">Malejąco</option>
					</select>
					<br><br>
					<label for="inpt_ilosc_kolumn">Podaj ilosc kolumn:</label>
					<input type="number" name="inpt_ilosc_kolumn" id="inpt_ilosc_kolumn" min="1" value="1">
					<br>
					<button id="btn_zatwierdz_ilo_kol" onclick="zatwiedzTytulyKolumny()" class="btn_all">Zatwierdź</button>
				</div>
	
				<div class="div_srodek_wybierz_kolumny" id="div_srodek_wybierz_kolumny" style="display: none;">	
					<label for="sel_nazwa_kolumny0">Wybierz kolumny do zobrazowania:</label>
					<br>
					<select id="sel_nazwa_kolumny0" name="sel_nazwa_kolumny0" class="sel_nazwa_kolumny0">
						<option value="" selected disabled hidden>Wybierz kolumnę!</option>
						<option id="wybierz_kolumne"></option>
					</select>
					<br>
					<div class="div_klonuj_kolumny" id="div_klonuj_kolumny"></div>
				</div>
				
				<div id="div_btn_analizuj" style="display: none;">
					<br>	
					<button class="btn_all" id="btn_analizuj" onclick="generujWykres()" style="display: block;" disabled="true">Generuj</button>
				</div>
 
				<br><br>	
				
				<div id="div_wyswietl_wykres" style="display: block;"></div>	
	
				<div id="div_opcje_przewidz" style="display: none;  margin-left: 10%;">
					<label for="sel_nazwa_kolumny_przewidz">Wybierz nazwę kolumny do przewidzenia:</label>
					<br>
					<select id="sel_nazwa_kolumny_przewidz" name="sel_nazwa_kolumny_przewidz" class="sel_nazwa_kolumny_przewidz">
					</select>
					<br><br>
					<label for="sel_rodzaj_sredniej">Wybierz rodzaj liczenia średniej:</label>
					<br>
					<select id="sel_rodzaj_sredniej" name="sel_rodzaj_sredniej">
						<option value="SMA">SMA - Simple Moving Average</option>
						<option value="EMA">EMA - Exponential Moving Average</option>
					</select>
					<br><br>
					<label for="dokladnosc">Wybierz dokładność analizy:</label>
					<button class="btn_all" onclick="pokazOpis(opis_dokladnosc)">Więcej informacji</button>
					<br>
					<span id="span_opis_dokladnosc" class="dodatkowe_opisy" style="display: none;">Im większa ilość powtórzeń, których program używa do wytrenowania modelu - tym dłuższy czas trwania analizy, jednak poprawia się jej dokładność.</span>
					<select id="dokladnosc" name="dokladnosc">
						<option value="25 Powtórzeń">Zwykła - 25 powtórzeń</option>
						<option value="50 Powtórzeń">Dokładniejsza - 50 powtórzeń</option>
						<option value="100 Powtórzeń">Superdokładna - 100 powtórzeń</option>
						<option value="200 Powtórzeń">Najdokładniejsza - 200 powtórzeń</option>
					</select>
					<br><br>
					<label for="dzielnik">Wybierz ilość danych:</label>
					<button class="btn_all" onclick="pokazOpis(opis_dzielnik)">Więcej informacji</button>
					<br>
					<span id="span_opis_dzielnik" class="dodatkowe_opisy" style="display: none;">W przypadku większych pakietów danych czas analizy może znacznie się wydłużyć, w takim przypadku wybierz mniejszą ilość danych.
					Zmniejszenie ilości danych może wpłynąć na wyniki analizy, ponieważ program używa tylko ostatnich procent danych.</span>
					<select id="dzielnik" name="dzielnik">
						<option value=1>100% danych</option>
						<option value=2>50% danych</option>
						<option value=3>33% danych</option>
						<option value=5>20% danych</option>
					</select>
					<br><br>
					<label for="rozmiar_okna">Wybierz rozmiar okna:</label>
					<button class="btn_all" onclick="pokazOpis(opis_okno)">Więcej informacji</button>
					<br>
					<span id="span_opis_okno" class="dodatkowe_opisy" style="display: none;">Im częstsze zmiany cen, tym niższy powinien być rozmiar okna.</span>
					<select id="rozmiar_okna" name="rozmiar_okna">
						<option value="7">7</option>
						<option value="15">15</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="200">200</option>
					</select>
					<br><br>					
					<label for="inpt_dni_pomiedzy">Podaj co ile dni notowane były ceny akcji:</label>
					<input type="number" name="inpt_dni_pomiedzy" id="inpt_dni_pomiedzy" min="1" max="365" value="1">
					<br><br>
					<button class="btn_all" id="btn_przewidz" onclick="wczytajDaneDoAnalizy()">Uruchom</button>  
				</div>

				<div id="div_ostrzezenie_ladowania" style="display: none;">
					<div id="div_procent_ladowania"></div>
					<h1>Trwa ładowanie predykcji.</h1>
					<sup>W celu poprawnego działania programu proszę nie przełączać okna przeglądarki!</sup>
				</div>
                           
				<div id="div_wyswietl_wykres_przewidz" style="display: block; margin-bottom: 50px;"></div>
			</div>

			<div class="div_main_prawa">
				<div id="div_czas_trwania_analizy" style="display: none;"></div>
				<textarea id="error"></textarea>
				<textarea id="error2"></textarea>
			</div>
			
        </div>
		
		<script src="https://cdn.jsdelivr.net/npm/danfojs@1.1.1/lib/bundle.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
		<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
		<script src="./JS/analiza.js"></script>
		<script src="./JS/model.js"></script>
		
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