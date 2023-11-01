gora = document.getElementById("btn_gora");

window.onscroll = function(){scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
		gora.style.display = "block";
	}else
	{
		gora.style.display = "none";
	}
}

function naGore() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
	
	