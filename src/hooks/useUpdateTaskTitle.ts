import { useMutation } from "react-query";
import { getLocalStorage, setLocalStorage } from "./utils";

interface updateProps {
	id: string;
	title: string;
}

const useUpdateTaskTitle = () => {
	return useMutation(async ({ id, title }: updateProps) => {
		const tasks: Task[] = getLocalStorage();
		return setLocalStorage(
			tasks.map((item: Task) => {
				if (item.id === id) {
					return { ...item, title: title };
				}
				return item;
			})
		);
	}, {});
};

export default useUpdateTaskTitle;
