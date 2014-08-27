var tankGame={
	currentLevel:0,
	score:0,
	AttackState:false, //NPC是否自動攻擊
	canvasWidth:0,
	canvasHeight:0,
	stepCount:0, 				 //step 計數變數
	attackFrenquence:500,   //攻擊頻率速度
	shooter_blood:100,
	esc_key_count:0,
	step:0,
	timer:0,
	sec:0,
	minute:0
}
var tankShooter={  //玩家大小sized default ，算子彈誤差用
	width:15,
	height:15
}
var keyState={
	up:false,
	down:false,
	left:false,
	right:false
}

var NPC_force={
	x:0,
	y:0
}
var canvas;
var ctx;
var bomb=[];
var NPCbomb=[];
var NPC=[];
var NPCforce=[];
var treasure=new Array();
treasure.money=[];
treasure.mushroom=[];
tankGame.levels = new Array();
tankGame.levels[0] = [
{"type":"Parameter","x":500},
{"type":"tank","x":750,"y":480},
{"type":"NPC","x":750,"y":150,"attack":"yes","forceX":-10000,"forceY":0,"jpg":"mon3","rotation":0},
{"type":"NPC","x":385,"y":350,"attack":"yes","forceX":0,"forceY":-10000,"jpg":"mon2","rotation":0},
{"type":"wall","x":0, "y":0, "width":250, "height":500, "rotation":0},
{"type":"box","x":310, "y":350, "width":60, "height":150, "rotation":0},
{"type":"box","x":480, "y":410, "width":70, "height":90, "rotation":0},
{"type":"box","x":610, "y":450, "width":60, "height":50, "rotation":0},
{"type":"box","x":700, "y":220, "width":100, "height":40, "rotation":0},
{"type":"box","x":750, "y":300, "width":50, "height":40, "rotation":0},
{"type":"box","x":610, "y":40, "width":200, "height":80, "rotation":0},
{"type":"box","x":310, "y":-20, "width":60, "height":10, "rotation":0},
{"type":"box","x":820, "y":410, "width":20, "height":90, "rotation":0},
{"type":"box","x":380, "y":520, "width":20, "height":20, "rotation":0},
{"type":"box","x":700, "y":515, "width":80, "height":10, "rotation":0},
{"type":"home","x":270, "y":20, "width":15, "height":15, "rotation":0},
{"type":"treasurer","x":270, "y":60,"item":"money"},{"type":"treasurer","x":300, "y":60 ,"item":"money"},
{"type":"treasurer","x":270, "y":85 ,"item":"money"},{"type":"treasurer","x":300, "y":85 ,"item":"money"},
{"type":"treasurer","x":270, "y":110 ,"item":"money"},{"type":"treasurer","x":300, "y":110, "item":"money"},
{"type":"treasurer","x":385, "y":450 ,"item":"mushroom"}

];

tankGame.levels[1] = [
{"type":"Parameter","x":150},
{"type":"tank","x":300,"y":30},
{"type":"NPC","x":180,"y":80,"attack":"yes","forceX":-5000,"forceY":0,"jpg":"mon3","rotation":0},	
{"type":"NPC","x":300,"y":190,"attack":"yes","forceX":30000,"forceY":0,"jpg":"mon1","rotation":0},	
{"type":"NPC","x":300,"y":300,"attack":"yes","forceX":15000,"forceY":0,"jpg":"mon1","rotation":0},	
{"type":"NPC","x":50,"y":470,"attack":"yes","forceX":50000,"forceY":0,"jpg":"mon2","rotation":90},	
{"type":"box","x":200, "y":-30, "width":500, "height":25, "rotation":0},
{"type":"box","x":200, "y":525, "width":500, "height":25, "rotation":0},
{"type":"box","x":-30, "y":220, "width":20, "height":110, "rotation":0},
{"type":"box","x":350, "y":135, "width":250, "height":25, "rotation":0},
{"type":"box","x":500, "y":380, "width":130, "height":60, "rotation":0},
{"type":"box","x":250, "y":50, "width":25, "height":350, "rotation":0},
{"type":"box","x":0, "y":0, "width":80, "height":40, "rotation":0},
{"type":"box","x":10, "y":380, "width":140, "height":50, "rotation":0},
{"type":"wall","x":750, "y":230, "width":50, "height":300, "rotation":0},
{"type":"home","x":180, "y":20, "width":15, "height":15, "rotation":0},
{"type":"treasurer","x":300, "y":250,"item":"money"},{"type":"treasurer","x":330, "y":250 ,"item":"money"},
{"type":"treasurer","x":360, "y":250 ,"item":"money"},{"type":"treasurer","x":420, "y":250 ,"item":"money"},
{"type":"treasurer","x":480, "y":250 ,"item":"money"},{"type":"treasurer","x":450, "y":250, "item":"money"},
{"type":"treasurer","x":390, "y":250 ,"item":"money"},{"type":"treasurer","x":200, "y":190 ,"item":"money"},
{"type":"treasurer","x":200, "y":250, "item":"money"},{"type":"treasurer","x":200, "y":220 ,"item":"money"},
{"type":"treasurer","x":200, "y":280, "item":"money"},{"type":"treasurer","x":15, "y":470 ,"item":"mushroom"}
];

