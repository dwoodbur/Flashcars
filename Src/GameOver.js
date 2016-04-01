

function GameOver(gameObjects, points) {
	/* Private Data */
	
	var canvas = document.getElementById('main-canvas');
	var ctx = canvas.getContext('2d');
	var playButton = new Button("Rechoose Topic", {x:canvas.width/2, y:canvas.height/2+70}, {w:300, h:50}, "#00cc00", "black", "green", "30px Airstrike");
	var retryButton = new Button("Retry", {x:canvas.width/2, y:canvas.height/2}, {w:180, h:50}, "#00cc00", "black", "green", "30px Airstrike");
	
	var transition = -1;
	
	var lanes = [];
	for(var i=0; i<4; i++)
		lanes.push(new Lane(i+1, {x:0, y:canvas.height-208+(i*52)}, {width:canvas.width, height:50}, ""));
	var data = data;
	var trees = gameObjects.trees;
	var blackRects = gameObjects.blackRects;
	var clouds = gameObjects.clouds;
		
	this.getObjects = function() {
		return {trees: trees, blackRects: blackRects, clouds: clouds};
	};	
	
	var points = points;
	
	
	
	/* Public Methods */
	
	// Update Method
	this.update = function() {
		
	};
	
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
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, canvas.height-210, canvas.width, 210);
		for(var i in lanes)
			lanes[i].draw(ctx);
			
		for(var i in blackRects)
			blackRects[i].draw(ctx);
			
		for(var i in trees)
			trees[i].draw(ctx);
		for(var i in clouds)
			clouds[i].draw(ctx);
			
		ctx.font = "90px Airstrike";
		ctx.fillStyle = "orange";
		ctx.fillText("Game Over!", 145, 120);
		ctx.fillStyle = "red";
		ctx.fillText("Game Over!", 150, 120);
		
		ctx.font = "50px Airstrike";
		ctx.fillStyle = "orange";
		ctx.fillText("Final Score: "+points, 235, 200);
		ctx.fillStyle = "red";
		ctx.fillText("Final Score: "+points, 240, 200);
		
		playButton.draw(ctx);
		retryButton.draw(ctx);
	};
	
	this.getTransition = function() {
		return transition;
	};
	
	this.getSelectedIndex = function() {
		return -1;
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
    	if(retryButton.pointWithin(mousePos))
    		retryButton.highlight();
    	else if(retryButton.isHighlighted())
    		retryButton.unhighlight();
    }
	
	// Handles checks/effects of click down.
	function mouseDown(mousePos) {
	}
	
	// Handles checks/effects of click release.
	function mouseUp(mousePos) {
		if(playButton.pointWithin(mousePos)) {
			transition = GO_TO_TOPIC_MENU;
		}
		else if(retryButton.pointWithin(mousePos)) {
			transition = GO_TO_GAME;
		}
	}
	
	// Creates, adds mouse event handlers (above).
	function down(evt){mouseDown(getMousePos(evt));}
	function move(evt){mouseMove(getMousePos(evt));}
	function up(evt){mouseUp(getMousePos(evt));}
    canvas.addEventListener('mousedown', down, false);
	canvas.addEventListener('mousemove', move, false);
	canvas.addEventListener('mouseup', up, false);
}
