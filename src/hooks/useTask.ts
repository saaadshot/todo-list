import { useQuery } from "react-query";
import { getLocalStorage } from "./utils";

const useTask: any = () => {
	return useQuery<Task[]>(["tasks"], async () => {
		console.log("useTask");
		return getLocalStorage();
	});
};

export default useTask;
