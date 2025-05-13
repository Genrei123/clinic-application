import type React from "react";
import { useState } from "react";
// Remove useState, useEffect - state is lifted up
import { useNavigate } from "react-router-dom";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
  className?: string;
};

// Define props type for Sidebar
type SidebarProps = {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
};

// Accept props
export function Sidebar({ isOpen, isMobile, toggleSidebar }: SidebarProps) {
  // navItems state remains here as it's internal data
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <img src="/dashboard_icon.png" alt="Dashboard Icon" className="h-5 w-5" />,
      isActive: true,
      className: "font-inter font-bold",
    },
    {
      title: "Patients",
      href: "/patients",
      icon: <img src="/patients_icon.png" alt="Patients Icon" className="h-5 w-5" />,
      isActive: false,
      className: "patients-item font-inter font-bold",
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: <img src="/inventory_icon.png" alt="Inventory Icon" className="h-5 w-5" />,
      isActive: false,
      className: "inventory-item font-inter font-bold",
    },
    {
      title: "Management",
      href: "/management",
      icon: <img src="/management_icon.png" alt="Management Icon" className="h-5 w-5" />,
      isActive: false,
      className: "management-item font-inter font-bold",
    },
  ]);

  // Remove internal isMobile and isOpen state
  // Remove useEffect for resize listener

  const navigate = useNavigate();

  const handleNavClick = (index: number) => {
    setNavItems(
      navItems.map((item:any, i:any) => ({
        ...item,
        isActive: i === index,
      })),
    );

    navigate(navItems[index].href); // Navigate to the selected item

    // Close sidebar after click on mobile if it's open
    if (isMobile && isOpen) { // Check if currently mobile AND open
      toggleSidebar(); // Use the prop function to close
    }
  };

  // Remove the internal toggleSidebar function

  return (
    // Remove the outer fragment <> and the mobile toggle button/overlay from here
    // These are now rendered by DashboardLayout

    // Sidebar container - controlled by props
    <div
      className={`fixed top-0 left-0 h-full bg-background shadow-md z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${isMobile ? "w-full max-w-xs" : "w-64"}`} // Use max-w-xs for mobile instead of w-full? Or stick to w-full w-full md:w-64 based on design
    >
      {/* Header */}
      <div className="bg-primary p-4 text-center relative"> {/* Add relative for absolute positioning of the close button */}
        <h1 className="text-lg font-bold text-white">JIMIRENE</h1>
        {/* Close button - only visible on mobile when sidebar is open */}
        {isMobile && isOpen && ( // Only show on mobile and when open
          <button
            onClick={toggleSidebar} // Use the prop function
            className="absolute right-4 top-4 bg-primary text-white p-2 rounded-md" // Positioned absolutely within header
            aria-label="Close Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        <p className="text-xs text-white/80">Diagnostic Maternity Clinic</p>
      </div>

      {/* Navigation */}
      {/* Apply flex-grow to nav to push footer down */}
      <nav className="flex flex-col flex-grow space-y-1 px-2 py-4">
        {navItems.map((item, index) => (
          <a
            key={item.title}
            href={item.href}
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              handleNavClick(index);
            }}
            className={
              item.isActive
                ? "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white bg-primary"
                : "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-primary/20 hover:text-white"
            }
          >
            {item.icon}
            {item.title}
          </a>
        ))}
        {/* Position this image relative to the sidebar div */}
        <img
          src="/logo.png"
          alt="Diagnostic Logo"
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-40 h-40 z-10 opacity-50" // Adjusted positioning and size
        />

         {/* The footer div needs to be part of the flex column to be pushed down */}
      </nav>
      {/* The footer div needs to be outside the flex-grow nav but inside the sidebar div */}
        <div className="bg-primary/80 p-3 text-center text-xs text-white/60 absolute bottom-0 left-0 w-full z-30">
          Diagnostic portal
        </div>

    </div>
  );
}

export default Sidebar; // Keep export default if needed elsewhere