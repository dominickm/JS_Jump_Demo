var i = document.getElementById("i"),
	context = i.getContext("2d"),
 	gLoop,
	width = 320,
	height = 460;

var clear = function() {
	context.fillStyle = "#B22400";
	context.clearRect(0, 0, width, height);
	context.beginPath();
	context.rect(0, 0, width, height);
	context.closePath();
	context.fill();
}

var player = new (function() {
	this.image = new Image();
	this.image.src = "file:///Users/michael/Dropbox/Examples/iOS/Web_Tech/Web_Jump//Player.png";
	this.width = 55;
	this.height = 20;
	this.x = 0;
	this.y = 0;
	this.frames = 1;
	this.jumping = false;
	this.falling = false;
	this.speed = 0;
	this.fallSpeed = 0;
	
	
	// some methods
	this.setPosition = function(x, y) {
		this.x = x;
		this.y = y;
	}
	this.draw = function() {
		try {
			context.drawImage(this.image, 0, this.height, this.width, this.height, this.x, this.y, this.width, this.height);
		} catch (e) {
			// you can do things here if you like
		}
	}
	this.jump = function() {
	//	console.log("jump() has been called");
		if (!this.jumping && !this.falling) {
		//	console.log("and the conditional has been passed");
			this.fallSpeed = 0;
			this.jumping = true;
			this.speed = 15;
		}
	
	}
	this.checkFalling = function() {
		if (this.y < 150) {
			this.setPosition(this.x, this.y + this.fallSpeed);
			this.fallSpeed++;			
		} else {
			console.log("I am the else for checkFalling");
			this.stop();
		}
	}
	this.checkJumping = function() {
	//	console.log("checkJumping() has been called, SPEED == ", this.speed);
		this.setPosition(this.x, this.y - this.speed);
		this.speed--;
		if (this.speed == 0) {
			console.log("the speed == 0");
			this.jumping = false;
			this.falling = true;
			this.fallSpeed = 1;
		}
	}
	this.stop = function() {
	//	console.log("stop has been called");
		this.falling = false;
		this.fallSpeed = 0;
		this.jump();
	}
	this.turnLeft = function() {
		if (this.x > 0) {
			this.setPosition(this.x - 5, this.y);
		}
	}
	this.turnRight = function() {
			this.setPosition(this.x + 5, this.y);
	}
})();

var GameLoop = function() {
	clear();
	player.draw();
	gLoop = setTimeout(GameLoop, 1000 / 50);
	if (player.jumping) {
		player.checkJumping();
	} else if (player.falling) {
		player.checkFalling();
	}
}

document.onmousemove = function(e) {
	console.log("Mouse has moved");
	if (player.x + context.offsetLeft < context.x) {
		player.turnLeft();
	} else if (player.x + context.offSetLeft < context.x) {
		player.turnRight(); 
	}
}
GameLoop();
player.setPosition(~~((width - player.width) / 2), ((height - player.height) / 2));
player.jump();