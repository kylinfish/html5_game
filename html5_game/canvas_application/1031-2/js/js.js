var untangleGame=[];
function drawCircle(ctx,x,y,size,r,g,b,alpha){
	ctx.fillStyle="rgba("+r+","+g+","+b+","+alpha+")";//a=alpha
	ctx.beginPath();
	ctx.arc(x,y,size,Math.PI*2,0,false);
	ctx.closePath();
	ctx.fill();
}
var Gameloop_Count=0;
$(function(){
	var canvas =document.getElementById("game");
	canvas.timer=setInterval(gameloop,400);
	function gameloop(){
		var ctx=canvas.getContext("2d");
		var width=canvas.width;
		var height=canvas.height;
		Gameloop_Count++;
		if(Gameloop_Count>5){
			ctx.clearRect(0,0,width,height);
			Gameloop_Count=0;
		}
		/*var num=Math.random()*10;¼Æ¶qRandom*/
		var num=10;
		for(var i =0;i<num;i++){
			var x=Math.random()*width;
			var y=Math.random()*height;
			var size=Math.random()*30;
			var r=Math.floor(Math.random()*255);
			var g=Math.floor(Math.random()*255);
			var b=Math.floor(Math.random()*255);
			var alpha=Math.random();
			drawCircle(ctx,x,y,size,r,g,b,alpha);
		}
		
	}
	
});