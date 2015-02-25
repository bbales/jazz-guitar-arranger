var frets = ["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-"];

var bebop_major = [0,2,4,5,7,8,9,11];
var bebop_minor = [0,2,3,4,5,7,9,10];
var pentatonic_major = [0,2,4,7,9];
var pentatonic_minor = [0,3,5,7,10];
var pentatonic_blues = [0,3,5,6,7,10];
var dorian = [0,2,3,5,7,9,10];
var mixolydian = [0,2,4,5,7,9,10];
var harmonic_minor = [0,2,3,5,7,8,11];
var melodic_minor = [0,2,3,5,7,9,11];

function buildString(scalei,element,strnote,key1)
{
	var scale;
	switch(scalei){
		case "bebop_major":
			scale = bebop_major;
			break;
		case "bebop_minor":
			scale = bebop_minor;
			break;
				case "pmaj":
			scale = pentatonic_major;
			break;
		case "pm":
			scale = pentatonic_minor;
			break;
		case "pb":
			scale = pentatonic_blues;
			break;
		case "dorian":
			scale = dorian;
			break;
		case "mixo":
			scale = mixolydian;
			break;
		case "hm":
			scale = harmonic_minor;
			break;
		case "mm":
			scale = melodic_minor;
			break;
						
	}
	var key = key1;
	var start = strnote;
	var si = keys.indexOf(start);
	var i = 0;
	var fi;
	// find next key
	while(1)
	{
		if(si+i > keys.length-1)
		{
			if(keys[(si+i)-(keys.length)] == key)
			{
				break;
			}
		}else{			
			if(keys[si+i] == key)
			{
				break;
			}
		}
		i++;
	}
	
	fi = i;
	for(var i = 0; i < scale.length; i++)
	{
		if(fi+scale[i] < frets.length)
		{
			frets[fi+scale[i]] = "o";
			if(i == 0)
			{
				$("#"+element).children().eq(fi+scale[i]).html("◎");
			}else{
				$("#"+element).children().eq(fi+scale[i]).html("◉");
			}
		}else{
			break;
		}
	}
	
	// Do twice an octave up to fill
	for(var i = 0; i < scale.length; i++)
	{
		if(fi+scale[i]+12 < frets.length)
		{
			frets[fi+scale[i]+12] = "o";
			if(i == 0)
			{
				$("#"+element).children().eq(fi+scale[i]+12).html("◎");
			}else{
				$("#"+element).children().eq(fi+scale[i]+12).html("◉");
				
			}
		}else{
			break;
		}
	}
	
	for(var i = 0; i < scale.length; i++)
	{
		if(fi+(scale[scale.length-1-i]-12) >= 0)
		{
			frets[fi+(scale[scale.length-1-i]-12)] = "o";
			$("#"+element).children().eq(fi+(scale[scale.length-1-i]-12)).html("◉");
		}else{
			break;
		}
	}
}

function buildFretboard()
{
	var num_frets = 23;
	var str = '<div class="scale_fret_nums">';
	
	for(var v = 0; v < num_frets; v++)
	{
		str += '<div class="scale_fret_num">'+v+'</div>';
	}
	
	for(var i = 5; i > -1; i--)
	{
		str += '<div class="scale_string" id="scale_string'+i+'" note="'+tuning[i]+'" id="str'+i+'">'
		
		for(var u = 0; u < num_frets;u++)
		{
			str += '<div class="scale_fret"></div>';
		}
		
		str += "</div>";
	}
	$("#fretboard").html(str);
	
	for(var i = 0; i < 6; i++)
	{
		buildString($("#scale_select option:selected").val(),"scale_string"+i,tuning[i],$("#key option:selected").val());
	}
}