import { useMutation } from "react-query";
import { getLocalStorage, setLocalStorage } from "./utils";

const useUpdateIsDone = () => {
	return useMutation(async ({ id }: Record<"id", string>) => {
		const tasks: Task[] = getLocalStorage();
		return setLocalStorage(
			tasks.map((item: Task) => {
				if (item.id === id) {
					if (item.isDone) return { ...item, isDone: false };
					else return { ...item, isDone: true };
				}
				return item;
			})
		);
	}, {});
};

export default useUpdateIsDone;
