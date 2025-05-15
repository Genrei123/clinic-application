import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Table } from "../../components/Table";
import axiosInstance from "../../api/axiosConfig";
import { InventoryModal } from "./modals/InventoryModal";

const Inventory: React.FC = () => {
    // Fetch inventory data from the server
    const [showInventoryForm, setShowInventoryForm] = useState(false);

    useEffect(() => {
        const response = async () => {
            try {
                const res = await axiosInstance.get("/inventory/");
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching inventory data:", error);
            }
        } 

        response();
    }, []);

    const handleAddInventory = () => {
        setShowInventoryForm(true);
    }


    const InventoryData = [
        {
            id: 1,
            name: "Paracetamol",
            quantity: 100,
            unit: "mg",
            price: 0.5,
            expirationDate: "2024-12-31",
        },
        {
            id: 2,
            name: "Ibuprofen",
            quantity: 200,
            unit: "mg",
            price: 0.75,
            expirationDate: "2025-06-30",
        },
        {
            id: 3,
            name: "Amoxicillin",
            quantity: 50,
            unit: "mg",
            price: 1.0,
            expirationDate: "2024-09-15",
        },

    ];

    const InventoryColumns = [
        { key: 'id', header: 'ID', render: (item: typeof InventoryData[0]) => item.id },
        { key: 'name', header: 'Name', render: (item: typeof InventoryData[0]) => item.name },
        { key: 'quantity', header: 'Quantity', render: (item: typeof InventoryData[0]) => item.quantity },
        { key: 'unit', header: 'Unit', render: (item: typeof InventoryData[0]) => item.unit },
        { key: 'price', header: 'Price', render: (item: typeof InventoryData[0]) => item.price },
        { key: 'expirationDate', header: 'Expiration Date', render: (item: typeof InventoryData[0]) => item.expirationDate },

    ];
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
                        title="Inventory"
                        columns={InventoryColumns}
                        data={InventoryData} // Pass the defined data array
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