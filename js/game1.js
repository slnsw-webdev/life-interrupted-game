var correctCards = 0;

var games = [
	[ // game 1
		['question 1','question 2','question 3','question 4']
		['answer 1','answer 2','answer 3','answer 4']
	]
	
	[ // game 1
		['question 1','question 2','question 3','question 4']
		['answer 1','answer 2','answer 3','answer 4']
	]
	
	[ // game 1
		['question 1','question 2','question 3','question 4']
		['answer 1','answer 2','answer 3','answer 4']
	]
	

]


$( init );
 
function init() {
 
  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: 25%,
    top: 25%,
    width: 50%,
    height: 50%,
    background-color: #000,
  } );
 
  // Reset the game
  correctCards = 0;
  $('#cardQuestions').html( '' );
  $('#cardAnswers').html( '' );
 
  // Create the pile of shuffled question cards
  var numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
  numbers.sort( function() { return Math.random() - .5 } );
 
  for ( var i=0; i < 11; i++ ) {
    $('<div>' + questions[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardQuestions' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }
 
  // Create the pile of shuffled answer cards
  var numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
  numbers.sort( function() { return Math.random() - .5 } );
  
  for ( var i=1; i < 11; i++ ) {
    $('<div>' + answers[i] + '</div>').data( 'number', i ).appendTo( '#cardAnswers' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
 
}