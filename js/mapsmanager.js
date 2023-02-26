class MapsManager {
	constructor() {
		this.grid = { x: 100, y: 100, z: 100 }
		this.mapsdatas = this.getMapDatas(0)
	}
	changeToMap(num) {
		this.mapsdatas = this.getMapDatas(num)
	}
	getMapDatas(num) {
		let datas = [
			{ name: 'one', datas: { width: 500, height: 500, top: 0, left: 0, zIndex: 0 } },
			{ name: 'two', datas: { width: 1200, height: 300, top: 0, left: 0, zIndex: 0 } }
		]
		if (!typeof num === 'number' || num < 0 || num >= datas.length) num = 0;
		return datas[num]
	}
	getCurrentGrid(datas) {
		let x = datas.left > 0 ? Math.floor(datas.left / this.grid.x) + 1 : 1;
		let y = datas.top > 0 ? Math.floor(datas.top / this.grid.y) + 1 : 1;
		let z = datas.zIndex > 0 ? Math.floor(datas.zIndex / this.grid.z) + 1 : 1;
		return { x: x, y: y, z: z }
	}
}
