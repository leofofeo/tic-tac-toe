//JS and jQuery for RQ
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

var ComputerWinState = { one: false,
	'slot-2' : false,
	'slot-3' :false,
	'slot-4' : false,
	'slot-5': false,
	'slot-6': false,
	'slot-7': false,
	'slot-8': false,
	'slot-9': false
}


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
	$('div .board-slot').removeClass('occupied player computer').html('');
	$('#game-board').hide();
	$('#game-state').hide();
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
}

var startGame = function(){

	//determine who goes first
	$('#game-board').show();
	$('#game-state').show();
	firstMoveDeterminer();

}

var placeShape = function(elem){

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

	for(var i = 1; i < 10; i++){
		if(!$('#slot-' + i).hasClass('occupied')){
			window.setTimeout(function(){placeShape($('#slot-' + i));}, 1000);
			
			return;
		}
	}
	changeTurns();
}


var changeCurrentTurnDisplay = function(turn){
	turn === 'player' ? $('.current-turn').html(PlayerIcon) : $('.current-turn').html(ComputerIcon);
}


var checkBoardState = function(){
	PlayerTurn ? checkForWin('computer') : checkForWin('player');
}


var checkForWin = function(player){
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
	if(player === 'player'){
		alert('Congrats! You win.');

	} else {
		alert('You lose. Try again.');
	}
	resetGame();
}
