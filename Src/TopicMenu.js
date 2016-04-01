/* FLASHCARS */
/* TOPIC MENU */
/* Player either clicks or uses arrows/space to select which topic to play with. Proceeds to the Game. */

function TopicMenu(jsonData, gameObjects) {
	var canvas = document.getElementById('main-canvas');
	var ctx = canvas.getContext('2d');
	var transition = -1;
	var selectedIndex = -1;
	
	// Add button for each json file.
	var buttons = [];
	ctx.font = "20px Arial";
	for(var i in jsonData) {
		buttons.push(new Button(jsonData[i].category+": "+jsonData[i].datasetName, {x:canvas.width/2, y:30+(i*40)}, 
			{w:ctx.measureText(jsonData[i].category+": "+jsonData[i].datasetName).width+140, h:30}, 
			"yellow", "black", "orange", "20px Airstrike"));
	}
	
	var lanes = [];
	for(var i=0; i<4; i++)
		lanes.push(new Lane(i+1, {x:0, y:canvas.height-208+(i*52)}, {width:canvas.width, height:50}, ""));
		
	var blackRects = gameObjects.blackRects;
	var trees = gameObjects.trees;
	var clouds = gameObjects.clouds;
	var speed = 1;
		
	this.getObjects = function() {
		return {trees: trees, blackRects: blackRects, clouds: clouds};
	};	
	
	var selectedTopic = -1;
	
	var keys = new KeyListener();
	var keyCodes = {
		SPACE: 32,
		UP: 38,
		DOWN: 40
	};
	keyBurns = {}; // key burnouts - (which key, how much longer)
	
	
	/* UPDATE */

	this.update = function() {
		// Update menu selection if up/down is pressed.
		handleKeyInput();
		// Update scrolling elements.
		updateAesthetics;
	};
		// Update menu selection if up/down is pressed.
		function handleKeyInput() {
			if(keys.isPressed(keyCodes.DOWN) && !("DOWN" in keyBurns) && selectedTopic < jsonData.length-1)
				handleDown();
			else if(keys.isPressed(keyCodes.UP) && !("UP" in keyBurns))
				handleUp();
			if(keys.isPressed(keyCodes.SPACE) && !("SPACE" in keyBurns) && selectedTopic != -1)
				handleSpace();
			for(var i in keyBurns) {
				keyBurns[i]--;
				if(keyBurns[i] == 0)
					delete keyBurns[i];
			}
		}
			// Select next topic.
			function handleDown() {
				selectedTopic++;
				for(var i in buttons)
					buttons[i].unhighlight();
				buttons[selectedTopic].highlight();
				keyBurns["DOWN"] = 10;
			}
			// Select previous topic.
			function handleUp() {
				selectedTopic = Math.max(0, selectedTopic-1);
				for(var i in buttons)
					buttons[i].unhighlight();
				buttons[selectedTopic].highlight();
				keyBurns["UP"] = 10;
			}
			// Start game.
			function handleSpace() {
				transition = GO_TO_GAME;
				selectedIndex = selectedTopic;
			}
			
		// Update scrolling elements.
		function updateAesthetics() {
			for(var i in blackRects)
				blackRects[i].update(speed*5);
			for(var i in trees)
				if(trees[i].update(speed*5))
					trees.sort(function(a,b){return a.pos().y-b.pos().y;});
			for(var i in clouds)
				clouds[i].update(speed*.4);
		}
	
	
	/* DRAW */
	
	this.draw = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// Draw world.
		drawWorld();
		// Draw scrolling elements.
		drawAesthetics();
		// Draw buttons.
		drawUI();
	};
		// Draw world.
		function drawWorld() {
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
		}
		
		// Draw scrolling elements.
		function drawAesthetics() {
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
		}
		// Draw buttons.
		function drawUI() {
			for(var i in buttons)
				buttons[i].draw(ctx);
		}
	
	/* PUBLIC METHODS */
	
	this.getTransition = function() {
		return transition;
	};
	
	this.getSelectedIndex = function() {
		return selectedIndex;
	};
	
	/* MOUSE EVENT FUNCTIONS */
	
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
		for(var i in buttons) {
			if(buttons[i].pointWithin(mousePos))
				buttons[i].highlight();
			else if(buttons[i].isHighlighted)
				buttons[i].unhighlight();
		}
    }
	
	// Handles checks/effects of click down.
	function mouseDown(mousePos) {
	}
	
	// Handles checks/effects of click release.
	function mouseUp(mousePos) {
		for(var i in buttons) {
			if(buttons[i].pointWithin(mousePos)) {
				transition = GO_TO_GAME;
				selectedIndex = i;
			}
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
