"use client"

import type React from "react"
import { useState } from "react"

type ToggleOption = {
  id: string
  icon: React.ReactNode
  label: string
}

interface ToggleGroupProps {
  options: ToggleOption[]
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

export function ToggleGroup({ options, defaultValue, onChange, className = "" }: ToggleGroupProps) {
  const [activeItem, setActiveItem] = useState<string>(defaultValue || options[0]?.id || "")

  const handleToggle = (id: string) => {
    setActiveItem(id)
    onChange?.(id)
  }

  return (
    <div
      className={`flex items-center bg-[#CDCDCD] p-3 w-96 justify-evenly rounded-lg m-4 ${className}`}
      role="tablist"
      aria-orientation="horizontal"
    >
      {options.map((option) => (
        <button
          key={option.id}
          role="tab"
          aria-selected={activeItem === option.id}
          aria-controls={`panel-${option.id}`}
          id={`tab-${option.id}`}
          className={`flex items-center justify-center p-3 transition-colors min-w-[60px] focus:outline-none ${
            activeItem === option.id
              ? "bg-[#625B71] text-white rounded-md"
              : "bg-transparent text-[#49454F] hover:bg-[#CDCDCD]/80"
          }`}
          onClick={() => handleToggle(option.id)}
        >
          <span className="sr-only">{option.label}</span>
          {option.icon}
        </button>
      ))}
    </div>
  )
}


export function PeopleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`}>
      <path
        d="M19 14C21.2091 14 23 16 23 17.5C23 18.3284 22.3284 19 21.5 19H21M17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5M5 14C2.79086 14 1 16 1 17.5C1 18.3284 1.67157 19 2.5 19H3M7 11C5.34315 11 4 9.65685 4 8C4 6.34315 5.34315 5 7 5M16.5 19H7.5C6.67157 19 6 18.3284 6 17.5C6 15 9 14 12 14C15 14 18 15 18 17.5C18 18.3284 17.3284 19 16.5 19ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function InboxIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 1V15H15V1H1ZM13 9V3H3V9H6C6 10.1046 6.89543 11 8 11C9.10457 11 10 10.1046 10 9H13Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function NotificationIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`}>
      <path
        d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}