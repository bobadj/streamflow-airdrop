import type { FC } from "react";
import classNames from "classnames";
import { Icon } from "./Icon";
import { Button } from "./Button";

interface ErrorProps {
  className?: string;
  title: string;
  content: string;
  onClick?: () => void;
}

export const Error: FC<ErrorProps> = ({
  className,
  title,
  content,
  onClick,
}) => {
  return (
    <div className={classNames("text-center py-12", className)}>
      <div className="text-red-400 mb-4">
        <Icon title="error_outline" />
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-slate-400 mb-4">{content}</p>
      <Button
        onClick={() => (onClick ? onClick() : (window.location.href = "/"))}
      >
        Back to Home
      </Button>
    </div>
  );
};
