export default function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: any) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      className="border border-(--border-light) font-[300] text-(--text) px-2 py-1 w-full rounded-lg focus:outline-none"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
