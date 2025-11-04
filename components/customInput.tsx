export default function TextInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  // eslint-disable-next-line
  onChange: (e: any) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      className={`border border-(--border-light) font-[300] text-(--text) px-2 py-1 w-full rounded-lg focus:outline-none ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
