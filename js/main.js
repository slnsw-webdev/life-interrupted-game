// jquery time
var game_id;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){}

// idle timer function
$( document ).idleTimer( 15*60*1000 );
$( document ).on( "idle.idleTimer", function(){
	$(location).attr('href', 'index.html');
});



$( document ).ready(function() {

	// first hide the div's we don't initially need
	$("#game-message").css("visibility", "hidden");
	$("#game-picker").css("visibility", "hidden");
	$("#game-rules").css("visibility", "hidden");
	$("#game-container").hide();
	
	// add in the selection images for the games
	var i;
	for (i = 0; i < games.length; ++i) {
		img_ref = i+1;
    	$("#game-picker-content").append("<img src='img/" + img_ref + ".png' class='game-btn' id='" + i + "' />");
	}
	
});


// click buttons
$(document).on('click', '#games-rules-btn', function() {
	$("#game-picker").css("visibility", "hidden");
	$("#game-rules").css("visibility", "visible");		
}); 

$(document).on('click', '#game-picker-btn', function() {
	$("#game-rules").css("visibility", "hidden");
	$("#game-picker").css("visibility", "visible");		
}); 

$(document).on('click', '#menu-home', function() {
	$('#content-container').show();	
  	$('#game-landing').css("visibility", "visible");
  	$("#game-picker").css("visibility", "hidden");
  	$("#game-rules").css("visibility", "hidden");
});

$(document).on('click', '#menu-rules', function() {
	$("#game-picker").css("visibility", "hidden");
	$("#game-rules").css("visibility", "visible");	
});

$(document).on('click', '#menu-games', function() {
	$("#game-picker").css("visibility", "visible");
	$("#game-rules").css("visibility", "hidden");	
});

$(document).on('click', '#menu-reset', function() {
	gameStart(game_id);	
});

$(document).on('click', '#close-btn', function() {
	$("#game-picker").css("visibility", "hidden");
	$("#game-rules").css("visibility", "hidden");	
});

$(document).on('click', '.game-btn', function() {
	// get id of button then load game
	game_id = $(this).attr("id");
	
	console.log('Loading game ... ' + game_id);
	
	gameStart(game_id);
});

$(document).on('pageshow', '#index', function(){       
    
	$("#drag").draggable({
        start: handleDragStart,
        cursor: 'move',
        revert: "valid",
        snap: '#dropzone',
    });
	
    $("#dropzone").droppable({
        drop: handleDropEvent,
        tolerance: "touch",              
    });
	
});

function handleDragStart (event, ui) { }

function handleDropEvent (event, ui) {
    if (ui.draggable.element !== undefined) {
        ui.draggable.element.droppable('enable');
    }
    $(this).droppable('disable');
    ui.draggable.position({of: $(this),my: 'left top',at: 'left top'});
    ui.draggable.draggable('option', 'revert', "invalid");
    ui.draggable.element = $(this);
}

// This is a fix for mobile devices

/iPad|iPhone|Android/.test( navigator.userAgent ) && (function( $ ) {

var proto =  $.ui.mouse.prototype,
_mouseInit = proto._mouseInit;

$.extend( proto, {
    _mouseInit: function() {
        this.element
        .bind( "touchstart." + this.widgetName, $.proxy( this, "_touchStart" ) );
        _mouseInit.apply( this, arguments );
    },

    _touchStart: function( event ) {
         this.element
        .bind( "touchmove." + this.widgetName, $.proxy( this, "_touchMove" ) )
        .bind( "touchend." + this.widgetName, $.proxy( this, "_touchEnd" ) );

        this._modifyEvent( event );

        $( document ).trigger($.Event("mouseup")); //reset mouseHandled flag in ui.mouse
        this._mouseDown( event );

        //return false;           
    },

    _touchMove: function( event ) {
        this._modifyEvent( event );
        this._mouseMove( event );   
    },

    _touchEnd: function( event ) {
        this.element
        .unbind( "touchmove." + this.widgetName )
        .unbind( "touchend." + this.widgetName );
        this._mouseUp( event ); 
    },

    _modifyEvent: function( event ) {
        event.which = 1;
        var target = event.originalEvent.targetTouches[0];
        event.pageX = target.clientX;
        event.pageY = target.clientY;
    }

});

})( jQuery );