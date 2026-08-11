interface FormFieldProps {
  readonly label: string;
  readonly htmlFor: string;
  readonly children: React.ReactNode;
  readonly optional?: boolean;
}

export function FormField({
  label,
  htmlFor,
  children,
  optional = false,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-gray-700">
        {label}
        {optional && <span className="ml-1 text-xs text-gray-400">(任意)</span>}
      </label>
      {children}
    </div>
  );
}
