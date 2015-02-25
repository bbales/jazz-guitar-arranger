var keys = ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"];

var major_scale = [0,2,4,5,7,9,11];
var minor_scale = [0,2,3,5,7,8,10];

var major_numeral_analysis_7 = ["maj7","m7","m7","maj7","dom7","m7","dim7"];
var minor_numeral_analysis_7 = ["m7","dim7","maj7","m7","dom7","maj7","dim7"];
var major_numeral_analysis = ["maj","m","m","maj","maj","m","m"];
var minor_numeral_analysis = ["m","m","maj","m","m","maj","m"];

var tuning = ["E","A","D","G","B","E"];

// First is root pos, second is bar num, E A D G B E, -1 are x if there is no bar

// Dominant 7
dom7 = [[0,0,"b",2,"b",1,"b","b"],[0,"n",0,-1,0,1,0,-1],[1,0,-1,"b",2,"b",2,"b"],[3,0,-1,-1,"b","b","b",1],[5,0,-1,-1,"b",1,"b","b"]];

// Major 7
maj7 = [[0,"n",0,-1,1,1,0,-1],[1,0,"b","b",2,1,2,"b"]];

// Minor 7
m7 = [[0,0,"b",2,"b","b","b","b"],[0,"n",0,-1,0,0,0,-1],[1,0,-1,"b",2,"b",1,"b"],[5,0,-1,-1,"b","b","b","b"]];

// diminished 7
dim7 = [[0,0,1,-1,"b",1,"b",-1],[3,0,1,-1,"b",1,"b",-1],[4,0,1,-1,"b",1,"b",-1],[2,"n",-1,-1,0,1,0,1],]

// Major
major = [[1,0,-1,"b",2,2,2,"b"],[0,0,"b",2,2,1,"b","b"]];

// Minor
minor = [[0,0,"b",2,2,"b","b","b"],[1,0,-1,"b",2,2,1,"b"]];

var trayitem = 0;

function bassify()
{
	$("#scale_string5,#scale_string4,.s5,.s4,#scale_tray").remove();
	$("#fretboard").css("margin-bottom","55px");
}


$(document).ready(function(){
	populateKeySelect();
	controlChange();
	$("select").not("#scale_select").on("change",controlChange);
	buildFretboard();
	$("#scale_select").on("change",function(){
		buildFretboard();
		for(var i = 0; i < 6; i++)
		{
			buildString($("#scale_select option:selected").val(),"scale_string"+i,tuning[i],$("#key option:selected").val());
		}
	});
	
	$("#prog_tray").on("dblclick",function(){
		$(this).html("");
	});
	
	$(document).keypress(function(e){
		if(e.which == 104)
		{
			$("#scaler").remove();
			$("body").append("<div style='font-size:100pt;display:none;color:#54FF3B;text-align:center;margin-top:200px'>UR A FAGGOT!</div>");
			$("div").fadeIn(10000);
		}else{
			console.log(e.which);
		}
	});
});

function makeEvents()
{
	$(".next").on("click",function(){
		var i = $(this).parent().attr("id");
		changeChord(i,"forward");
	});
	$(".prev").on("click",function(){
		var i = $(this).parent().attr("id");
		changeChord(i,"backward");
	});
	
	$(".chord_desc").on("dblclick",function(){
		$(this).parent().clone().attr("id","trayitem"+trayitem).appendTo("#prog_tray");
		console.log($("#trayitem"+trayitem));
		$("#trayitem"+trayitem).css("float","left");
		$("#trayitem"+trayitem).css("position","static");
		$("#trayitem"+trayitem).css("margin-top","8px");
		$("#trayitem"+trayitem).css("margin-left","8px");
		$("#trayitem"+trayitem).css("margin-right","15px");
		
		trayitem++;
		
	});
}

function controlChange()
{
	$(".chord").remove();	
	buildKeyChords($("#key option:selected").val(),$("#minmaj option:selected").val(),$("#triad option:selected").val());
	buildFretboard();
	for(var i = 0; i < 6; i++)
	{
		buildString($("#scale_select option:selected").val(),"scale_string"+i,tuning[i],$("#key option:selected").val());
	}
	
	makeEvents();
	
}

function buildKeyChords(key,type,comp)
{
	var chords;
	if(type == "major" && comp == "default")
	{
		chords = major_numeral_analysis;
	}
	
	if(type == "minor" && comp == "default")
	{
		chords = minor_numeral_analysis;
	}
	
	if(type == "major" && comp == "7")
	{
		chords = major_numeral_analysis_7;
	}
	if(type == "minor" && comp == "7")
	{
		chords= minor_numeral_analysis_7;
	}
	
	var sca = scale(key,type);
	console.log(sca);
	console.log(chords);
	for(var i = 0; i < chords.length; i++)
	{
		buildChord(sca[i],chords[i],"mainchord"+(i+1),i+1,i*200+20);
	}
	
	$(".chord").each(function(){
		$(this).delay(parseInt($(this).attr("num"))*60).animate({opacity : 1.0},500);
	});
}

function populateKeySelect()
{
	for(var i = 0; i < keys.length; i++)
	{
		$("#key").append("<option value='"+keys[i]+"'>"+keys[i]+"</option>");
	}
}

