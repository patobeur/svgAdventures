class RabbitManager {
	constructor() {		
		this.items = []
		this.datas = this.getDatas()
	}
	init() {
		console.log('Rabbit ok')
		this.add('rabbit',20)
		this.add('tree',100)
	}
	add(itemName,nb = 1) {
		if (!nb) { nb = Math.floor(Math.random() * 50) + 1; }
		// Boucle pour créer les carrés
		for (let i = 0; i < nb; i++) {
			// Position aléatoire du carré sur la carte
			
			let x = Math.floor(Math.random() * ((Svg.map.datas.width - this.datas[itemName].w - 0 + 1)) + 0)
			let y = Math.floor(Math.random() * ((Svg.map.datas.height - this.datas[itemName].h - 0 + 1)) + 0)
			let item;
			switch (this.datas[itemName].shape) {
				case 'circle':		
					item = Svg.getCircle(x, y, this.datas[itemName].r, this.datas[itemName].color, true)
					break;
				case 'rect':
					item = Svg.getRect(x, y, this.datas[itemName].w, this.datas[itemName].h, this.datas[itemName].color, true)
					break;		
				default:
					break;
			}
			item.setAttribute("class", this.datas[itemName].className);
			// Ajouter le carré au SVG
			Svg.SvgMap.prepend(item);
		}

	}
	getDatas(){
		return {
			tree:{
				w:10,h:10,color:'green',
				className:'green-circle',
				shape:'circle',r:5
			},
			rabbit:{
				w:5,h:5,color:'white',
				className:'white-circle',
				shape:'rect'
			}
		}
	}
}
