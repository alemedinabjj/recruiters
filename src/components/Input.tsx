import { forwardRef } from "react";

const InputBase = ({ label, name, id, type, error, ...rest }: any, ref: any) => {
  return (
    <>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          name={name}
          type={type}
          ref={ref}
          {...rest}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {error && <span className="text-red-500 text-xs italic">{error}</span>}
      </div>
    </>
  );
};

export const Input = forwardRef(InputBase);
