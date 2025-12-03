import type { FC, CSSProperties } from "react";

export interface IconProps {
  title: string;
  style?: CSSProperties;
}

export const Icon: FC<IconProps> = ({ title, style }) => {
  return (
    <span className="material-symbols-outlined" style={style}>
      {title}
    </span>
  );
};

export const WalletIcon: FC<Omit<IconProps, "title">> = (props) => (
  <Icon title="wallet" {...props} />
);
