class GAME {
	constructor() {
		this.timeout = 20;
	}
	start() {
		Con.init()
		Svg.createMap()
		Svg.addRessources(122)
		Players.setNewPlayer('Foon')
		Svgmoover.init()
		setInterval(() => {
			this.update()
		}, this.timeout);
	}
	update() {
		Svg.update()
	}
}
const Con = new Console();
const Maps = new MapsManager()
const Doom = new DOMGenerator();
const Players = new PlayerManager();
const Svg = new SvgManager()
const Svgmoover = new SvgMoover()
const Game = new GAME();
window.onload = () => {
	Game.start()
}
