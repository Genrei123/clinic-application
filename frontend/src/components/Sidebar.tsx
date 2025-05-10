
import type React from "react"
import { Button } from "./Button"
import { useState, useEffect } from "react"

type NavItem = {
  title: string
  href: string
  icon: React.ReactNode
  isActive?: boolean
  className?: string
}

export function Sidebar() {
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
])

  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Close sidebar by default on mobile
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleNavClick = (index: number) => {
    setNavItems(
      navItems.map((item, i) => ({
        ...item,
        isActive: i === index,
      })),
    )

    // Close sidebar after click on mobile
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#6D2E46] text-white p-2 rounded-md"
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

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1E1E2A] shadow-md z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "w-full md:w-64" : "w-64"}`}
      >
        {/* Header */}
        <div className="bg-[#6D2E46] p-4 text-center">
          <h1 className="text-lg font-bold text-white">JIMIRENE</h1>
        <button
            onClick={toggleSidebar}
            className="absolute left-4 top-4 bg-[#6D2E46] text-white p-2 rounded-md md:hidden"
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
          <p className="text-xs text-white/80">Diagnostic Maternity Clinic</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          <>
                                {navItems.map((item, index) => (
                                  <a
                                    key={item.title}
                                    href={item.href}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleNavClick(index)
                                    }}
                                    className={
                                      item.isActive
                                        ? "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white bg-[#6D2E46]"
                                        : "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-[#6D2E46]/20 hover:text-white"
                                    }
                                  >
                                    {item.icon}
                                    {item.title}
                                  </a>
                                ))}
                                <img 
                                  src="/logo.png" 
                                  alt="Diagnostic Logo" 
                                  className="absolute top-190 left-10 ml-10 w-70 h-70 z-10"
                                  style={{
                                    transform: "translateY(-10px) translateX(-150px)",
                                  }}
                                />
                                <div className="bg-[#6D2E46]/80 p-3 text-center text-xs text-white/60 absolute bottom-0 left-0 w-full z-30">
                                  Diagnostic portal
                                </div>
          </>
        </nav>
      </div>
    </>
  )
}

export default Sidebar;