class PlayerManager {
	constructor() {
		this.formulas = new Formula()
		this.Shapes = this.getShapes()
		this.defaultShapeNum = 0
		this.diagonalspeedratio = 2
	}
	setNewPlayer(pseudo) {
		this.currentShapeNum = this.defaultShapeNum
		if (typeof pseudo != 'string' || pseudo === "") { pseudo = "Doe" }
		this.player = this.getPlate(this.Shapes[this.currentShapeNum], pseudo)
		Con.addMessage('new player : ' + pseudo + ' (' + this.currentShapeNum + ')')
		Svg.addplayerElement()
	}
	update() {
		this.checkSkill();
		if (this.ismoving()) Svg.refreshSvgMap();
	}
	getPlate(Archetype, pseudo) {
		let player = {
			pseudo: pseudo,
			map: Number(0),
			xp: 0,
			hp: { current: 0, min: 0, max: 100 },
			shape: Archetype.shape,
			datas: {
				width: Archetype.datas.width,
				height: Archetype.datas.height,
				top: 0,//(Svg.map.datas.height / 2),// - Math.floor(Archetype.datas.height / 2),
				left: 0,//(Svg.map.datas.width / 2),// - Math.floor(Archetype.datas.width / 2),
				zIndex: 1
			},
			skills: {
				shapechanger: { recast: 10, current: -1, skillname: 'Shape Changing' },
			},
			options: {
				update: true
			},
			keyboard: new KeyboardControls(),
			update: () => this.update()
		}
		// player.datas.left = (this.map.datas.width / 2);// - (Players.player.datas.width / 2)
		// player.datas.top = (this.map.datas.height / 2);// - (Players.player.datas.height / 2)
		player.grid = Maps.getCurrentGridPos(player.datas)
		return player
	}
	sendSkill(skillnum) {
		switch (skillnum) {
			case 0:
				this.shapechanger();
				break;
			default:
				break;
		}

	}
	checkSkill() {
		// skills= [changeArchetype]		
		let skills = this.player.skills
		let skillnum = 0
		for (const skillname in skills) {
			if (Object.hasOwnProperty.call(skills, skillname)) {
				const skill = skills[skillname];
				if (skill.current > -1) {
					skill.current++
					if (skill.current >= skill.recast) {
						skill.current = -1
						Con.addMessage('[-]' + skill.skillname + ' recast is up !')
					}
				}
				let keyboard = this.player.keyboard
				if (keyboard.skills[skillnum] === true) {
					if (skill.current === -1) {
						skill.current = 1
						this.sendSkill(skillnum);
					}
					else Con.addMessage('waiting for ' + skill.skillname + '...' + (skill.recast - skill.current)) // console.log('wait...' + (skill.recast - skill.current))
				}
			}
			skillnum++
		}
	}
	ismoving() {
		let top = 'y'
		let left = 'x'
		if (this.player.shape.tag === 'circle') { top = 'cy'; left = 'cx' }
		let ismoving = false

		if (this.player.keyboard.way[0] || this.player.keyboard.way[2]) {
			Svg.SvgPlayer.setAttribute(top, this.player.datas.top);
			ismoving = true
			this.movePlayer()
		}
		if (this.player.keyboard.way[1] || this.player.keyboard.way[3]) {
			Svg.SvgPlayer.setAttribute(left, this.player.datas.left);
			ismoving = true
			this.movePlayer()
		}
		return ismoving
	}

	movePlayer() {
		// way= [top,right,bottom,left]		
		if (this.player.options.update) {
			this.player.grid = Maps.getCurrentGridPos(this.player.datas)
			let way = this.player.keyboard.way
			let speed = this.player.shape.speed
			if ((way[0] || way[2]) && (way[1] || way[3])) speed = Math.floor(speed / this.diagonalspeedratio)
			if (way[0]) this.player.datas.top -= speed;
			if (way[2]) this.player.datas.top += speed;
			if (way[1]) this.player.datas.left += speed;
			if (way[3]) this.player.datas.left -= speed;
		}
	}
	shapechanger() {
		Con.addMessage('ShapeChanging...')
		this.setNextShapeNum();
		let Archetype = this.getShape()
		// set new player Archetype
		this.player.datas.width = Archetype.datas.width
		this.player.datas.height = Archetype.datas.height
		this.player.shape = Archetype.shape
		// replace player Archetype
		Svg.SvgPlayer.remove()
		Svg.addplayerElement()
		// replace player Archetype
		Picto.moveHeads()
	}
	setNextShapeNum() {
		this.currentShapeNum++;
		if (this.currentShapeNum >= this.Shapes.length) this.currentShapeNum = 0;
	}
	getShape() {
		return this.Shapes[this.currentShapeNum]
	}
	getShapes() {
		return [
			{
				datas: { width: 10, height: 10 },
				shape: {
					model: 'alice',
					rayon: this.formulas.calculerRayon(10, 10), // rayon
					tag: 'circle',
					color: 'red',
					speed: 2,
				}
			},
			{
				datas: { width: 10, height: 10 },
				shape: {
					model: 'bob',
					tag: 'rect',
					color: 'green',
					speed: 2,
				}
			},
			// {
			// 	datas: { width: 10, height: 10 },
			// 	shape: {
			// 		model: 'charles',
			// 		tag: 'polygon',
			// 		sommets: 5,
			// 		color: 'blue',
			// 		speed: 3,
			// 	}
			// }
		]
	}

}
