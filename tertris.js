$(document).ready(function(){

	//Var
	var game = document.getElementById("game");
	var gameover = document.getElementById("gameover");

	var main = document.getElementById("main");
	var mainctx = main.getContext("2d");
	main.height = 540;
	main.width = 360;

	var next = document.getElementById("nextBlock");
	var nextctx = next.getContext("2d");
	next.height = 120;
	next.width = 180;

	var blocks = [];
	var Next = [];
	var groupBlocks = [];

	var state = 0;
	var score = 0;

	var sidescore = document.getElementById("score");
	var endScore = document.getElementById("endScore");

	var nextBlock;
	var nextBlockShow;

	var restart = document.getElementById("restart");

	colorList = ["blue","yellow","red","DarkOrange","GreenYellow","cyan","DarkMagenta"];

	//create table	
	for(var i=0;i<360;i+=30){
		for(var j=0;j<540;j+=30){
			mainctx.beginPath();
			mainctx.rect(i,j,30,30);
			mainctx.strokeStyle = "gray";
			mainctx.stroke();
		}
	}

	for(var i=0;i<180;i+=30){
		for(var j=0;j<120;j+=30){
			nextctx.beginPath();
			nextctx.rect(i,j,30,30);
			nextctx.strokeStyle = "gray";
			nextctx.stroke();
		}
	}

	//Class
	function block(x,y,color){
		this.x = x;
		this.y = y;
		this.color = color;
		this.state = function(){
			for(var i=0;i<blocks.length;i++){
				if(blocks[i].x === this.x && blocks[i].y === (this.y+30)) {
					return 1;
				}
			}
			if(this.y >=510){
				return 1;
			}
			return 0;
		}
		this.sideState = function(){
			for(var i=0;i<blocks.length;i++){
				if(blocks[i].y === this.y && blocks[i].x === (this.x-30)) {
					return 2;
				}
			}
			for(var i=0;i<blocks.length;i++){
				if(blocks[i].y === this.y && blocks[i].x === (this.x+30)) {
					return 1;
				}
			}
			if(this.x >=330){
				return 1;
			}
			if(this.x <= 0){
				return 2;
			}
			return 0;
		}
		this.fall = function(){
			if(this.state() === 0){
				this.y+=30;
			}
		}
		this.draw = function(){
			mainctx.beginPath();
			mainctx.rect(this.x,this.y,30,30);
			mainctx.fillStyle = this.color;
			mainctx.fill();
			mainctx.fillStyle = "black";
		}
		this.drawNext = function(){
			nextctx.beginPath();
			nextctx.rect(this.x,this.y,30,30);
			nextctx.fillStyle = this.color;
			nextctx.fill();
			nextctx.fillStyle = "black";
		}
		this.leftMove = function(){
			if(this.sideState() !== 2){
				this.x-=30;
			}
		}
		this.rightMove = function(){
			if(this.sideState() !== 1){
				this.x+=30;
			}
		}
	}

	function blockGroup(color,type,pos){
		this.color = color;
		this.type = type;
		this.pos = pos;
		this.group = [];
		//long
		if(this.type === 1){
			var Blc1 = new block(this.pos,-30,this.color);
			var Blc2 = new block(this.pos+30,-30,this.color);
			var Blc3 = new block(this.pos+60,-30,this.color);
			var Blc4 = new block(this.pos+90,-30,this.color);
			this.RPx = this.pos+30;
			this.RPy = -30;
			this.group.push(Blc1);
			this.group.push(Blc2);
			this.group.push(Blc3);
			this.group.push(Blc4);
		}
		//sqr
		if(this.type === 2){
			var Blc1 = new block(this.pos,-30,this.color);
			var Blc2 = new block(this.pos+30,-30,this.color);
			var Blc3 = new block(this.pos,-60,this.color);
			var Blc4 = new block(this.pos+30,-60,this.color);
			this.RPx = 0;
			this.RPy = 0;
			this.group.push(Blc1);
			this.group.push(Blc2);
			this.group.push(Blc3);
			this.group.push(Blc4);
		}
		//T
		if(this.type === 3){
			var Blc1 = new block(this.pos,-30,this.color);
			var Blc2 = new block(this.pos+30,-30,this.color);
			var Blc3 = new block(this.pos+60,-30,this.color);
			var Blc4 = new block(this.pos+30,-60,this.color);
			this.RPx = this.pos+30;
			this.RPy = -30;
			this.group.push(Blc1);
			this.group.push(Blc2);
			this.group.push(Blc3);
			this.group.push(Blc4);
		}
		//L
		if(this.type === 4){
			var Blc1 = new block(this.pos,-30,this.color);
			var Blc2 = new block(this.pos+30,-30,this.color);
			var Blc3 = new block(this.pos+60,-30,this.color);
			var Blc4 = new block(this.pos+60,-60,this.color);
			this.RPx = this.pos+30;
			this.RPy = -30;
			this.group.push(Blc1);
			this.group.push(Blc2);
			this.group.push(Blc3);
			this.group.push(Blc4);
		}
		//Z
		if(this.type === 5){
			var Blc1 = new block(this.pos,-60,this.color);
			var Blc2 = new block(this.pos+30,-60,this.color);
			var Blc3 = new block(this.pos+30,-30,this.color);
			var Blc4 = new block(this.pos+60,-30,this.color);
			this.RPx = this.pos+30;
			this.RPy = -60;
			this.group.push(Blc1);
			this.group.push(Blc2);
			this.group.push(Blc3);
			this.group.push(Blc4);
		}
		// invert L
		if(this.type === 6){
			var Blc1 = new block(this.pos,-30,this.color);
			var Blc2 = new block(this.pos,-60,this.color);
			var Blc3 = new block(this.pos+30,-30,this.color);
			var Blc4 = new block(this.pos+60,-30,this.color);
			this.RPx = this.pos+30;
			this.RPy = -30;
			this.group.push(Blc1);
			this.group.push(Blc2);
			this.group.push(Blc3);
			this.group.push(Blc4);
		}
		// invert Z
		if(this.type === 7){
			var Blc1 = new block(this.pos,-30,this.color);
			var Blc2 = new block(this.pos+30,-30,this.color);
			var Blc3 = new block(this.pos+30,-60,this.color);
			var Blc4 = new block(this.pos+60,-60,this.color);
			this.RPx = this.pos+30
			this.RPy = -60;
			this.group.push(Blc1);
			this.group.push(Blc2);
			this.group.push(Blc3);
			this.group.push(Blc4);
		}
		this.state = function(){
			for(var i=0;i<this.group.length;i++){
				if(this.group[i].state() === 1){
					return 1; 
				}
			}
			return 0;
		}
		this.sideState = function(){
			var Ls = 0;
			var Rs = 0;
			for(var i=0;i<this.group.length;i++){
				if(this.group[i].sideState() === 1){
					Rs = 1; 
				}
				if(this.group[i].sideState() === 2){
					Ls = 1;
				}
			}
			//console.log("Rs : ",Rs,"Ls : ",Ls);
			if(Ls === 1 && Rs === 1){
				return 3;
			}
			if(Ls === 1 && Rs === 0){
				return 2;
			}
			if(Ls === 0 && Rs === 1){
				return 1;
			}
			return 0;
		}
		this.rotateState = function(){
			if(this.type !== 2){
				for(var i=0;i<this.group.length;i++){
					var diffx = this.group[i].x-this.RPx;
					var diffy = this.group[i].y-this.RPy;
					var newy = 0;
					var newx = 0;
					if(diffx>=0){
						newy-=abs(diffx);
					}
					if(diffx<0){
						newy+=abs(diffx);
					}
					if(diffy>=0){
						newx+=abs(diffy);
					}
					if(diffy<0){
						newx-=abs(diffy);
					}
					//console.log("block",i," diffy : ",diffy,"diffx : ",diffx);
					//console.log("block",i," newy : ",newy,"newx : ",newx);
					newx += this.RPx;
					newy += this.RPy;
					for(var j=0;j<blocks.length;j++){
						if(blocks[j].x === newx && blocks[j].y === newy){
							return 1;
						}	
					}
					if(newx >= 330 || newx <= 0 || newy >= 510){
						return 1;
					}
				}
				return 0;
			}
		}
		this.fall = function(){
			if(this.state() === 0){
				for(var i=0;i<this.group.length;i++){
					this.group[i].fall();
				}
				this.RPy+=30;
			}
			else{
				for(var i=0;i<this.group.length;i++){
					//console.log("x : ", this.group[i].x , "y : ",this.group[i].y);
					blocks.push(this.group[i]);
				}
				//console.log("RPy : ",groupBlocks[0].RPy,"RPx : ",groupBlocks[0].RPx);
				groupBlocks.splice(0,1);
				genBlock();
			}
		}
		this.draw = function(){
			for(var i=0;i<this.group.length;i++){
				this.group[i].draw();
			}
		}
		this.drawNext = function(){
			this.pos = 30;
			if(this.type === 1){
				var Blc1 = new block(this.pos,60,this.color);
				var Blc2 = new block(this.pos+30,60,this.color);
				var Blc3 = new block(this.pos+60,60,this.color);
				var Blc4 = new block(this.pos+90,60,this.color);
			}
			if(this.type === 2){
				var Blc1 = new block(this.pos,60,this.color);
				var Blc2 = new block(this.pos+30,60,this.color);
				var Blc3 = new block(this.pos,30,this.color);
				var Blc4 = new block(this.pos+30,30,this.color);
			}
			if(this.type === 3){
				var Blc1 = new block(this.pos,60,this.color);
				var Blc2 = new block(this.pos+30,60,this.color);
				var Blc3 = new block(this.pos+60,60,this.color);
				var Blc4 = new block(this.pos+30,30,this.color);
			}
			if(this.type === 4){
				var Blc1 = new block(this.pos,60,this.color);
				var Blc2 = new block(this.pos+30,60,this.color);
				var Blc3 = new block(this.pos+60,60,this.color);
				var Blc4 = new block(this.pos+60,30,this.color);
			}
			if(this.type === 5){
				var Blc1 = new block(this.pos,30,this.color);
				var Blc2 = new block(this.pos+30,30,this.color);
				var Blc3 = new block(this.pos+30,60,this.color);
				var Blc4 = new block(this.pos+60,60,this.color);
			}
			if(this.type === 6){
				var Blc1 = new block(this.pos,60,this.color);
				var Blc2 = new block(this.pos,30,this.color);
				var Blc3 = new block(this.pos+30,60,this.color);
				var Blc4 = new block(this.pos+60,60,this.color);
			}
			if(this.type === 7){
				var Blc1 = new block(this.pos,60,this.color);
				var Blc2 = new block(this.pos+30,60,this.color);
				var Blc3 = new block(this.pos+30,30,this.color);
				var Blc4 = new block(this.pos+60,30,this.color);
			}
			Blc1.drawNext();
			Blc2.drawNext();
			Blc3.drawNext();
			Blc4.drawNext();
		}
		this.leftMove = function(){
			if(this.sideState() !== 2 && this.sideState() !== 3){
				for(var i=0;i<this.group.length;i++){
					this.group[i].leftMove();
				}
				this.RPx-=30;
			}
		}
		this.rightMove = function(){
			if(this.sideState() !==1 && this.sideState() !== 3){
				for(var i=0;i<this.group.length;i++){
					this.group[i].rightMove();
				}
				this.RPx+=30;
			}
		}
		this.rotate = function(){
			if(this.rotateState() === 0){
				for(var i=0;i<this.group.length;i++){
					var diffx = this.group[i].x-this.RPx;
					var diffy = this.group[i].y-this.RPy;
					var newy = 0;
					var newx = 0;
					if(diffx>=0){
						newy-=abs(diffx);
					}
					if(diffx<0){
						newy+=abs(diffx);
					}
					if(diffy>=0){
						newx+=abs(diffy);
					}
					if(diffy<0){
						newx-=abs(diffy);
					}
					newx += this.RPx;
					newy += this.RPy;
					this.group[i].x = newx;
					this.group[i].y = newy;
				}
			}
		}
	}


	//Fumctions
	function genBlock(){
		if(state === 0){
			var type = RandomNum(1,7);
			var pos = 0;
			if(type === 1){
				pos = RandomNum(0,8)*30;
			}
			else{
				pos = RandomNum(0,9)*30;
			}
			var color = colorList[RandomNum(0,colorList.length-1)];
			var newBlock = new blockGroup(color,type,pos);
			groupBlocks.push(newBlock);
			state = 1;
		}
		else{
			var newBlock = nextBlock;
			groupBlocks.push(newBlock);
		}
		var type = RandomNum(1,7);
		var pos = 0;
		//console.log(type);
		if(type === 1){
			pos = RandomNum(0,8)*30;
		}
		else{
			pos = RandomNum(0,9)*30;
		}
		var color = colorList[RandomNum(0,colorList.length-1)];
		nextBlock = new blockGroup(color,type,pos);
		nextBlockShow = new blockGroup(color,type,pos);

	}

	function gameState(){
		for(var i=0;i<blocks.length;i++){
			if(blocks[i].y < 0){
				game.style.filter = "grayscale(100%)";
				return 1;
			}
		}
	}
	function gameOver(){
		gameover.style.display = "block";
		Next = [];
		groupBlocks = [];
		blocks = [];
		state = 0;
	}

	function Restart(){
		gameover.style.display = "none";
		game.style.filter = "none";
		genBlock();
		loop();
	}

	function RandomNum(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}

	function abs(num){
		if(num<0){
			return -num;
		}
		return num;
	}


	
	//Test
	//var a = new blockGroup("red",3,150);

	// MAIN()
	function loop(){
		//reset canvas
		setTimeout(function(){

			//MAIN DISPLAY
			mainctx.fillStyle = 'rgba(0,0,0)';
			mainctx.fillRect(0,0,360,540);
			groupBlocks[0].fall();
			groupBlocks[0].draw();
			for(var i=0;i<blocks.length;i++){
				blocks[i].draw();
			}
			//create table
			for(var i=0;i<360;i+=30){
				for(var j=0;j<540;j+=30){
					mainctx.beginPath();
					mainctx.rect(i,j,30,30);
					mainctx.strokeStyle = "gray";
					mainctx.stroke();
				}
			}

			//NEXT DISPLAY
			nextctx.fillStyle = 'rgba(0,0,0)';
			nextctx.fillRect(0,0,180,120);
			nextBlockShow.drawNext();
			for(var i=0;i<180;i+=30){
				for(var j=0;j<120;j+=30){
					nextctx.beginPath();
					nextctx.rect(i,j,30,30);
					nextctx.strokeStyle = "gray";
					nextctx.stroke();
				}
			}

			console.log(groupBlocks[0].rotateState());

			//Check game state
			if(gameState() === 1){
				gameOver();
				return 0;
			}

			requestAnimationFrame(loop);
		},1000);
	}	

	genBlock();
	loop();
	

	document.addEventListener('keydown',function(event){
		//left
		if(event.keyCode === 37){
			groupBlocks[0].leftMove();	
		}
		//right
		if(event.keyCode === 39){
			groupBlocks[0].rightMove();
		}
		//up
		if(event.keyCode === 38){
			groupBlocks[0].rotate();
		}
		//down
		if(event.keyCode === 40){
			groupBlocks[0].fall();
		}
	});
	restart.addEventListener('click',Restart);
});