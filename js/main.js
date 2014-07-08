// jquery time
$( document ).ready(function() {
	
	// first hide the div's we don't initially need
	$("#game-picker").hide();
	$("#game-rules").hide();
	$("#game-container").hide();
	$("#content-container").hide();
	
    console.log( "ready!" );
});


// click buttons
$(document).on('click', '#games-rules-btn', function() {
	$("#game-rules").css("visibility", "visible");		
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