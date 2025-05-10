import { Button } from "./Button";

export const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <Button
                label="Home"
                onClick={() => console.log("Home clicked")}
                className="bg-red-500 hover:bg-red-700 text-black font-bold flex-none"
            />

            <div className="flex items-center space-x-4">
                <a className="text-white">
                    Bell Icon
                </a>

                <a className="text-white">
                    Theme Icon
                </a>

                {/* Time */}
                <div className="text-white">
                    {new Date().toLocaleTimeString()}
                </div>

                <a className="text-white">
                    User Icon
                    Avatar
                </a>

            </div>
        </nav>
    );

}