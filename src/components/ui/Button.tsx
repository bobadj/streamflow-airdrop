import type { FC, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  disabled,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "p-3 rounded-xl font-medium transition-all !cursor-pointer",
        {
          "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white":
            !disabled,
          "bg-slate-700/50 text-slate-400 cursor-not-allowed": disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
