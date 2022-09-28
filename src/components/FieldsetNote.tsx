import { CheckCircle, Pencil } from "phosphor-react";
import { useState } from "react";

interface FieldsetNoteProps {
  isContent?: boolean;
  id: string;
  label: string;
  value: string;
  setValue: (str: string) => void;
}

export function FieldsetNote({
  isContent = false,
  id,
  label,
  value,
  setValue,
}: FieldsetNoteProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <fieldset className="w-full p-2 flex gap-2 border-b items-center justify-end">
      <label htmlFor={id}>{label}</label>
      <div className="relative group">
        {isContent ? (
          <textarea
            cols={3}
            className="w-80 p-1 rounded-md bg-cor-green/20 enabled:bg-cor-orange/20"
            disabled={isDisabled}
            id={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <input
            className="p-1 rounded-md bg-cor-green/20 enabled:bg-cor-orange/20"
            disabled={isDisabled}
            id={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}

        <button
          type="button"
          className="absolute top-2 right-2 group group-hover:scale-110 transition-all"
          onClick={() => setIsDisabled(!isDisabled)}
        >
          {isDisabled ? (
            <Pencil weight="bold" />
          ) : (
            <CheckCircle weight="bold" />
          )}
        </button>
      </div>
    </fieldset>
  );
}
