import React from "react";
import { Icon } from "./Icon";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="text-gray-500 text-sm mb-3" aria-label="Breadcrumb">
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {!isLast && item.href ? (
                <a
                  href={item.href}
                  className="hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-700 font-medium">{item.label}</span>
              )}

              {!isLast && (
                <Icon title="chevron_right" className="text-gray-400" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
