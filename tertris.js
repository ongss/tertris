$(document).ready(function(){

	//Var
	var main = document.getElementById("main");
	var mainctx = main.getContext("2d");
	main.height = 540;
	main.width = 360;

	var next = document.getElementById("nextBlock");
	var nextctx = next.getContext("2d");
	next.height = 120;
	next.width = 180;

	var blocks = [];
	var groupBlocks = [];

	colorList = ["blue","yellow","red","orange","pink","green","cyan","BlueViolet"];

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
		this.fall = function(){
			if(this.state() === 0){
				for(var i=0;i<this.group.length;i++){
					this.group[i].fall();
				}
			}
			else{
				for(var i=0;i<this.group.length;i++){
					blocks.push(this.group[i]);
				}
				groupBlocks.splice(0,1);
				genBlock();
			}
		}
		this.draw = function(){
			for(var i=0;i<this.group.length;i++){
				this.group[i].draw();
			}
		}
	}


	//Fumctions
	function genBlock(){
		var type = RandomNum(1,5);
		var pos = 0;
		if(type === 1){
			pos = RandomNum(0,8)*30;
		}
		else{
			pos = RandomNum(0,9)*30;
		}
		var color = colorList[RandomNum(0,colorList.length)];
		var newBlock = new blockGroup(color,type,pos);
		groupBlocks.push(newBlock);
	}

	function RandomNum(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}

	//Test
	//var a = new blockGroup("red",3,150);
	genBlock();


	// MAIN()
	function loop(){
		//reset canvas
		setTimeout(function(){
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
			requestAnimationFrame(loop);
		},750);
	}

	loop();

});