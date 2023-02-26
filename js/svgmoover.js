class SvgMoover {
	constructor(pos) {
		this.currentKarma = pos;
		this.headColors = ["#FF0000", "#00FF00", "#0000FF"]
		this.strokeWidth = .5
		this.strokeColor = "#000000"
		this.mooves = {
			0: { r: [4, 5, 5], cx: [12, 22, 2], cy: [8, 3, 3] },
			1: { r: [5, 4, 5], cx: [2, 12, 22], cy: [3, 8, 3] },
			2: { r: [5, 5, 4], cx: [22, 2, 12], cy: [3, 3, 8] },
		}
	}

	init() {
		this.createSVG()
		this.headElements = this.svgElement.querySelectorAll('.head');
		this.moveHeads();
		this.svgElement.addEventListener('click', () => {
			console.log('Players.player.keyboard.skills', Players.player.keyboard.skills)
			// this.moveHeads();
			// Players.player.keyboard.skills[0] = true;
		});
	}
	moveHeads() {
		let moves = this.mooves[Players.currentShapeNum]
		this.shoulderElement.setAttribute('fill', this.headColors[Players.currentShapeNum]);
		for (let i = 0; i < 3; i++) {
			for (const key in moves) {
				if (Object.hasOwnProperty.call(moves, key)) {
					const element = moves[key];
					this.headElements[i].setAttribute(key, element[i]);
				}
			}
		}
	}
	createSVG() {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("id", "karma");
		svg.setAttribute("title", "Change Profil");
		svg.setAttribute("class", "skill c");
		svg.setAttribute("viewBox", "0 0 24 24");
		svg.setAttribute("enable-background", "new 0 0 24 24");
		svg.setAttribute("xml:space", "preserve");

		// Créer le cercle de fond
		const background = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		background.setAttribute("id", "background");
		background.setAttribute("class", "background");
		background.setAttribute("cx", "12");
		background.setAttribute("cy", "12");
		background.setAttribute("r", "15");
		background.setAttribute("fill", "#FFFFFF");
		this.backgroundElement = background
		svg.appendChild(this.backgroundElement);

		// Créer le chemin de l'épaule
		const shoulder = document.createElementNS("http://www.w3.org/2000/svg", "path");
		shoulder.setAttribute("id", "shoulder");
		shoulder.setAttribute("class", "shoulder");
		// shoulder.setAttribute("fill", "#FFFFFF");
		shoulder.setAttribute("stroke", this.strokeColor);
		shoulder.setAttribute("stroke-width", this.strokeWidth);
		shoulder.setAttribute("stroke-linecap", "round");
		shoulder.setAttribute("stroke-linejoin", "round");
		shoulder.setAttribute("d", "M18,18.7c0-3-3.5-3.7-6-3.7s-6,0.7-6,3.7V30h12V18.7z");
		shoulder.setAttribute("cx", "12");
		shoulder.setAttribute("cy", "9");

		this.shoulderElement = shoulder
		svg.appendChild(this.shoulderElement);

		// Créer les cercles de la tête
		for (let i = 0; i < 3; i++) {
			const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			head.setAttribute("id", "head_" + i);
			head.setAttribute("class", "head p_" + i);
			head.setAttribute("cx", 2 + 10 * i);
			head.setAttribute("cy", "8");
			head.setAttribute("r", i == 1 ? "3" : "5"); // Le cercle du milieu est plus petit
			head.setAttribute("fill", this.headColors[i]);
			head.setAttribute("stroke", this.strokeColor);
			head.setAttribute("stroke-width", this.strokeWidth);
			head.setAttribute("stroke-linecap", "round");
			head.setAttribute("stroke-linejoin", "round");

			svg.appendChild(head);
		}
		// Mettre a jour la couleur des shoulders
		this.shoulderElement.setAttribute('fill', this.headColors[this.currentKarma]);
		// Ajouter le SVG au corps du document
		const body = document.getElementsByTagName("body")[0];
		this.svgElement = svg

		// this.shoulderElement = this.svgElement.getElementById('shoulder');
		body.appendChild(svg);
	}
}
