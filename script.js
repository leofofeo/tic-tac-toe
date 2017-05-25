var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(290, 10);
ctx.lineTo(290, 120);
ctx.lineTo(10, 120);
// ctx.lineTo(10, 10);

ctx.closePath();
ctx.fillStyle = 'black';
ctx.fill();

ctx.beginPath();
ctx.moveTo(30, 20);
ctx.lineTo(270, 20);
ctx.lineTo(30, 110);
ctx.closePath();
ctx.fillStyle = '#99ccff';
ctx.fill();


ctx.beginPath();
ctx.setLineDash([ 10, 10]);
ctx.moveTo(50, 40);
ctx.lineTo(180, 40);
ctx.lineTo(50, 90);
ctx.closePath();
ctx.strokeStyle = 'red';
ctx.stroke();