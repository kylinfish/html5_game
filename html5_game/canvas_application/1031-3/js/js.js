var untangleGame={
	circles:[],
	lines:[],
	thinLineThickness:[]
}
function Circle(x,y,radius){
	this.x=x;
	this.y=y;
	this.radius=radius;
}
function drawCircle(ctx,x,y,size,r,g,b,alpha){
	ctx.fillStyle="rgba("+r+","+g+","+b+","+alpha+")";//a=alpha
	ctx.beginPath();
	ctx.arc(x,y,size,Math.PI*2,0,false);
	ctx.closePath();
	ctx.fill();
}
function Line(startPoint,endPoint,thickness){
	this.startPoint = startPoint;
	this.endPoint = endPoint;
	this.thickness=thickness;
}
function drawline(ctx,x1,y1,x2,y2,thickness){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineWidth=thickness;
	ctx.strokeStyle="#efe";
	ctx.stroke();
}
$(function(){
	var canvas =document.getElementById("game");
	var ctx=canvas.getContext("2d");
	var width=canvas.width;
	var height=canvas.height;
	/*var num=Math.random()*10;數量Random*/
	var num=5;
	for(var i =0;i<num;i++){
		var x=Math.random()*width;
		var y=Math.random()*height;
		var size=Math.random()*30;
		var r=Math.floor(Math.random()*255);
		var g=Math.floor(Math.random()*255);
		var b=Math.floor(Math.random()*255);
		var alpha=Math.random();
		drawCircle(ctx,x,y,size,r,g,b,alpha);
		untangleGame.circles.push(new Circle(x,y,size));//把圈圈存進untangleGame.circles陣列裡面
		drawline(ctx,100,50);
		
	}
	//draw line
	for(var i=0;i<untangleGame.circles.length;i++){
		var startPoint = untangleGame.circles[i];
		for(var j=0;j<i;j++){
			var endPoint = untangleGame.circles[j];
			drawline(ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, 1);
			untangleGame.lines.push(new Line(startPoint,endPoint,untangleGame.thinLineThickness));
		}
	
	}

	
});