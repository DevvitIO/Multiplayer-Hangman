export const addEvent = (target, type, callback) => {
	return target.addEventListener(type, callback);
};