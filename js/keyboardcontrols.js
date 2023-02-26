class KeyboardControls {
	constructor() {
		this.way = [false, false, false, false]; // haut, droite, bas, gauche
		this.skills = [false];

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		document.addEventListener("keydown", this.handleKeyDown);
		document.addEventListener("keyup", this.handleKeyUp);
	}

	handleKeyDown(event) {
		switch (event.key) {
			case "k":
				this.skills[0] = true;
				break;
			case "ArrowUp":
			case "z":
				this.way[0] = true;
				break;
			case "ArrowRight":
			case "d":
				this.way[1] = true;
				break;
			case "ArrowDown":
			case "s":
				this.way[2] = true;
				break;
			case "ArrowLeft":
			case "q":
				this.way[3] = true;
				break;
		}
	}

	handleKeyUp(event) {
		switch (event.key) {
			case "k":
				this.skills[0] = false;
				break;
			case "ArrowUp":
			case "z":
				this.way[0] = false;
				break;
			case "ArrowRight":
			case "d":
				this.way[1] = false;
				break;
			case "ArrowDown":
			case "s":
				this.way[2] = false;
				break;
			case "ArrowLeft":
			case "q":
				this.way[3] = false;
				break;
		}
	}

	destroy() {
		document.removeEventListener("keydown", this.handleKeyDown);
		document.removeEventListener("keyup", this.handleKeyUp);
	}
}
