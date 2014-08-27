var gameStart= false;
var carGame={
	currentLevel:0
}
var canvas;
var ctx;
var canvasWidth;
var canvasHeight;
carGame.levels = new Array();

carGame.levels[0] = [{"type":"car","x":50,"y":210,"fuel":20},
{"type":"box","x":250, "y":270, "width":250, "height":25, "rotation":0},
{"type":"box","x":500,"y":250,"width":65,"height":15,"rotation":-10},
{"type":"box","x":600,"y":225,"width":80,"height":15,"rotation":-20},
{"type":"box","x":950,"y":225,"width":80,"height":15,"rotation":20},
{"type":"box","x":1100,"y":250,"width":100,"height":15,"rotation":0},
{"type":"win","x":1200,"y":215,"width":15,"height":25,"rotation":0}];

carGame.levels[1] = [{"type":"car","x":50,"y":310,"fuel":20},
{"type":"box","x":250, "y":370, "width":250, "height":25, "rotation":0},
{"type":"box","x":500,"y":350,"width":65,"height":15,"rotation":-10},
{"type":"box","x":600,"y":325,"width":80,"height":15,"rotation":-20},
{"type":"box","x":666,"y":285,"width":80,"height":15,"rotation":-32},
{"type":"box","x":950,"y":225,"width":80,"height":15,"rotation":15},
{"type":"box","x":1100,"y":250,"width":100,"height":15,"rotation":0},
{"type":"win","x":1200,"y":215,"width":15,"height":25,"rotation":0}];

carGame.levels[2] = [{"type":"car","x":50,"y":310,"fuel":50},
{"type":"box","x":150, "y":370, "width":150, "height":25, "rotation":0},
{"type":"box","x":300,"y":356,"width":25,"height":15,"rotation":-10},
{"type":"box","x":500,"y":350,"width":65,"height":15,"rotation":-10},
{"type":"box","x":600,"y":325,"width":80,"height":15,"rotation":-20},
{"type":"box","x":666,"y":285,"width":80,"height":15,"rotation":-32},
{"type":"box","x":950,"y":225,"width":80,"height":15,"rotation":10},
{"type":"box","x":1100,"y":250,"width":100,"height":15,"rotation":0},
{"type":"win","x":1200,"y":215,"width":15,"height":25,"rotation":0}];

carGame.levels[3] = [{"type":"car","x":50,"y":210,"fuel":20},
{"type":"box","x":100, "y":270, "width":190, "height":15, "rotation":20},
{"type":"box","x":380, "y":320, "width":100, "height":15, "rotation":-10},
{"type":"box","x":666,"y":285,"width":80,"height":15,"rotation":-32},
{"type":"box","x":950,"y":295,"width":80,"height":15,"rotation":20},
{"type":"box","x":1100,"y":310,"width":100,"height":15,"rotation":0},
{"type":"win","x":1200,"y":275,"width":15,"height":25,"rotation":0}];

carGame.levels[4] = [{"type":"car","x":50,"y":210,"fuel":20},
{"type":"box","x":100, "y":270, "width":190, "height":15, "rotation":20},
{"type":"box","x":380, "y":320, "width":100, "height":15, "rotation":-10},
{"type":"box","x":686,"y":285,"width":80,"height":15,"rotation":-32},
{"type":"box","x":250,"y":495,"width":80,"height":15,"rotation":40},
{"type":"box","x":500,"y":540,"width":200,"height":15,"rotation":0},
{"type":"win","x":220,"y":425,"width":15,"height":25,"rotation":23}];

carGame.levels[5] = [{"type":"car","x":50,"y":450,"fuel":20},
{"type":"box","x":250, "y":550, "width":250, "height":25, "rotation":0},
{"type":"box","x":600,"y":505,"width":165,"height":15,"rotation":-20},
{"type":"box","x":700,"y":430,"width":80,"height":15,"rotation":-50},
{"type":"box","x":750,"y":350,"width":80,"height":15,"rotation":-80},
{"type":"box","x":1000,"y":500,"width":80,"height":15,"rotation":0},
{"type":"box","x":900,"y":150,"width":100,"height":15,"rotation":0},
{"type":"win","x":930,"y":470,"width":15,"height":25,"rotation":0}];

