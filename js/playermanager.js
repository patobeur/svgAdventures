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
		let acting = false
		if (this.isUsingSkills()) this.checkActionSkill(); acting = true;
		if (this.isUsingMove()) Svg.refreshSvgMap(); acting = true;
		if (!acting) this.regen()
	}
	regen() {

	}
	getPlate(Archetype, pseudo) {
		let player = {
			pseudo: pseudo,
			map: Number(0),
			xp: 0,
			stats: {
				hp: { current: 100, min: 0, max: 100, regen: 1 },
				mana: { current: 100, min: 0, max: 100, regen: 1 }
			},
			shape: Archetype.shape,
			datas: {
				width: Archetype.datas.width,
				height: Archetype.datas.height,
				top: 0,//(Svg.map.datas.height / 2),// - Math.floor(Archetype.datas.height / 2),
				left: 0,//(Svg.map.datas.width / 2),// - Math.floor(Archetype.datas.width / 2),
				zIndex: 1
			},
			skills: {
				shapechanger: {
					recast: 10, current: -1,
					cdDelay: 5000,
					cd: true,
					skillname: 'Shape Changing',
					costs: { mana: 10, hp: 5 },
					updateCd() {
						if (this.cd === true) {
							this.cd = false;
							Players.setNextShapeNum();
							let Archetype = Players.getShape()
							// set new player Archetype
							Players.player.datas.width = Archetype.datas.width
							Players.player.datas.height = Archetype.datas.height
							Players.player.shape = Archetype.shape
							// replace player Archetype
							Svg.SvgPlayer.remove()
							Svg.addplayerElement()
							// replace player Archetype
							if (Picto) Picto.moveHeads()

							// setTimeout(() => {
							// 	this.cd = true;
							// 	Con.addMessage('Shape Changing is ok')
							// 	console.log('Shape Changing this.cd is', this.cd)
							// }, this.cdDelay, false);
						}
					},
					// acto() {
					// 	// 	let errors = 0;
					// 	// 	for (let stat in this.costs) {
					// 	// 		if (Object.hasOwnProperty.call(this.costs, stat)) {
					// 	// 			let need = this.costs[stat];
					// 	// 			let current = Players.player.stats[stat].current;
					// 	// 			if (current < need) {
					// 	// 				Con.addMessage('you need : ' + (need - current) + 'pts de ' + stat + '. Attendez un petit moment avant de recommencer !')
					// 	// 				errors++
					// 	// 			}
					// 	// 			else {
					// 	// 				Con.addMessage(need + '' + stat + ' lost')
					// 	// 			}
					// 	// 		}
					// 	// 	}
					// 	// 	if (errors < 1) {
					// 	// 		for (const stat in this.costs) {
					// 	// 			if (Object.hasOwnProperty.call(this.costs, stat)) {
					// 	// 				let need = this.costs[stat];
					// 	// 				Players.player.stats[stat].current -= need
					// 	// 				console.log('aaaaaaaaaaaaa', need)
					// 	// 				console.log('aaaaaaaaaaaaa', Players.player.stats[stat].current)
					// 	// 			}
					// 	// 		}
					// 	// 		Con.addMessage('ShapeChanging...')
					// 	// 		Players.setNextShapeNum();
					// 	// 		let Archetype = Players.getShape()
					// 	// 		// set new player Archetype
					// 	// 		Players.player.datas.width = Archetype.datas.width
					// 	// 		Players.player.datas.height = Archetype.datas.height
					// 	// 		Players.player.shape = Archetype.shape
					// 	// 		// replace player Archetype
					// 	// 		Svg.SvgPlayer.remove()
					// 	// 		Svg.addplayerElement()
					// 	// 		// replace player Archetype
					// 	// 		if (Picto) Picto.moveHeads()
					// 	// 		this.updateCd()

					// 	// 	}
					// 	// 	else {
					// 	// 		Con.addMessage('vous navez que ')
					// 	// 	}
					// }
				},
			},
			options: {
				update: true
			},
			keyboard: new KeyboardControls(),
			update: () => this.update()
		}
		// player.act = (dis, skillName) => {
		// 	let errors = 0;
		// 	for (let stat in dis.costs) {
		// 		if (Object.hasOwnProperty.call(dis.costs, stat)) {
		// 			let need = dis.costs[stat];
		// 			let current = Players.player.stats[stat].current;
		// 			if (current < need) {
		// 				Con.addMessage('you need : ' + (need - current) + 'pts de ' + stat + '. Attendez un petit moment avant de recommencer !')
		// 				errors++
		// 			}
		// 		}
		// 	}
		// 	if (errors < 1) {
		// 		for (const stat in dis.costs) {
		// 			if (Object.hasOwnProperty.call(dis.costs, stat)) {
		// 				let need = dis.costs[stat];
		// 				Players.player.stats[stat].current -= need
		// 			}
		// 		}
		// 		Con.addMessage('doing skills...')
		// 		Players.setNextShapeNum();
		// 		let Archetype = Players.getShape()
		// 		// set new player Archetype
		// 		this.player.datas.width = Archetype.datas.width
		// 		this.player.datas.height = Archetype.datas.height
		// 		this.player.shape = Archetype.shape
		// 		// replace player Archetype
		// 		Svg.SvgPlayer.remove()
		// 		Svg.addplayerElement()
		// 		// replace player Archetype
		// 		if (Picto) Picto.moveHeads()
		// 		this.player.skills[skillName].updateCd()

		// 	}
		// 	else {
		// 		Con.addMessage('Dsl !!! vous n avez cd qu il faut !!!')
		// 	}
		// }
		// player.datas.left = (this.map.datas.width / 2);// - (Players.player.datas.width / 2)
		// player.datas.top = (this.map.datas.height / 2);// - (Players.player.datas.height / 2)
		player.grid = Maps.getCurrentGridPos(player.datas)
		return player
	}
	act(skillName) {
		let skill = this.player.skills[skillName]
		let errors = 0;
		for (let stat in skill.costs) {
			if (Object.hasOwnProperty.call(skill.costs, stat)) {
				let need = skill.costs[stat];
				let current = Players.player.stats[stat].current;
				if (current < need) {
					Con.addMessage('you need : ' + (need - current) + 'pts de ' + stat + '. Attendez un petit moment avant de recommencer !')
					errors++
				}
			}
		}
		if (errors < 1) {
			for (const stat in skill.costs) {
				if (Object.hasOwnProperty.call(skill.costs, stat)) {
					let need = skill.costs[stat];
					Players.player.stats[stat].current -= need
					Svg.updateJauges(stat)
				}
			}

			Con.addMessage('Performing ' + skillName + ' ...')
			this.player.skills[skillName].updateCd()

			setTimeout(() => {
				this.player.skills[skillName].cd = true;
				Con.addMessage(skillName + ' is ok')
			}, this.player.skills[skillName].cdDelay, false);

		}
		else {
			Con.addMessage('Dsl !!! vous n avez cd qu il faut !!!')
		}
	}
	checkActionSkill() {
		let skills = this.player.skills
		for (const skillname in skills) {
			if (Object.hasOwnProperty.call(skills, skillname)) {
				if (skills[skillname].cd === true) this.act(skillname)
			}
		}
	}
	// checkSkill() {
	// 	// skills= [changeArchetype]		
	// 	let skills = this.player.skills
	// 	let skillnum = 0
	// 	for (const skillname in skills) {
	// 		if (Object.hasOwnProperty.call(skills, skillname)) {
	// 			const skill = skills[skillname];
	// 			if (skill.current > -1) {
	// 				skill.current++
	// 				if (skill.current >= skill.recast) {
	// 					skill.current = -1
	// 				}
	// 			}
	// 			let keyboard = this.player.keyboard
	// 			if (keyboard.skills[skillnum] === true) {
	// 				if (skill.current === -1) {
	// 					skill.current = 1
	// 					this.player.act(skillnum, skillname)
	// 				}
	// 				// else Con.addMessage('waiting for ' + skill.skillname + '...' + (skill.recast - skill.current)) // console.log('wait...' + (skill.recast - skill.current))
	// 			}
	// 		}
	// 		skillnum++
	// 	}
	// }
	isUsingMove() {
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

	isUsingSkills() {
		return (this.player.keyboard.skills[0])
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
		// if(this.player.stats.mana> )
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
		if (Picto) Picto.moveHeads()
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
