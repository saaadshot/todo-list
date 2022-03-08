import { useMutation } from "react-query";

import { getLocalStorage, setLocalStorage } from "./utils";

const useDeleteTask = () => {
	return useMutation(async ({ id }: Record<"id", string>) => {
		const tasks: Task[] = getLocalStorage();
		return setLocalStorage(tasks.filter((item: Task) => id !== item.id));
	}, {});
};

export default useDeleteTask;
