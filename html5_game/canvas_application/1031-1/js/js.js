$(function(){
	var canvas =document.getElementById("game");
	var ctx=canvas.getContext("2d");
	
	/*����W�b��*/
	ctx.fillStyle="rgba(195,230,56,1)";//a=alpha
	ctx.beginPath();
	ctx.arc(50,50,25,Math.PI*2/3,0,false);
	ctx.closePath();
	ctx.fill();
	/*����U�b��*/
	ctx.fillStyle="rgba(195,230,56,1)";//a=alpha
	ctx.beginPath();
	ctx.arc(52,53,25,Math.PI*2/3,0,true);
	ctx.closePath();
	ctx.fill();
	/*�Ǧ�W�b��*/
	ctx.fillStyle="rgba(100,100,100,1)";//a=alpha
	ctx.beginPath();
	ctx.arc(140,50,25,0,Math.PI,true);
	ctx.closePath();
	ctx.fill();
	/*�Ǧ�U�b��*/
	ctx.fillStyle="rgba(100,100,100,1)";//a=alpha
	ctx.beginPath();
	ctx.arc(140,55,25,0,Math.PI,false);//�_�l�y��(x,y),�b�|,�_�l���סA�������סA��/�f��
	ctx.closePath();
	ctx.fill();
	/*��⥪�b��*/
	ctx.fillStyle="rgba(200,123,15,1)";//a=alpha
	ctx.beginPath();
	ctx.arc(230,50,25,Math.PI*3/2,Math.PI/2,true);
	ctx.closePath();
	ctx.fill();
	/*���k�b��*/
	ctx.fillStyle="rgba(200,123,15,1)";//a=alpha
	ctx.beginPath();
	ctx.arc(235,50,25,Math.PI*3/2,Math.PI/2,false);
	ctx.closePath();
	ctx.fill();
	/*���u*/
	ctx.beginPath();   
	ctx.moveTo(50,100);   
	ctx.lineTo(50,50);   
	ctx.stroke(); 
});