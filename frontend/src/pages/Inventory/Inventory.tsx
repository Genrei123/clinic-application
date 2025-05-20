import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Table } from "../../components/Table";
import axiosInstance from "../../api/axiosConfig";
import { InventoryModal } from "./modals/InventoryModal";
import { Medicine } from "../../types/types";
import { toast } from "react-toastify";

const Inventory: React.FC = () => {
    // Fetch inventory data from the server
    const [showInventoryForm, setShowInventoryForm] = useState(false);
    const [medicineData, setMedicineData] = useState([{}]);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

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
    }, []);

    const medicineColumns = [
        { key: 'id', header: 'ID', render: (item: any) => item.MedicineID },
        { key: 'name', header: 'Name', render: (item: any) => item.MedicineName },
        { key: 'quantity', header: 'Quantity', render: (item: any) => item.MedicineQuantity },
        { key: 'unit', header: 'Price', render: (item: any) => item.MedicinePrice },
        { key: 'price', header: 'Manufacture Date', render: (item: any) => item.ManufactureDate },
        { key: 'expirationDate', header: 'Expiration Date', render: (item: any) => item.ExpirationDate },
    ];

    const handleFetchMedicineData = async () => {
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

    const handleAddInventory = () => {
        setShowInventoryForm(true);
        handleFetchMedicineData();
    }

    const handleDelete = (item: any) => {
        // Handle delete action here
        toast.info('Deleting item...');
        // Check if it's medicine or patient
        if (item.MedicineID) {
            // Handle delete for medicine
            console.log('Deleting medicine with ID:', item.MedicineID);
            const response = async () => {
                try {

                    await axiosInstance.delete(`/medicine/${item.MedicineID}/`);
                    toast.success('Medicine deleted successfully');
                    handleFetchMedicineData(); // Fetch updated data
                } catch (error) {
                    toast.error('Error deleting medicine');
                    console.error('Error deleting medicine:', error);
                }
            }
            response();
        } 
    }

    const handleSubmit = async (formData: any) => {
        try {
            toast.info('Adding medicine...');
            const res = await axiosInstance.post("/medicine/", formData);
            if (res.status === 201) {
                toast.success('Medicine added successfully');
                handleFetchMedicineData(); // Fetch updated data
                setShowInventoryForm(false); // Close the modal
            } else {
                console.error("Failed to add medicine");
            }
        } catch (error) {
            toast.error('Error adding medicine');
            console.error("Error adding medicine:", error);
        }
    }

    const handleEdit = (item: any) => {
        setShowInventoryForm(true);
        setSelectedMedicine(item);
        console.log('Edit item:', item);
    }

    const handleUpdate = async (formData: any) => {
        try {
            // Update the selected medicine
            toast.info('Updating medicine...');
            const res = await axiosInstance.put(`/medicine/${selectedMedicine?.MedicineID}/`, formData);
            if (res.status === 200) {
                toast.success('Medicine updated successfully');
                handleFetchMedicineData(); // Fetch updated data
                setShowInventoryForm(false); // Close the modal
            } else {
                console.error("Failed to update medicine");
            }
        } catch (error) {
            console.error("Error updating medicine:", error);
        }
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
                        data={medicineData}
                        selector={true}
                        onDelete={handleDelete} 
                        openModal={handleEdit}
                    />
                </div>

                <InventoryModal
                    isOpen={showInventoryForm}
                    onClose={() => setShowInventoryForm(false)}
                    medicine={selectedMedicine}
                    handleSubmit={handleSubmit}
                    handleEdit={handleUpdate}
                />

            </div>
        </>
    )
}

export default Inventory;