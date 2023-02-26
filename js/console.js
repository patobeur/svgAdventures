class Console {
	constructor() {
	}
	init() {
		this.currentmess = 0
		this.getConsoleOrCreateIt()
	}
	getConsoleOrCreateIt() {
		this.console = document.getElementById('console')
		if (!this.console) this.createConsole()
	}
	createConsole() {
		Doom.addCss('#gameconsole{min-height:0;max-height:250px;overflow:hidden;overflow-y:auto;transition:max-height 2s ease-out,min-height 2s ease-out;font-size:.8rem;width:200px;background-color:rgba(0, 0, 0, .6); border-bottom-right-radius:.5rem;color:rgba(0, 255, 0, 1);}' + 'p{padding:.2rem .5rem;width:100%}', 'gameconsole')
		this.console = document.createElement('div')
		this.console.id = 'gameconsole'
		document.body.appendChild(this.console)

		Con.addMessage('Console initiated....!')
	}
	addMessage(string) {
		this.currentmess++
		let message = document.createElement('p')
		message.textContent = string
		setTimeout(() => {
			message.remove()
			this.currentmess--
		}, 3000 + ((this.currentmess + 1) * 300));
		this.console.appendChild(message)
	}
}
