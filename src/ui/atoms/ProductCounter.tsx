"use client";

import { useState } from "react";

export const ProductCounter = ({ children }: { children: React.ReactNode }) => {
	const [counter, setCounter] = useState(0);

	return (
		<div>
			<button onClick={() => setCounter(() => counter - 1)}>-</button>
			<input readOnly value={counter} />
			<button onClick={() => setCounter(() => counter + 1)}>-</button>
			{children}
		</div>
	);
};
