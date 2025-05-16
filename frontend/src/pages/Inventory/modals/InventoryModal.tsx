import { useState, useEffect } from "react";

interface Medicine {
    MedicineName: string;
    MedicineQuantity: number;
    MedicinePrice: number;
    ManufactureDate: string;
    ExpirationDate: string;
    BranchID: number;
    MedicineStatus: boolean;
    MedicineDescription: string;
    MedicineIMG: string;
}

interface InventoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (data: Medicine) => void;
    handleEdit?: (data: Medicine) => void;
    medicine: Medicine | null;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
    isOpen,
    onClose,
    handleSubmit,
    handleEdit,
    medicine,
}) => {
    const isEditMode = !!medicine && !!handleEdit;

    const [formData, setFormData] = useState<Medicine>({
        MedicineName: "",
        MedicineQuantity: 0,
        MedicinePrice: 0,
        ManufactureDate: "",
        ExpirationDate: "",
        BranchID: 0,
        MedicineStatus: true,
        MedicineDescription: "",
        MedicineIMG: "",
    });

    // Populate form with medicine data when in edit mode
    useEffect(() => {
        if (isEditMode && medicine) {
            setFormData(medicine);
        } else {
            setFormData({
                MedicineName: "",
                MedicineQuantity: 0,
                MedicinePrice: 0,
                ManufactureDate: "",
                ExpirationDate: "",
                BranchID: 0,
                MedicineStatus: true,
                MedicineDescription: "",
                MedicineIMG: "",
            });
        }
    }, [medicine, isOpen]);

    const handleClose = () => {
        onClose();
    };

    const handleFormSubmit = () => {
        if (isEditMode && handleEdit) {
            handleEdit(formData);
        } else {
            handleSubmit(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div>
                <div className="text-black fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <h2 className="text-xl font-bold mb-4">
                                {isEditMode ? "Edit Medicine" : "Add Medicine"}
                            </h2>
                            <div className="mb-4">
                                <label className="block text-gray-700">Medicine Name</label>
                                <input
                                    type="text"
                                    name="MedicineName"
                                    value={formData.MedicineName}
                                    onChange={(e) => setFormData({ ...formData, MedicineName: e.target.value })}
                                    required
                                    placeholder="Enter Medicine Name"
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    name="MedicineQuantity"
                                    value={formData.MedicineQuantity}
                                    onChange={(e) => setFormData({ ...formData, MedicineQuantity: Number(e.target.value) })}
                                    required
                                    placeholder="Enter Quantity"
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="MedicinePrice"
                                    value={formData.MedicinePrice}
                                    onChange={(e) => setFormData({ ...formData, MedicinePrice: Number(e.target.value) })}
                                    required
                                    placeholder="Enter Price"
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Manufacture Date</label>
                                <input
                                    type="date"
                                    name="ManufactureDate"
                                    value={formData.ManufactureDate}
                                    onChange={(e) => setFormData({ ...formData, ManufactureDate: e.target.value })}
                                    required
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Expiration Date</label>
                                <input
                                    type="date"
                                    name="ExpirationDate"
                                    value={formData.ExpirationDate}
                                    onChange={(e) => setFormData({ ...formData, ExpirationDate: e.target.value })}
                                    required
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Branch ID</label>
                                <input
                                    type="number"
                                    name="BranchID"
                                    value={formData.BranchID}
                                    onChange={(e) => setFormData({ ...formData, BranchID: Number(e.target.value) })}
                                    required
                                    placeholder="Enter Branch ID"
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Medicine Status</label>
                                <select
                                    name="MedicineStatus"
                                    value={formData.MedicineStatus ? "true" : "false"}
                                    onChange={(e) => setFormData({ ...formData, MedicineStatus: e.target.value === "true" })}
                                    required
                                    className="border rounded w-full py-2 px-3"
                                >
                                    <option value="true">Available</option>
                                    <option value="false">Not Available</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Medicine Description</label>
                                <textarea
                                    name="MedicineDescription"
                                    value={formData.MedicineDescription}
                                    onChange={(e) => setFormData({ ...formData, MedicineDescription: e.target.value })}
                                    required
                                    placeholder="Enter Medicine Description"
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Medicine Image URL</label>
                                <input
                                    type="text"
                                    name="MedicineIMG"
                                    value={formData.MedicineIMG}
                                    onChange={(e) => setFormData({ ...formData, MedicineIMG: e.target.value })}
                                    required
                                    placeholder="Enter Medicine Image URL"
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleFormSubmit}
                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                                >
                                    {isEditMode ? "Update" : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}