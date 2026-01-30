import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, ShieldAlert, FileCheck, Activity, Menu, Bell, Search, User } from "lucide-react";
import { useState } from "react";

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Overview" },
    { to: "/vulnerabilities", icon: ShieldAlert, label: "Vulnerabilities" },
    { to: "/compliance", icon: FileCheck, label: "Compliance" },
    { to: "/threats", icon: Activity, label: "Threat Monitor" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-300 font-sans selection:bg-[#0A74DA] selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0A74DA]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#FF4136]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-40 h-full transition-all duration-300 ease-in-out
            border-r border-white/5 bg-[#050505]/80 backdrop-blur-xl
            ${isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-20 md:translate-x-0"}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Logo Area */}
            <div className={`h-16 flex items-center px-6 border-b border-white/5 ${!isSidebarOpen && "justify-center px-0"}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A74DA] to-[#005bb5] flex items-center justify-center shadow-[0_0_15px_rgba(10,116,218,0.5)]">
                  <ShieldAlert className="w-5 h-5 text-white" />
                </div>
                {isSidebarOpen && (
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-tight">
                    SecuDash
                  </span>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? "bg-[#0A74DA]/10 text-[#0A74DA] border border-[#0A74DA]/20 shadow-[0_0_15px_rgba(10,116,218,0.1)]" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"}
                    ${!isSidebarOpen && "justify-center"}
                  `}
                >
                  <item.icon className={`w-5 h-5 ${isSidebarOpen ? "" : "w-6 h-6"}`} />
                  {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
                  
                  {/* Hover tooltip for collapsed state could go here */}
                </NavLink>
              ))}
            </nav>

            {/* User Profile Snippet */}
            <div className="p-4 border-t border-white/5">
              <button className={`flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors ${!isSidebarOpen && "justify-center"}`}>
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-white/10">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
                {isSidebarOpen && (
                  <div className="text-left overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">Admin User</p>
                    <p className="text-xs text-slate-500 truncate">admin@secudash.io</p>
                  </div>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-transparent">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 focus-within:border-[#0A74DA]/50 transition-colors w-64">
                <Search className="w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search assets, IPs..." 
                  className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Status Indicator */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-emerald-500">System Secure</span>
              </div>

              <button className="relative p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF4136] border border-[#050505]" />
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6 md:p-8 relative scroll-smooth">
             <div className="container mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Outlet />
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}
