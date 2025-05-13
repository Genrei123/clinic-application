import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Table } from "../../components/Table";

export const Patients: React.FC = () => {
  const PatientsData = [
    { date: '2023-10-01', income: 1000, patients: 10 },
    { date: '2023-10-02', income: 1200, patients: 12 },
    { date: '2023-10-03', income: 800, patients: 8 },
    { date: '2023-10-04', income: 1500, patients: 15 },
    { date: '2023-10-05', income: 900, patients: 9 },
  ];

  const PatientsColumns = [
    { key: 'date', header: 'Date', render: (item: typeof PatientsData[0]) => item.date },
    { key: 'income', header: 'Income', render: (item: typeof PatientsData[0]) => item.income }, // Corrected to render income
    { key: 'patients', header: 'Patients', render: (item: typeof PatientsData[0]) => item.patients }, // Corrected to render patients
    { key: 'view', header: 'View', render: () => null, navigation: (item: typeof PatientsData[0]) => `/patients/${item.date}` }, // Assuming item has a 'date' as ID
  ];

  return (
    <>
      <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Search for patients..."
            onChange={(e) => console.log(e.target.value)}
          />
          <Button
            label="Add Patient"
            onClick={() => console.log("Add Patient Clicked")}
            // className="bg-[#6D2E46] hover:opacity-90 text-white font-bold py-2 px-4 rounded transition-opacity"
          />
      </div>

      <div className="mt-4">
        <Table
          title="Patients"
          columns={PatientsColumns}
          data={PatientsData} 
        />
      </div>
    </>
  );
}