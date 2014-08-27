var carGame={
	State_Start_Screen:1,
	State_Playing:2,
	State_Game_Over_Screen:3,
	state:0,
}
var canvas;
var ctx;
var canvasWidth;
var canvasHeight;
var locationbug={
	X:40,
	Y:50
}
var gmae_score=0;
var bomb=[];
var bomb_bug=[];
var bug=[];
var bug_count;
var destoryall =false;
$(document).keydown(function(e){
		switch(e.keyCode){
			case 39:  //往右
							var force_right =  new b2Vec2(200,0 );
							carGame.shooter.SetLinearVelocity(force_right);
						
							//ApplyForce :持續出力  ApplyImpluse:瞬間出力
							break;
			case 37:   //往左
							var force_left = new b2Vec2(-200,0 );
							carGame.shooter.SetLinearVelocity(force_left);
							break;
			case 32:
							carGame.bomb=drawBullet(carGame.shooter.m_position.x,carGame.shooter.m_position.y-50,"bullet");	
							bomb.push(carGame.bomb);
							var force= new b2Vec2(0,-500);
							carGame.bomb.ApplyImpulse(force,carGame.bomb.GetCenterPosition());
							carGame.audio_attack.play();
							//moveShift();
							break;
		}
	});

$(function() {
	carGame.audio_hitshot= document.getElementById("hitshot");
	carGame.audio_attack= document.getElementById("attack");
	carGame.melody = document.getElementById("bg");

	$("#game").css({'background-image' : 'url(assets/img/galaxywar/starting_screen.jpg)'} );
	carGame.state = carGame.State_Start_Screen;
	$("#game").click(function(e){
		carGame.melody.play();
		initialGame(2);
		step();
		carGame.state=carGame.State_Playing;
	});
	//console.log("the world is created." , carGame.world);
	canvas= document.getElementById('game');
	ctx=canvas.getContext("2d");
	canvasWidth=parseInt(canvas.width);
	canvasHeight=parseInt(canvas.height);
	drawWorld(carGame.world,ctx);

});

function initialGame(GameState){
	if(GameState==carGame.State_Playing){
		$("#game").css({'background-image' : 'url(assets/img/galaxywar/game_completed_screen.jpg)'} );
	}
	carGame.world=createWorld();
	carGame.shooter=createShooter(250,580);
	createGround(-25,600,20,150,0);  //左牆
	createGround(530,600,20,150,0);  //又牆壁
	carGame.ceiling=createGround(0,-20,500,30,0);  //天花板
	carGame.floor=createGround(50,620,450,30,0);  //底牆
	for(var i=1;i<9;i++){
		for(var j=0;j<4;j++){
			bug.push(createbug(locationbug.X+50*i, locationbug.Y+40*j));
			}
	}
	gmae_score=0;
	bug_count = bug.length;
}

