

function Game(jsonObj, gameObjects) {
	/* Private Data */
	
	var canvas = document.getElementById('main-canvas');
	var ctx = canvas.getContext('2d');
	
	var gameData = jsonObj.gameData;
	var jsonObj = jsonObj;
	this.getData = function() {
		return jsonObj;
	};
	
	var transition = -1;
	
	var gameStarted = false;
	
	var car = new Car({x:-100, y:canvas.height-208+26}, {width:70, height:35});
	var lanes = [];
	for(var i=0; i<4; i++) {
		var readyResponse = "No";
		if(i == 3)
			readyResponse = "Bring it on!";
		lanes.push(new Lane(i+1, {x:0, y:canvas.height-208+(i*52)}, {width:canvas.width, height:50}, readyResponse));
	}
	
	var flashcard = new Flashcard({x:150, y:50}, {width:canvas.width/2+50, height:canvas.height/3},
		{definition:"Are you ready?", term:"Bring it on!"}, canvas);
		
	var blackRects = gameObjects.blackRects;
	
	var timer = null;
	
	var question = null;
	
	var speed = 1;
	var points = 0;
	var streak = 0;
	var correctAnswer = null;
	var timeSinceSelection = 0;
	var correctLane=0;
	var selectedLane = 0;
	
	var trees = gameObjects.trees;
	var clouds = gameObjects.clouds;
	
	var cops = [];
	//cops.push(new Cop({x:car.x()-240, y:car.y()-50}));
	//cops.push(new Cop({x:car.x()-220, y:car.y()-20}));
	
	var carSound = new Audio("Res/Revmotor.wav");
	var brakesSound = new Audio("Res/brakes.wav");
	var copSound = new Audio("Res/police.mp3");
	function resetCopSound() {
  		copSound.pause();
  		copSound.currentTime = 0;
	}
		
	this.getObjects = function() {
		return {trees: trees, blackRects: blackRects, clouds: clouds};
	};	
	
	var fire = null;// = new FireEffect({x:200, y:270}, .5);
	
	var keys = new KeyListener();
	var keyCodes = {
		SPACE: 32,
		UP: 38,
		DOWN: 40
	};
	keyBurns = {}; // key burnouts - (which key, how much longer)
	
	
	
	/* Public Methods */
	
	// Update Method
	this.update = function() {
		
		if(keys.isPressed(keyCodes.UP) && !("UP" in keyBurns)) {
			selectedLane = Math.max(0, selectedLane-1);
			lanes[selectedLane+1].unhighlight();
			lanes[selectedLane].highlight();
			car.moveTo(lanes[selectedLane].getYCenter());
			keyBurns["UP"] = 10;
		}
		else if(keys.isPressed(keyCodes.DOWN) && !("DOWN" in keyBurns)) {
			selectedLane = Math.min(3, selectedLane+1);
			lanes[selectedLane-1].unhighlight();
			lanes[selectedLane].highlight();
			car.moveTo(lanes[selectedLane].getYCenter());
			keyBurns["DOWN"] = 10;
		}
		if(keys.isPressed(keyCodes.SPACE) && !("SPACE" in keyBurns) && selectedLane >= 0 && selectedLane <= 3 && timeSinceSelection <= 0) {
			if(gameStarted) {
				if(lanes[selectedLane].getAnswer() == question.term)
					handleCorrectAnswer();
				else handleIncorrectAnswer();
			}
			else {
				if(selectedLane == 3)
					startGame();
			}
			car.moveTo(lanes[selectedLane].getYCenter());
			keyBurns["SPACE"] = 15;
		}
		for(var i in keyBurns) {
			keyBurns[i]--;
			if(keyBurns[i] == 0)
				delete keyBurns[i];
		}
			
		
		car.update();
		if(car.x() < 300)
			car.driveForward(5);
		
		if(fire != null)
			fire.update();
		
		for(var i in cops) {
			if(streak >= 6) {
				cops[i].update(car.y()-20-(i*30));
				if(cops[i].x() < car.x()-220-(i*20))
					cops[i].driveForward(5);
			}
			else {
				cops[i].driveBack(speed*5);
				if(cops[i].x() < -100)
					cops.splice(i, 1);
			}
		}
		
		for(var i in blackRects)
			blackRects[i].update(speed*5);
		for(var i in trees)
			if(trees[i].update(speed*5))
				trees.sort(function(a,b){return a.pos().y-b.pos().y;});
				
		for(var i in clouds)
			clouds[i].update(speed*.4);
		
		if(gameStarted && frames%60 == 0 && timer != null)
			timer.tick();
		if(timer != null && timer.timeLeft() <= 0)
			transition = GO_TO_GAME_OVER;
			
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
		
		for(var i in trees)
			trees[i].draw(ctx);
		
		for(var i in clouds)
			clouds[i].draw(ctx);
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, canvas.height-210, canvas.width, 210);
	
		flashcard.draw(ctx, correctAnswer);
		if(timer != null)
			timer.draw(ctx);
		
		
		if(fire != null)
			fire.draw(ctx);
		ctx.fillStyle = "black";
		ctx.font = "15px Airstrike";
		ctx.fillText("Points", 50, canvas.height/2+20);
		ctx.font = "25px Airstrike";
		ctx.fillText("Speed", canvas.width-170, canvas.height/2+20);
		ctx.fillStyle = "white";
		ctx.font = "60px Airstrike";
		ctx.fillText(points, 70, canvas.height/2);
		ctx.fillStyle = "yellow";
		if(Math.round(speed*45) >= 80)
			ctx.fillStyle = "red";
		else if(Math.round(speed*45) >= 60)
			ctx.fillStyle = "orange";
		ctx.fillText(Math.round(speed*45), canvas.width-200, canvas.height/2-10);
		ctx.font = "20px Airstrike";
		ctx.fillText("MPH", canvas.width-110, canvas.height/2-10);
		
		for(var i in blackRects)
			blackRects[i].draw(ctx);
		
		for(var i in lanes)
			lanes[i].draw(ctx);
		
		car.draw(ctx);
		
		cops.sort(function(a,b){return a.pos().y-b.pos().y;});
		for(var i in cops)
			cops[i].draw(ctx);
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
			if(lanes[i].pointWithin(mousePos)) {
				lanes[i].highlight();
				selectedLane = i;	
			}
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
					startGame();
				}
				else selectedLaneIndex = i;
				break;
			}
		}
		if(selectedLaneIndex != -1) {
			if(lanes[i].getAnswer() == question.term) {
				handleCorrectAnswer();
			}
			else {
				handleIncorrectAnswer();
			}
		}
		}
	}
	
	function handleCorrectAnswer() {
		correctAnswer = true;
		timeSinceSelection = 80-Math.min(streak*5, 40);
		lanes[selectedLane].markRight();
		if(streak < 6)
			points++;
		else points += 2;
		speed += .15;
		streak++;
		if(streak >= 6 && cops.length == 0)
			introduceCops();
		if(streak == 6)
			fire = new FireEffect({x:620, y:110}, 1);
		
		carSound.play();
		
		
	}
	
	function handleIncorrectAnswer() {
		correctAnswer = false;
		lanes[selectedLane].markWrong();
		lanes[correctLane].markRight();
		timeSinceSelection = 120;
		speed = 1;
		streak = 0;
		fire = null;
		resetCopSound();
		brakesSound.play();
	}
	
	function startGame() {
		gameStarted = true;
		generateNewQuestion();
		timer = new Timer({x:canvas.width-130, y:100});
	}
	
	function introduceCops() {
		cops.push(new Cop({x:-120, y:car.y()-20}));
		cops.push(new Cop({x:-120, y:car.y()-50}));
		copSound.play();
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
	
	this.points = function() {
		return points;
	};

}