tankGame.levels[2] = [
{"type":"Parameter","x":250},
{"type":"tank","x":180,"y":20},
{"type":"NPC","x":650,"y":95,"attack":"yes","forceX":-10000,"forceY":0,"jpg":"mon3","rotation":0},	
{"type":"NPC","x":100,"y":265,"attack":"yes","forceX":10000,"forceY":0,"jpg":"mon1","rotation":0},	
{"type":"NPC","x":550,"y":210,"attack":"yes","forceX":-10000,"forceY":0,"jpg":"mon3","rotation":0},	
{"type":"NPC","x":100,"y":400,"attack":"yes","forceX":30000,"forceY":0,"jpg":"mon1","rotation":0},	
{"type":"box","x":180, "y":-20, "width":150, "height":10, "rotation":0},
{"type":"box","x":0, "y":30, "width":150, "height":50, "rotation":0},
{"type":"box","x":550, "y":30, "width":250, "height":40, "rotation":0},
{"type":"wall","x":0, "y":180, "width":350, "height":50, "rotation":0},
{"type":"box","x":680, "y":150, "width":200, "height":30, "rotation":0},
{"type":"box","x":10, "y":330, "width":450, "height":30, "rotation":0},
{"type":"box","x":750, "y":330, "width":150, "height":30, "rotation":0},
{"type":"box","x":10, "y":480, "width":700, "height":50, "rotation":0},
{"type":"box","x":820, "y":460, "width":20, "height":40, "rotation":0},
{"type":"box","x":700, "y":515, "width":80, "height":10, "rotation":0},
{"type":"home","x":750, "y":480, "width":15, "height":15, "rotation":0},
{"type":"treasurer","x":680, "y":100 ,"item":"money"},{"type":"treasurer","x":710, "y":100 ,"item":"money"},
{"type":"treasurer","x":740, "y":100 ,"item":"money"},{"type":"treasurer","x":770, "y":100 ,"item":"money"},
{"type":"treasurer","x":590, "y":210 ,"item":"money"},{"type":"treasurer","x":770, "y":210 ,"item":"money"},
{"type":"treasurer","x":620, "y":210 ,"item":"money"},{"type":"treasurer","x":650, "y":210 ,"item":"money"},
{"type":"treasurer","x":680, "y":210 ,"item":"money"},{"type":"treasurer","x":710, "y":210 ,"item":"money"},
{"type":"treasurer","x":740, "y":210 ,"item":"money"},{"type":"treasurer","x":50, "y":400 ,"item":"mushroom"}
];

