import { useState, useRef, useEffect } from "react";

interface DropdownItem {
  label: string;
  value: string;
}

interface ClickableDropdownProps {
  items: DropdownItem[];
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Dropdown = ({
  items,
  onSelect,
  placeholder = "Select...",
  className = "",
}: ClickableDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    onSelect(item.value);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <button
        type="button"
        className="border px-3 py-2 w-full bg-white rounded text-left flex justify-between items-center"
        onClick={() => setOpen((o) => !o)}
      >
        {selected ? selected.label : placeholder}
        <span>▾</span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg">
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => handleSelect(item)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
