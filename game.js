class GAME {
	constructor() {
		this.timeout = 20;
	}
	start() {
		Con.init()
		Svg.createMap()
		Players.setNewPlayer('Pat')
		Picto.init()
		Rabbit.init()
		Svg.addCadre()
		// Svg.addRessources(122)

		setInterval(() => {
			this.update()
		}, this.timeout);
	}
	update() {
		if (Players.player) Players.update();
	}
}
const Con = new Console();
const Maps = new MapsManager()
const Rabbit = new RabbitManager()
const Doom = new DOMGenerator();
const Players = new PlayerManager();
const Svg = new SvgManager()
const Picto = new PictoMoover()
const Game = new GAME();
window.onload = () => {
	Game.start()
}
