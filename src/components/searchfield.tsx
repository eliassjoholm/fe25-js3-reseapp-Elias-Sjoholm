// sökfältet på startsidan
interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

// skickar upp texten varje gång man skriver
export default function SearchField({
  value,
  onChange,
}: SearchFieldProps) {
  return (
    <div className="mb-6 max-w-sm">
      <label
        htmlFor="country-search"
        className="mb-1 block text-sm font-medium"
      >
        Sök land
      </label>

      <input
        id="country-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="T.ex. Sweden"
        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      />
    </div>
  );
}