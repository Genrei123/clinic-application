import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Table } from "../../components/Table";
import axiosInstance from "../../api/axiosConfig";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

export const Patients: React.FC = () => {
  const [patientsData, setPatientsData] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFetchPatientsData = async () => {
    try {
      const res = await axiosInstance.get("/patient/");
      if (res.status === 200) {
        setPatientsData(res.data.data);
      } else {
        console.error("Failed to fetch patients data");
      }
    } catch (error) {
      console.error("Error fetching patients data:", error);
    }
  }

  useEffect(() => {
    handleFetchPatientsData();
  }, []);

  const handleDelete = (item: any) => {
    if (item.ClientNumber) {
      const response = async () => {
        toast.info("Deleting patient...");
        try {
          await axiosInstance.delete(`/patient/${item.ClientNumber}/`);
          toast.success("Patient deleted successfully!");
          // Update state
          setPatientsData((prevData) => prevData.filter((patient: any) => patient.ClientNumber !== item.ClientNumber));

        } catch (error) {
          toast.error("Error deleting patient");
          console.error('Error deleting patient:', error);
        }
      }

      response();
    }
    handleFetchPatientsData();
  }

  const filteredPatientsData = patientsData.filter((item: any) => {
    if (!searchTerm.trim) return true;

    // Case-insensitive search across multiple fields
        const searchLower = searchTerm.toLowerCase();
        return (
            (item.fullName && item.fullName.toLowerCase().includes(searchLower))
        );
  });

  const PatientsColumns = [
    { key: 'ClientNumber', header: 'Client Number', render: (item: any) => item.ClientNumber },
    { key: 'fullName', header: 'Full Name', render: (item: any) => `${item.fullName}` },
    { key: 'PAddress', header: 'Address', render: (item: any) => item.PAddress },
    { key: 'Admitted', header: 'Admitted', render: (item: any) => item.Admitted },
    { key: 'action', header: 'Action', render: () => null, navigation: (item: any) => `/patients/${item.ClientNumber}` },
  ]

  return (
    <>
      <div className="flex space-x-4">
        <Input
          type="text"
          placeholder="Search for patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          label="Add Patient"
          onClick={() => console.log("Add Patient Clicked")}
        />
      </div>

      <div className="mt-4">
        <Table
          title="Patients"
          columns={PatientsColumns}
          data={filteredPatientsData}
          selector={true}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}