import React, { useEffect, useState } from "react";
// import Alert from "./Alert";
import List from "./List";

const getLocalStorage = () => {
	let task = localStorage.getItem("task");
	if (task) {
		return (task = JSON.parse(localStorage.getItem("task") || "{}"));
	} else {
		return [];
	}
};

const Form = () => {
	const [title, setTitle] = useState("");
	const [task, setTask] = useState<Task[]>(getLocalStorage);
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState<string | null>(null);
	// const [isDone, setIsDone] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title && isEditing) {
			setTask(
				task.map((item: Task) => {
					if (item.id === editID) {
						return { ...item, title: title };
					}
					return item;
				})
			);
			setTitle("");
			setEditID(null);
			setIsEditing(false);
		} else {
			const newTask = {
				id: new Date().getTime().toString(),
				title: title,
				isDone: false,
			};
			setTask([...task, newTask]);
			setTitle("");
		}
	};

	const removeTask = (id: string) => {
		setTask(task.filter((item) => item.id !== id));
	};

	const editTask = (id: string) => {
		const editItem = task.find((item) => item.id === id);
		setIsEditing(true);
		setEditID(id);
		if (editItem) setTitle(editItem?.title);
	};

	const changeIsDone = (id: string) => {
		setTask(
			task.map((item: Task) => {
				if (item.id === id) {
					if (item.isDone) return { ...item, isDone: false };
					else return { ...item, isDone: true };
				}
				return item;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem("task", JSON.stringify(task));
	}, [task]);

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
			{task.length > 0 && (
				<List
					tasks={task}
					removeTask={removeTask}
					editTask={editTask}
					changeIsDone={changeIsDone}
				/>
			)}
		</section>
	);
};

export default Form;
