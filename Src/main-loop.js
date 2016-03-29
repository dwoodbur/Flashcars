// Transition codes.
GO_TO_TOPIC_MENU = 0;
GO_TO_GAME = 1;

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

function MainLoop() {
	if(currentShell.getTransition() == GO_TO_TOPIC_MENU)
		currentShell = new TopicMenu(jsonData);
	else if(currentShell.getTransition() == GO_TO_GAME)
		currentShell = new Game(jsonData[currentShell.getSelectedIndex()]);
	
	currentShell.update();
	currentShell.draw();
	frames++;
	requestAnimationFrame(MainLoop);
}
MainLoop();
