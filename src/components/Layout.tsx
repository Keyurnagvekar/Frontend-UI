import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Activity, Bell, Box, Boxes, FileText, GitBranch, LayoutDashboard, Search, Server, Wrench } from "lucide-react";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/servers", label: "MCP Servers", icon: Boxes },
  { to: "/tools", label: "Tools", icon: Wrench },
  { to: "/prompts", label: "Prompts", icon: FileText },
  { to: "/integrations", label: "Integrations", icon: GitBranch },
  { to: "/services", label: "Services", icon: Box },
  { to: "/logs", label: "Logs", icon: Activity }
];

export default function Layout() {
  const location = useLocation();
  const title = navItems.find(item => item.to === location.pathname)?.label ?? "Overview";
  return (
    <div className="app-shell" data-testid="app-shell">
      <aside className="sidebar" data-testid="sidebar">
        <div className="brand">
          <div className="brand-mark"><Box size={23} /></div>
          <div><strong>MCP Control Center</strong><small><span className="live-dot" /> Local environment</small></div>
        </div>
        <nav className="nav-list" aria-label="Main navigation" data-testid="main-navigation">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} data-testid={`nav-${label.toLowerCase().replaceAll(" ", "-")}`} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
              {label === "MCP Servers" && <span className="nav-count">3</span>}
              {label === "Tools" && <span className="nav-count">12</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom" data-testid="server-status-panel">
          <div className="side-status-heading"><span>Server Status</span><span className="version">v0.1.0</span></div>
          <div className="status-line"><span className="live-dot" /> <span>Local mode</span></div>
          <small className="muted">Backend integration pending</small>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div className="global-search">
            <Search size={17} />
            <input data-testid="global-search" placeholder="Search servers, tools, prompts..." aria-label="Search the control center" />
            <kbd>Ctrl K</kbd>
          </div>
          <div className="topbar-actions">
            <span className="online-pill"><span className="live-dot" /> Demo UI</span>
            <button className="icon-button" aria-label="Notifications" data-testid="notifications-button"><Bell size={18} /><span className="notification-dot">3</span></button>
          </div>
        </header>
        <section className="page-content" data-page-title={title}><Outlet /></section>
      </main>
    </div>
  );
}
