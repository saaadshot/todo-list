import { useMutation } from "react-query";

import { getLocalStorage, setLocalStorage } from "./utils";

const useNewTask = () => {
	return useMutation(async (newTask: Task) => {
		const tasks: Task[] = getLocalStorage();
		return setLocalStorage([...tasks, newTask]);
	}, {});
};

export default useNewTask;
