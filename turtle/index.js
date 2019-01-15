(function (){
	const canvas = document.getElementById('canvas') // the canvas where game will be drawn
	const context = canvas.getContext('2d') // canvas context
	const levelCols = 5							// level width, in tiles
	const levelRows = 4							// level height, in tiles
	const tileSize = 90							// tile size, in pixels
	const playerCol = 0 // player starting column
	const playerRow = 1 // player starting row
	let leftPressed = false // are we pressing LEFT arrow key?
	let rightPressed = false // are we pressing RIGHT arrow key?
	let upPressed = false // are we pressing UP arrow key?
	let downPressed = false // are we pressing DOWN arrow key?
	const movementSpeed = 3 // the speed we are going to move, in pixels per frame
	let playerXSpeed = 0 // player horizontal speed, in pixels per frame
	let playerYSpeed = 0 // player vertical speed, in pixels per frame

	const level = [ // the 5x4 level - 1=wall, 0=empty space
		[ 0, 0, 0, 0, 0 ],
		[ 1, 1, 0, 1, 0 ],
		[ 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 1, 0 ]
	]

	let playerYPos = playerRow * tileSize				// converting Y player position from tiles to pixels
	let playerXPos = playerCol * tileSize // converting X player position from tiles to pixels

	canvas.width = tileSize * levelCols // canvas width. Won't work without it even if you style it from CSS
	canvas.height = tileSize * levelRows // canvas height. Same as before

	// simple WASD listeners

	document.addEventListener('keydown', function (e){
		switch (e.keyCode) {
			case 65:
				leftPressed = true
				break
			case 87:
				upPressed = true
				break
			case 68:
				rightPressed = true
				break
			case 83:
				downPressed = true
				break
		}
	}, false)

	document.addEventListener('keyup', function (e){
		switch (e.keyCode) {
			case 65:
				leftPressed = false
				break
			case 87:
				upPressed = false
				break
			case 68:
				rightPressed = false
				break
			case 83:
				downPressed = false
				break
		}
	}, false)

	// function to display the level

	function renderLevel(){
		// clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height)
		// walls = red boxes
		context.fillStyle = '#ff0000'
		for (let i = 0; i < levelRows; i++) {
			for (let j = 0; j < levelCols; j++) {
				if (level[ i ][ j ] == 1) {
					context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize)
				}
			}
		}
		// player = green box
		context.fillStyle = '#00ff00' // green box for turtle
		context.fillRect(playerXPos, playerYPos, tileSize, tileSize)
	}

	// this function will do its best to make stuff work at 60FPS - please notice I said "will do its best"

	window.requestAnimFrame = (function (){
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function (callback){
				window.setTimeout(callback, 1000 / 60)
			}
	})()

	// function to handle the game itself

	function updateGame(){
		// no friction or inertia at the moment, so at every frame initial speed is set to zero
		playerXSpeed = 0
		playerYSpeed = 0

		// updating speed according to key pressed
		if (rightPressed) {
			playerXSpeed = movementSpeed
		} else {
			if (leftPressed) {
				playerXSpeed = -movementSpeed
			} else {
				if (upPressed) {
					playerYSpeed = -movementSpeed
				} else {
					if (downPressed) {
						playerYSpeed = movementSpeed
					}
				}
			}
		}

		// updating player position

		playerXPos += playerXSpeed
		playerYPos += playerYSpeed

		// check for horizontal collisions

		let baseCol = Math.floor(playerXPos / tileSize)
		let baseRow = Math.floor(playerYPos / tileSize)
		let colOverlap = playerXPos % tileSize
		let rowOverlap = playerYPos % tileSize

		if (playerXSpeed > 0) {
			if ((level[ baseRow ][ baseCol + 1 ] && !level[ baseRow ][ baseCol ]) || (level[ baseRow + 1 ][ baseCol + 1 ] && !level[ baseRow + 1 ][ baseCol ] && rowOverlap)) {
				playerXPos = baseCol * tileSize
			}
		}

		if (playerXSpeed < 0) {
			if ((!level[ baseRow ][ baseCol + 1 ] && level[ baseRow ][ baseCol ]) || (!level[ baseRow + 1 ][ baseCol + 1 ] && level[ baseRow + 1 ][ baseCol ] && rowOverlap)) {
				playerXPos = (baseCol + 1) * tileSize
			}
		}

		// check for vertical collisions

		baseCol = Math.floor(playerXPos / tileSize)
		baseRow = Math.floor(playerYPos / tileSize)
		colOverlap = playerXPos % tileSize
		rowOverlap = playerYPos % tileSize

		if (playerYSpeed > 0) {
			if ((level[ baseRow + 1 ][ baseCol ] && !level[ baseRow ][ baseCol ]) || (level[ baseRow + 1 ][ baseCol + 1 ] && !level[ baseRow ][ baseCol + 1 ] && colOverlap)) {
				playerYPos = baseRow * tileSize
			}
		}

		if (playerYSpeed < 0) {
			if ((!level[ baseRow + 1 ][ baseCol ] && level[ baseRow ][ baseCol ]) || (!level[ baseRow + 1 ][ baseCol + 1 ] && level[ baseRow ][ baseCol + 1 ] && colOverlap)) {
				playerYPos = (baseRow + 1) * tileSize
			}
		}

		// rendering level

		renderLevel()

		// update the game in about 1/60 seconds

		window.requestAnimFrame(function (){
			updateGame()
		})
	}

	updateGame()
})()
