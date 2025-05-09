
import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  User, 
  Users, 
  Camera, 
  History, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DashboardLayoutProps {
  userRole: "admin" | "user";
}

const DashboardLayout = ({ userRole }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // In a real app, you would clear auth tokens, etc.
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Menu items configuration based on user role
  const menuItems = [
    { path: "/", icon: <User size={20} />, label: "Dashboard" },
    // Only show Mahasiswa for admins
    ...(userRole === "admin" 
      ? [{ path: "/mahasiswa", icon: <Users size={20} />, label: "Mahasiswa" }] 
      : []),
    { path: "/deteksi", icon: <Camera size={20} />, label: "Deteksi Wajah" },
    { path: "/riwayat", icon: <History size={20} />, label: "Riwayat" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="block md:hidden bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="text-primary-foreground hover:bg-primary/90"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <h1 className="text-xl font-bold">Face Scan {userRole === "admin" ? "Admin" : ""}</h1>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2">{userRole === "admin" ? "Admin" : "User"}</span>
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <User size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar text-sidebar-foreground w-64 flex-shrink-0 fixed inset-y-0 z-10 flex flex-col transition-transform duration-300 ease-in-out",
          { 
            "-translate-x-full": !sidebarOpen && window.innerWidth < 768,
            "translate-x-0": sidebarOpen || window.innerWidth >= 768
          },
          "md:relative md:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6">
          <h1 className="text-xl font-bold">Face Scan {userRole === "admin" ? "Admin" : ""}</h1>
          <p className="text-sidebar-foreground/70 text-sm">
            {userRole === "admin" ? "Management Dashboard" : "User Dashboard"}
          </p>
        </div>

        <Separator className="bg-sidebar-border/50" />

        {/* Sidebar Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md hover:bg-sidebar-accent group transition-colors",
                    location.pathname === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80"
                  )}
                  onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                >
                  <span 
                    className={cn(
                      "p-1 rounded-md",
                      location.pathname === item.path ? "bg-primary/20" : "bg-transparent group-hover:bg-primary/10"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarOpen ? "md:ml-0" : "md:ml-0"
      )}>
        {/* Desktop Header */}
        <header className="hidden md:block bg-background border-b p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <Menu size={24} />
            </Button>
            
            <div></div> {/* Spacer */}
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {userRole === "admin" ? "Administrator" : "User"}
              </span>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-0 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Page Content */}
        <div className="container mx-auto p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
