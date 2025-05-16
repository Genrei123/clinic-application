import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Table } from "../../components/Table";
import axiosInstance from "../../api/axiosConfig";
import { InventoryModal } from "./modals/InventoryModal";

const Inventory: React.FC = () => {
    // Fetch inventory data from the server
    const [showInventoryForm, setShowInventoryForm] = useState(false);
    const [medicineData, setMedicineData] = useState([{}]);

    useEffect(() => {
        const response = async () => {
            try {
                const res = await axiosInstance.get("/medicine/");
                if (res.status === 200) {
                    setMedicineData(res.data.data);
                } else {
                    console.error("Failed to fetch inventory data");
                }
            } catch (error) {
                console.error("Error fetching inventory data:", error);
            }
        } 

        response();
    }, [medicineData]);

    const medicineColumns = [
        { key: 'id', header: 'ID', render: (item: any) => item.MedicineID },
        { key: 'name', header: 'Name', render: (item: any) => item.MedicineName },
        { key: 'quantity', header: 'Quantity', render: (item: any) => item.MedicineQuantity },
        { key: 'unit', header: 'Price', render: (item: any) => item.MedicinePrice },
        { key: 'price', header: 'Manufacture Date', render: (item: any) => item.ManufactureDate },
        { key: 'expirationDate', header: 'Expiration Date', render: (item: any) => item.ExpirationDate },
    ];

    const handleAddInventory = () => {
        setShowInventoryForm(true);
    }
    
    return (
        <>

            <div >
                <div className="flex space-x-4">
                    <Input
                        type="text"
                        placeholder="Search for inventory..."
                        onChange={(e) => console.log(e.target.value)}
                    />

                    <Button
                        label="Add Item"
                        onClick={handleAddInventory}
                    // className="bg-[#6D2E46] hover:opacity-90 text-white font-bold py-2 px-4 rounded transition-opacity"
                    />
                </div>

                <div className="mt-4">
                    <Table
                        title="Medicines"
                        columns={medicineColumns}
                        data={medicineData} // Pass the defined data array
                        selector={true} // Enable row selection
                    />
                </div>

                <InventoryModal
                    isOpen={showInventoryForm}
                    onClose={() => setShowInventoryForm(false)}
                    medicine={null}
                />

            </div>
        </>
    )
}

export default Inventory;