const getLocalStorage = () => {
	// let task = localStorage.getItem("task");
	// if (task) {
	// 	return (task = JSON.parse(localStorage.getItem("task") || "{}"));
	// } else {
	// 	return [];
	// }
	console.log("getLocalStorage");
	return JSON.parse(window.localStorage.getItem("task") as string);
};

const setLocalStorage = (items: any[]) => {
	window.localStorage.setItem("task", JSON.stringify(items));
};

export { getLocalStorage, setLocalStorage };
