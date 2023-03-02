class Formula {
	constructor() {
	}
	calculerRayon(w, h) {
		const surfaceRect = w * h;
		const rayon = Math.sqrt(surfaceRect / Math.PI);
		return rayon.toFixed(2);
	}
	getDistanceXY = (from, destination) => {
		let AB = (destination.position.x) - (from.position.x)
		let AC = (destination.position.y) - (from.position.y)
		let distance = Math.sqrt((AB * AB) + (AC * AC))
		console.log("distanceXY:", distance)
		return distance
	}
	getNextPos = (x, y, theta, speed) => {
		return {
			x: x - Math.sin(theta) * speed,
			y: y + Math.cos(theta) * speed
		}
	}
	get_aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
	}
}
