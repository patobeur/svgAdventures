class DOMGenerator {
	constructor() {
		this.svg = false
	}
	addCss = (css = false, id = false) => {
		if (typeof css === 'string') {
			let style = document.createElement('style');
			if (id) style.id = id
			style.type = 'text/css';
			style.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}
	}
	createElement(attrs) {
		let newElement = document.createElement(attrs.tagName || 'div')
		newElement.id = attrs.id || '';
		newElement.textContent = attrs.textContent || '';
		newElement.className = attrs.className || '';
		newElement.href = attrs.href || ''; //new URL(attrs.href)
		return newElement
	}
	addTo(element, target = false, before = false) {
		if (target != false && typeof target === 'object') {
			!before ? target.appendChild(element) : target.prepend(element);
		} else {
			!before ? document.body.appendChild(element) : document.body.prepend(element);
		}
	}
	createSvgElement(attrs) {
		if (attrs && attrs.src) {
			var object = document.createElement("object");
			object.setAttribute("type", "image/svg+xml");
			object.setAttribute("data", attrs.src);
			object.setAttribute("id", attrs.id);

			if (attrs.width) object.setAttribute("width", attrs.width);
			if (attrs.height) object.setAttribute("height", attrs.height);
			if (attrs.className) object.className = attrs.className;
			return object;
		}
	}
}
