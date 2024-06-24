"use client";
import clsx from "clsx";

type InputProps = {
	placeholder?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	className?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	name?: string;
	type?: "text" | "password" | "email" | "number";
};

export const Input = ({
	placeholder = "",
	value,
	onChange,
	name = "",
	className = "",
	isDisabled = false,
	isRequired = false,
	type = "text",
	...rest
}: InputProps) => {
	const baseClasses = ` peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 
        disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border 
        placeholder-shown:border-stone-200 placeholder-shown:border-t-stone-200 border focus:border-2 border-t-transparent
        focus:border-t-transparent text-sm px-3 py-4 rounded-[7px] border-stone-200 focus:border-stone-900`;

	const labelBaseClasses = `peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent`;

	return (
		<div className="relative h-10 w-full min-w-[200px]">
			<input
				{...rest}
				className={clsx(baseClasses, className)}
				placeholder=""
				value={value}
				onChange={onChange}
				disabled={isDisabled}
				type={type}
				name={name}
				required={isRequired}
			/>
			<label className={labelBaseClasses}>{placeholder}</label>
		</div>
	);
};
