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
		let elementdatas = {
			tag: 'svg',
			viewBox: `-${this.margetemporaireLeft}  -${this.margetemporaireTop} ${this.map.datas.width + (this.margetemporaireTop + this.margetemporaireLeft)} ${this.map.datas.height + (this.margetemporaireTop + this.margetemporaireLeft)}`,
			class: 'map',
			width: this.map.datas.width + (this.margetemporaireLeft + this.margetemporaireRigth) + 'px',
			height: this.map.datas.height + (this.margetemporaireTop + this.margetemporaireBottom) + 'px',
			// fill: 'rgba(0,0,255,1)',
		};
		this.SvgMap = Svg.getSvgElement(elementdatas)
		this.SvgMap.setAttribute("xml:space", 'preserve');
		this.SvgMap.setAttribute("enable-background:new", `0 0 ${this.map.datas.width} ${this.map.datas.height}`);

		this.refreshSvgMap()
		this.addSvgMapToDom()

	}
	addCadre() {
		let elementdatas = {
			tag: 'rect',
			x: 0,
			y: 0,
			width: this.map.datas.width,
			height: this.map.datas.height,
			fill: 'rgba(0,0,255,.1)',
		};

		let cadre = Svg.getSvgElement(elementdatas)
		// let cadre = this.getRect(-this.margetemporaireLeft, -this.margetemporaireTop, this.map.datas.width, this.map.datas.height, 'rgba(0,0,255,.1)')
		this.SvgMap.prepend(cadre)

	}
	addRules() {
		for (let index = 0; index <= 10; index++) {
			// getLine(x1, y1, x2, y2, color, width = 1)
			let elementdatas = {
				tag: 'line',
				style: 'fill:#FFFFFF;stroke:#1D1D1B;stroke-miterlimit:10;',
				x1: index * 50,
				y1: -5,
				x2: index * 50,
				y2: 0,
			}
			let element = this.getSvgElement(elementdatas)
			this.SvgMap.appendChild(element)
		}

	}
	getSvgElement(elementdatas, source = false) {
		let element = document.createElementNS("http://www.w3.org/2000/svg", elementdatas.tag);
		for (const attrib in elementdatas) {
			if (Object.hasOwnProperty.call(elementdatas, attrib)) {
				element.setAttribute(attrib, elementdatas[attrib]);
			}
		}
		return element
	}
	addSvgMapToDom() {
		document.body.appendChild(this.SvgMap);
		window.onresize = () => { this.refreshSvgMap() }
	}
	refreshSvgMap() {
		let top = (this.map.datas.height / 2)
		let left = (this.map.datas.width / 2)
		if (Players && Players.player) {
			top = Players.player.datas.top
			left = Players.player.datas.left
		}
		this.SvgMap.style.top = Math.floor(((window.innerHeight / 2) - top)) + 'px'
		this.SvgMap.style.left = Math.floor(((window.innerWidth / 2) - left)) + 'px'
	}
	addplayerElement() {
		console.log(Players.player.shape)
		let elementdatas = {}
		switch (Players.player.shape.tag) {
			case 'circle':
				elementdatas = {
					tag: Players.player.shape.tag,
					cx: Players.player.datas.left,
					cy: Players.player.datas.top,
					r: Number(Players.player.shape.rayon),
					fill: Players.player.shape.color,
				}
				break;
			case 'rect':
				elementdatas = {
					tag: Players.player.shape.tag,
					x: Players.player.datas.left - (Players.player.datas.width / 2),
					y: Players.player.datas.top - (Players.player.datas.height / 2),
					width: Players.player.datas.width,
					height: Players.player.datas.height,
					fill: Players.player.shape.color,
				}
				break;
			default:
				break;
		}
		this.SvgPlayer = this.getSvgElement(elementdatas)
		this.SvgMap.prepend(this.SvgPlayer);
		this.refreshSvgMap()
	}
	// getPolygon(cx, cy, w, h, s, c, u) {
	// 	const surfaceRect = w * h;
	// 	const apothem = w / (2 * Math.tan(Math.PI / s));
	// 	const perimeter = s * w;
	// 	const side = perimeter / s;
	// 	let points = "";
	// 	for (let i = 0; i < s; i++) {
	// 		const angle = 2 * Math.PI * (i / s);
	// 		const x = w / 2 + apothem * Math.sin(angle);
	// 		const y = h / 2 - apothem * Math.cos(angle);
	// 		points += `${x},${y} `;
	// 	}
	// 	let shape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	// 	shape.setAttribute("points", points);
	// 	shape.setAttribute("fill", c);
	// 	if (u) {
	// 		shape.setAttribute("cx", cx);
	// 		shape.setAttribute("cy", cy);
	// 	}
	// 	return shape;
	// }
	// getTriangleFromCircle(cx, cy, r, c) {
	// 	const surfaceCircle = Math.PI * Math.pow(r, 2);
	// 	const base = Math.sqrt((4 * surfaceCircle) / Math.sqrt(3));
	// 	const height = Math.sqrt((3 * surfaceCircle) / (2 * base));
	// 	const x1 = r;
	// 	const y1 = 0;
	// 	const x2 = x1 - base / 2;
	// 	const y2 = height;
	// 	const x3 = x1 + base / 2;
	// 	const y3 = height;
	// 	let shape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	// 	shape.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
	// 	shape.setAttribute("fill", c);
	// 	shape.setAttribute("x", cx);
	// 	shape.setAttribute("y", cy);
	// 	return shape;
	// }
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