tankGame.levels[3] = [
{"type":"Parameter","x":100},
{"type":"tank","x":750,"y":480},
{"type":"NPC","x":220,"y":30,"attack":"yes","forceX":0,"forceY":30000,"jpg":"mon4","rotation":0},	
{"type":"NPC","x":750,"y":310,"attack":"yes","forceX":-4000,"forceY":0,"jpg":"mon3","rotation":0},	
{"type":"NPC","x":30,"y":310,"attack":"yes","forceX":10000,"forceY":10,"jpg":"mon1","rotation":0},	
{"type":"box","x":700, "y":380, "width":150, "height":30, "rotation":0},
{"type":"box","x":-20, "y":200, "width":20, "height":200, "rotation":0},
{"type":"box","x":100, "y":-15, "width":100, "height":10, "rotation":0},
{"type":"box","x":650, "y":10, "width":200, "height":250, "rotation":0},
{"type":"box","x":350, "y":0, "width":100, "height":80, "rotation":0},
{"type":"box","x":550, "y":510, "width":300, "height":10, "rotation":0},
{"type":"box","x":100, "y":510, "width":100, "height":10, "rotation":0},
{"type":"wall","x":300, "y":350, "width":50, "height":170, "rotation":0},
{"type":"box","x":10, "y":380, "width":150, "height":30, "rotation":0},
{"type":"home","x":50, "y":480, "width":15, "height":15, "rotation":0},
{"type":"treasurer","x":30, "y":30,"item":"money"},{"type":"treasurer","x":60, "y":30 ,"item":"money"},
{"type":"treasurer","x":90, "y":65 ,"item":"money"},{"type":"treasurer","x":120, "y":65 ,"item":"money"},
{"type":"treasurer","x":30, "y":95 ,"item":"money"},{"type":"treasurer","x":60, "y":95, "item":"money"},
{"type":"treasurer","x":90, "y":95 ,"item":"mushroom"},{"type":"treasurer","x":120, "y":95, "item":"money"},
{"type":"treasurer","x":90, "y":130 ,"item":"money"},{"type":"treasurer","x":120, "y":130, "item":"money"},
{"type":"treasurer","x":30, "y":165,"item":"money"},{"type":"treasurer","x":60, "y":165 ,"item":"money"}
];
$(document).keydown(function(e){
		switch(e.keyCode){
			case 38:   //UP
							//var force_up = new b2Vec2(tankGame.shooter.GetCenterPosition().x,tankGame.shooter.GetCenterPosition().y-10 );
							var force_up = new b2Vec2(0,-150 );
							tankGame.shooter.SetLinearVelocity(force_up);
							keyState.up=true;
							keyState.down=false;
							keyState.left=false;
							keyState.right=false;
							break;
			case 40:   //DOWN
							var force_down  = new b2Vec2(0,150 );
							tankGame.shooter.SetLinearVelocity(force_down);
							keyState.up=false;
							keyState.down=true;
							keyState.left=false;
							keyState.right=false;
							break;
			case 37:   //LEFT
							var force_left = new b2Vec2(-150,0 );
							tankGame.shooter.SetLinearVelocity(force_left);
							
							keyState.up=false;
							keyState.down=false;
							keyState.left=true;
							keyState.right=false;
							break;
			case 39:  //RIGHT
							var force_right =  new b2Vec2(150,0 );
							tankGame.shooter.SetLinearVelocity(force_right);
							keyState.up=false;
							keyState.down=false;
							keyState.left=false;
							keyState.right=true;
							break;
			case 32:
							DirectionDetect();
							break;
			case 82: //R
						restart();
						
						break;
			case 90://Z
						clearArray();
						initialGame(++tankGame.currentLevel);
						break;
			case 27://ESC
						//補上時間暫停，畫面
						tankGame.esc_key_count++;
						if(tankGame.esc_key_count%2==1){
							$("#aga_or_con").html("Continue");
							$("#endInfo").click();
							gamePause();
							
						}
						else{
						$("#fancybox-close").click();
							gamePlay();
							
						}
						
						break;
		}
});
$(function() {
//---------media------------------
	tankGame.melody = document.getElementById("melody");
	tankGame.audio_dollar= document.getElementById("dollar");
	tankGame.audio_dead= document.getElementById("dead");
	tankGame.audio_npcdead= document.getElementById("npcdead");
	tankGame.audio_hit= document.getElementById("hitme");
	tankGame.audio_gameEnd= document.getElementById("gamend");
	tankGame.audio_gamestart= document.getElementById("gamestart");
//---------media  END------------------
	tankGame.audio_gamestart.play();
	tankGame.world = createWorld();
	$("#game").css({'background-image' : 'url(assets/img/marioadv/maps/starting_screen.jpg)'} );
	$("#game").click(function(e){
		if (tankGame.currentLevel==0){
			$("#game_state").removeClass("hide");
			$("#game_state").addClass("show");
			tankGame.score=0;
			tankGame.audio_gamestart.pause();
			initialGame(tankGame.currentLevel);
			tankGame.timer=setInterval(timerShow,1000); //顯示時間
			step();
		}
	});
	canvas= document.getElementById('game');
	ctx=canvas.getContext("2d");
	tankGame.canvasWidth=parseInt(canvas.width);
	tankGame.canvasHeight=parseInt(canvas.height);

//---fancybox-------(if u want to show,just call the #id.click() method)-----------
	$("#endInfo").fancybox({
				'titlePosition'		: 'inside',
				'transitionIn'		: 'none',
				'transitionOut'		: 'none'
	});
//------------------fancybox  END-----------------------
});
function step(){
	tankGame.world.Step(1.0/60 ,1);
	ctx.clearRect(0,0,tankGame.canvasWidth,tankGame.canvasHeight); //清掉掉落的BOX，不然有殘影
	drawWorld(tankGame.world,ctx);
	tankGame.step =setTimeout(step,10);	
	if(tankGame.stepCount % tankGame.attackFrenquence==0){
		NPCattack();
		tankGame.stepCount=0;
	}
	collision();
	tankGame.stepCount++;
}
function initialGame(level){
tankGame.world = createWorld();
tankGame.currentLevel = level;
tankGame.melody.play();
	if(level>=tankGame.levels.length){   //結束遊戲----------------------->>
		$("#game").css("backgroundImage","url(assets/img/marioadv/maps/gameEnd.jpg)"); 
		$("#game_state").removeClass("show");
		$("#game_state").addClass("hide");
		tankGame.audio_gameEnd.play();
		tankGame.melody.pause();
		score_Cal_Show();
		clearInterval(tankGame.timer);
		$("#endInfo").click();
		tankGame.currentLevel=0;
		return 0;
	}
	$("#game").css("backgroundImage","url(assets/img/marioadv/maps/"+level+".jpg)"); 
	for(var i=0;i<tankGame.levels[level].length;i++){
		var obj = tankGame.levels[level][i];
		if(obj.type == "Parameter"){
			tankGame.attackFrenquence=obj.x;
			continue;
		}
		if(obj.type == "tank"){
			tankGame.shooter = createTank(obj.x,obj.y);
			continue;
		}
		if(obj.type == "box"){
			tankGame.box = createGround(obj.x, obj.y, obj.width, obj.height, obj.rotation,obj.type);
			continue;
		}
		if(obj.type == "NPC"){
			if(obj.attack =="yes"){
							tankGame.NPC_autoAttack = createNPC(obj.x, obj.y,obj.jpg,obj.rotation);
							NPC.push(tankGame.NPC_autoAttack);
							NPCforce.push(obj.forceX);
							NPCforce.push(obj.forceY);
							tankGame.AttackState=true; //呼叫NPC自動攻擊
			}
			else{
				tankGame.NPC = createNPC(obj.x, obj.y,obj.jpg,obj.rotation);
				NPC.push(tankGame.NPC);
			}
			continue;
		}
		if(obj.type == "treasurer"){
			 var tankGame_treasurer = createTreasurer(obj.x, obj.y,obj.item);
			 switch(obj.item){
				case "money":
					 treasure.money.push(tankGame_treasurer);
					 break;
				case "mushroom":
					 treasure.mushroom.push(tankGame_treasurer);
					 break;
			 }
		}
		var groundBody = createGround(obj.x, obj.y, obj.width, obj.height, obj.rotation,obj.type);
		if(obj.type == "wall")
			tankGame_border = groundBody;
		if(obj.type == "home")
			tankGame.home= groundBody;
	}
}
function gamePause(){
	clearInterval(tankGame.timer);
	clearInterval(tankGame.step);
	// join step.pause function
}
function gamePlay(){
	tankGame.timer=0;
	tankGame.step=0;
	tankGame.timer=setInterval(timerShow,1000); //go on
	tankGame.step=setInterval(step,1000); //go on
	tankGame.esc_key_count++;
	if(tankGame.esc_key_count%2==1){
		$("#endInfo").click();
	}
	console.log("play");
	// join step.start function
}
function restart(){	
	clearArray();
	$("#aga_or_con").html("contunue");
	tankGame.esc_key_count++;
	tankGame.currentLevel=0;
	initialGame(tankGame.currentLevel);
	tankGame.shooter_blood=100;
	$("#blood").attr("value",tankGame.shooter_blood);
}
function DirectionDetect(){
	var forceX,forceY=0;
	var offestX,offestY=0;
	if(keyState.up){
		forceX=0;forceY=-10000;
		offestY= -30;offestX=0;
		console.log("up");
	}
	else if(keyState.down){
		tankGame.shooter.rotation = 90 * Math.PI/180;
		forceX=0;forceY=10000;
		offestY=30; offestX=0;
	}
	else if(keyState.left){
		forceX=-10000;forceY=0;
		offestX=-30;
	}
	else if(keyState.right){
		forceX=10000;forceY=0;
		offestX=30;
	}
	tankGame.bomb=drawBullet(tankGame.shooter.m_position.x+offestX,tankGame.shooter.m_position.y+offestY,"bullet1");	
	bomb.push(tankGame.bomb);
	var force= new b2Vec2(forceX ,forceY);
	tankGame.bomb.ApplyImpulse(force,tankGame.bomb.GetCenterPosition());
}
function NPCattack(){
//讀取NPC數量陣列實作子彈，讀取NPCforce施力陣列給予子彈力量
	for(var j=0; j<NPC.length ;j++){
				if(tankGame.AttackState){
					if(j!=0){  //force 讀取
						var force= new b2Vec2(NPCforce[j+j],NPCforce[j+j+1]);
						if(NPCforce[j+j]>0) // 子彈發射位置左右偏移量
							var offestX=50;
						else if(NPCforce[j+j]<0)
							var offestX=-50;
						else
							var offestX=0;
					}
					else {
						var force= new b2Vec2(NPCforce[j],NPCforce[j+1]);
						if(NPCforce[j+j]>0)// 子彈發射位置左右偏移量
							var offestX=50;
						else if(NPCforce[j+j]<0)
							var offestX=-50
						else
							var offestX=0;
					}
					if(NPC[j]==null) continue; //if NPC不存在，就不產生子彈
					tankGame.bomb=drawBullet(NPC[j].m_position.x+offestX, NPC[j].m_position.y,"bullet2");	
					NPCbomb.push(tankGame.bomb);
					tankGame.bomb.ApplyImpulse(force,tankGame.bomb.GetCenterPosition());
				}
	}
}
function collision(){
	for(var cn = tankGame.world.GetContactList(); cn !=null; cn= cn.GetNext()){
		var body1=cn.GetShape1().GetBody();
		var body2=cn.GetShape2().GetBody();
		//玩家子彈
		for(var k=0; k<=bomb.length ;k++){
			//------------玩家子彈自動消除------------
			if(bomb[k]!=null){
				if((bomb[k].m_position.x>=tankGame.shooter.m_position.x+30)||(bomb[k].m_position.x<=tankGame.shooter.m_position.x-30)){
					tankGame.world.DestroyBody(bomb[k]);
				}	
				if((bomb[k].m_position.y>=tankGame.shooter.m_position.y+30)||(bomb[k].m_position.y<=tankGame.shooter.m_position.y-30)){
					tankGame.world.DestroyBody(bomb[k]);
				}	
			}	
			//玩家子彈攻擊NPC
			for(var j=0;j<NPC.length;j++){
				if((body1==bomb[k] && body2== NPC[j])||(body2==bomb[k] && body1== NPC[j] )){ 
					tankGame.world.DestroyBody(body1);
					tankGame.world.DestroyBody(body2);
					tankGame.audio_npcdead.play();
					NPC[j]=null;
					tankGame.score+=500;
					$("#score").html(tankGame.score);
				}
				//------------玩家與怪物相撞
				if((body1==tankGame.shooter&& body2== NPC[j])||(body2==tankGame.shooter&& body1== NPC[j] )){ 
					tankGame.world.DestroyBody(body1);
					tankGame.world.DestroyBody(body2);
					NPC[j]=null;
					tankGame.audio_dead.play();
					tankGame.melody.pause();
					clearInterval(tankGame.step);
					clearInterval(tankGame.timer);
					score_Cal_Show(); //loacalStorage and show by francybox		
				}
			}
		}
		//消除兩者子彈互衝
		for(var i=0; i<bomb.length ; i++){
			for(var j=0; j<NPCbomb.length ; j++){
				if(body2==bomb[i]&&body1==NPCbomb[j]){
					console.log("Attack each other");
					tankGame.world.DestroyBody(bomb[i]);
					tankGame.world.DestroyBody(NPCbomb[j]);
				}
			}
		}
		//--------NPC子彈攻擊偵測-------------
		for(var i =0; i<=NPCbomb.length;i++){
			//------------玩家子彈自動消除------------
			if(NPCbomb[k]!=null){
				if((NPCbomb[k].m_position.x>=tankGame.shooter.m_position.x+100)||(NPCbomb[k].m_position.x<=tankGame.shooter.m_position.x-100)){
					tankGame.world.DestroyBody(NPCbomb[k]);
				}	
				if((NPCbomb[k].m_position.y>=tankGame.shooter.m_position.y+100)||(NPCbomb[k].m_position.y<=tankGame.shooter.m_position.y-100)){
					tankGame.world.DestroyBody(NPCbomb[k]);
				}	
			}	
			//NPC子彈打到牆壁	
			if((body1==NPCbomb[i]&& body2==tankGame_border)||(body2==NPCbomb[i]&& body1==tankGame_border)) { 
					if(body2==NPCbomb[i])
						tankGame.world.DestroyBody(body2);
			}
			//NPC子彈打到玩家
			if((body1==NPCbomb[i]&& body2==tankGame.shooter )||(body2==NPCbomb[i]&& body1==tankGame.shooter )) { 		
					tankGame.audio_hit.play();
					tankGame.shooter_blood-=30;
					$("#blood").attr("value",tankGame.shooter_blood);
					if(tankGame.shooter_blood<=0){
						if(body1==tankGame.shooter ){
							tankGame.world.DestroyBody(body1);
							tankGame.audio_dead.play();
							tankGame.melody.pause();
							clearInterval(tankGame.step);
							score_Cal_Show(); //loacalStorage and show by francybox		
						}
					}
					tankGame.world.DestroyBody(body2);
						//玩家死掉!!!
			}
		}
		//---------玩家與寶物碰撞偵測------------
		for(var t =0;t< treasure.money.length;t++){
			if((body1==tankGame.shooter&& body2==treasure.money[t] )||(body2==tankGame.shooter&& body1==treasure.money[t] )) {
				if(body2==treasure.money[t]){
					tankGame.score+=100;
					$("#score").html(tankGame.score);
					tankGame.world.DestroyBody(body2);
					tankGame.audio_dollar.play();
				}
			}
		}
		for(var t =0;t< treasure.mushroom.length;t++){
			if((body1==tankGame.shooter&& body2==treasure.mushroom[t] )||(body2==tankGame.shooter&& body1==treasure.mushroom[t] )) {
				if(body2==treasure.mushroom[t]){
					tankGame.score+=200;
					tankGame.audio_dollar.play();
					$("#score").html(tankGame.score);
					tankGame.shooter_blood+=50;
					if(tankGame.shooter_blood>=100)
						tankGame.shooter_blood=100;
					$("#blood").attr("value",tankGame.shooter_blood);
					tankGame.world.DestroyBody(body2);
				}
			}
		}
		//---------玩家過關-----------------
		if((body1==tankGame.shooter&& body2==tankGame.home )||(body2==tankGame.shooter&& body1==tankGame.home )) {
			console.log("LevelPass"); 
			tankGame.melody_pass = document.getElementById("levelpass");
			tankGame.melody_pass.play();
			
			if(tankGame.currentLevel >=tankGame.levels.length-1)
				$("#game").css("backgroundImage","url(img/maps/4.jpg)"); 
				tankGame.currentLevel++;
				clearArray();
				initialGame(tankGame.currentLevel);
		}
		
	}

}
function score_Cal_Show(){
	$("#aga_or_con").html("Again");
	$("#endInfo").click();//顯示視窗
	tankGame.esc_key_count++;
//-------------localStorage-------------
	var thisScore = localStorage.getItem("key");
	console.log(thisScore);
	if(thisScore==null){
		localStorage.setItem("key",tankGame.score);
		$("#scoreShow").html("New Score: "+ tankGame.score+"<BR>"+"Time: "+tankGame.minute+"/ "+tankGame.sec+" (m/s)"+"<BR>");
	}
	else  if(tankGame.score > thisScore){
		localStorage.setItem("key", tankGame.score);
		$("#scoreShow").html("New TOP: "+  tankGame.score+"<BR>"+"Time: "+tankGame.minute+"/ "+tankGame.sec+" (m/s)"+"<BR>");
	}
	else {
		$("#scoreShow").html("TOP Score: "+  thisScore+"<BR>"+"Your Score: "+  tankGame.score + "<BR>"+"Time: "+tankGame.minute+"/ "+tankGame.sec+" (m/s)"+"<BR>");
	}


}
function timerShow(){
	tankGame.sec++;
	if(tankGame.sec%60==0){
			tankGame.minute++;
			tankGame.sec=0;
	$("#timer").html(tankGame.minute+"/ "+tankGame.sec+"1s");
	}
	else{
		if(tankGame.minute==0)
			$("#timer").html(tankGame.sec+"s");	
		else
			$("#timer").html(tankGame.minute+"/ "+tankGame.sec+"s");
	}
}
function clearArray(){ //將陣列歸零
			bomb.length=0;
			NPCbomb.length=0;
			NPC.length=0;
			NPCforce.length=0;
			treasure.length=0;
			tankGame.step=0;
			tankGame.timer=0;	
			clearInterval(tankGame.timer);
			clearInterval(tankGame.step);
}
function createNPC(x,y,jpg,rotation){ 
	// the car box definition
	var boxSd = new b2BoxDef();
	boxSd.density = 0;  //有密度就有重量，有引力
	boxSd.friction = 0.02;
	boxSd.restitution = 0.05;
	boxSd.extents.Set(20,25);
	switch(jpg){
		case "mon1":
			boxSd.userData=document.getElementById("mon1");
			break;
		case "mon2":
			boxSd.userData=document.getElementById("mon2");
			break;
		case "mon3":
			boxSd.userData=document.getElementById("mon3");
			break;
		case "mon4":
			boxSd.userData=document.getElementById("mon4");
			break;
	}
	// the car body definition
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);
	boxBd.rotation = rotation * Math.PI/180;
	var NPC = tankGame.world.CreateBody(boxBd);
	return NPC;
}
function createTank(x, y) {
	// the car box definition
	var boxSd = new b2BoxDef();
	boxSd.userData=document.getElementById("tank");
	boxSd.density = 10;  //有密度就有重量，有引力。沒有重量，施力等於打空氣
	boxSd.friction = 0.00002;
	boxSd.restitution = 0;
	boxSd.extents.Set(tankShooter.width, tankShooter.height); //大小
	// the tank body definition
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);
	var tankBody = tankGame.world.CreateBody(boxBd);
	return tankBody;
}
function createTreasurer(x,y,item){ 
	var ballSd= new b2CircleDef();
	ballSd.density = 0;   //密度
	ballSd.radius=12;  
	ballSd.restitution=0.1;
	ballSd.friction=4.3;
	switch(item){
		case "money":
			ballSd.userData=document.getElementById("money");
			break;
		case "mushroom":
			ballSd.userData=document.getElementById("mushroom");
			break;	
	}
	var ballBd = new b2BodyDef()
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	var bug = tankGame.world.CreateBody(ballBd);
	return bug;
}
function drawBullet(x,y,jpg){
	var bulletSd= new b2BoxDef(); 
	bulletSd.density = 1; 
	bulletSd.extents.Set(2,5);
	bulletSd.restitution=0.4; //此body的彈性(restitution)
	switch(jpg){
		case "bullet1":
			bulletSd.userData=document.getElementById("bullet1");
			break;
		case "bullet2":
			bulletSd.userData=document.getElementById("bullet2");
			break;
	}

	var groundBd=new b2BodyDef();
	groundBd.AddShape(bulletSd);
	groundBd.position.Set(x,y);
	var bullet=tankGame.world.CreateBody(groundBd);
	return bullet;
}
function createWorld(){ //以box2xjs參數定義虛擬世界
	var worldAABB=new b2AABB();
	worldAABB.minVertex.Set(-4000,-4000);
	worldAABB.maxVertex.Set(4000,4000);
	var gravity= new b2Vec2(0,0);//x重力、Y重力
	var doSleep=false;   //預防進入睡眠模式
	var world = new b2World(worldAABB,gravity,doSleep);
	return world; //※將world裡的Value存進tankGame全域變數裡
}
function createGround(x,y,width,height,rotation,type){ 
	var groundSd= new b2BoxDef(); //create 長方形->大地
	groundSd.extents.Set(width,height);
	groundSd.restitution=0; //此body的彈性(restitution)
	if(type=="home"){
		groundSd.userData=document.getElementById("home");
	}	
	var groundBd=new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(x,y);
	groundBd.rotation = rotation * Math.PI/180;
	body=tankGame.world.CreateBody(groundBd);
	return body;
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