carGame.levels[6] = [{"type":"car","x":50,"y":450,"fuel":20},
{"type":"box","x":250, "y":500, "width":250, "height":25, "rotation":0},
{"type":"box","x":600,"y":455,"width":165,"height":15,"rotation":-20},
{"type":"box","x":700,"y":380,"width":80,"height":15,"rotation":-50},
{"type":"box","x":300,"y":225,"width":80,"height":15,"rotation":50},
{"type":"box","x":120,"y":200,"width":100,"height":15,"rotation":0},
{"type":"box","x":400,"y":250,"width":100,"height":15,"rotation":0},
{"type":"win","x":30,"y":165,"width":15,"height":25,"rotation":0}];

$(document).keydown(function(e){
		switch(e.keyCode){
			case 39: 
							var force= new b2Vec2(10000000/4,0);
							carGame.car.ApplyForce(force,carGame.car.GetCenterPosition());
							//ApplyForce :持續出力  ApplyImpluse:瞬間出力
							break;
			case  88: 
							var force= new b2Vec2(10000000/4,0);	
							carGame.car.ApplyImpulse(force,carGame.car.GetCenterPosition());
							break;
			case 37: 
							var force= new b2Vec2(-10000000/3,0);
							carGame.car.ApplyForce(force,carGame.car.GetCenterPosition());
							//carGame.car.ApplyImpulse(force,carGame.car.GetCenterPosition());
							break;
			case 90: 
							var force= new b2Vec2(-10000000/3,0);
							carGame.car.ApplyImpulse(force,carGame.car.GetCenterPosition());
							break;
			case 32:
							initialGame(carGame.currentLevel);
							break;
		}
	});

$(function() {
	$("#game").css("backgroundImage","url(assets/img/carbubu/starting_screen.jpg)"); 
	$("#game").click(function(e){
		if (gameStart == false){
			initialGame(carGame.currentLevel);
			canvas= document.getElementById('game');
			ctx=canvas.getContext("2d");
			canvasWidth=parseInt(canvas.width);
			canvasHeight=parseInt(canvas.height);
			drawWorld(carGame.world,ctx);
			step();
			gameStart=true;
		}
	});
	
});
function initialGame(level){
	if(level==carGame.levels.length)
		return 0;
	var bg =level+1;
	$("#game").css("backgroundImage","url(assets/img/carbubu/bg"+bg+".jpg)"); 
	carGame.currentLevel = level;
	carGame.world=createWorld();
	
	for(var i=0;i<carGame.levels[level].length;i++){
		var obj = carGame.levels[level][i];
		if(obj.type == "car"){
				carGame.car = createCarAt(obj.x,obj.y,obj.type);
				continue;
		}
		var groundBody = createGround(obj.x, obj.y, obj.width, obj.height, obj.rotation,obj.type);
		if(obj.type == "win")
			carGame.gamewinWall = groundBody;
	}
}
function step(){
	carGame.world.Step(1.0/60 ,1);
	ctx.clearRect(0,0,canvasWidth,canvasHeight); //清掉掉落的BOX，不然有殘影
	drawWorld(carGame.world,ctx);
	setTimeout(step,10);
	//collision gamewinWall use for loop to detect two elements  collide each other
	for(var cn = carGame.world.GetContactList(); cn !=null; cn= cn.GetNext()){
		var body1=cn.GetShape1().GetBody();
		var body2=cn.GetShape2().GetBody();
		if((body1==carGame.car && body2 == carGame.gamewinWall) ||
		    (body2==carGame.car && body1 == carGame.gamewinWall)) {
			console.log("Level Passed!");
			//carGame.currentLevel++;
			if(carGame.currentLevel >=carGame.levels.length-1){
				$("#game").css("backgroundImage","url(assets/img/carbubu/game_completed_screen.jpg)"); 
			}
			else
				initialGame(++carGame.currentLevel);
		}
	}
}
function createWorld(){ //以box2xjs參數定義虛擬世界
	var worldAABB=new b2AABB();
	worldAABB.minVertex.Set(-4000,-4000);
	worldAABB.maxVertex.Set(4000,4000);
	var gravity= new b2Vec2(0,300);//x重力、Y重力
	var doSleep=false;   //預防進入睡眠模式
	var world = new b2World(worldAABB,gravity,doSleep);
	return world; //※將world裡的Value存進CarGame全域變數裡
}
function createGround(x,y,width,height,rotation,type){ 
	var groundSd= new b2BoxDef(); //create 長方形->大地
	groundSd.extents.Set(width,height);
	groundSd.restitution=0.4; //此body的彈性(restitution)
	if(type=="win"){
		groundSd.userData=document.getElementById("flag");
	}
	var groundBd=new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(x,y);
	groundBd.rotation = rotation * Math.PI/180;
	body=carGame.world.CreateBody(groundBd);
	
	return body;
}
function createCarAt(x, y,type) {
            // the car box definition
            var boxSd = new b2BoxDef();
            boxSd.density = 1.0;  //有密度就有重量，有引力
            boxSd.friction = 1.5;
            boxSd.restitution = .4;
            boxSd.extents.Set(40, 20);
			boxSd.userData=document.getElementById("bus");
            // the car body definition
            var boxBd = new b2BodyDef();
            boxBd.AddShape(boxSd);
            boxBd.position.Set(x,y);	
		    var carBody = carGame.world.CreateBody(boxBd);
            // creating the wheels
            var wheelBody1 = createWheel(carGame.world, x-25, y+20);
			var wheelBody2 = createWheel(carGame.world, x+25, y+20);
			
            // create a joint to connect left wheel with the car body
            var jointDef = new b2RevoluteJointDef();
			jointDef.anchorPoint.Set(x-25,y+20);
            jointDef.body1 = carBody;
            jointDef.body2 = wheelBody1;
			carGame.world.CreateJoint(jointDef);
			// create a joint to connect left wheel with the car body
            var jointDef = new b2RevoluteJointDef();
			jointDef.anchorPoint.Set(x+25,y+20);
            jointDef.body1 = carBody;
            jointDef.body2 = wheelBody2;
			carGame.world.CreateJoint(jointDef);
		

            return carBody;
}

