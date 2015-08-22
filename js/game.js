
    var Game = function() {   
		this.load();
		this.step();
	} 

	Game.prototype.level = 1;	  
	Game.prototype.GAME_HEIGHT = 360;
	Game.prototype.GAME_WIDTH = 640;
	Game.prototype.gameLive = true;
	Game.prototype.enemies = [
	{	
	  x: 100, 
	  y: 100, 
	  speedY: 2, 
	  w: 40, 
	  h: 40 
	},
	{
	  x: 200,
	  y: 0,
	  speedY: 2,
	  w: 40,
	  h: 40
	},
	{
	  x: 330,
	  y: 100,
	  speedY: 1,
	  w: 40,
	  h: 40
	},
	{
	  x: 450,
	  y: 100,
	  speedY: -1,
	  w: 40,
	  h: 40
	}
	];

	Game.prototype.player = {
	x: 10,
	y: 160,
	speedX: 2.5,
	isMoving: false,
	w: 40,
	h: 40
	};

	Game.prototype.goal = {
	x: 580,
	y: 160,
	w: 50,
	h: 36
	}

	Game.prototype.sprites = {};

	Game.prototype.movePlayer = function() {
	Game.prototype.player.isMoving = true;
	}

	Game.prototype.stopPlayer = function() {
	Game.prototype.player.isMoving = false;
	}

	//grab the canvas and context
	var canvas = document.getElementById("target");
	var ctx = canvas.getContext("2d");

	//event listeners to move player
	canvas.addEventListener('mousedown', Game.prototype.movePlayer);
	canvas.addEventListener('mouseup', Game.prototype.stopPlayer);   
	canvas.addEventListener('touchstart', Game.prototype.movePlayer);
	canvas.addEventListener('touchend', Game.prototype.stopPlayer);   

	Game.prototype.load = function() {

	this.sprites.player = new Image();
	this.sprites.player.src = 'images/hero.png';

	this.sprites.background = new Image();
	this.sprites.background.src = 'images/floor.png';

	this.sprites.enemy = new Image();
		this.sprites.enemy.src = 'images/b'+this.level+'.png';
		//this.sprites.enemy.src = 'images/b1.png';

	this.sprites.goal = new Image();
	this.sprites.goal.src = 'images/chest.png';

	};

	//update the logic
	Game.prototype.update = function() {

	//check if you've won the game
	if(this.checkCollision(this.player, this.goal)) {          

	  //increase the level
	  this.level++;

	  //set the player back to the start
	  this.player.x = 10;
	  this.player.y = 160;

	  //increase the speed of the enemies by 1
	  this.enemies.forEach(function(element, index){
		element.speedY += element.speedY/Math.abs(element.speedY);
	  });

	  this.sprites.enemy.src = 'images/b'+this.level+'.png';           
	}

	//update player
	if(this.player.isMoving) {
	  this.player.x = this.player.x + this.player.speedX;
	}

	//update enemies
	var i = 0;
	var n = this.enemies.length;
	var that = this;

	this.enemies.forEach(function(element, index){

	  //check for collision with player
	  if(that.checkCollision(that.player, element)) {
		//stop the game
		that.gameLive = false;

		alert('Game Over!');

		//reload page
		window.location = "";

	  }

	  //move enemy
	  element.y += element.speedY;
	  
	  //check borders
	  if(element.y <= 10) {
		element.y = 10;
		//element.speedY = element.speedY * -1;
		element.speedY *= -1;
	  }
	  
	  else if(element.y >= Game.prototype.GAME_HEIGHT - 50) {
		element.y = Game.prototype.GAME_HEIGHT - 50;
		element.speedY *= -1;
	  }
	});
	};

	//show the game on the screen
	Game.prototype.draw = function() {
	var that = this;

	ctx.clearRect(0,0,Game.prototype.GAME_WIDTH,Game.prototype.GAME_HEIGHT);        

	ctx.drawImage(this.sprites.background, 0, 0);

	ctx.drawImage(this.sprites.player, this.player.x, this.player.y);

	this.enemies.forEach(function(element, index){

	  ctx.drawImage(that.sprites.enemy, element.x, element.y);
	});

	ctx.drawImage(this.sprites.goal, this.goal.x, this.goal.y);
	};

	Game.prototype.step = function() {
		Game.prototype.update();
		Game.prototype.draw();
		if(Game.prototype.gameLive) {
		  window.requestAnimationFrame(Game.prototype.step); 
		}     
	};

	Game.prototype.checkCollision = function(rect1, rect2) {
		var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
		var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
		return closeOnWidth && closeOnHeight;
	}

	var game = new Game();
	  
	  

      
     