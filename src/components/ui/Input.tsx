import classNames from "classnames";
import {
  useMemo,
  type ChangeEvent,
  type FC,
  type InputHTMLAttributes,
} from "react";
import { debounce } from "../../utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  error?: string;
  onChange: (value: string) => void;
};

export const Input: FC<InputProps> = ({
  type = "text",
  name,
  placeholder,
  className,
  onChange,
  ...props
}) => {
  const handleChange = useMemo(
    () =>
      debounce((ev: ChangeEvent) => {
        const target: HTMLInputElement = ev.target as HTMLInputElement;
        if (onChange) onChange(target.value);
      }),
    [onChange]
  );

  return (
    <input
      id={name}
      name={name}
      type={type}
      onChange={handleChange}
      className={classNames(
        "w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-3 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10",
        className,
        {
          "cursor-not-allowed": props.disabled,
        }
      )}
      {...props}
      placeholder={placeholder}
    />
  );
};
