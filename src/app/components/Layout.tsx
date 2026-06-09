import { Outlet, Link, useLocation } from "react-router";
import { GraduationCap, MessageSquare, School, User, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: GraduationCap, label: "Dashboard" },
    { path: "/chat", icon: MessageSquare, label: "AI Assistant" },
    { path: "/universities", icon: School, label: "Universities" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-8 text-primary" />
            <div>
              <h1 className="font-semibold text-xl">Xylamia</h1>
              <p className="text-xs text-muted-foreground">Your AI College Advisor</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="gap-2"
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
