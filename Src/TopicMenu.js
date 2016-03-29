

function TopicMenu(jsonData) {
	/* Private Data */
	
	var canvas = document.getElementById('main-canvas');
	var ctx = canvas.getContext('2d');
	var transition = -1;
	var selectedIndex = -1;
	
	// Add button for each json file.
	var buttons = [];
	ctx.font = "20px Arial";
	for(var i in jsonData) {
		buttons.push(new Button(jsonData[i].category+": "+jsonData[i].datasetName, {x:canvas.width/2, y:30+(i*40)}, 
			{w:ctx.measureText(jsonData[i].category+": "+jsonData[i].datasetName).width+10, h:30}, 
			"yellow", "black", "orange", "20px Arial"));
	}
	
	var lanes = [];
	for(var i=0; i<4; i++)
		lanes.push(new Lane(i+1, {x:0, y:canvas.height-208+(i*52)}, {width:canvas.width, height:50}, ""));
		
	var blackRects = [];
	for(var i=0; i<15; i++)
		blackRects.push(new BlackRectangle({x:i*60, y:canvas.height-208}, {width: 30, height: 206}, canvas.width));
	
	
	/* Public Methods */
	
	// Update Method
	this.update = function() {
		
	};
	
	// Draw Method
	this.draw = function() {
		ctx.fillStyle = "#0099cc";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, canvas.height-210, canvas.width, 210);
		for(var i in lanes)
			lanes[i].draw(ctx);
			
		for(var i in blackRects)
			blackRects[i].draw(ctx);
			
		for(var i in buttons)
			buttons[i].draw(ctx);
	};
	
	this.getTransition = function() {
		return transition;
	};
	
	this.getSelectedIndex = function() {
		return selectedIndex;
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
