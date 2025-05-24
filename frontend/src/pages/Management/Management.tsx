import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../components/Button";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const mockData = [
    {"id": 1, "title": "Bagong Silang Branch", "address": "Bagong Silang"}
]

export const Management: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <LoadingSpinner size="lg" />
                </div>
            ) : (
                <div className="flex flex-inline h-full w-full">
                    <div className="h-full w-full">
                        <div className="flex flex-inline mb-4 space-x-4">
                            <h1 className="p-4 mr-4">Branches</h1>
                            <Button
                                label="Add Branches"
                                onClick={() => console.log("Branches clicked")}
                            />
                        </div>

                       
                        

                        {mockData.map((branches) => (
                            <div className="bg-[#374055] w-1/2 p-4 rounded mb-4" key={branches.id}>
                            <h1 className = "text-2xl">{branches.title}</h1>
                            <p>{branches.title}</p>

                            <div className="flex flex-inline m-4 justify-end">
                                <button className="p-4 mr-4 border rounded">Edit</button>
                                <button className="p-4 mr-4 border rounded" onClick={() => toast.info("Deleting....")}>Delete</button>
                            </div>
                        </div>
                        ))}
                        
                        
                    </div>

                    <div className="h-full w-full">
                        <div className="flex flex-inline mb-4">
                            <h1 className="p-4 mr-4">Services</h1>
                            <Button
                                label="Add Services"
                                onClick={() => console.log("Services clicked")}
                            />
                        </div>

                        <div className="bg-[#374055] w-1/2 p-4 rounded mb-4">
                            <h1 className = "text-2xl">Title</h1>
                            <p>Address</p>

                            <div className="flex flex-inline m-4 justify-end">
                                <button className="p-4 mr-4 border rounded">Edit</button>
                                <button className="p-4 mr-4 border rounded" onClick={() => toast.info("Deleting....")}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}