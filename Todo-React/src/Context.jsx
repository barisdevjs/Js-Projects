/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
export const ShoppingCartContext = createContext({});
export function ShoppingCartProvider({ children }) {
	const [items, setItems] = useState([]);
	const [fireEvent, setFireEvent] = useState(false);
	const [loading, setLoading] = useState(false);

	return (
		<ShoppingCartContext.Provider
			value={{
				items,
				setItems,
				fireEvent,
				setFireEvent,
				loading,
				setLoading
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
}
