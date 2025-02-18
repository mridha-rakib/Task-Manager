import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/auth-provider";
import { TasksProvider } from "@/context/task-provider";

import Asidebar from "./components/Asidebar";
import Header from "./components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <TasksProvider>
        <SidebarProvider>
          <Asidebar />
          <SidebarInset>
            <main className="w-full">
              <Header />
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </TasksProvider>
    </AuthProvider>
  );
}
