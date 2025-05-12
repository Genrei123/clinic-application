import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Table } from "../../components/Table";

const Inventory: React.FC = () => {
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
                        onClick={() => console.log("Add Inventory Clicked")}
                    // className="bg-[#6D2E46] hover:opacity-90 text-white font-bold py-2 px-4 rounded transition-opacity"
                    />
                </div>

                <div className="mt-4">
                    <Table
                        title="Inventory"
                        columns={InventoryColumns}
                        data={InventoryData} // Pass the defined data array
                    />
                </div>

            </div>
        </>
    )
}

export default Inventory;