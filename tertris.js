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
		this.fall = function(){
			this.state = 0;
			for(var i=0;i<blocks.length;i++){
				if(blocks[i].x === this.x && blocks[i].y === (this.y+30)) {
					this.state = 1;
				}
			}
			if(this.y >=510){
				this.state = 1;
			}
			if(this.state===0){
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


	//Fumctions
	function OneBlockFall(obj){
		obj.y+=30;
	}

	//Test
	var a = new block(150,-30,"red");
	var b = new block(180,-30,"blue");
	var c = new block(150,-60,"green");
	blocks.push(a);
	blocks.push(b);
	blocks.push(c);

	// MAIN()
	function loop(){
		//reset canvas
		mainctx.fillStyle = 'rgba(0,0,0)';
		mainctx.fillRect(0,0,360,540);
		a.draw();
		a.fall();
		b.draw();
		b.fall();
		c.draw();
		c.fall();
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
	}

	loop();

});