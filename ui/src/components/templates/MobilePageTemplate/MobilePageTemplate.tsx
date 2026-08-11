interface MobilePageTemplateProps {
  readonly title?: string;
  readonly children: React.ReactNode;
}

export function MobilePageTemplate({
  title,
  children,
}: MobilePageTemplateProps) {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {title !== undefined && (
        <h1 className="text-xl font-bold text-gray-800 mb-4">{title}</h1>
      )}
      {children}
    </div>
  );
}
