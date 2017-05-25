//JS and jQuery for RQ
$('document').ready(function(){

	var crossSelection = document.getElementById('shape-cross');

	var crossSelectionCtx = crossSelection.getContext('2d');
	crossSelectionCtx.moveTo(0,0);
	crossSelectionCtx.lineTo(50,50);
	crossSelectionCtx.stroke();

});
