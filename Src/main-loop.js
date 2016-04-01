// Transition codes.
GO_TO_TOPIC_MENU = 0;
GO_TO_GAME = 1;
GO_TO_GAME_OVER = 2;

frames = 0;

// JSON data.
var jsonData = [];
var topicFiles = ["Data/42.json", "Data/43.json", "Data/44.json", "Data/46.json", "Data/47.json"];
	
for(var i in topicFiles) {
	var request = new XMLHttpRequest();
	request.open("GET", topicFiles[i], false);
	request.send();
	var jsonObj = JSON.parse(request.responseText);
	jsonData.push(jsonObj);
}

var currentShell = new MainMenu();
var selectedIndex = 0;

function MainLoop() {
	if(currentShell.getTransition() == GO_TO_TOPIC_MENU)
		currentShell = new TopicMenu(jsonData, currentShell.getObjects());
	else if(currentShell.getTransition() == GO_TO_GAME) {
		if(currentShell.getSelectedIndex() != -1)
			selectedIndex = currentShell.getSelectedIndex();
		currentShell = new Game(jsonData[selectedIndex], currentShell.getObjects());
	}
	else if(currentShell.getTransition() == GO_TO_GAME_OVER)
		currentShell = new GameOver(currentShell.getObjects(), currentShell.points());
	
	currentShell.update();
	currentShell.draw();
	frames++;
	requestAnimationFrame(MainLoop);
}
MainLoop();
