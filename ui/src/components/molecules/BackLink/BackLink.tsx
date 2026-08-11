import Link from "next/link";

interface BackLinkProps {
  readonly href: string;
  readonly label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-block mt-6 text-sm text-gray-500 hover:text-base transition"
    >
      ← {label}
    </Link>
  );
}
