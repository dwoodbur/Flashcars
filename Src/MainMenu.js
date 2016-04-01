

function MainMenu() {
	/* Private Data */
	
	var canvas = document.getElementById('main-canvas');
	var ctx = canvas.getContext('2d');
	var playButton = new Button("Play", {x:canvas.width/2, y:canvas.height/2}, {w:100, h:50}, "red", "black", "#00cc00", "30px Airstrike");
	
	var transition = -1;
	
	var lanes = [];
	for(var i=0; i<4; i++)
		lanes.push(new Lane(i+1, {x:0, y:canvas.height-208+(i*52)}, {width:canvas.width, height:50}, ""));
		
	var blackRects = [];
	for(var i=0; i<11; i++)
		blackRects.push(new BlackRectangle({x:i*90, y:canvas.height-208}, {width: 60, height: 206}, canvas.width));
	this.blackRects = function() {
		return blackRects;
	};
	
	var trees = [];
	for(var i=0; i<20; i++)
		trees.push(new Tree({x:Math.random()*canvas.width, y:160+Math.max(.2, Math.random())*90}));
	trees.sort(function(a,b){return a.pos().y-b.pos().y;});
	this.trees = function() {
		return trees;
	};
	var speed = 1;
	
	var clouds = [];
	for(var i=0; i<9; i++)
		clouds.push(new Cloud({x:Math.random()*canvas.width+400, y:Math.random()*130-30}, Math.random(), Math.random()));
		
	this.getObjects = function() {
		return {trees: trees, blackRects: blackRects, clouds: clouds};
	};	
	
	var car = new Car({x:-800, y:canvas.height-80}, {width:70, height:35});
	var cops = [];
	cops.push(new Cop({x:car.x()-240, y:car.y()-50}));
	cops.push(new Cop({x:car.x()-220, y:car.y()-20}));
	
	var keys = new KeyListener();
	var keyCodes = {
		SPACE: 32,
		UP: 38,
		DOWN: 40
	};
	keyBurns = {}; // key burnouts - (which key, how much longer)
	
	
	var bgMusic = new Audio("Res/background.mp3");
	bgMusic.addEventListener('ended', function() {
    	this.currentTime = 0;
    	this.play();
	}, false);
	bgMusic.play();
	
	/* Public Methods */
	
	// Update Method
	this.update = function() {
		if(keys.isPressed(keyCodes.SPACE))
			transition = GO_TO_TOPIC_MENU;
		
		car.driveForward(10);
		for(var i in cops)
			cops[i].driveForward(10);
		if(car.x() > 3000) {
			car.setX(-800);
			car.setY(getRandomLaneY());
			for(var i in cops) {
				cops[i].setX(car.x()-220-(i*20));
				cops[i].setY(car.y()-20-(i*30));
			}
		}
		for(var i in clouds)
			clouds[i].update(.4);
	};
	
	function getRandomLaneY() {
		var r = Math.random();
		if(r < .25)
			return 460-100;
		else if(r < .5)
			return 460-50;
		else if(r < .75)
			return 460;
		else return 510;
	}
	
	// Draw Method
	this.draw = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		ctx.rect(0, 0, canvas.width, canvas.height/3);
		var grdSky = ctx.createLinearGradient(canvas.width/2, 0, canvas.width/2, canvas.height/3);
		grdSky.addColorStop(0, "#0052cc");
		grdSky.addColorStop(1, "#0099cc");
		ctx.fillStyle = grdSky;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		ctx.rect(0, canvas.height/3, canvas.width, 2*canvas.height/3);
		var grdGround = ctx.createLinearGradient(canvas.width/2, canvas.height/3, canvas.width/2, 2*canvas.height/3);
		grdGround.addColorStop(0, "green");
		grdGround.addColorStop(1, "#003300");
		ctx.fillStyle = grdGround;
		ctx.fillRect(0, canvas.height/3, canvas.width, canvas.height/3);
		
		for(var i in trees)
			trees[i].draw(ctx);
			
		for(var i in clouds)
			clouds[i].draw(ctx);
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, canvas.height-210, canvas.width, 210);
		for(var i in lanes)
			lanes[i].draw(ctx);
			
		for(var i in blackRects)
			blackRects[i].draw(ctx);
			
		car.draw(ctx);
		
		cops.sort(function(a,b){return a.pos().y-b.pos().y;});
		for(var i in cops)
			cops[i].draw(ctx);
			
		for(var i in clouds)
			clouds[i].draw(ctx);
			
		ctx.font = "90px Airstrike";
		ctx.fillStyle = "yellow";
		ctx.fillText("Flashcars!", 135, 120);
		ctx.fillStyle = "orange";
		ctx.fillText("Flashcars!", 140, 120);
		ctx.fillStyle = "black";
		ctx.font = "20px Airstrike";
		ctx.fillText("by Dylan Woodbury", 320, 150);
		
		playButton.draw(ctx);
	};
	
	this.getTransition = function() {
		return transition;
	};
	
	// Returns mouse position, records click type.
	function getMousePos(evt) {
    	var rect = canvas.getBoundingClientRect();
    	
    	return {
    		x: Math.floor(evt.clientX - rect.left),
    		y: Math.floor(evt.clientY - rect.top)
    	};
    }
    
    // Handles checks/effects for mouse movement.
    function mouseMove(mousePos) {
    	if(playButton.pointWithin(mousePos))
    		playButton.highlight();
    	else if(playButton.isHighlighted())
    		playButton.unhighlight();
    }
	
	// Handles checks/effects of click down.
	function mouseDown(mousePos) {
	}
	
	// Handles checks/effects of click release.
	function mouseUp(mousePos) {
		if(playButton.pointWithin(mousePos))
			transition = GO_TO_TOPIC_MENU;
	}
	
	// Creates, adds mouse event handlers (above).
	function down(evt){mouseDown(getMousePos(evt));}
	function move(evt){mouseMove(getMousePos(evt));}
	function up(evt){mouseUp(getMousePos(evt));}
    canvas.addEventListener('mousedown', down, false);
	canvas.addEventListener('mousemove', move, false);
	canvas.addEventListener('mouseup', up, false);
}
