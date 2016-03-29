

function Game(jsonObj) {
	/* Private Data */
	
	var canvas = document.getElementById('main-canvas');
	var ctx = canvas.getContext('2d');
	
	var gameData = jsonObj.gameData;
	
	var transition = -1;
	
	var gameStarted = false;
	
	var car = new Car({x:canvas.width/6, y:canvas.height-208+26}, {width:70, height:35});
	var lanes = [];
	for(var i=0; i<4; i++) {
		var readyResponse = "No";
		if(i == 3)
			readyResponse = "Bring it on!";
		lanes.push(new Lane(i+1, {x:0, y:canvas.height-208+(i*52)}, {width:canvas.width, height:50}, readyResponse));
	}
	var flashcard = new Flashcard({x:50, y:50}, {width:canvas.width/2, height:canvas.height/3},
		{definition:"Are you ready?", term:"Bring it on!"}, canvas);
		
	var blackRects = [];
	for(var i=0; i<15; i++)
		blackRects.push(new BlackRectangle({x:i*60, y:canvas.height-208}, {width: 30, height: 206}, canvas.width));
		
	var timer = new Timer({x:canvas.width-100, y:100});
	
	var question = null;
	
	var speed = 1;
	var distance = 0;
	var points = 0;
	var correctAnswer = null;
	var timeSinceSelection = 0;
	var correctLane=0;
	
	/* Public Methods */
	
	// Update Method
	this.update = function() {
		car.update();
		
		for(var i in blackRects)
			blackRects[i].update(speed);
		
		if(gameStarted && frames%60 == 0)
			timer.tick();
			
		if(correctAnswer != null) {
			timeSinceSelection--;
			if(timeSinceSelection <= 0) {
				correctAnswer = null;
				for(var i in lanes) {
					lanes[i].reset();
				}
				generateNewQuestion();
			}
		}
			
		//if(frames%60 == 0)
		//	speed *= .9;
		if(gameStarted)
			distance = Math.round(distance+speed);
	};
	
	// Draw Method
	this.draw = function() {
		ctx.fillStyle = "#0099cc";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, canvas.height-210, canvas.width, 210);
	
		flashcard.draw(ctx, correctAnswer);
		timer.draw(ctx);
		
		ctx.fillStyle = "black";
		ctx.font = "12px Arial";
		ctx.fillText("Points: "+points, 50, canvas.height/2);
		ctx.fillText("Distance: "+distance, 50, canvas.height/2+30);
		
		for(var i in blackRects)
			blackRects[i].draw(ctx);
		
		for(var i in lanes)
			lanes[i].draw(ctx);
	
		car.draw(ctx);
	};
	
	this.getTransition = function() {
		return transition;
	};
	
	function generateNewQuestion() {
		// Get new random question.
		var oldQuestion = question;
		while(question == oldQuestion) {
			question = gameData[Math.floor(Math.random()*gameData.length)];
		}
		flashcard.setQuestion(question);
		
		// Get possible wrong answers.
		var wrongAnswers = [];
		for(var i in gameData) {
			if(gameData[i].definition != question.definition)
				wrongAnswers.push(gameData[i].term);
		}
		
		// Assign possible answers to lanes.
		correctLane = Math.floor(Math.random()*4);
		for(var i in lanes) {
			if(i == correctLane)
				lanes[i].setAnswer(question.term);
			else {
				var selectionIndex = Math.floor(Math.random()*wrongAnswers.length);
				lanes[i].setAnswer(wrongAnswers[selectionIndex]);
				wrongAnswers.splice(selectionIndex, 1);
			}
		}
	}
	
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
    	if(timeSinceSelection <= 0) {
		for(var i in lanes) {
			if(lanes[i].pointWithin(mousePos))
				lanes[i].highlight();
			else if(lanes[i].isHighlighted)
				lanes[i].unhighlight();
		}
		}
    }
	
	// Handles checks/effects of click down.
	function mouseDown(mousePos) {
	}
	
	// Handles checks/effects of click release.
	function mouseUp(mousePos) {
		if(timeSinceSelection <= 0) {
		var selectedLaneIndex = -1;
		for(var i in lanes) {
			if(lanes[i].pointWithin(mousePos)) {
				car.moveTo(lanes[i].getYCenter());
				if(!gameStarted && i == 3) {
					gameStarted = true;
					generateNewQuestion();
				}
				else selectedLaneIndex = i;
				break;
			}
		}
		if(selectedLaneIndex != -1) {
			if(lanes[i].getAnswer() == question.term) {
				correctAnswer = true;
				timeSinceSelection = 80;
				lanes[i].markRight();
				points++;
				speed++;
			}
			else {
				correctAnswer = false;
				lanes[i].markWrong();
				lanes[correctLane].markRight();
				timeSinceSelection = 120;
				speed = 1;
			}
		}
		}
	}
	
	function mouseOut(mousePos) {
		for(var i in lanes) {
			lanes[i].unhighlight();
		}
	}
	
	// Creates, adds mouse event handlers (above).
	function down(evt){mouseDown(getMousePos(evt));}
	function move(evt){mouseMove(getMousePos(evt));}
	function up(evt){mouseUp(getMousePos(evt));}
	function out(evt){mouseOut();}
    canvas.addEventListener('mousedown', down, false);
	canvas.addEventListener('mousemove', move, false);
	canvas.addEventListener('mouseup', up, false);
	canvas.addEventListener('mouseout', out, false);

}
