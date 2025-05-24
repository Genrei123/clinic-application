import { Bell, LogOut, Sun, User } from "lucide-react";
import { Clock } from "./Clock";
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const Navbar: React.FC = () => {
    const { getUser } = useAuth();
    const username = getUser()?.username;
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showMenu &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                iconRef.current &&
                !iconRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login#/login'; // Redirect to login page
    };

    return (
        <nav className="bg-background p-4 flex justify-end items-center">

            <div className="flex items-center space-x-4">
                <a className="text-white">
                    <Bell />
                </a>

                <a className="text-white">
                    <Sun />
                </a>

                {/* Time */}
                <Clock />

                {/* Profile Icon */}
                <a className="text-white">
                    <User
                        ref={iconRef}
                        onClick={() => {
                            setShowMenu((prev) => !prev);
                        }}
                    />
                </a>
            </div>

            {/* Profile Modal */}
            {showMenu && (
                <div ref={menuRef} className="absolute top-12 right-4 shadow-2xl rounded-lg p-4 w-40 bg-primary text-white ">
                    <div>
                        <div className="flex flex-col items-center mb-2">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Profile"
                                className="rounded-full w-10 h-10 border-2 border-black"
                            />
                            <span className="pt-1 text-lg">{username}</span>
                        </div>
                        <button className="hover:bg-black/10 w-full text-left px-2 py-1 rounded"
                            onClick={handleLogout}
                        >
                            <LogOut className="inline mr-2 w-5"/>Logout
                        </button>
                    </div>
                </div>
            )}

        </nav>
    );
}