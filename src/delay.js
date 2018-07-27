export function delayPromise(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), duration)
	});
};