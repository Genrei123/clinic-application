import { Bell, Sun, User } from "lucide-react";
import { Clock } from "./Clock";

export const Navbar: React.FC = () => {
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

                <a className="text-white">
                    <User />
                </a>

            </div>
        </nav>
    );

}