function Development(project) {
	// Basic variables
	this.canvas = document.getElementById('display-canvas');
	this.context = this.canvas.getContext('2d');
	this.context.fillStyle = 'white';
	this.context.font = "10px Arial";
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.project = project;
	this.title;
	this.description;
	this.img = new Image();
	this.imgXOff;
	this.imgYOff;
	this.transition = "";
	step = 0;
	
	var homeButton = new DevButton(990, 54, 70, 30, 3, "Home", "#CC0000");
	rightSlide = new DevSlide(this.width-80, 50, 80, this.height-100, "#000099", "#000052", "right");
	leftSlide = new DevSlide(0, 50, 80, this.height-100, "#000099", "#000052", "left");
	
	CanvasText.config({
				canvas: this.canvas,
				context: this.context,
				fontFamily: "Arial",
				fontSize: "15px",
				fontWeight: "normal",
				fontColor: "#000",
				lineHeight: "22"
			});
	
	devBorder = new DevBorder(this.width, this.height, 80, 50, "#0000FF");
	
	this.adventureInit = function() {
		this.title = "Adventure Maker";
		this.description = "A mobile engine and toolset for creating, playing, and sharing 2D adventure games.";
		this.img.src = "images/Previews/Adventure.png";
		this.imgXOff = 700;
		this.imgYOff = 280;
	};
	
	this.factorInit = function() {
		this.title = "FactorMania!";
		this.description = "A mobile app for learning how to factor trinomials. Includes instructional sequences, practice sessions, and timed challenges."
		this.img.src = "images/Previews/FactorMania.png";
		this.imgXOff = 650;
		this.imgYOff = 300;
	};
	
	if(this.project == "adventure")
		this.adventureInit();
	else if(this.project == "factor")
		this.factorInit();
		
		
		
	// Mouse Event functions
	
	// Returns mouse position (x,y).
    function getMousePos(evt) {
    	var rect = this.canvas.getBoundingClientRect();
    	
    	return {
    		x: evt.clientX - rect.left + 40 + 1144,
    		y: evt.clientY - rect.top
    	};
    }
    
        
    // Activates objects if mouse is over.
    function mouseMovement(mousePos) {
    	if(leftSlide != null) {
			leftSlide.selected = leftSlide.pointWithin(mousePos);
		} 
		if(rightSlide != null) {
			rightSlide.selected = rightSlide.pointWithin(mousePos)
		} 
        
    }
    
    // MOUSE OUT FUNCTION
    function mouseOut() { 
    	// Make all options unselected.
    }
        
    // CLICK FUNCTION
    function checkClick(mousePos) {
    	//var clickFound = false;
    	if(homeButton.pointWithin(mousePos)) {
    		display.transition = "main-display";
    	}
    	if(leftSlide != null) {
			if(leftSlide.pointWithin(mousePos)) {
				step--;
				//this.loadNewStep();
			}
		} 
		if(rightSlide != null) {
			if(rightSlide.pointWithin(mousePos)) {
				step++;
				//this.loadNewStep();
			}
		} 
    	
    }
    
    this.loadNewStep = function() {
    	
    }
		
		
	/*
	 * Canvas Event Listeners
	 */
	function down(evt){checkClick(getMousePos(evt))}
	function move(evt){mouseMovement(getMousePos(evt))}
	function out(evt){mouseOut()}
    this.canvas.addEventListener('mousedown', down, false);
	this.canvas.addEventListener('mousemove', move, false);
    this.canvas.addEventListener('mouseout', out, false);

	this.removeEventListeners = function() {
		this.canvas.removeEventListener('mousedown', move);
		this.canvas.removeEventListener('mousemove', down);
    	this.canvas.removeEventListener('mouseout', out);
	}
	
	this.update = function() {
		
	};
	
	this.draw = function() {
		// Reset canvas.
		this.context.fillStyle = "white";
		this.context.fillRect(0,0,this.width,this.height);
		
		this.context.font = "bold italic 55px Arial";
		this.context.fillStyle = "#000000";
		this.context.fillText(this.title, 100, 110);
		
		if(this.project == "adventure") {
			switch(step) {
				case 6:
					step = 0;
	    		case 0:
	    			CanvasText.drawText({
						text: this.description,
						x: 110,
						y: 140,
						boxWidth: 340,
						cacheId: this.title+"Description"
					});
					this.context.drawImage(this.img, this.imgXOff, this.imgYOff);
					break;
				case 1:
					this.context.font = "bold 25px Arial";
					this.context.fillText("Inspiration", 500, 140);
					break;
				case 2:
					this.context.font = "bold 25px Arial";
					this.context.fillText("Summary", 500, 140);
					this.context.fillText("Audience", 500, 370);
					break;
				case 3:
					this.context.font = "bold 25px Arial";
					this.context.fillText("Features", 500, 140);
					break;
				case 4:
					this.context.font = "bold 25px Arial";
					this.context.fillText("Features 2", 500, 140);
					break;
				case -1:
					step = 5;
				case 5:
					this.context.font = "bold 25px Arial";
					this.context.fillText("Progress To This Point", 455, 140);
					break;
				
    		}
		}
		
		
		
		
		devBorder.draw(this.context);
		
		homeButton.draw(this.context);
		
		if(leftSlide != null)
			leftSlide.draw(this.context);
		if(rightSlide != null)
			rightSlide.draw(this.context);
	};
}
