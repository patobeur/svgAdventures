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
		let maxX = (Svg.map.datas.width - this.datas[itemName].width + 1)
		let maxY = (Svg.map.datas.height - this.datas[itemName].height + 1)
		for (let i = 0; i < nb; i++) {
			// Position aléatoire sur la carte
			let x = Math.floor(Math.random() * maxX)
			let y = Math.floor(Math.random() * maxY)

			let elementdatas = {
				tag: this.datas[itemName].shape,
				width: Number(this.datas[itemName].width),
				height: Number(this.datas[itemName].height),
				fill: this.datas[itemName].color,
				class:this.datas[itemName].className
			};
			switch (this.datas[itemName].shape) {
				case 'circle':
					elementdatas.cx=x;
					elementdatas.cy=y;
					elementdatas.r= Number(this.datas[itemName].r);
					break;
				case 'rect':
					elementdatas.x=x;
					elementdatas.y=y;
					break;		
				default:
					break;
			}
			let item = Svg.getSvgElement(elementdatas,itemName)
			Svg.SvgMap.prepend(item);
		}

	}
	getDatas(){
		return {
			tree:{
				width:10,height:10,color:'green',
				className:'green-circle',
				shape:'circle',r:5
			},
			rabbit:{
				width:5,height:5,color:'white',
				className:'white-circle',
				shape:'rect'
			}
		}
	}
}
