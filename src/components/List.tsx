import React from "react";

interface ListProps {
	tasks: Task[];
	removeTask: (id: string) => void;
	editTask: (id: string) => void;
	changeIsDone: (id: string) => void;
}

const List = ({ tasks, removeTask, editTask, changeIsDone }: ListProps) => {
	return (
		<div className="container">
			{tasks.map((task: Task) => {
				const { id, title, isDone } = task;
				return (
					<ul className="list-group list-group-flush" key={id}>
						<li className="list-group-item d-flex justify-content-between align-items-center">
							{title}
							<div style={{ float: "right" }}>
								{isDone ? (
									<button
										type="button"
										className="btn btn-secondary"
										onClick={() => changeIsDone(id)}
									>
										Mark as not Done
									</button>
								) : (
									<button
										type="button"
										className="btn btn-primary"
										onClick={() => changeIsDone(id)}
									>
										Mark as Done
									</button>
								)}

								<button
									type="button"
									className="edit-btn"
									onClick={() => editTask(id)}
								>
									Edit
								</button>
								<button
									type="button"
									className="delete-btn"
									onClick={() => removeTask(id)}
								>
									Delete
								</button>
							</div>
						</li>
					</ul>
				);
			})}
		</div>
	);
};

export default List;
