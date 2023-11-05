/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
export const TaskContext = createContext({});
export function TaskProvider({ children }) {
	const [items, setItems] = useState([]);
	const [filter, setFilter] = useState(false);
	const [fireEvent, setFireEvent] = useState(false);
	const [loading, setLoading] = useState(false);

	return (
		<TaskContext.Provider
			value={{
				items,
				setItems,
				filter,
				setFilter,
				fireEvent,
				setFireEvent,
				loading,
				setLoading
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}
