class SvgManager {
	constructor() {
		this.margetemporaireLeft = 50
		this.margetemporaireTop = 50
		this.margetemporaireRigth = 50
		this.margetemporaireBottom = 50
		this.currentMap = 0
		this.map = Maps.getMapDatas(this.currentMap)
		this.SvgMap = null;
		this.SvgPlayer = null;
	}
	createMap() {
		Con.addMessage('Creating Map...')
		this.SvgMap = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.SvgMap.setAttribute("viewBox", `-${this.margetemporaireLeft}  -${this.margetemporaireTop} ${this.map.datas.width + (this.margetemporaireTop + this.margetemporaireLeft)} ${this.map.datas.height + (this.margetemporaireTop + this.margetemporaireLeft)}`);
		this.SvgMap.setAttribute("width", this.map.datas.width + (this.margetemporaireLeft + this.margetemporaireRigth) + 'px');
		this.SvgMap.setAttribute("height", this.map.datas.height + (this.margetemporaireTop + this.margetemporaireBottom) + 'px');
		this.SvgMap.setAttribute("class", 'map');
		this.SvgMap.setAttribute("xml:space", 'preserve');
		this.SvgMap.setAttribute("enable-background:new", `0 0 ${this.map.datas.width} ${this.map.datas.height}`);

		this.refreshSvgMap()
		let cadre = this.getRect(-this.margetemporaireLeft, -this.margetemporaireTop, this.map.datas.width, this.map.datas.width, 'rgba(0,0,255,.1)')
		this.SvgMap.appendChild(cadre)
		this.addSvgMapToDom()

		this.addRules()
	}
	addRules() {
		for (let index = 0; index <= 10; index++) {
			let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			line.setAttribute("style", 'fill:#FFFFFF;stroke:#1D1D1B;stroke-miterlimit:10;');
			line.setAttribute("x1", index * 50);
			line.setAttribute("y1", '-5');
			line.setAttribute("x2", index * 50);
			line.setAttribute("y2", '0');
			this.SvgMap.appendChild(line)
		}

	}
	addSvgMapToDom() {
		document.body.appendChild(this.SvgMap);
		window.onresize = () => { this.refreshSvgMap() }
	}
	refreshSvgMap() {
		let top = 0
		let left = 0
		if (Players.player) {
			top = (Players.player.datas.top + (Players.player.datas.height / 2))
			left = (Players.player.datas.left + (Players.player.datas.width / 2))
			// to do 
			// si circle rayon
			// si rect top left ??? 
		}
		else {
			top = (this.map.datas.height / 2)
			left = (this.map.datas.width / 2)
		}
		this.SvgMap.style.top = Math.floor(((window.innerHeight / 2) - top)) + 'px'
		this.SvgMap.style.left = Math.floor(((window.innerWidth / 2) - left)) + 'px'
	}
	addplayerElement() {
		switch (Players.player.shape.tag) {
			case 'circle':
				this.SvgPlayer = this.getCircle(
					Players.player.datas.left,
					Players.player.datas.top,
					Players.player.shape.rayon,
					Players.player.shape.color,
					'player'
				)
				break;
			case 'rect':
				this.SvgPlayer = this.getRect(
					Players.player.datas.left,
					Players.player.datas.top,
					Players.player.datas.width,
					Players.player.datas.height,
					Players.player.shape.color,
					'player'
				)
				break;
			case 'polygon':
				this.SvgPlayer = this.getPolygon(
					Players.player.datas.left,
					Players.player.datas.top,
					Players.player.datas.width,
					Players.player.datas.height,
					3,
					Players.player.shape.color,
					'player'
				)
				break;
			default:
				break;
		}
		this.SvgMap.prepend(this.SvgPlayer);
		this.refreshSvgMap()
	}
	getCircle(cx, cy, r, c, u) {
		let shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		if (u) {
			shape.setAttribute("cx", (Number(cx) + Number(r)));
			shape.setAttribute("cy", (Number(cy) + Number(r)));
		}
		shape.setAttribute("r", r);
		shape.setAttribute("fill", c);
		return shape
	}
	getRect(x, y, w, h, c, u) {
		let shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		if (u) {
			shape.setAttribute("x", Number(x));//+ (Number(w) / 2)));
			shape.setAttribute("y", Number(y));//+ (Number(h) / 2)));
		}
		shape.setAttribute("width", w);
		shape.setAttribute("height", h);
		shape.setAttribute("fill", c);
		return shape
	}
	getPolygon(cx, cy, w, h, s, c, u) {
		const surfaceRect = w * h;
		const apothem = w / (2 * Math.tan(Math.PI / s));
		const perimeter = s * w;
		const side = perimeter / s;
		let points = "";
		for (let i = 0; i < s; i++) {
			const angle = 2 * Math.PI * (i / s);
			const x = w / 2 + apothem * Math.sin(angle);
			const y = h / 2 - apothem * Math.cos(angle);
			points += `${x},${y} `;
		}
		let shape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		shape.setAttribute("points", points);
		shape.setAttribute("fill", c);
		if (u) {
			shape.setAttribute("cx", cx);
			shape.setAttribute("cy", cy);
		}
		return shape;
	}
	getTriangleFromCircle(cx, cy, r, c) {
		const surfaceCircle = Math.PI * Math.pow(r, 2);
		const base = Math.sqrt((4 * surfaceCircle) / Math.sqrt(3));
		const height = Math.sqrt((3 * surfaceCircle) / (2 * base));
		const x1 = r;
		const y1 = 0;
		const x2 = x1 - base / 2;
		const y2 = height;
		const x3 = x1 + base / 2;
		const y3 = height;
		let shape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		shape.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
		shape.setAttribute("fill", c);
		shape.setAttribute("cx", cx);
		shape.setAttribute("cy", cy);
		return shape;
	}
	getLine(x1, y1, x2, y2, color, width = 1) {
		let shape = document.createElementNS("http://www.w3.org/2000/svg", "line");
		shape.setAttribute("x1", x1);
		shape.setAttribute("y1", y1);
		shape.setAttribute("x2", x2);
		shape.setAttribute("y2", y2);
		shape.setAttribute("stroke", color);
		shape.setAttribute("stroke-width", width);
		return ele
	}
	addRessources(numSquares = false) {
		// Générer un nombre aléatoire de carrés verts
		if (!numSquares || numSquares < 1) { let numSquares = Math.floor(Math.random() * 10) + 1; } // entre 1 et 10 carrés

		// Boucle pour créer les carrés
		for (let i = 0; i < numSquares; i++) {
			// Position aléatoire du carré sur la carte
			let x = Math.floor(Math.random() * this.map.datas.width);
			let y = Math.floor(Math.random() * this.map.datas.height);
			let rect = this.getRect(x, y, 5, 5, 'green', true)
			rect.setAttribute("class", "green-square");
			// Ajouter le carré au SVG
			this.SvgMap.appendChild(rect);
		}

	}
}