function buildChord(key,chord_type,element,number,pos)
{
	// Pick chord group
	var chord;
	switch(chord_type)
	{
		case "maj":
			chord = major[0];
			break;
		case "m":
			chord = minor[0];
			break;
		case "m7":
			chord = m7[0];
			break;
		case "maj7":
			chord = maj7[0];
			break;
		case "dom7":
			chord = dom7[0];
			break;
		case "dim7":
			chord = dim7[0];
			break;
	}
	
	// Convert number to Numeral
	switch(number){
		case 1:
			numeral = "I";
			break;
		case 2:
			numeral = "II";
			break;
		case 3:
			numeral = "III";
			break;
		case 4:
			numeral = "IV";
			break;
		case 5:
			numeral = "V";
			break;
		case 6:
			numeral = "VI";
			break;
		case 1:
			numeral = "VII";
			break;
	}
	
	// Build and Populate Chord
	var str = '<div class="chord" num="'+number+'" style="left:'+pos+';top:50px" id="'+element+'" key="'+key+'" chord="'+chord_type+'" var="0"><span class="chord_desc">N: <span>'+numeral+'</span>&nbsp;&nbsp; Chord: <span>'+key+chord_type+'</span> </span><span class="Next">></span><span class="prev"><</span><div class="frets"><div class="f0">0</div><div class="f1">1</div><div class="f2">2</div><div class="f3">3</div></div><div class="s5"><div class="b0"></div><div class="b1"></div><div class="b2"></div><div class="b3"></div></div><div class="s4"><div class="b0"></div><div class="b1"></div><div class="b2"></div><div class="b3"></div></div><div class="s3"><div class="b0"></div><div class="b1"></div><div class="b2"></div><div class="b3"></div></div><div class="s2"><div class="b0"></div><div class="b1"></div><div class="b2"></div><div class="b3"></div></div><div class="s1"><div class="b0"></div><div class="b1"></div><div class="b2"></div><div class="b3"></div></div><div class="s0"><div class="b0"></div><div class="b1"></div><div class="b2"></div><div class="b3"></div></div></div>';
	$("#scaler").append(str);
	
	// Barre
	if(chord[1] == 0)
	{
		// 
		$("#"+element).children("").children(".b0").html("▥");
	}
	
	// Finger and Empty
	for(var i = 2; i < 9; i++)
	{
		if(chord[i] == -1)
		{
			$("#"+element).children(".s"+(i-2)).children(".b0").html("");
		}else if(chord[i] == "b"){
			// skip
		}else{
			$("#"+element).children(".s"+(i-2)).children(".b"+chord[i]).html("◉");
		}
		
	}
	
	// Label Frets
	var start = keys.indexOf(tuning[chord[0]]);	
	for(var i = 0; i < 12; i++)
	{
		if(start+i > keys.length-1)
		{
			if(keys[(start+i)-(keys.length)] == key)
			{
				break;
			}
		}else{			
			if(keys[start+i] == key)
			{
				break;
			}
		}	
	}
	$("#"+element).children("").children(".f0").html(i);
	$("#"+element).children("").children(".f1").html(i+1);
	$("#"+element).children("").children(".f2").html(i+2);
	$("#"+element).children("").children(".f3").html(i+3);
	
	

}

function changeChord(element, dir)
{	
	var chord_type = $("#"+element).attr("chord");
	var key = $("#"+element).attr("key");
	switch(chord_type)
	{
		case "maj":
			chord = major;
			break;
		case "m":
			chord = minor;
			break;
		case "m7":
			chord = m7;
			break;
		case "maj7":
			chord = maj7;
			break;
		case "dom7":
			chord = dom7;
			break;
		case "dim7":
			chord = dim7;
	}
	
	var variation = $("#"+element).attr("var");
	
	if(dir == "forward")
	{
		variation++;
		if(variation > chord.length-1 || variation < 0)
		{
			return 0;
		}
	}else{
		variation -= 1;
		if(variation > chord.length-1 || variation < 0)
		{
			return 0;
		}
	}
	$("#"+element).attr("var",variation);
	
	chord = chord[variation];
	
	// Clear chord
	$("#"+element).children("").children(".b0,.b1,.b2,.b3,.b4").html("");
	
	if(chord[1] == 0)
	{
		// 
		$("#"+element).children("").children(".b0").html("▥");
	}
	
	for(var i = 2; i < 9; i++)
	{
		if(chord[i] == -1)
		{
			$("#"+element).children(".s"+(i-2)).children(".b0").html("");
		}else if(chord[i] == "b"){
			// skip
		}else{
			// .html("◉");
			$("#"+element).children(".s"+(i-2)).children(".b"+chord[i]).html("◉");
		}
		
	}
	
	// get string, find index of value in keys, count up until key[index] = desired key
	var start = keys.indexOf(tuning[chord[0]]);
	for(var i = 0; i < 12; i++)
	{
		if(start+i > keys.length-1)
		{
			if(keys[(start+i)-(keys.length)] == key)
			{
				break;
			}
		}else{
			if(keys[start+i] == key)
			{
				break;
			}
		}
	}
	$("#"+element).children("").children(".f0").html(i);
	$("#"+element).children("").children(".f1").html(i+1);
	$("#"+element).children("").children(".f2").html(i+2);
	$("#"+element).children("").children(".f3").html(i+3);
}


function scale(key,scale_type)
{
	
	var start = keys.indexOf(key);
	var scale = [];
	var pos;
	var the_scale;
	
	switch(scale_type)
	{
		case "major":
			the_scale = major_scale;
			break;
		case "minor":
			the_scale = minor_scale;
	}
	
	for(var i = 0; i < the_scale.length; i++)
	{
		pos = start + the_scale[i];
		if(pos > keys.length-1)
		{
			pos -= keys.length;
		}
		scale[i] = keys[pos]
	}
	return scale;
}