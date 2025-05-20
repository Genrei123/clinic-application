import { toast } from "react-toastify";
import { Button } from "../../components/Button";

export const Management: React.FC = () => {
    return (
        <>
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
                <div className="col-span-2">
                    <div className="flex items-center justify-center justify-end">
                        <div className="flex items-center space-x-4">
                            <h1 className="justify-beginning">Management</h1>

                            <div className="justify-between flex items-center space-x-4">
                                <Button
                                    label="Add Branch"
                                    onClick={() => toast.success("Add Branch Clicked")}
                                    className="bg-[#6D2E46] hover:opacity-90 text-white font-bold py-2 px-4 rounded transition-opacity"
                                />

                                <Button
                                    label="Add Services"
                                    onClick={() => toast.success("Add Services Clicked")}
                                    className="bg-[#6D2E46] hover:opacity-90 text-white font-bold py-2 px-4 rounded transition-opacity"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row-start-2">
                    <h1>Branches</h1>
                </div>

                <div className="row-start-2">
                    <h1>Services</h1>
                </div>
            </div>   
        </>
    );
}