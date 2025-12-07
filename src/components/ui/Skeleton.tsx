import type { FC } from "react";
import classNames from "classnames";

export const Skeleton: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={classNames("animate-pulse bg-slate-800 rounded", className)}
    />
  );
};
