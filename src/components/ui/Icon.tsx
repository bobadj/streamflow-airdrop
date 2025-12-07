import classNames from "classnames";
import type { FC, CSSProperties } from "react";

export interface IconProps {
  title: string;
  style?: CSSProperties;
  className?: string;
}

export const Icon: FC<IconProps> = ({ title, style, className }) => {
  return (
    <span
      className={classNames("material-symbols-outlined", className)}
      style={style}
    >
      {title}
    </span>
  );
};

export const WalletIcon: FC<Omit<IconProps, "title">> = (props) => (
  <Icon title="wallet" {...props} />
);
