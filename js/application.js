// Wait for device API libraries to load
//
// document.addEventListener("deviceready", onDeviceReady, false);

console.log('script called');

// files
var media_files = [];
media_files[0] = "AnneDonnell_Christmas_Day_celebrations.mp3";
media_files[1] = "AnneDonnell_Bombings_and_homesickness.mp3";
media_files[2] = "AnneDonnell_Crossing_the_Equator.mp3";
media_files[3] = "WilliamBurrell_stretcher-bearers_experience.mp3";
media_files[4] = "Silas_on_the_troopship_Ceramic.mp3";
media_files[5] = "Silas_On_the_way_to_Gallipoli.mp3";
media_files[6] = "Silas_Landing_at_Gallipoli.mp3";
media_files[7] = "FrankHurley_Experiencing_flying.mp3";
media_files[8] = "JimMarshall_Leaving_home.mp3";
media_files[9] = "JimMarshall_Leaving_home-2.mp3";
media_files[10] = "JimMarshall_On_leave_in_London.mp3";
media_files[11] = "JackHutton_A_laconic_look.mp3";
media_files[12] = "LangfordColleyPriest_Daily life.mp3";
media_files[13] = "LangfordColleyPriest_Stretcher-bearer.mp3";
media_files[14] = "LouisVasco_love_of_France.mp3";
media_files[15] = "LouisVasco_study_in_blues.mp3";
media_files[16] = "LouisVasco_last_letters.mp3";
media_files[17] = "MauriceEvans_My_horse.mp3";
media_files[18] = "WesleyChoat_Letter_to_the_Principal_Librarian.mp3";
media_files[19] = "WesleyChoat_La_Belle_France.mp3";
media_files[20] = "WesleyChoat_prisoner_of_war.mp3";
media_files[21] = "Emden_sydney_short.mp3";


console.log('media file array built ... ' + media_files.length);

// Audio player
//
var my_media = null;
var mediaTimer = null;


$( document ).ready(function() {
	
	console.log('document ready');
	
	// function to swap out images
	$(".player-play").click(function(){
		
		// set class on cell
		$(this).closest(".column-cell").css("background-color", "#ededed");
		
		console.log($(this).closest(".column-cell"));
	
	   // get media file
	   click_ref = $(this).attr("id").split("-");
	   click_id = click_ref[2];
	   media_ref = parseInt(click_ref)-1;
	   file_name = media_files[media_ref];
	   media_src = "http://www.sl.nsw.gov.au/events/exhibitions/2014/life_interrupted/audio/" + files_name;
	   
	   console.log('sent request to play ... ' + media_src);
	   
	   // play audio
	   // play_Audio(media_src);	
	   
	   // swap image for that media file
	   $('#player-play-' + click_ref).hide();
	   $('#player-play-' + click_ref).show();
	   
	});
	
	$(".player-stop").click(function(){
		
		// set class on cell
		$(this).closest(".column-cell").css("background-color", "#FFF");
		
	   // swap image
	   $('#player-play-' + click_ref).hide();
	   $('#player-play-' + click_ref).show();
	   
	});

});

// Play audio
//
function play_Audio(src) {
	// Create Media object from src
	my_media = new Media(src, onSuccess, onError);
	
	// Play audio
	my_media.play();

	// Update my_media position every second
	if (mediaTimer == null) {
		mediaTimer = setInterval(function() {
			// get my_media position
			my_media.getCurrentPosition(
				// success callback
				function(position) {
					if (position > -1) {
						setAudioPosition((position) + " sec");
					}
				},
				// error callback
				function(e) {
					console.log("Error getting pos=" + e);
					setAudioPosition("Error: " + e);
				}
			);
		}, 1000);
	}
}

// Pause audio
//
function pauseAudio() {
	if (my_media) {
		my_media.pause();
	}
}

// Stop audio
//
function stopAudio() {
	if (my_media) {
		my_media.stop();
	}
	clearInterval(mediaTimer);
	mediaTimer = null;
}

// onSuccess Callback
//
function onSuccess() {
	console.log("playAudio():Audio Success");
}

// onError Callback
//
function onError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}

// Set audio position
//
function setAudioPosition(position) {
	document.getElementById('audio_position').innerHTML = position;
}
