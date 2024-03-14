export const Input = ({
  value,
  label,
  onChange,
  className,
  type = "text",
  required = false,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-600">{label}</label>
      <input
        type={type}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${className}`}
        autoComplete="off"
        value={value}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};
