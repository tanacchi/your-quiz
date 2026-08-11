import { AppHeader } from "@/components/organisms/AppHeader";
import { TabBar } from "@/components/organisms/TabBar";

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader />
      <main className="flex-1 pb-20">{children}</main>
      <TabBar />
      <footer
        className="text-center text-xs py-3 opacity-30 mt-8 mb-16"
        style={{ color: "#f5835c" }}
      >
        &copy; 2025 QuizPocket
      </footer>
    </div>
  );
}