function collision(){
	for(var cn = carGame.world.GetContactList(); cn !=null; cn= cn.GetNext()){
		var body1=cn.GetShape1().GetBody();
		var body2=cn.GetShape2().GetBody();
		if(destoryall){
			for(var i=0; i<bomb.length ; i++){
				bomb[i] = null;
			}
			for(var i=0; i<bug.length ; i++){
				bug[i] = null;
			}
			for(var i=0; i<bomb_bug.length ; i++){
				bomb_bug[i] = null;
			}
			for(var i=0; i<bug_count.length ; i++){
				bug_count[i] = null;
			}
			carGame.world.DestroyBody(carGame.shooter);
		}
		
		
		//針對玩家子彈做碰撞偵測
		for(var i=0; i<bomb.length ; i++){
			if(bomb[i]!=null){
				for(var x=0;x<bug.length;x++){
					if(body1==bomb[i]&& body2==bug[x]) { //子彈擊中蜜蜂互消
					//	console.log("Hit Target!");
						carGame.world.DestroyBody(body1);
						carGame.world.DestroyBody(body2);
						carGame.audio_hitshot.play();
						gmae_score+=100;
						bug_count--;
						$("#grade").html("Grade: "+gmae_score);
						bugAttack();
						if(bug_count==0){
							destoryall=true;
							$("#game").css({'background-image' : 'url(assets/img/galaxywar/gamefinish.jpg)'} );
							carGame.melody.pause();
							carGame.audio_hitshot.pause();
							carGame.audio_finish = document.getElementById("finish");
							carGame.audio_finish.play();
							
						}
					}
					if((body1==bomb[i]&& body2==carGame.floor)||(body2==bomb[i]&& body1==carGame.floor)) { //子彈掉下底板
						if(body2==bomb[i])
							carGame.world.DestroyBody(body2);
					}
				}
			}
			if(body1==carGame.ceiling) { //消除打到天花板的子彈
			//	console.log("Hit Ceiling!!!");
				carGame.world.DestroyBody(body2);
			}
		}
		//針對蜜蜂回擊子彈做碰撞偵測
		for(var j=0; j<bomb_bug.length ; j++){
			if(bomb_bug[j]!=null){
				if(body1==carGame.shooter&&body2==bomb_bug[j]){  //消除蜜蜂回擊子彈打到玩家
					//console.log("Hit Shooter!!!");
					carGame.world.DestroyBody(carGame.shooter);
					carGame.melody.pause();
					carGame.audio_END = document.getElementById("gameend");
					carGame.audio_END.play();
					destoryall=true;
					$("#game").css({'background-image' : 'url(assets/img/galaxywar/gameover.jpg)'} );
					ctx.clearRect(0,0,canvasWidth,canvasHeight);
					//clear-------------------------
				}
				if(body1==carGame.floor&&body2==bomb_bug[j]){ //消除蜜蜂回擊子彈打到底板
					//console.log("Hit floor!!!");
					carGame.world.DestroyBody(bomb_bug[j]);
				}
			}
		}
		//消除兩者子彈互衝
		for(var i=0; i<bomb.length ; i++){
			if(bomb[i]!=null){
				for(var j=0; j<bomb_bug.length ; j++){
					if(body2==bomb[i]&&body1==bomb_bug[j]){
						console.log("Attack each other");
						carGame.world.DestroyBody(bomb[i]);
						carGame.world.DestroyBody(bomb_bug[j]);
					}
				}
			}
		}
	}
}
function bugAttack(){
		carGame.bugattack = drawBullet(carGame.shooter.m_position.x,carGame.shooter.m_position.y-400,"bugBullet");	
		bomb_bug.push(carGame.bugattack);
}
function step(){
	carGame.world.Step(1.0/60 ,1);
	ctx.clearRect(0,0,canvasWidth,canvasHeight); //清掉掉落的BOX，不然有殘影
	drawWorld(carGame.world,ctx);
	collision();
	setTimeout(step,10);
}


function drawBullet(x,y,png_name){
	var bulletSd= new b2BoxDef(); 
	bulletSd.density = 0.02; 
	bulletSd.extents.Set(2,5);
	bulletSd.restitution=0.4; //此body的彈性(restitution)
	bulletSd.userData=document.getElementById(png_name);
	
	var groundBd=new b2BodyDef();
	groundBd.AddShape(bulletSd);
	groundBd.position.Set(x,y);
	var bullet=carGame.world.CreateBody(groundBd);
	return bullet;
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
function createGround(x,y,width,height,rotation){ 
	var groundSd= new b2BoxDef(); //create 長方形->大地
	groundSd.extents.Set(width,height);
	groundSd.restitution=0; //此body的彈性(restitution)
	var groundBd=new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(x,y);
	groundBd.rotation = rotation * Math.PI/180;
	body=carGame.world.CreateBody(groundBd);
	return body;
}
function createbug(x,y){ 
	var ballSd= new b2CircleDef();
	ballSd.density = 0;   //密度
	ballSd.radius=10;  
	ballSd.restitution=0.1;
	ballSd.friction=4.3;
	ballSd.userData=document.getElementById("et");
	var ballBd = new b2BodyDef()
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	var bug = carGame.world.CreateBody(ballBd);
	return bug;
}
function createShooter(x, y) {
            // the car box definition
            var boxSd = new b2BoxDef();
			boxSd.userData=document.getElementById("shooter");
            boxSd.density = 1.0;  //有密度就有重量，有引力
            boxSd.friction = 0.2;
            boxSd.restitution = 0.05;
            boxSd.extents.Set(20,20);
			
            // the car body definition
            var boxBd = new b2BodyDef();
            boxBd.AddShape(boxSd);
            boxBd.position.Set(x,y);
	
		    var carBody = carGame.world.CreateBody(boxBd);
			
            return carBody;
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