export function debounce(func: Function, wait: number) {
	let timeout = 0;

	return function debounced(...params: any[]) {
		function later() {
			timeout = 0;
			func(...params);
		}

		clearTimeout(timeout);
		timeout = window.setTimeout(later, wait);
	};
}