function createWheel(world, x , y){
	var ballSd= new b2CircleDef();
	ballSd.density = 1.0;   //密度
	ballSd.radius=10;  
	ballSd.restitution=0.1;
	ballSd.friction=4.3;
	ballSd.userData=document.getElementById("wheel");
	var ballBd = new b2BodyDef()
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	var wheel = carGame.world.CreateBody(ballBd);
	return wheel;
}

function drawWorld(world, context) {
 //將body裡面所有的shape元素，以for loop方式將裡面所有東西印出來
	for (var b = world.m_bodyList; b != null; b = b.m_next) {
		for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
			//劃出所有有指定圖片包裝的圖(隨時計算)-GetUserData
			if(s.GetUserData() !=undefined){
				var img =s.GetUserData();
				var x = s.GetPosition().x;
				var y = s.GetPosition().y;
				var topleftX = -$(img).width()/2;
				var topleftY = -$(img).height()/2;
				context.save();
				context.translate(x,y);
				context.rotate(s.GetBody().GetRotation());
				context.drawImage(img,topleftX,topleftY);
				context.restore();
			}
			/*else
					drawShape(s, context);*/
		}
	}
}
function drawShape(shape, context) {
//僅兩種畫法//分成圓與多邊形
	context.strokeStyle = '#003300';
	context.beginPath();
	switch (shape.m_type) {
		case b2Shape.e_circleShape:
			var circle = shape;
			var pos = circle.m_position;
			var r = circle.m_radius;
			var segments = 16.0;
			var theta = 0.0;
			var dtheta = 2.0 * Math.PI / segments;
			// draw circle
			context.moveTo(pos.x + r, pos.y);
			for (var i = 0; i < segments; i++) {
				var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
				var v = b2Math.AddVV(pos, d);
				context.lineTo(v.x, v.y);
				theta += dtheta;
			}
			context.lineTo(pos.x + r, pos.y);
			// draw radius
			context.moveTo(pos.x, pos.y);
			var ax = circle.m_R.col1;
			var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
			context.lineTo(pos2.x, pos2.y);
			break;
		case b2Shape.e_polyShape:
			var poly = shape;
			var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
			context.moveTo(tV.x, tV.y);
			for (var i = 0; i < poly.m_vertexCount; i++) {
				var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
				context.lineTo(v.x, v.y);
			}
			context.lineTo(tV.x, tV.y);
			break;
	}
	context.stroke();
}