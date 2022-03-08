const getLocalStorage = () => {
	let task = localStorage.getItem("task");
	if (task) {
		return (task = JSON.parse(localStorage.getItem("task") || "{}"));
	} else {
		return [];
	}
};

const setLocalStorage = (items: any[]) => {
	window.localStorage.setItem("task", JSON.stringify(items));
};

export { getLocalStorage, setLocalStorage };
