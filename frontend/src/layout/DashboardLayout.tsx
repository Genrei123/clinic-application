import type React from "react";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar"; // Assuming you have a Navbar component
import { Outlet } from "react-router-dom";


export const DashboardLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  // Initialize isOpen based on initial screen size
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // Start open on desktop

  // Check if we're on mobile and handle sidebar state on resize
  useEffect(() => {
    const checkIfMobile = () => {
      const currentIsMobile = window.innerWidth < 768;
      setIsMobile(currentIsMobile);
      // Adjust isOpen state based on mobile/desktop transition
      setIsOpen(prevIsOpen => {
        if (currentIsMobile && prevIsOpen) {
          // If transitioning to mobile while open, close it
          return false;
        }
        if (!currentIsMobile && !prevIsOpen) {
          // If transitioning to desktop while closed, open it
          return true;
        }
        // Otherwise, maintain current state
        return prevIsOpen;
      });
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button (positioned absolutely over the layout) */}
      {isMobile && ( // Only show on mobile
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-[60] bg-primary text-white p-2 rounded-md" // Use fixed and high z-index
          aria-label="Toggle Sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      )}


      {/* Overlay for mobile (positioned absolutely, covers content) */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40" // Use fixed to cover the whole screen
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className="flex h-screen">
        {/* Sidebar component - controlled by layout state */}
        <Sidebar
          isOpen={isOpen}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar} // Pass the toggle function down
        />

        {/* Main content area */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isOpen && !isMobile ? "ml-64" : "ml-0" // Add margin-left when sidebar is open AND not mobile
          }`}
        >
          <Navbar />
          <div className="bg-background text-white flex-1 p-4 overflow-auto"> {/* Add overflow-auto if needed */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};