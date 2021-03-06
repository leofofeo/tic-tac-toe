//JS and jQuery
$('document').ready(function(){
	$('#game-board').hide();
	$('#game-state').hide();

});


var PlayerChoice = '';
var PlayerIcon = '';
var ComputerIcon = '';
var PlayerTurn = false;
var PlayerWinState = { 'slot-1': false,
'slot-2' : false,
'slot-3' :false,
'slot-4' : false,
'slot-5': false,
'slot-6': false,
'slot-7': false,
'slot-8': false,
'slot-9': false
}

var ComputerWinState = { 'slot-1': false,
	'slot-2' : false,
	'slot-3' :false,
	'slot-4' : false,
	'slot-5': false,
	'slot-6': false,
	'slot-7': false,
	'slot-8': false,
	'slot-9': false
}

var GameOver = true;

var CrossIcon = '<i class="fa fa-times fa-5x"></i>';
var CircleIcon = '<i class="fa fa-circle-o fa-5x"></i>';

//Event Listeners

$('.shape-choice').on('click', function(){
	selectShape(this);
});


$('.board-slot').on('click', function(){
	if(PlayerTurn){
		placeShape(this);
	}
});

// Functions

var selectShape = function(elem){
	$('#shape-selection').hide();
	if($(elem).attr('id') === 'shape-circle'){
		PlayerChoice = 'circle';
		PlayerIcon = CircleIcon;
		ComputerIcon = CrossIcon;
	}
	else {
		PlayerChoice = 'cross';
		PlayerIcon = CrossIcon;	
		ComputerIcon = CircleIcon;
	}
	startGame();

}


var resetGame = function(){
	console.log('from resetGame');
	$('#game-board').hide();
	$('#game-state').hide();
	var boardSlotIds = ['#slot-1', 
		'#slot-2', 
		'#slot-3',
		'#slot-4', 
		'#slot-5', 
		'#slot-6', 
		'#slot-7', 
		'#slot-8', 
		'#slot-9'];

	var addedClasses = ['occupied', 'computer', 'player'];
	$('.board-slot').html('');
	for(var id = 0; id < boardSlotIds.length; id++){
		for(var classItem = 0; classItem < addedClasses.length; classItem++){
			if($(boardSlotIds[id]).hasClass(addedClasses[classItem])){
				console.log(boardSlotIds[id]);
				console.log(addedClasses[classItem]);
				$(boardSlotIds[id]).removeClass(addedClasses[classItem]);
			}
		}
	}	
	

	
	$('#shape-selection').show();
	PlayerChoice = '';
	PlayerIcon = '';
	ComputerIcon = '';
	PlayerTurn = false;
	PlayerWinState = { 'slot-1': false,
		'slot-2' : false,
		'slot-3' :false,
		'slot-4' : false,
		'slot-5': false,
		'slot-6': false,
		'slot-7': false,
		'slot-8': false,
		'slot-9': false
	}
	ComputerWinState = { one: false,
		'slot-2' : false,
		'slot-3' :false,
		'slot-4' : false,
		'slot-5': false,
		'slot-6': false,
		'slot-7': false,
		'slot-8': false,
		'slot-9': false
	}

	GameOver = true;
	return;
}

var startGame = function(){
	console.log('from startGame');
	GameOver = false;
	//determine who goes first
	$('#game-board').show();
	$('#game-state').show();
	$('.current-turn').html(CrossIcon);
	firstMoveDeterminer();

}

var placeShape = function(elem){
	console.log('from placeShape');
	if(GameOver){
		return;
	}
	var elemToPlace;
	var slotOwner;
	var elemId = $(elem).attr('id');
	if(PlayerTurn){
		elemToPlace = PlayerIcon;
		slotOwner = 'player';
	} else {
		elemToPlace = ComputerIcon;
		slotOwner = 'computer';
	}

	if($(elem).hasClass('occupied')){
		alert('That slot has been filled. Please select a different slot.');
		return;
	} else {
		console.log($(elem));
		$(elem).addClass('occupied ' + slotOwner).html(elemToPlace);
		window.setTimeout(function(){checkBoardState()}, 100);
		if(PlayerTurn){
			PlayerWinState[elemId] = true;
		} else {
			ComputerWinState[elemId] = true;
		}
	}

	changeTurns();
	
}

var firstMoveDeterminer = function(){
	console.log('from firstMoveDeterminer');
	if(PlayerChoice === 'cross'){
		$('.player-selection').html(CrossIcon);
		PlayerTurn = true;
	} else {
		$('.player-selection').html(CircleIcon);
		PlayerTurn = false;
		computerMoves();
	}
} 

var changeTurns = function(){
	console.log('from changeTurns');
	if(PlayerTurn){
		PlayerTurn = false;
		changeCurrentTurnDisplay('computer');
	} else {
		PlayerTurn = true;
		changeCurrentTurnDisplay('player');
	}

	if(!PlayerTurn){
		computerMoves();
	}
}

var computerMoves = function(){
	console.log('from computerMoves');
	if(GameOver){
		return;
	}
	for(var i = 1; i < 10; i++){
		if(!$('#slot-' + i).hasClass('occupied')){
			window.setTimeout(function(){placeShape($('#slot-' + i));}, 1000);
			
			return;
		}
	}
	changeTurns();
}



var changeCurrentTurnDisplay = function(turn){
	console.log('from changeCurrentTurnDisplay');
	turn === 'player' ? $('.current-turn').html(PlayerIcon) : $('.current-turn').html(ComputerIcon);
}


var checkBoardState = function(){
	console.log('from checkBoardState');
	PlayerTurn ? checkForWin('computer') : checkForWin('player');
}


var checkForWin = function(player){
	console.log('from checkForWin');
	var p;
	if(player === 'player'){
		p = PlayerWinState;
	} else {
		p = ComputerWinState;
	}

	if((p["slot-1"] && p["slot-2"] && p["slot-3"]) || 
		(p["slot-4"] && p["slot-5"] && p["slot-6"]) || 
		(p["slot-7"] && p["slot-8"] && p["slot-9"]) ||
		(p["slot-1"] && p["slot-4"] && p["slot-7"]) || 
		(p["slot-2"] && p["slot-5"] && p["slot-8"]) ||
		(p["slot-3"] && p["slot-6"] && p["slot-9"]) ||
		(p["slot-1"] && p["slot-5"] && p["slot-9"]) ||
		(p["slot-3"] && p["slot-5"] && p["slot-7"])){
		endGame(player);
}	
}

var blockPlayer = function(){
	console.log('from blocking player');
}


var endGame = function(player){
	console.log('from endGame');
	if(player === 'player'){
		alert('Congrats! You win.');

	} else {
		alert('You lose. Try again.');
	}
	resetGame();
	return;
}
