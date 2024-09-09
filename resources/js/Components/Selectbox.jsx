export default function Selectbox({
    className = '',
    options = [],
    currentValue = '',
    ...props
}) {
    return (
        <select
            {...props}
            defaultValue={currentValue}
            className={
                "rounded boder-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" +
                className
            }
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
