//div
const div_srodek_dane = document.getElementById('div_srodek_dane');
const div_srodek_wybierz_kolumny = document.getElementById('div_srodek_wybierz_kolumny'); 
const div_wybierz_plik = document.getElementById('div_wybierz_plik'); 
const div_btn_analizuj = document.getElementById('div_btn_analizuj');
const div_wyswietl_wykres = document.getElementById('div_wyswietl_wykres'); 
const div_ostrzezenie_ladowania = document.getElementById('div_ostrzezenie_ladowania'); 
const div_czas_trwania_analizy = document.getElementById('div_czas_trwania_analizy'); 
const div_opcje_przewidz = document.getElementById('div_opcje_przewidz'); 
const div_statystyki = document.getElementById('div_statystyki'); 

//button
const btn_analizuj = document.getElementById('btn_analizuj');
const btn_zatwiedzIloKol = document.getElementById('btn_zatwierdz_ilo_kol'); 
const btn_wyswietl_formularz = document.getElementById('btn_wyswietl_formularz'); 
const btn_przewidz = document.getElementById('btn_przewidz'); 

//input
const inpt_ilosc_kolumn = document.getElementById('inpt_ilosc_kolumn'); 

//select
const sel_nazwa_kolumny_przewidz = document.getElementById('sel_nazwa_kolumny_przewidz'); 

//span
const opis_okno = document.getElementById('span_opis_okno'); 
const opis_dzielnik = document.getElementById('span_opis_dzielnik'); 
const opis_dokladnosc = document.getElementById('span_opis_dokladnosc'); 


document.getElementById("inpt_plik_analiza").onchange = ({
      target: { value },
	}) => {   
		btn_wyswietl_formularz.disabled = false;
	}
	
function zatwiedzPlik(){
	if (div_srodek_dane.style.display === "none") {
		div_srodek_dane.style.display = "block";
	}
 
	if (div_wybierz_plik.style.display === "block") {
		div_wybierz_plik.style.display = "none";
	}
	
	const plik_do_analizy = document.getElementById('inpt_plik_analiza').files[0];
	const ilosc_kolumn_plot = document.getElementById('inpt_ilosc_kolumn').value; 

    dfd.readCSV(
			plik_do_analizy
        )
        .then(df => {
					
		sel_nazwa_data = document.getElementById('sel_nazwa_data');
	
		for(let i = 0;i < df.shape[1]; i++){
			let opcja = document.createElement('option');
			opcja.value = df.columns[i];
			opcja.innerHTML = df.columns[i];
			sel_nazwa_data.appendChild(opcja);
		}	
		
		document.getElementById("inpt_ilosc_kolumn").max = df.shape[1]-1;			

		sel_nazwa_kolumny = document.getElementById('sel_nazwa_kolumny0');	

		for(let j = 0; j < df.shape[1]; j++){
			let opcja = document.createElement('option');
			opcja.value = df.columns[j];
			opcja.innerHTML = df.columns[j];
			sel_nazwa_kolumny.appendChild(opcja);
		}	

		}).catch(err => {
              alert(err);  
		});	
}

		
function zatwiedzTytulyKolumny(){
	if(document.getElementById('inpt_nazwa_tytulY').value == 0){
			alert("Wpisz tytuł osi Y!")
                return false;
	}else if(document.getElementById('inpt_nazwa_tytul').value == 0){
			alert("Wpisz tytuł wykresu!")
                return false;
	}
	else if (document.getElementById('sel_nazwa_data').value == 0)
	{
            alert("Wybierz kolumnę z datami!")
                return false;
    }else if (document.getElementById('sel_format_data').value == 0)
	{
            alert("Wybierz format dat!")
                return false;
    }else{   
	
		btn_analizuj.disabled = false;
		if (div_srodek_dane.style.display === "block") {
			div_srodek_dane.style.display = "none";
		}
		if (div_srodek_wybierz_kolumny.style.display === "none") {
			div_srodek_wybierz_kolumny.style.display = "block";
		}
		if (div_btn_analizuj.style.display === "none") {
			div_btn_analizuj.style.display = "block";
		}
	
		ilosc_kolumn_plot = document.getElementById('inpt_ilosc_kolumn').value; 
		let wybrany_indeks = document.getElementById('sel_nazwa_data').value;
	
		for (let y = 1; y < ilosc_kolumn_plot; y++){
			let klon = sel_nazwa_kolumny0.cloneNode(true);
			klon.id = 'sel_nazwa_kolumny' + y;
			klon.classList.add('kopie');
			div_klonuj_kolumny.before(klon);

			
			$(document).ready(function(){
				$('select').on('change', function(event) {
					let poprzednia = $(this).data('previous');
					$('select').not(this).find('option[value="'+poprzednia+'"]').show();    
					let wartosc = $(this).val();
					$(this).data('previous',wartosc);
					$('select').not(this).find('option[value="'+wartosc+'"]').hide();
				});
			});
		}
	}
}

	$(document).ready(function(){
		$('#sel_nazwa_data').on('change', function(event) {
			let poprzednia_data = $(this).data('previous');
			$('#sel_nazwa_kolumny0').not(this).find('option[value="'+poprzednia_data+'"]').show();
			let wartosc_data= $(this).val(); 
			$(this).data('previous',wartosc_data);
			$('#sel_nazwa_kolumny0').not(this).find('option[value="'+wartosc_data+'"]').hide();
		});
	});

