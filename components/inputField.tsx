interface InputField {
  label?: string;
  value: string;
  placeholder: string;
  makeBigger?: boolean;
  error?: boolean;
  type: "text" | "number";
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

// const numberSchema = z.number().min(0).max(10);

export const InputField: React.FC<InputField> = ({
  label,
  value,
  placeholder,
  makeBigger,
  onChange,
  error,
  type,
}) => {
  const isWithinRange = (val: number, min: number, max: number) => {
    return val >= min && val <= max;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      const currentValue = parseFloat(event.currentTarget.value + event.key);
      if (
        !isWithinRange(
          currentValue,
          parseFloat(event.currentTarget.min),
          parseFloat(event.currentTarget.max),
        )
      ) {
        event.preventDefault();
      }
    }
  };

  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-500 pb-2 mt-1"
      >
        {label}
      </label>
      {makeBigger ? (
        <textarea
          name={label}
          id={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`bg-white relative w-full border border-gray-300 rounded-md shadow-sm p-3 text-left cursor-text focus:outline-none focus:ring-1 focus:ring-british-green-1 focus:border-british-green-1 sm:text-sm
                  ${
                    error ? "rounded-md ring-inset-2 ring-2 ring-red-400" : ""
                  }`}
        />
      ) : (
        <input
          type={type}
          min={1}
          max={999999}
          name={label}
          id={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          className={`bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-text focus:outline-none focus:ring-1 focus:ring-british-green-0 focus:border-british-green-0 sm:text-sm
                ${error ? "rounded-md ring-inset-2 ring-2 ring-red-400" : ""} ${
                  type == "number" ? "appearance-none" : ""
                }`}
        />
      )}
    </div>
  );
};

export default InputField;
