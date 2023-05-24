/**
 * Combines strings and/or objects into one single string usable as a value for the className property
 * @param {string|string[]|object|object[]} classes A string, an object of truthy/falsy properties or an array of strings and/or objects of truthy/falsy properties
 * @returns {string} className Class names separated by a space
 */
export function classNames(classes: any[] = []) {
	// I am aware of the classnames npm package, but I do not want to introduce any unnecessary dependency
	return (Array.isArray(classes) ? classes : [classes]).reduce((cls, cl) => {
		// an empty string will still pass - it is faster and breaks nothing
		if (typeof cl === 'string') {
			cls.push(cl);
		} else {
			// every truthy property is included in the final className
			cl && Object.keys(cl).forEach(key => cl[key] && cls.push(key));
		}

		return cls;
	}, []).join(' ');
}
