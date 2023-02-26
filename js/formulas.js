class Formula {
	constructor() {
	}
	calculerRayon(w, h) {
		const surfaceRect = w * h;
		const rayon = Math.sqrt(surfaceRect / Math.PI);
		return rayon.toFixed(2);
	}
}
