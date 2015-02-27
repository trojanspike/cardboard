GameRoom.prototype = Object.create(THREE.Object3D.prototype);
GameRoom.prototype.constructor = GameRoom;

function GameRoom(scene){
	THREE.Object3D.call(this);
	var room = this;
	
	var boxHeight = 30;
	var boxWidth = 30;
	var boxDepth = 60;
	var depthOffset = -20;
	var batLine = -8;
	
	this.score = 0;
	
	this.showScore = function(){
		if (room.scoreText){
			room.scoreText.remove();
		}
	
		room.scoreText = new Textbox(scene, {
			text: ""+room.score,
			radius: 4 * SCALE,
			degree: 90,
			size: 3,
			verticalDegree: 0,
			color: 0xFFFFFF,
			transparent: true,
			opacity: 0.6
		});
	}
	
	this.incrementScore = function() {
		room.score += 1;
		room.showScore();
	};
	
	this.resetScore = function() {
		room.score = 0;
		room.showScore();
	};
	this.showScore();
	
	
	var roomColor = 0xFFFFFF;
	
	// Geometry: floor

	var floor = new THREE.Mesh(
			new THREE.BoxGeometry(boxWidth, 1, boxDepth),
			new THREE.MeshPhongMaterial( { color: roomColor, overdraw: 0.5 })
	);
	floor.position.y = (boxHeight / 2) * -1;
	floor.position.z = depthOffset;

	scene.add(floor);
	
	// Geometry: ceiling
		
	var ceiling = new THREE.Mesh(
			new THREE.BoxGeometry(boxWidth, 1, boxDepth),
			new THREE.MeshPhongMaterial( { color: roomColor, overdraw: 0.5 })
	);
	ceiling.position.y = (boxHeight / 2);
	ceiling.position.z = depthOffset;

	scene.add(ceiling);
	
	var light = new THREE.PointLight(0xffffff);
    light.position.set(0,0,0);
    scene.add(light);
	light.intensity = 0.7;
	
	

	var wallNorth = createWallLeft(boxHeight, boxDepth, boxWidth, depthOffset, roomColor);
	scene.add(wallNorth);
	var wallEast = createWallFront(boxHeight, boxDepth, boxWidth, depthOffset, roomColor);
	scene.add(wallEast);
	var wallWest = createWallBack(boxHeight, boxDepth, boxWidth, depthOffset, roomColor);
	scene.add(wallWest);
	var wallSouth = createWallRight(boxHeight, boxDepth, boxWidth, depthOffset, roomColor);
	scene.add(wallSouth);
	
	var batLength = 10;
	var batWidth = 10;
	
	this.bat = new Bat(scene, {
		rectLength: batLength, 
		rectWidth: batWidth,
		boxHeight: boxHeight,
		boxWidth: boxWidth,
		boxDepth: boxDepth,
		depthOffset: depthOffset,
		batLine: batLine,
		color: 0xD43001
	});
	
	this.ball = new Ball(scene, {
		collidableMeshList: [wallNorth, wallEast, wallWest, wallSouth],
		bat: this.bat,
		boxHeight: boxHeight,
		boxWidth: boxWidth,
		boxDepth: boxDepth,
		depthOffset: depthOffset,
		batLine: batLine,
		batLength: batLength, 
		batWidth: batWidth,
		room: room
	});
	
}

function createWallLeft(boxHeight, boxDepth, boxWidth, depthOffset, roomColor){
	var wall = new THREE.Mesh(
			new THREE.BoxGeometry(1, boxHeight, boxDepth),
			new THREE.MeshPhongMaterial( { color: roomColor, overdraw: 0.5 })
	);
	wall.position.x = ((boxWidth / 2) * -1);
	wall.position.z = depthOffset;
	wall.position.y = 0;
	
	return wall;
}

function createWallRight(boxHeight, boxDepth, boxWidth, depthOffset, roomColor){
		var wall = new THREE.Mesh(
			new THREE.BoxGeometry(1, boxHeight, boxDepth),
			new THREE.MeshPhongMaterial( { color: roomColor, overdraw: 0.5 })
	);
	wall.position.x = (boxWidth / 2);
	wall.position.z = depthOffset;
	wall.position.y = 0;

	return wall;
}

function createWallFront(boxHeight, boxDepth, boxWidth, depthOffset, roomColor){
	var wall = new THREE.Mesh(
			new THREE.BoxGeometry(boxWidth, boxHeight, 1),
			new THREE.MeshPhongMaterial( { color: roomColor, overdraw: 0.5 })
		
	);
	
	wall.position.x = 0;
	wall.position.z = ((boxDepth / 2) * -1) + depthOffset;
	wall.position.y = 0;

	return wall;
}

function createWallBack(boxHeight, boxDepth, boxWidth, depthOffset, roomColor){
		var wall = new THREE.Mesh(
			new THREE.BoxGeometry(boxWidth, boxHeight, 1),
			new THREE.MeshPhongMaterial( { color: roomColor, overdraw: 0.5 })
	);
	wall.position.x = 0;
	wall.position.z = (boxDepth / 2) + depthOffset;
	wall.position.y = 0;

	return wall;
}

