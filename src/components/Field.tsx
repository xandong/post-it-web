import { Eye, EyeClosed } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute | undefined;
  initialType?: React.HTMLInputTypeAttribute;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export function Field({
  id,
  label,
  placeholder,
  type,
  initialType = type,
  value,
  setValue,
}: FieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [typed, setTyped] = useState(type);

  function handleChange(e: { target: { value: string } }) {
    setValue(e.target.value);
  }

  function handleClick() {
    setIsVisible(!isVisible);
    if (typed === "password") return setTyped("text");
    return setTyped("password");
  }

  console.log(typed);
  const isPassword = initialType === "password";

  return (
    <fieldset className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          value={value}
          onChange={handleChange}
          className="w-full p-2 bg-zinc-400/20 rounded"
          id={id}
          type={typed}
          placeholder={placeholder}
        />
        {isPassword ? (
          <button
            className="absolute top-2 right-3 text-xl"
            onClick={handleClick}
          >
            {isVisible ? <Eye /> : <EyeClosed />}
          </button>
        ) : (
          ""
        )}
      </div>
    </fieldset>
  );
}