let tytul;
let ytytul;

function generujWykres(){
	
	if($('option[disabled]:selected').length !== 0){ 
		alert("Wybierz wszystkie kolumny!");
	}else{
		
		if (div_btn_analizuj.style.display === "block") {
			div_btn_analizuj.style.display = "none";
		}	
		if (div_srodek_dane.style.display === "block") {
			div_srodek_dane.style.display = "none";
		}
		if (div_srodek_wybierz_kolumny.style.display === "block") {
			div_srodek_wybierz_kolumny.style.display = "none";
		}
		if (div_opcje_przewidz.style.display === "none") {
			div_opcje_przewidz.style.display = "block";
		}
		if (div_statystyki.style.display === "none") {
			div_statystyki.style.display = "block";
		}		
			
		plik_do_analizy = document.getElementById('inpt_plik_analiza').files[0];		
		ilosc_kolumn_plot = document.getElementById('inpt_ilosc_kolumn').value; 
		let sel_format_data_val = document.getElementById('sel_format_data').value; 
		let index_x = document.getElementById('sel_nazwa_data').value; 
		let sel_kolejnosc_val = document.getElementById('sel_kolejnosc_data').value; 
		tytul = document.getElementById('inpt_nazwa_tytul').value;
		ytytul = document.getElementById('inpt_nazwa_tytulY').value;

        dfd.readCSV(
			plik_do_analizy
        )
        .then(df => {
			
			df.dropNa({ axis: 1, inplace: true });
						
			df.asType(index_x, "string");	
			
			
	
			let tab_zawartosc_kolumny = [];
			
			for(let n = 0; n < ilosc_kolumn_plot; n++){
				
				this["tab_zawartosc_kolumny"+n] = df.column(document.getElementById('sel_nazwa_kolumny'+n).value);
					
				div_statystyki.innerHTML +=  '<br>' + document.getElementById('sel_nazwa_kolumny'+n).value + '<br>';
				div_statystyki.innerHTML += " Min: " + this["tab_zawartosc_kolumny"+n].min({ axis: 0 }).toFixed(2)  + '<br>';
				div_statystyki.innerHTML += " Max: " + this["tab_zawartosc_kolumny"+n].max({ axis: 0 }).toFixed(2)  + '<br>';	
				div_statystyki.innerHTML += " Średnia: " + this["tab_zawartosc_kolumny"+n].mean({ axis: 0 }).toFixed(2)  + '<br>';
				div_statystyki.innerHTML += " Mediana: " + this["tab_zawartosc_kolumny"+n].median({ axis: 0 }).toFixed(2) + '<br>';	
				div_statystyki.innerHTML += " Wariancja: " + this["tab_zawartosc_kolumny"+n].var({ axis: 0 }).toFixed(2) + '<br>';
				div_statystyki.innerHTML += " Odchylenie standardowe: " + this["tab_zawartosc_kolumny"+n].std({ axis: 0 }).toFixed(2) + '<br>';	
			}
			
			if(sel_kolejnosc_val === "Malejąco"){
				df.sortValues(index_x, { ascending: true, inplace: true });
			};
						
			let test_daty = df.at(0, index_x);			
			const tab_Znaki = ["-","/",".",":","_","+"]; 
			
			let jestZnak = tab_Znaki.some(element => {
				if (test_daty.includes(element)) {
					return true;
				}
				return false;
			});
 
			if(!jestZnak){
				let daty_nazwa = "Daty";
				let dobre_daty = [];
				
				switch (sel_format_data_val) {

					case ("MM-DD-YYYY") :
    
						for(let f = 0; f < df.shape[0]; f++){
							dobre_daty[f] = df.at(f, index_x);		
							if(dobre_daty[f].length == 7){
								dobre_daty[f] = "0" + dobre_daty[f]; 
							}
							dobre_daty[f] = dobre_daty[f].replace(/(\d{2})(\d{2})(\d{4})/g, '$3-$1-$2');
						}
					break;
					
					case ("DD-MM-YYYY") :
      
						for(let f = 0; f < df.shape[0]; f++){
							dobre_daty[f] = df.at(f, index_x);
							if(dobre_daty[f].length == 7){
								dobre_daty[f] = "0" + dobre_daty[f]; 
							}
							dobre_daty[f] = dobre_daty[f].replace(/(\d{2})(\d{2})(\d{4})/g, '$3-$2-$1');
						}
					break;
					
					case ("YYYY-MM-DD") :
       
						for(let f = 0; f < df.shape[0]; f++){
							dobre_daty[f] = df.at(f, index_x);
							dobre_daty[f] = dobre_daty[f].replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
						}
					break;
					
					case ("DD-MM-YY") :
					
						for(let f = 0; f < df.shape[0]; f++){
							dobre_daty[f] = df.at(f, index_x);
							if(dobre_daty[f].length == 5){
								dobre_daty[f] = "0" + dobre_daty[f]; 
							}	
							dobre_daty[f] = dobre_daty[f].replace(/(\d{2})(\d{2})(\d{2})/g, '$3-$2-$1');
						}
					break;
					
					case ("YY-MM-DD") :
					
						for(let f = 0; f < df.shape[0]; f++){
							dobre_daty[f] = df.at(f, index_x);
							if(dobre_daty[f].length == 5){
								dobre_daty[f] = "0" + dobre_daty[f]; 
							}	
							dobre_daty[f] = dobre_daty[f].replace(/(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3');
						}
					break;
					
					case ("MM-DD-YY") :
					
						for(let f = 0; f < df.shape[0]; f++){
							dobre_daty[f] = df.at(f, index_x);
							if(dobre_daty[f].length == 5){
								dobre_daty[f] = "0" + dobre_daty[f]; 
							}	
							dobre_daty[f] = dobre_daty[f].replace(/(\d{2})(\d{2})(\d{2})/g, '$3-$1-$2');
						}
					break;
					default:	  
				}	
				
				df.drop({ columns: [index_x], inplace: true });
				df.addColumn(daty_nazwa, dobre_daty, { inplace: true });
				df_poczatek_data = df.loc({ rows: [0], columns: [daty_nazwa] });
				df_koniec_data = df.loc({ rows: [df.shape[0]-1], columns: [daty_nazwa] });
				df.sortValues(daty_nazwa, { ascending: true, inplace: true });
				df.setIndex({column: daty_nazwa, drop: true, inplace: true});		
			}else{
			df_poczatek_data = df.loc({ rows: [0], columns: [index_x] })
			df_koniec_data = df.loc({ rows: [df.shape[0]-1], columns: [index_x] })
			df.setIndex({column: index_x, drop: true, inplace: true})
			}		

			for(let j = 0; j < df.shape[1]; j++){
				let opcja = document.createElement('option');
				opcja.value = df.columns[j];
				opcja.innerHTML = df.columns[j];
				sel_nazwa_kolumny_przewidz.appendChild(opcja);
			}	
	
			const tab_kolorow = ['red', 'blue', 'green', 'purple', 'cyan', 'pink',
					'orange', 'black', '#00ff00', 'yellow', '#6600cc', '#997300'];
					
			let layout = {
				colorway : tab_kolorow,
				paper_bgcolor: '#2F4F4F',
				plot_bgcolor: '#ffecb3',
				font: {color: 'white', size: 16},
				colorscale:{
					diverging: true,
					autocolorscale: true
				},
				title: {
					text: tytul,
					xanchor: "center"
				},
				legend: {
					bgcolor: "#ffdf80",
					bordercolor: "gold",
					borderwidth: 1,
					font: { family: "Arial", size: 20, color: "#2F4F4F" },
				},
				width: 1400,
				yaxis: {
					title: ytytul,
					linecolor: '#b38600',
					linewidth: 3,
					xanchor: "center"
				},
				xaxis: {
					title: "Data",
					xanchor: "center",
					linecolor: '#b38600',
					linewidth: 3,
					autorange: true,
					range: [df_poczatek_data, df_koniec_data],
					rangeselector: {  
						bgcolor: '#b38600',
						buttons: [
						{
							count: 1,
							label: '1m',
							step: 'month',
							stepmode: 'backward',		
						},
						{
							count: 6,
							label: '6m',
							step: 'month',
							stepmode: 'backward'
						},
						{
							count: 1,
							label: '1y',
							step: 'year',
							stepmode: 'backward'
						},
							{step: 'all'}
						]},
					rangeslider: {range: [df_poczatek_data, df_koniec_data]},			  
				},
			};

			let setKolumn = new Set(); 
			
			for(let n = 0; n < ilosc_kolumn_plot; n++){
				setKolumn.add(document.getElementById('sel_nazwa_kolumny'+n).value);
			}

			const config = {
				columns: Array.from(setKolumn),   
				displayModeBar: true,
				displaylogo: false,
			};	
			
			df.plot("div_wyswietl_wykres").line({ layout, config });
			
        }).catch(err => {
			alert(err);
        }); 
	}		  
}


let czas0 = 0.00; 
let tab_main_dane = [];
let tab_wyniki_MA = [];
let rozmiar_okna;
let rodzaj_sredniej;

function wczytajDaneDoAnalizy(){
	
	czas0 = performance.now();
	
	if (div_wyswietl_wykres.style.display === "none") {
		div_wyswietl_wykres.style.display = "block";
	}	
	if (div_ostrzezenie_ladowania.style.display === "none") {
		div_ostrzezenie_ladowania.style.display = "block";
	}	
	if (div_opcje_przewidz.style.display === "block") {
		div_opcje_przewidz.style.display = "none";
	}
	
	plik_do_analizy = document.getElementById('inpt_plik_analiza').files[0];
	sel_kolejnosc_val = document.getElementById('sel_kolejnosc_data').value; 
	
	dfd.readCSV(
        plik_do_analizy
        )
        .then(df => {
		
			df.dropNa({ axis: 1, inplace: true });
		
						
			let dzielnik_tablicy = document.getElementById('dzielnik').value; 		
			let nazwa_tab_dane_do_analizy = document.getElementById('sel_nazwa_kolumny_przewidz').value; 	
			let nazwa_tab_daty_do_analizy = document.getElementById('sel_nazwa_data').value; 		
			let tab_dane_z_kolumny = [];
			let tab_daty_z_kolumny = [];
			
			for(let i = 0; i < df.shape[0]; i++){
				tab_dane_z_kolumny.push(df.at(i, nazwa_tab_dane_do_analizy));
				tab_daty_z_kolumny.push(df.at(i, nazwa_tab_daty_do_analizy));
			}
			
			for(let date in tab_daty_z_kolumny){
				tab_main_dane.push({ daty: tab_daty_z_kolumny[date], ceny: tab_dane_z_kolumny[date] });   
			}
			
			if(sel_kolejnosc_val === "Malejąco"){
				tab_main_dane.reverse();
			};
			
			tab_main_dane = tab_main_dane.splice(-(tab_main_dane.length / dzielnik_tablicy));		
  
			rozmiar_okna = parseInt(document.getElementById('rozmiar_okna').value); 
			
			rodzaj_sredniej = document.getElementById('sel_rodzaj_sredniej').value; 
		 
			if(rodzaj_sredniej == "EMA"){
				tab_wyniki_MA = LiczEMA(tab_main_dane, rozmiar_okna);
			}else{
				tab_wyniki_MA = LiczSMA(tab_main_dane, rozmiar_okna);
			};
		
		}).catch(err => {
			alert(err);
		});
	setTimeout(trenujIPrzewidz, 10);
}


async function trenujIPrzewidz(){
	
	let learningrate = 0.05;
	let n_hiddenlayers = 5;
	
	let tab_outputs = tab_wyniki_MA.map(function(outp_ma) { return outp_ma['srednia']; });
	let tab_inputs = tab_wyniki_MA.map(function(inp_ma){
		return inp_ma['set'].map(function(inpt_cena) { return inpt_cena['ceny']; }) 
	});
	
	let ilosc_powtorzen = 0.00;
	dokladnosc_val = document.getElementById('dokladnosc').value; 	
	ilosc_powtorzen = parseInt(dokladnosc_val);
	
	let callback = function(przedzial) {
		document.getElementById("div_procent_ladowania").innerHTML = Math.ceil(((przedzial + 1) * (100 / ilosc_powtorzen))).toString() + "%";	
	};
	
	let tab_wynik = [];
	tab_wynik = await trainModel(tab_inputs, tab_outputs, rozmiar_okna, ilosc_powtorzen, learningrate, n_hiddenlayers, callback);

	let tab_przew_Y = [];
	let tab_przew_X = [];

	tab_przew_X = tab_inputs.reverse();
	
	tab_przew_Y = makePredictions(tab_przew_X, tab_wynik['model'], tab_wynik['normalize']);
	
	let tab_daty_ostatnie = tab_main_dane.map(function(znaczCzas){
		return znaczCzas['daty'];
	}).splice(-rozmiar_okna);

	let tab_ost_data = new Date(tab_daty_ostatnie[tab_daty_ostatnie.length-1]);
	let dni_pomiedzy =  parseInt(document.getElementById("inpt_dni_pomiedzy").value);
	let tab_daty_przewidziane = [];
		  
	for(let i = 0; i < rozmiar_okna; i++){  
		tab_ost_data.setDate(tab_ost_data.getDate() + dni_pomiedzy); 
		tab_daty_przewidziane[i] = await generatorDaty(tab_ost_data.toString());
	};
	
	let tab_kolorow_przewidz = [];
	
	if( tab_przew_X[0].slice(-1)[0] > tab_przew_Y[rozmiar_okna-1])
	{
		tab_kolorow_przewidz = ['#00a1b1', 'red'];
	}else{
		tab_kolorow_przewidz = ['#00a1b1', 'green'];
	};
		
	dzielnik = document.getElementById('dzielnik').value; 
	let ilosc_danych = (100 / dzielnik).toFixed(1) + "%";
	nazwa_tab_dane_do_analizy = document.getElementById('sel_nazwa_kolumny_przewidz').value; 
	rozmiar_okna_string = document.getElementById('rozmiar_okna').value; 
	
	
	let layout_przewidz = {
		colorway : tab_kolorow_przewidz,
		paper_bgcolor: '#2F4F4F',
		plot_bgcolor: '#ffecb3',
		font: {color: 'white', size: 16},
		colorscale:{
			diverging: true,
			autocolorscale: true
		},
		title: {
			text: tytul + " - " + nazwa_tab_dane_do_analizy + " - " + rodzaj_sredniej +  " - " + dokladnosc_val + " - " + ilosc_danych + " - " + "Rozmiar okna: " + rozmiar_okna_string,
			xanchor: "center"
		},
		legend: {
			bgcolor: "#ffdf80",
			bordercolor: "gold",
			borderwidth: 1,
			font: { family: "Arial", size: 20, color: "#2F4F4F" },
		},
		width: 1400,
		xaxis: {
			title: "Data",
			xanchor: "center",
			linecolor: '#b38600',
			linewidth: 3,
			autorange: true,		  
		},
		yaxis: {
			title: ytytul,
			linecolor: '#b38600',
			linewidth: 3,
			xanchor: "center"
		},
	};

	if (div_ostrzezenie_ladowania.style.display = "block") {
		div_ostrzezenie_ladowania.style.display = "none";
	}	
	
	let div_wyswietl_wykres_przewidz = document.getElementById('div_wyswietl_wykres_przewidz');
	Plotly.newPlot( div_wyswietl_wykres_przewidz, [{ x: tab_daty_ostatnie, y: tab_przew_X[0], name: "Ostatnie wartości" }], layout_przewidz );
	Plotly.plot( div_wyswietl_wykres_przewidz, [{ x: tab_daty_przewidziane, y: tab_przew_Y, name: "Przewidywane " + rodzaj_sredniej }], layout_przewidz );  
  
	const czas1 = performance.now();
	
	if (div_czas_trwania_analizy.style.display === "none") {
		div_czas_trwania_analizy.style.display = "block";
	}
	
	div_czas_trwania_analizy.innerHTML = "Czas trwania analizy: " + Math.round((czas1 - czas0) / 1000) + "s." ;
}


function pokazOpis(opis){
	if (opis.style.display === "none") {
		opis.style.display = "block";
	}else{ 
		opis.style.display = "none";
	}
}


function generatorDaty(date) {
	
	let n_data = new Date(date),
		month = '' + (n_data.getMonth() + 1),
		day = '' + n_data.getDate(),
		year = n_data.getFullYear();

	if (month.length < 2){
		month = '0' + month;
	}
	if (day.length < 2){
		day = '0' + day;
	}

return [year, month, day].join('-');
}


function LiczSMA(dane, rozmiar_okna_sma){
	
	let tab_srednia_sma = [];
	
	for (let i = 0; i <= dane.length - rozmiar_okna_sma; i++){
		let akt_srednia_sma = 0.00, t = i + rozmiar_okna_sma;
		for (let k = i; k < t && k <= dane.length; k++){
			akt_srednia_sma += dane[k]['ceny'] / rozmiar_okna_sma;
		}
		tab_srednia_sma.push({ set: dane.slice(i, i + rozmiar_okna_sma), srednia: akt_srednia_sma });
	}
return tab_srednia_sma;
}


function LiczEMA(dane, rozmiar_okna_ema) {
	
	let smoother = 2/(rozmiar_okna_ema + 1);
	let tab_srednia_ema = [];
	let tab_akt_srednia_ema = [];
	let tymczas_suma = 0.00;
	
	let pierwsze_dni = (rozmiar_okna_ema - 1)/2;
	
	for(let m = 0; m < pierwsze_dni; m++){
		tymczas_suma += dane[m]['ceny'];
	}
	
	let tymczas_sred = tymczas_suma / pierwsze_dni;
 
	for (let i = pierwsze_dni; i <= dane.length - rozmiar_okna_ema; i++) {
		if(i <= pierwsze_dni){
			tab_akt_srednia_ema[i] = tymczas_sred;
		}else{
			tab_akt_srednia_ema[i] = dane[i]['ceny'] * smoother + tab_akt_srednia_ema[i - 1] * (1 - smoother);
		}
		tab_srednia_ema.push({ set: dane.slice(i, i + rozmiar_okna_ema), srednia: tab_akt_srednia_ema[i] });
	}
return tab_srednia_ema;
}