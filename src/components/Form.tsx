import React, { useState } from "react";
import List from "./List";
import useTask from "../hooks/useTask";
import { useQueryClient } from "react-query";
import useDeleteTask from "../hooks/useDeleteTask";
import useNewTask from "../hooks/useNewTask";
import useUpdateTaskTitle from "../hooks/useUpdateTaskTitle";
import useUpdateIsDone from "../hooks/useUpdateIsDone";

const Form = () => {
	const [title, setTitle] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState<string | null>(null);

	const updateIsDone = useUpdateIsDone();
	const updateTask = useUpdateTaskTitle();
	const deleteTask = useDeleteTask();
	const taskResults = useTask();
	const addTask = useNewTask();
	const { data, isError, isSuccess } = taskResults;

	const queryClient = useQueryClient();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title && isEditing && typeof editID === "string") {
			updateTask.mutate({ id: editID, title });
			setTitle("");
			setEditID(null);
			setIsEditing(false);
		} else {
			const newTask = {
				id: new Date().getTime().toString(),
				title: title,
				isDone: false,
			};
			addTask.mutate(newTask, {
				onSuccess: () => {
					queryClient.invalidateQueries("tasks");
				},
			});
			setTitle("");
		}
	};

	const removeTask = (id: string) => {
		deleteTask.mutate(
			{ id },
			{
				onSuccess: () => {
					queryClient.invalidateQueries("tasks");
				},
			}
		);
	};

	const editTask = (id: string) => {
		const editItem = data.find((item: Task) => item.id === id);
		setIsEditing(true);
		setEditID(id);
		if (editItem) setTitle(editItem?.title);
	};

	const changeIsDone = (id: string) => {
		updateIsDone.mutate(
			{ id },
			{
				onSuccess: () => {
					queryClient.invalidateQueries("tasks");
				},
			}
		);
	};

	if (isError) {
		return <div>Something Went Wrong</div>;
	}

	return (
		<section className="section-center">
			<form onSubmit={handleSubmit}>
				<h3>TODO List</h3>
				<div className="mb-3 form">
					<input
						type="text"
						className="form-control"
						placeholder="Enter Task"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
					<button type="submit" className="btn btn-success">
						{isEditing ? "Edit" : "Submit"}
					</button>
				</div>
			</form>
			{isSuccess && (
				<List
					tasks={data}
					removeTask={removeTask}
					editTask={editTask}
					changeIsDone={changeIsDone}
				/>
			)}
		</section>
	);
};

export default Form;
