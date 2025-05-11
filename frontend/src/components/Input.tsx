interface InputProps {
    type?: string;
    placeholder?: string;
    name?: string;
    value?: keyof Object | string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
}

export const Input: React.FC<InputProps> = ({
    type = "text",
    placeholder = "",
    value = "",
    onChange = () => {},
    disabled = false,
    required = false,
    error = false,

}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`rounded bg-[#E3E4DB] text-[#0A0E15] p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0A0E15] focus:border-transparent ${
                error ? "border-red-500" : ""
            }`}
            disabled={disabled}
            required={required}
        />
    );
}