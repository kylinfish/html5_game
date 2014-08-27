var key={
	up:38,
	down:40,
	w:87,
	s:83,
	space:32,
	enter:13,
	add_paddle_left:49,
	add_paddle_right:97,
	add_speed_left:50,
	add_speed_right:98
}
var pingpong ={
	scoreA:0,
	scoreB:0
}
var defult_speed=6;
var countA=0,countB=0,tmpA=0,tmpB=0;
pingpong.ball={  //設定初值
		speed:defult_speed,
		x:150,
		y:100,
		directionX:1,
		directionY:1
	}
var  ball = pingpong.ball;
pingpong.pressedKey=[];

$(function(){
	/*alert("welceome to the ping pong battle!"); //show dialog*/
	/*$("#paddleB").css("top","10px");*/    /*以js控制css*/
	/*$("#paddleA").css("top","px");*/
	pingpong.timer=setInterval(gameloop,30);
	$(document).keydown(function(e){
			pingpong.pressedKey[e.which] = true;
	});
	$(document).keyup(function(e){
		pingpong.pressedKey[e.which] = false;
	});

	function gameloop(){
		movePaddless(); //檢查按鍵動作
		moveBall();   //檢查球的動作
		pressSkill();//檢查啟動技能
		gameEndCheck();//遊戲結束檢查
	}	
	function gameEndCheck(){
		if (pingpong.scoreA==2){
			pingpong.scoreA=pingpong.scoreB=0;
			$("#PlayerA").html("0");
			$("#PlayerB").html("0");
			$(".black").html("");
			$("#end").html("Game Over"+"<br>"+"Winer: PlayerA");
			
		}
		if(pingpong.scoreB==2){
			pingpong.scoreA=pingpong.scoreB=0;
			$("#PlayerA").html("0");
			$("#PlayerB").html("0");			
			$(".black").html("");
			$("#end").html("Game Over"+"<br>"+"Winer: PlayerB");
			
		}

	}
	function moveBall(){   	
		var  placeHeight = parseInt($("#place").height());
		var  placeWidth = parseInt($("#place").width());

		//collision  球拍vs球
		// left of padddle
		var paddleA_X = parseInt(($("#paddleA").css("left")) + parseInt($(".paddle").css("width")));  //球拍的X位置+球拍的寬度
		var paddleA_Bottom = ((parseInt($("#paddleA").css("top")))+(parseInt($("#paddleA").css("height")))); //球拍最底部
		var paddleA_top = parseInt($("#paddleA").css("top")); //球拍最上部分
		if(ball.x+ball.speed * ball.directionX <=(paddleA_X+20)){ //20為球拍厚度誤差
			if(ball.y+ball.speed * ball.directionY<=paddleA_Bottom&&ball.y+ball.speed * ball.directionY>=paddleA_top)
			ball.directionX=1;
			
		}
		//right of paddle
		var paddleB_X = parseInt($("#paddleB").css("left"));
		var paddleB_Bottom = ((parseInt($("#paddleB").css("top")))+(parseInt($("#paddleB").css("height"))));
		var paddleB_top = parseInt($("#paddleB").css("top"));
		if(ball.x+ball.speed * ball.directionX >(paddleB_X-20)){
			if((ball.y+ball.speed * ball.directionY)>paddleB_top && (ball.y+ball.speed * ball.directionY)<paddleB_Bottom )
			ball.directionX=-1;
		}
		ball.x += ball.speed * ball.directionX;
		ball.y += ball.speed * ball.directionY;
		$("#ball").css(	{
			"left":ball.x,
			"top":ball.y
			}
		)	
		// ball Out of bounds
		if (ball.x+ball.speed * ball.directionX<10){ //若超出左邊邊界
			pingpong.scoreB++;
			$("#PlayerB").html((pingpong.scoreB));
			ball.x=paddleA_X+20;
			ball.y=paddleA_top+25;
			ball.directionX=1;
			ball.speed=0;
			//將板子長度回歸正常長度
			$("#paddleA").css({"height":50})
			$("#paddleB").css({"height":50})
			countA=countB=tmpA=tmpB=0;
		}
		if(ball.x+ball.speed * ball.directionX >placeWidth-10){ //若超出右邊邊界
			pingpong.scoreA++;
			$("#PlayerA").html((pingpong.scoreA));
			ball.x=paddleB_X-20;
			ball.y=paddleB_top+25;
			ball.directionX=-1
			ball.speed=0;
			//將板子長度回歸正常長度
			$("#paddleA").css({"height":50})
			$("#paddleB").css({"height":50})
			countA=countB=tmpA=tmpB=0;
		}
		if (ball.y+ball.speed * ball.directionY>placeHeight-18){ //若超出下邊界，將方向變為-1改變方向
			ball.directionY=-1;
		}
		if (ball.y+ball.speed * ball.directionY<0){ //若超上邊界，將方向變為1改變方向
			ball.directionY=1;
		}
		//ball speed moniter
		if (ball.speed==0){
			if(ball.x==paddleA_X+20){
				if(pingpong.pressedKey[key.space])
				ball.speed=defult_speed;	//球速回歸預設
			}
			if(ball.x==paddleB_X-20){
				if(pingpong.pressedKey[key.enter])
				ball.speed=defult_speed;	//球速回歸預設		
			}
		}
		
	}
	function pressSkill(){
		//-------------技能:球拍變大-----------------
		if(pingpong.pressedKey[key.add_paddle_left]){  
			if(countA<=1){
				var paddleA_tmp=parseInt($("#paddleA").css("height"));
				$("#paddleA").css({"height":paddleA_tmp+20})
				countA++;
			}	
		}
		if(pingpong.pressedKey[key.add_paddle_right]){
			if(countB<=1){
				var paddleB_tmp=parseInt($("#paddleB").css("height"));
				$("#paddleB").css({"height":paddleB_tmp+20})
				countB++;
			}	
		}
		//-------------技能:快速球-----------------
		if(pingpong.pressedKey[key.add_speed_left]){
			if(tmpA<=1&&ball.speed!=0){
				ball.speed+=2;
				tmpA++;
			}	
		}
		if(pingpong.pressedKey[key.add_speed_right]){
			if(tmpB<=1&&ball.speed!=0){
				ball.speed+=2;
				tmpB++;
			}	
		}
	}
	function movePaddless(){
		if(pingpong.pressedKey[key.up]){
				var top=parseInt($("#paddleB").css("top"));
					if(top<10)top=10;
					$("#paddleB").css("top",(top-15)+"px");
		}
		if(pingpong.pressedKey[key.down]){
					var top=parseInt($("#paddleB").css("top"));
					if(top>190)top=190;
					$("#paddleB").css("top",(top+15)+"px");
		}
		if(pingpong.pressedKey[key.w]){
					var top=parseInt($("#paddleA").css("top"));
					if(top<10)top=10;
					$("#paddleA").css("top",(top-15)+"px");
		}
		if(pingpong.pressedKey[key.s]){
					var top=parseInt($("#paddleA").css("top"));
					if(top>190)top=190;
					$("#paddleA").css("top",(top+15)+"px");
		}
	}
});
